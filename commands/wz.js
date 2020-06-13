const API = require('call-of-duty-api')();
API.login(process.env.EMAIL, process.env.PASS).then().catch();

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
               return message.reply(`\nWZ stats for ${wzUsername}\nTotal wins: ${output.br.wins}\nTotal Kills: ${output.br.kills}\nTotal Deaths: ${output.br.deaths}\nKD Ratio: ${output.br.kdRatio}\nGames Played: ${output.br.gamesPlayed}`);

           }).catch((err) => {
               console.log(err);
           });

               
       } else if (args[1] === "psn") {
        let wzUsername = args[2]
        API.MWBattleData(wzUsername, API.platforms.psn).then((output) => {
            console.log(output);
            return message.reply(`\nWZ stats for ${wzUsername}\nTotal wins: ${output.br.wins}\nTotal Kills: ${output.br.kills}\nTotal Deaths: ${output.br.deaths}\nKD Ratio: ${output.br.kdRatio}\nGames Played: ${output.br.gamesPlayed}`);
            
        }).catch((err) => {
            console.log(err);
        });

            
    } else if (args[1] === "xbl") {
        let wzUsername = args[2]
        API.MWBattleData(wzUsername, API.platforms.xbl).then((output) => {
            console.log(output);
            return message.reply(`\nWZ stats for ${wzUsername}\nTotal wins: ${output.br.wins}\nTotal Kills: ${output.br.kills}\nTotal Deaths: ${output.br.deaths}\nKD Ratio: ${output.br.kdRatio}\nGames Played: ${output.br.gamesPlayed}`);
            
        }).catch((err) => {
            console.log(err);
        });

            
    } else if (args[1] === "steam") {
        let wzUsername = args[2]
        API.MWBattleData(wzUsername, API.platforms.steam).then((output) => {
            console.log(output);
            return message.reply(`\nWZ stats for ${wzUsername}\nTotal wins: ${output.br.wins}\nTotal Kills: ${output.br.kills}\nTotal Deaths: ${output.br.deaths}\nKD Ratio: ${output.br.kdRatio}\nGames Played: ${output.br.gamesPlayed}`);
            
        }).catch((err) => {
            console.log(err);
        });

            
    } else if (args[1] === "acti") {
        let wzUsername = args[2]
        API.MWBattleData(wzUsername, API.platforms.uno).then((output) => {
            console.log(output);  
            return message.reply(`\nWZ stats for ${wzUsername}\nTotal wins: ${output.br.wins}\nTotal Kills: ${output.br.kills}\nTotal Deaths: ${output.br.deaths}\nKD Ratio: ${output.br.kdRatio}\nGames Played: ${output.br.gamesPlayed}`);
        }).catch((err) => {
            console.log(err);
        });
            
    }
    },
};