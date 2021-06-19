require('dotenv').config();
const config = require('./config.json');
const { prefix } = require('./config.json');
const Discord = require('discord.js');
const fs = require('fs');
const discord_client = new Discord.Client();
discord_client.commands = new Discord.Collection();
const ap = require('./db_functions/addPoints');
const dbf = require('./db_functions/db_function');



const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    discord_client.commands.set(command.name, command);
}

discord_client.once('ready', () => {
    console.log(`Logged in as ${discord_client.user.username}`);
});

discord_client.on('message', message => {

    //if the message doesn't contain a prefix, or is from the bot itself, return
    if (message.author.bot) return;


    var currentLevel = 

    //checks the user's current points, then adds the points for the message, then
    dbf.getPoints(message.author.tag)
        .then((results) => {
            console.log(results);
        }).then(() => {
            dbf.updatePoints(message.author.tag);
        }).then(() => {
            dbf.getPoints(message.author.tag)
                .then((results) => {
                    const curLevel = Math.floor(0.1 * Math.sqrt(results));
                    console.log(results);
                })
        })

    //split the message into an array, then remove the first array item which is the command itself
    const args = message.content.slice(prefix.length).split(/ +/);
    //const command = args.shift().toLowerCase();
    const commandName = args.shift().toLowerCase();



    if (!discord_client.commands.has(commandName)) return;

    const command = discord_client.commands.get(commandName);

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

discord_client.login(process.env.TOKEN);

