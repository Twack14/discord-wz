const db = require("../enmap.js");
const Discord = require("discord.js");
module.exports = {
   name: 'give',
   description: 'gifts a specified user points',
   args: true,
   usage: "<@username> <# of points>",
   execute(message, args) {
      
      //checks if user giving command is guild owner OR a moderator
      if ((message.author.id === message.guild.ownerID) || (message.member.roles.cache.some(role => role.name === 'Moderator') === true)) {

         //check that the first argument actually mentions a user
         const user = message.mentions.users.first() || db.points.get(args[0]);
         if (!user) {
            return message.reply(`You must mention someone or give their ID! \nUse: \`!${this.name} ${this.usage}\``);
         }


         if (args[1].includes(",")) {
            args[1] = args[1].replace(/,/g, '');
         }
         //takes second argument which determines amount of points to give specified user
         const pointsToAdd = parseInt(args[1], 10)

         //can't give negative points
         if (pointsToAdd < 0) {
            return message.reply(`You can only gift a positive amount of points`);
         }

         //can't give more than 1,000 points at a time
         if (pointsToAdd > 1000) {
            return message.reply(`You can only gift up to 1,000 points!`)
         }

         //if user forgets to add points to the command, send reminder
         if (!pointsToAdd) {
            return message.reply(`You didn't tell me how many points to give. \nUse: \`!${this.name} ${this.usage}\``)
         }

         //ensures user has entry in database, creates if not
         db.points.ensure(`${message.guild.id}-${user.id}`, {
            user: user.id,
            guild: message.guild.id,
            points: 0,
            level: 1,
            username: user.username
         });

         //Get current points total
         let userPoints = db.points.get(`${message.guild.id}-${user.id}`, "points");
         userPoints += pointsToAdd;

         //save the new points
         db.points.set(`${message.guild.id}-${user.id}`, userPoints, "points");
         message.channel.send(`${user} has received **${pointsToAdd}** points and now has **${userPoints}** points!`)

         const curLevel = Math.floor(0.1 * Math.sqrt(db.points.get(`${message.guild.id}-${user.id}`, "points")));

         //Act upon level-up by sending a message and updating user's level in Enmap
         if (db.points.get(`${message.guild.id}-${user.id}`, "level") < curLevel) {
            message.channel.send(`Congrats, ${user}, you've leveled up to level **${curLevel}**!`);
            db.points.set(`${message.guild.id}-${user.id}`, curLevel, "level");
         }

      }
      else {

         //if not guild owner or moderator, deny permission
         return message.reply("You don't have permission to use this command");
      }

   }

}