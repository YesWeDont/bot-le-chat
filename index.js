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
// debug
startTimestamp = Date.now();

// Init client presence + change presence every 10 mins
client.on('ready', ()=>{
    presences();
    setInterval(presences, 10*60*1000);
    console.log('Bot ready in %d ms', Date.now() - startTimestamp);
});

// Call the API whenever recieved message
client.on('messageCreate', async message=>{
    if(message.author.bot) return;
    let tunnel = await fetch(endpoint(
        // TODO: Ping sanitization
        message.content
        // Emoji sanitization
        .replace(/\<\:([\w\d_]{2,}:\d+)\>/, ":$1:")
    ));

    let result = await tunnel.json();
    
    if(result.error) message.reply('Error occured')
    else if(result.message) message.reply({
        content:result.message,
        // TTS Messages: give people a shock once a while
        tts:(message.channel.permissionsFor ? message.channel.permissionsFor(client.user).has(djs.Permissions.FLAGS.SEND_TTS_MESSAGES) : true) && Math.random() < 0.1,
        failIfNotExists:false
    });
});

// Login into Discord
client.login(process.env.TOKEN);

// Helper function to include the chatbot's config into querystring parameters of API request
function endpoint(message){
    return `https://api.affiliateplus.xyz/api/chatbot?${new URLSearchParams({
        message: encodeURIComponent(message),
        ...conf
    }).toString()}`;
}

// Set presence info. Runs every 10 minutes.
function presences(){
    let data = require("./presences.json");
    client.user.setPresence(data[Math.floor(Math.random()*data.length)])
}

console.log("Script running since t=%d", startTimestamp)