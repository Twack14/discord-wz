
const Discord = require("discord.js");
const axios = require('axios');
const fetch = require('node-fetch');
const baseUrl = "http://localhost:3000"
const dbf = require('../db_functions/db_function')
const { levelUp } = require('../embeds/levelUp')

module.exports = {
    name: 'give',
    description: 'gifts a specified user points',
    args: true,
    usage: "<@username> <# of points>",
    execute(message, args) {
        //var id = message.author.tag
        //id = encodeURIComponent(id);
        (async () => {
            try {
                //checks if user giving command is guild owner OR a moderator
                if ((message.author.id === message.guild.ownerID) || (message.member.roles.cache.some(role => role.name === 'Moderator') === true)) {

                    //check that the first argument actually mentions a user
                    const user = message.mentions.users.first() || db.points.get(args[0]);
                    if (!user) {
                        return message.reply(`You must mention someone or give their ID! \nUse: \`!${this.name} ${this.usage}\``);
                    }


                    if (args[1].includes(",")) {
                        args[1] = args[1].replace(/,/g, '');
                    }
                    //takes second argument which determines amount of points to give specified user
                    const pointsToAdd = parseInt(args[1], 10)

                    //can't give negative points
                    if (pointsToAdd < 0) {
                        return message.reply(`You can only gift a positive amount of points`);
                    }

                    //can't give more than 1,000 points at a time
                    if (pointsToAdd > 1000) {
                        return message.reply(`You can only gift up to 1,000 points!`)
                    }

                    //if user forgets to add points to the command, send reminder
                    if (!pointsToAdd) {
                        return message.reply(`You didn't tell me how many points to give. \nUse: \`!${this.name} ${this.usage}\``)
                    }

                    const tag = `${user.username}` + `%23` + `${user.discriminator}`
                    //console.log(user)
                    console.log(tag);

                    //fetch the current points of the user
                    const response = await fetch(baseUrl + `/users/${tag}`);
                    const json = await response.json();
                    var currentPoints = json[0].exp_points;
                    var currentLevel = await json[0].current_level;
                    var username = json[0].discord_id

                    console.log(currentLevel);

                    //add the new points to the currentPoints
                    var newPoints = currentPoints + pointsToAdd;
                    var newLevel = Math.floor(0.1 * Math.sqrt(newPoints));
                    console.log(newLevel)
                    var fullUrl = baseUrl + `/users/${tag}`
                    //update the user's points with the new points
                    axios.put(fullUrl, `exp_points=${newPoints}`);

                    levelUp.title = `Level Up!`
                    levelUp.fields[0].value = `<@${username}>`
                    levelUp.fields[1].value = `**${newLevel}**`
                    levelUp.fields[2].value = `${newPoints}`

                    if (newLevel > currentLevel) {
                        return message.channel.send({embed: levelUp});
                    }



                }
            } catch (err) {
                console.log(err);
            }
        })();

    }
}