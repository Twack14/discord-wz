const Enmap = require("enmap");


module.exports = {
    settings: new Enmap({
        name: "settings",
        autoFetch: true,
        fetchAll: false
    }),
    points: new Enmap("points", {
        user: "",
        guild: "",
        points: 0,
        level: 0,
        username: ""
    })
}