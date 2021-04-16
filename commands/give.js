const db = require("../enmap.js");
const Discord = require("discord.js");
module.exports = {
	name: 'give',
	description: 'gifts a specified user points',
   args: true,
   usage: "<@username> <# of points>",
	execute(message, args) {
            var username = args[0];
            console.log(username);
            if (username.includes('<@!')){
                username = username.replace(/<@!/g, "");
                username = username.replace(/>/g, "");
                console.log(username);
                username = message.guild.members.cache.get(username).user.username;
              }
             if ( (message.author.id === message.guild.ownerID) || (message.member.roles.cache.some(role => role.name === 'Moderator') === true) )  {
               const user = message.mentions.users.first() || db.points.get(args[0]);
               if (!user) {
                  return message.reply(`You must mention someone or give their ID! \nUse: \`!${this.name} ${this.usage}\``);
               }

               const pointsToAdd = parseInt(args[1], 10)
               if (pointsToAdd < 0) {
                  return message.reply(`You can only gift a positive amount of points`);
               } 

               if (pointsToAdd > 10000) {
                  return message.reply(`You can only gift up to 10,000 points!`)
               }

               if (!pointsToAdd) {
                  return message.reply(`You didn't tell me how many points to give. \nUse: \`!${this.name} ${this.usage}\``)
               }

               db.points.ensure(`${message.guild.id}-${user.id}`, {
                  user: message.author.id,
                  guild: message.guild.id,
                  points: 0,
                  level: 1,
                  username: username
               });

               //Get current points total
               let userPoints = db.points.get(`${message.guild.id}-${user.id}`, "points");
               userPoints += pointsToAdd;

               //save the new points
               db.points.set(`${message.guild.id}-${user.id}`, userPoints, "points");
               message.channel.send(`${user.tag} has received **${pointsToAdd}** points and now has **${userPoints}** points!`)

               
             }
             else {    
               return message.reply("You don't have permission to use this command");
             }
             
        }
        
}