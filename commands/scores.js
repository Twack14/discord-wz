const fetch = require('node-fetch');
const baseUrl = "https://api.competitionsuite.com/2018-03/performances"

module.exports = {
    name: 'scores',
    description: 'This command displays a random cat fact',
    //args: true,
    execute(message, args) {
            (async () => {
                const response = await fetch(baseUrl);
                const json = await response.json();
                console.log(json)
            })();  
    }
}