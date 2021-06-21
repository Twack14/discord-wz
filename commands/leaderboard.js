const fetch = require('node-fetch');
const baseUrl = "http://localhost:3000"
const fullUrl = baseUrl + '/top10'
const Discord = require('discord.js');
module.exports = {
    name: 'leaderboard',
    description: 'Return the top 10 exp leaders',
    async execute(message, args) {

       const response = await fetch(fullUrl);
       const json = await response.json();
       console.log(json);

       const leaderEmbed = new Discord.MessageEmbed()
       leaderEmbed.setColor('#0099ff')
       leaderEmbed.setTitle(':trophy: Our Top 10 Points Leaders! :trophy:')

       for (i = 0; i < json.length; i++) {
           leaderEmbed.addField(`${i + 1}.) ${json[i].user_name}`, `${json[i].exp_points} xp` );
       }
       
       return message.channel.send( leaderEmbed )

    },
};