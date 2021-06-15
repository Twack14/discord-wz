require('dotenv').config();
const config = require('./config.json');
const { prefix } = require('./config.json');
const Discord = require('discord.js');
const fs = require('fs');
const random = require('random');
const client = new Discord.Client();
client.commands = new Discord.Collection();
//Enmap sharing
const db = require("./enmap.js");

//blizzard.js



const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

client.once('ready', () => {
    console.log(`Logged in as ${client.user.username}`);
});

client.on('message', message => {

    //if the message doesn't contain a prefix, or is from the bot itself, return
    if (message.author.bot) return;

    //this is the key to identify the proper user
    const key = `${message.guild.id}-${message.author.id}`;
    if (message.guild) {

        //Initialize a new entry in Enmap for any new user (hasn't sent message yet seen before)
        db.points.ensure(key, {
            user: message.author.id,
            guild: message.guild.id,
            points: 0,
            level: 1,
            username: message.author.username
        });

        //increments a value directly
        db.points.math(key, "+", random.int(15, 25), "points");

        if (message.content.includes("fuck")) {
            db.points.math(key, "+", 100, "points");
        }
        
        console.log(message.author.username + " has " + db.points.get(key, "points") + "xp.");
        

        //Calculate user's current level
        //This line will calculate the square root of currentPoints then 
        //multiplies that result by 0.1 then floors that result for a round number.
        const curLevel = Math.floor(0.1 * Math.sqrt(db.points.get(key, "points")));
        
        //Act upon level-up by sending a message and updating user's level in Enmap
        if (db.points.get(key, "level") < curLevel) {
            message.reply(`You've leveled up to level **${curLevel}**!`);
            db.points.set(key, curLevel, "level");
        }


        let halfChubb = message.guild.roles.cache.find(r => r.name === "Half Chub");
        let member = db.points.get(key, "user");
        if (db.points.get(key, "level") === 5) {
            message.member.roles.add(halfChubb).catch(console.error);
        }
        
    }

    

    //split the message into an array, then remove the first array item which is the command itself
    const args = message.content.slice(prefix.length).split(/ +/);
    //const command = args.shift().toLowerCase();
    const commandName = args.shift().toLowerCase();
    
    

    if (!client.commands.has(commandName)) return;

    const command = client.commands.get(commandName);

    if (command.args && !args.length) {
        let reply = `You didn't provide any arguments, ${message.author}!`;

        if (command.usage) {
            reply += `\nThe proper usage would be:\n \`${prefix}${command.name} ${command.usage}\``
        }

        return message.channel.send(reply);
    }

    try {
        command.execute(message, args);
    } catch (error) {
        console.error(error);
        message.reply('there was an error trying to execute that command!');
    }
});

client.login(process.env.TOKEN);