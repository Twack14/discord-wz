const API = require('call-of-duty-api')();
API.login(process.env.EMAIL, process.env.PASS).then().catch();
const embed = require('../embed');
const { exampleEmbed } = require('../embed');

module.exports = {
    name: 'wz',
    description: 'Provide the user with their Warzone stats',
    args: true,
    usage: 'stats <platform> <your Warzone username>',
    platforms: 'PC: battle\nSteam: steam\nXbox: xbl\nPlaystation: psn\nActivison ID: acti',
    execute(message, args) {
        if (args.length !== 3) {
            return message.reply(`You didn't provide the correct number of arguments, ${message.author}!\nThe proper usage would be: \`!${this.name} ${this.usage}\`\nHere are the list of platforms to use:\n${this.platforms}`);



            //====PC/BATTLE USERS====
        } else if (args[1] === "battle") {
            let wzUsername = args[2]
            API.MWBattleData(wzUsername, API.platforms.battle).then((output) => {
                console.log(output);
                fillFields(wzUsername, output.br.wins, output.br.kills, output.br.deaths, output.br.downs, output.br.kdRatio, output.br.topTwentyFive, output.br.topTen, output.br.topFive, output.br.gamesPlayed);
                return message.channel.send({ embed: exampleEmbed });

            }).catch((err) => {
                console.log(err);
            });


        } else if (args[1] === "psn") {
            let wzUsername = args[2]
            API.MWBattleData(wzUsername, API.platforms.psn).then((output) => {
                console.log(output);
                fillFields(wzUsername, output.br.wins, output.br.kills, output.br.deaths, output.br.downs, output.br.kdRatio, output.br.topTwentyFive, output.br.topTen, output.br.topFive, output.br.gamesPlayed);
                return message.channel.send({ embed: exampleEmbed });
            }).catch((err) => {
                console.log(err);
            });


        } else if (args[1] === "xbl") {
            let wzUsername = args[2]
            API.MWBattleData(wzUsername, API.platforms.xbl).then((output) => {
                console.log(output);
                fillFields(wzUsername, output.br.wins, output.br.kills, output.br.deaths, output.br.downs, output.br.kdRatio, output.br.topTwentyFive, output.br.topTen, output.br.topFive, output.br.gamesPlayed);
                return message.channel.send({ embed: exampleEmbed });
            }).catch((err) => {
                console.log(err);
            });


        } else if (args[1] === "steam") {
            let wzUsername = args[2]
            API.MWBattleData(wzUsername, API.platforms.steam).then((output) => {
                console.log(output);
                fillFields(wzUsername, output.br.wins, output.br.kills, output.br.deaths, output.br.downs, output.br.kdRatio, output.br.topTwentyFive, output.br.topTen, output.br.topFive, output.br.gamesPlayed);
                return message.channel.send({ embed: exampleEmbed });
            }).catch((err) => {
                console.log(err);
            });


        } else if (args[1] === "acti") {
            let wzUsername = args[2]
            API.MWBattleData(wzUsername, API.platforms.uno).then((output) => {
                console.log(output);
                fillFields(wzUsername, output.br.wins, output.br.kills, output.br.deaths, output.br.downs, output.br.kdRatio, output.br.topTwentyFive, output.br.topTen, output.br.topFive, output.br.gamesPlayed);
                return message.channel.send({ embed: exampleEmbed });
            }).catch((err) => {
                console.log(err);
            });

        }
    },
};

//function that takes the output and adds it to the embed field.
fillFields = (user, wins, kills, deaths, dwns, kdRat, topTf, topTen, topFv, amtPlayed) => {
    let KDR = kdRat;
    KDR = KDR.toFixed(2);
    kpg = kills / amtPlayed;
    kpg = kpg.toFixed(2);
    exampleEmbed.title = `Warzone stats for ${user}`;
    exampleEmbed.fields[0].value = wins;
    exampleEmbed.fields[1].value = kills;
    exampleEmbed.fields[2].value = deaths;
    exampleEmbed.fields[3].value = dwns;
    exampleEmbed.fields[4].value = KDR;
    exampleEmbed.fields[5].value = topTf;
    exampleEmbed.fields[6].value = topTen;
    exampleEmbed.fields[7].value = topFv;
    exampleEmbed.fields[8].value = amtPlayed;
    exampleEmbed.fields[9].value = kpg;
}