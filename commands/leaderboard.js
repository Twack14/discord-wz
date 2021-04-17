//const { points } = require("../enmap.js");
const db = require("../enmap.js");
const Discord = require("discord.js");

module.exports = {
    name: 'leaderboard',
    description: 'retrieves top 10 points leaders',
    execute(message, args) {
        // Get a filtered list (for this guild only), and convert to an array.
        const filtered = db.points.filter(p => p.guild === message.guild.id).array();

        //Sort array to get the top results
        const sorted = filtered.sort((a, b) => b.points - a.points);
        //Slice array to get top 10
        const top10 = sorted.splice(0, 10);

        //Show results as embedded object
        //var trophyIcon = message.guild.iconURL();;
        const embed = new Discord.MessageEmbed()
            .setTitle("\:trophy: Leaderboard \:trophy:")
            .setDescription("Our top 10 points leaders!")
            .setColor(0x00AE86);
        for (const data of top10) {
            try {
                embed.addField(`:star: @${data.username}`, `${data.points} points (level ${data.level})`)
            } catch {
                embed.addField(`:star: @${data.username}`, `${data.points} points (level ${data.level})`);
            }

        }

        return message.channel.send({ embed });
    }

}
