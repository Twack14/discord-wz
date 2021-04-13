const fetch = require('node-fetch');
const { Channel } = require('discord.js');
const baseUrl = "https://evilinsult.com"

module.exports = {
    name: 'roastme',
    description: 'This command displays a random insult',
    execute(message, args) {
       
            (async () => {
                const response = await fetch(baseUrl + "/generate_insult.php?lang=en&type=json");
                const json = await response.json();
                var insult = json.insult;
                console.log(insult);
                return message.channel.send(`${message.author}`+ " " + insult);
            })();  
    }
};