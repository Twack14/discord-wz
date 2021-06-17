const fetch = require('node-fetch');
const blizzard = require('blizzard.js')
const embed = require('../wow_embed');
const { wowEmbed } = require('../wow_embed');



module.exports = {
  name: 'wow',
  description: "this command shows a player's best Mythic+ Run of the Week",
  usage: "<realm name> <character name>",
  args: true,
  execute(message, args) {
    if (args.length !== 2) {
      return message.reply(`You didn't provide the correct number of arguments, ${message.author}!\nThe proper usage would be: \`!${this.name} ${this.usage}`);
    }

    var realm = args[0].toLowerCase();
    var name = args[1].toLowerCase();

    (async () => {
      const wowClient = await blizzard.wow.createInstance({
        key: process.env.BLIZZARD_CLIENT_ID,
        secret: process.env.BLIZZARD_CLIENT_SECRET,
        origin: 'us', // optional
        locale: 'en_US' // optional
      });


     
        const response = wowClient.characterMythicKeystone({ realm: realm, name: name })
        response.then(function (result) {

          const avatar = wowClient.characterMedia({ realm: realm, name: name })
          avatar.then(function (media) {

            var characterAvatar = media.data.assets[0].value


            var mythicArray = result.data.current_period.best_runs

            for (i = 0; i < mythicArray.length; i++) {
              if (mythicArray[i].is_completed_within_time === false) {
                mythicArray.splice(i, 1)
              }
            }

            var maxKeystoneRun = getMax(mythicArray, "keystone_level")

            //console.log(maxKeystoneRun.members[0].character.realm)

            var teamNames = []
            for (i = 0; i < maxKeystoneRun.members.length; i++) {
              teamNames[i] = { name: maxKeystoneRun.members[i].character.name, realm: maxKeystoneRun.members[i].character.realm.slug, item_level: maxKeystoneRun.members[i].equipped_item_level }
            }

            var affixNames = []
            for (i = 0; i < maxKeystoneRun.keystone_affixes.length; i++) {
              affixNames[i] = maxKeystoneRun.keystone_affixes[i].name
            }


            var runTime = millisToMinutesAndSeconds(maxKeystoneRun.duration)
            var withinTimeLimitIndicator
            if (maxKeystoneRun.is_completed_within_time === true) {
              withinTimeLimitIndicator = "Yes"
            } else {
              withinTimeLimitIndicator = "No"
            }


            wowEmbed.title = `Best Mythic+ Run of the Week for ${args[1]}`;
            wowEmbed.thumbnail.url = characterAvatar
            wowEmbed.fields[0].value = maxKeystoneRun.dungeon.name;
            wowEmbed.fields[1].value = runTime;
            wowEmbed.fields[2].value = maxKeystoneRun.keystone_level;
            wowEmbed.fields[3].value = withinTimeLimitIndicator;
            wowEmbed.fields[4].value = affixNames;
            wowEmbed.fields[5].value = `${teamNames[0].name}-${teamNames[0].realm} iLVL: ${teamNames[0].item_level}\n${teamNames[1].name}-${teamNames[1].realm} iLVL: ${teamNames[1].item_level}\n${teamNames[2].name}-${teamNames[2].realm} iLVL: ${teamNames[2].item_level}\n${teamNames[3].name}-${teamNames[3].realm} iLVL: ${teamNames[3].item_level}\n${teamNames[4].name}-${teamNames[4].realm} iLVL: ${teamNames[4].item_level}\n`;


            return message.channel.send({ embed: wowEmbed });

          })
        })


      //return message.channel.send(response);
    })();
  },
};

function millisToMinutesAndSeconds(millis) {
  var minutes = Math.floor(millis / 60000);
  var seconds = ((millis % 60000) / 1000).toFixed(0);
  return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}

function getMax(arr, prop) {
  var max;
  for (var i = 0; i < arr.length; i++) {
    if (max == null || parseInt(arr[i][prop]) > parseInt(max[prop]))
      max = arr[i];
  }
  return max;
}