const fetch = require('node-fetch');
const { Channel } = require('discord.js');
const baseUrl = "http://localhost:3000"

module.exports = {
	name: 'exp',
	description: 'Gets the information of the user',
	execute(message, args) {
        var id = message.author.tag
        id = encodeURIComponent(id);
        (async () => {
            const response = await fetch(baseUrl + `/users/${id}`);
            const json = await response.json();
            //console.log(json);
            var user = json[0].exp_points;
            console.log(user);
            return message.channel.send(`You have **${user}** experience points!`);
        })();  
	},
};