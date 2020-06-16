const fetch = require('node-fetch');
const { Channel } = require('discord.js');
const baseUrl = "https://cat-fact.herokuapp.com"

module.exports = {
    name: 'catfact',
    description: 'This command displays a random cat fact',
    execute(message, args) {
       
            (async () => {
                const response = await fetch(baseUrl + "/facts/random?animal_type=cat&amount=1");
                const json = await response.json();
                var catFact = json.text;
                console.log(catFact);
                return message.channel.send(catFact);
            })();  
    }
};