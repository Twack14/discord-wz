const { Client } = require('pg');
const clientObject = require('../db_objects/client')
var uniqid = require('uniqid');
const fs = require('fs');



module.exports = {
    name: 'register',
    description: 'registers a discord user to the database',
    async execute(message, args) {

        const client = new Client(clientObject.client)

        try {

            var id = uniqid();

            await client.connect()
            console.log('Connected successfully')

            try {

                var username = await client.query(`select user_name from discord_users WHERE user_name = $1`, [message.author.tag])

                //console.log(username);
                if (username.rowCount === 1) {
                     return message.reply('You are already registered in the database!')
                 }

            } catch (err) {
                console.log(err)
            }

            try {
                await client.query('insert into discord_users(ID, user_name, exp_points, discord_id) values($1, $2, $3, $4)', [id, message.author.tag, 100, message.author.id])
                const results = await client.query('select * from discord_users where user_name = $1', [message.author.tag])
                console.log(results)
                return message.reply(`You were successfully registered to the database! You are now level **${results.rows[0].current_level}**`)

            } catch (err) {
                console.log(err)
                return message.reply('You were not registered to the database. Ask admin for details and to report the issue.')
            }

        }
        catch (err) {
            console.log(err)
        }
        finally {
            await client.end()
            console.log('Successfully disconnected')
        }
    }
}