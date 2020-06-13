require('dotenv').config();
const config = require('./config.json');
const { prefix } = require('./config.json');
const Discord = require('discord.js');
const fs = require('fs');

const client = new Discord.Client();
client.commands = new Discord.Collection();

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
	if (!message.content.startsWith(prefix) || message.author.bot) return;

    //split the message into an array, then remove the first array item which is the command itself
	const args = message.content.slice(prefix.length).split(/ +/);
    //const command = args.shift().toLowerCase();
    const commandName = args.shift().toLowerCase();
    
   
    if (!client.commands.has(commandName)) return;

    const command = client.commands.get(commandName);

    if (command.args && !args.length) {
        //return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
        let reply = `You didn't provide any arguments, ${message.author}!`;

        if (command.usage) {
            reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``
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