module.exports = {
    exampleEmbed: {
        color: 0x0099ff,
        title: '',
        author: {
            name: 'Warzone Stats Bot',
            icon_url: 'https://i.imgur.com/yDpdvSh.jpg',
            url: 'https://github.com/Twack14/discord-wz',
        },
        description: 'Check your stats below',
        thumbnail: {
            url: 'https://i.imgur.com/o95RO6a.jpg',
        },
        fields: [
            {
                name: 'Total Wins',
                value: 0,
            },
            {
                name: 'Total Kills',
                value: 0,
                inline: true,
            },
            {
                name: 'Total Deaths',
                value: 0,
                inline: true,
            },
            {
                name: 'K/D Ratio',
                value: 0,
                inline: true,
            },
            {
                name: 'Games Played',
                value: 0,
            },
            {
                name: '\u200b',
                value: '\u200b',
                inline: false,
            }
        ],
        image: {
            url: 'https://i.imgur.com/yDpdvSh.jpg',
        },
        timestamp: new Date(),
        footer: {
            text: 'Bot Created by Taylor Womack',
            icon_url: 'https://i.imgur.com/yDpdvSh.jpg',
        },
    }
}