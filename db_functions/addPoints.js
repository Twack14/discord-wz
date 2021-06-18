const random = require('random');
const { Client } = require('pg');
const clientObject = require('../db_objects/client')

async function addPoints(tag) {
    var randExp = random.int(15, 25)
    const db_client = new Client(clientObject.client)

    try {
        await db_client.connect();
        console.log('Connected Successfully')
        try {
            var points = await db_client.query(`select exp_points from discord_users WHERE user_name = $1`, [tag])
            var updatedPoints = points.rows[0].exp_points + randExp
            await db_client.query('update discord_users set exp_points = $1 where user_name = $2', [updatedPoints, tag])
            console.log(`Added ${randExp} points to ${tag}`)
        } catch (err) {
            console.log(err)
        }
    } catch (err) {
        console.log(err);
    } finally {
        await db_client.end();
        console.log('Successfully Disconnected')
    }

}

module.exports = {
    addPoints
}