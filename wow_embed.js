module.exports = {
    wowEmbed: {
        color: 0x0099ff,
        title: '',
        author: {
            name: 'Mythic+ Best Weekly Run',
            icon_url: 'https://static.wikia.nocookie.net/wowwiki/images/e/ee/WoW_Companion_App_icon-Google_Play.png/revision/latest/scale-to-width-down/350?cb=20180815210611',
            url: 'https://github.com/Twack14/discord-wz',
        },
        thumbnail: {
            url: '',
        },
        fields: [
            {
                name: 'Dungeon',
                value: ''
            },
            {
                name: 'Run Time',
                value: 0,
                inline: true,
            },
            {
                name: 'Mythic+ Level',
                value: 0,
                inline: true,
            },
            {
                name: 'Completed Within Timeframe?',
                value: 0,
                inline: true,
            },
            {
                name: 'Dungeon Affixes',
                value: '',
                inline: true,
            },
            {
                name: 'Dungeon Members',
                value: '',
                inline: true,
            },
            {
                name: '\u200b',
                value: '\u200b',
                inline: false,
            }
        ],
        /*image: {
            url: 'https://i.imgur.com/yDpdvSh.jpg',
        },*/
        timestamp: new Date(),
        footer: {
            text: 'Bot Created by Taylor Womack',
            icon_url: 'https://i.imgur.com/o95RO6a.jpg',
        },
    }
}