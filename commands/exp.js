const { points } = require("../enmap.js");
const db = require("../enmap.js");
module.exports = {
	name: 'exp',
	description: 'retrieves current xp points for user',
	execute(message, args) {
            const key = `${message.guild.id}-${message.author.id}`;
            var nextLevel = db.points.get(key, "level") + 1;
            var num = nextLevel / 0.1;
            var totalPtsNeeded = Math.pow(num, 2);
            var ptsNeededForNextLevel = totalPtsNeeded - db.points.get(key, "points");
            return message.channel.send(`You currently have **${db.points.get(key, "points")}** points, and are level **${db.points.get(key, "level")}**!\nYou need **${ptsNeededForNextLevel}** more points to reach level **${nextLevel}**!`);          
        }
        
}