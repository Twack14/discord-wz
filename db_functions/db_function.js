const { Client } = require('pg');
const clientObject = require('../db_objects/client')
const fetch = require('node-fetch');
const axios = require('axios');
const baseUrl = "http://localhost:3000"
const random = require('random');


async function levelUp(tag) {
    try {
        fullUrl = baseUrl + `/users/${tag}`
        const response = fetch(fullUrl)
        const json = response.json();
        var currentLevel = json[0].current_level
        var nextLevel = currentLevel + 1

        axios.put(fullUrl, `current_level=${nextLevel}`);
    } catch (err) {
        console.log(err);
    }


}

async function checkLevel(tag) {
    try {
        var tag = encodeURIComponent(tag);
        fullUrl = baseUrl + `/users/${tag}`
        const response = await fetch(fullUrl);
        const json = await response.json();
        var currentLevel = json[0].current_level;
        return currentLevel
    } catch (err) {
        console.log(err);
    }
}

async function checkPoints(tag) {
    try {
        var tag = encodeURIComponent(tag);
        fullUrl = baseUrl + `/users/${tag}`
        const response = await fetch(fullUrl);
        const json = await response.json();
        var currentPoints = json[0].exp_points;
        console.log(`User has ${currentPoints} before update.`)
        return currentPoints;
    } catch (err) {
        console.log(err);
    }

}

async function updatePoints(tag) {
    try {
        var randExp = random.int(15, 25)
        var tag = encodeURIComponent(tag);
        fullUrl = fullUrl = baseUrl + `/users/${tag}`
        const response = await fetch(fullUrl);
        const json = await response.json();
        var currentPoints = json[0].exp_points;
        var updatedPoints = randExp + currentPoints;

        console.log(`User now has ${updatedPoints} points`);

        axios.put(fullUrl, `exp_points=${updatedPoints}`);

    } catch (err) {

    }
}


async function getPoints(tag) {
    return await checkPoints(tag);
}

async function getLevel(tag) {
    return await checkLevel(tag);
    
}

module.exports = {
    levelUp,
    checkLevel,
    getLevel,
    checkPoints,
    getPoints,
    updatePoints
}