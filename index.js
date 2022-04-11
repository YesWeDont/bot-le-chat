// @ts-check

// Configure .env file
require('dotenv').config();
// DiscordJS: import a client that only cares about server + dm messages
const djs = require('discord.js'),
client = new djs.Client({intents:[djs.Intents.FLAGS.DIRECT_MESSAGES, djs.Intents.FLAGS.GUILD_MESSAGES]}),
// fetch() API polyfill
fetch = require('node-fetch'),
{URLSearchParams} = require('url'),
// config data for chatbot, eg name, age etc
conf = require('./defaultConfig.json'),
startTimestamp = Date.now();

// initialise client
client.on('ready', ()=>{
    client.user.setPresence({
        activities: [{
            name: 'the chat',
            type:'WATCHING',
            url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
        }],
        status: 'online'
    })
    console.log('Bot ready in %d ms', Date.now() - startTimestamp);
});

//When recieved message
client.on('messageCreate', async message=>{
    if(message.author.bot) return;
    let tunnel = await fetch(endpoint(
        message.content
            .replace(/\<\:([\w\d_]{2,}:\d+)\>/, ":$1:")
    ));
    let result = await tunnel.json();
    if(result.error) message.reply('Error occured')
    else if(result.message) message.reply({
        content:result.message,
        tts:(message.channel.permissionsFor ? message.channel.permissionsFor(client.user).has(djs.Permissions.FLAGS.SEND_TTS_MESSAGES) : true) && Math.random() < 0.1,
        failIfNotExists:false
    })
})
client.login(process.env.TOKEN)
function endpoint(message){
    return `https://api.affiliateplus.xyz/api/chatbot?${new URLSearchParams({
        message: encodeURIComponent(message),
        ...conf
    }).toString()}`
};

console.log("Script running since t=%d", startTimestamp)