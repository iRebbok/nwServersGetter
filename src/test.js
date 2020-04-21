/**
 * This script just tests the main function and serves as a usage example.
 * 04/20/2020 iRebbok#2429
 */


const func = require('./func');
/*
const tagRegex = /<[^>]*?>/g;
const spacesRegex = /\s+/g;
*/

func().then(servers => {

    const randomServer = servers[Math.floor(Math.random() * servers.length)];
    console.log(`Info = ${randomServer.info}`);
    console.log(`Players = ${randomServer.players}`);
    console.log(`IP = ${randomServer.ip}`);
    console.log(`Port = ${randomServer.port}`);
    console.log(`Version = ${randomServer.version}`);

});

/*
(async () => {
    const servers = await func();

    const randomServer = servers[Math.floor(Math.random() * servers.length)];
    console.log(`Info = ${randomServer.info}`);
    console.log(`Players = ${randomServer.players}`);
    console.log(`IP = ${randomServer.ip}`);
    console.log(`Port = ${randomServer.port}`);
    console.log(`Version = ${randomServer.version}`);
})()
*/