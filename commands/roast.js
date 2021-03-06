const fetch = require('node-fetch');
const { Channel } = require('discord.js');
const baseUrl = "https://evilinsult.com"

module.exports = {
    name: 'roast',
    description: 'This command displays a random insult',
    args: true,
    usage: '<@username>',
    execute(message, args) {
        if (args.length !== 1) {
        return message.reply(`You didn't provide the correct number of arguments, ${message.author}!\nThe proper usage would be: \`!${this.name} ${this.usage}`);
        }

        else {

            (async () => {
                const response = await fetch(baseUrl + "/generate_insult.php?lang=en&type=json");
                const json = await response.json();
                var insult = json.insult;
                var username = args[0];
                if (!username.includes('@')) {
                    return message.reply(`Oops! You didn't specify a user! Make sure that you "@" them! Use \`!${this.name} ${this.usage}\``);
                }
                if (insult.includes('&quot;')) {
                    insult = insult.replace(/&quot;/g, '"');
                }

                if (insult.includes('&amp;')) {
                    insult = insult.replace(/&amp;/g, "&");
                }
                console.log(insult);
                return message.channel.send(username + " " + insult);
            })();  
        }
    }
};