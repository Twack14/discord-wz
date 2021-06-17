require('dotenv').config();
const config = require('./config.json');
const { prefix } = require('./config.json');
const Discord = require('discord.js');
const fs = require('fs');
const random = require('random');
const discord_client = new Discord.Client();
discord_client.commands = new Discord.Collection();
const clientObject = require('./db_objects/client')
const { Client } = require('pg');



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

    //Add points to the user database

    //function to add points to the user's database entry
    

    //add the points
    addPoints(message.author.tag);

    

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


//functions
async function addPoints(tag) {
    var randExp = random.int(15, 25)
    const db_client = new Client(clientObject.client)

    try {
        await db_client.connect();
        console.log('Connected Successfully')
        try {
            var points = await db_client.query(`select exp_points from discord_users WHERE user_name = $1`, [tag])
            var updatedPoints = points.rows[0].exp_points + randExp
            await db_client.query('update discord_users set exp_points = $1 where user_name = $2', [updatedPoints, tag])
        } catch (err) {
            console.log(err)
        }
    } catch (err) {
        console.log(err);
    } finally {
        await db_client.end();
        console.log('Successfully Disconnected')
    }

}