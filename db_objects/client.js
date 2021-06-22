const fs = require('fs')

module.exports = {
    client: {
        host: process.env.HOST,
        port: process.env.DB_PORT,
        database: process.env.DATABASE,
        user: process.env.USER,
        password: process.env.DB_PASS,
        ssl: {
            ca: fs.readFileSync(process.env.CA)
        }
    }
}