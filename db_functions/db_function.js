const { Client } = require('pg');
const clientObject = require('../db_objects/client')
const fetch = require('node-fetch');
const axios = require('axios');
const baseUrl = "http://localhost:3000"
const random = require('random');
const Discord = require('discord.js');
const discord_client = new Discord.Client();
const { levelUp } = require('../embeds/levelUp')


//function that adds xp points per message, checks for a level change, and updates user when they level up
//if user does not exit, the json variable will return [], therefore the user doesn't exist, in the database
async function updatePointsLevelUp(tag, message) {
    var randExp = random.int(15, 25);
    var tag = encodeURIComponent(tag);
    var fullUrl = baseUrl + `/users/${tag}`
    const response = await fetch(fullUrl);
    const json = await response.json();
    if (json.length === 0) {
        return console.log(`${tag} does not exist in the database.`)
    }
    var currentLevel = await json[0].current_level;
    var currentPoints = json[0].exp_points;
    var username = json[0].discord_id;
    
    var newPoints = currentPoints + randExp;

    var newLevel = Math.floor(0.1 * Math.sqrt(newPoints));

    console.log(`Points before update: ${currentPoints}`);

    axios.put(fullUrl, `exp_points=${newPoints}`)

    console.log(`Points after update ${newPoints}\n`)

    levelUp.title = `Level Up!`
    levelUp.fields[0].value = `<@${username}>`
    levelUp.fields[1].value = `**${newLevel}**`
    levelUp.fields[2].value = `${newPoints}`

    if (newLevel > currentLevel) {
        return message.reply({embed: levelUp});
    }

}





module.exports = {
    updatePointsLevelUp
}