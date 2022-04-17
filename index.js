// Configure .env file
require('dotenv').config();
// DiscordJS: import a client that only cares about server + dm messages
const djs = require('discord.js'),
client = new djs.Client({intents:[djs.Intents.FLAGS.DIRECT_MESSAGES, djs.Intents.FLAGS.GUILD_MESSAGES, djs.Intents.FLAGS.GUILDS]}),
// represents "send tts messages" permission in Discord
sendTTSPerm = djs.Permissions.FLAGS.SEND_TTS_MESSAGES,
// fetch() API in NodeJS
fetch = require('node-fetch'),
{URLSearchParams} = require('url'),
// config data for chatbot, eg name, age etc
conf = require('./defaultConfig.json'),
// debug
startTimestamp = Date.now();

// Init client presence and change every 10 mins
client.on('ready', ()=>{
    presences();
    setInterval(presences, 10*60*1000);
    console.log('Bot ready in %d ms', Date.now() - startTimestamp);
    console.log("Acting as", client.user.tag)
});

// Call the API whenever recieved message
client.on('messageCreate', async message=>{
    try{
        if(message.author.bot) return;
        
        if(!message.content){
            if(message.attachments.size > 0) return message.reply("**I can't see images, I can only see the text ;c**")
            // How did they send this message?
            return;
        }

        let messageContent = await (
            // Ping sanitization
            replaceAsync(message.content, /<@(\d+)>/g, async (substr, id)=>{
                if(message.guild){
                    let username = (await message.guild.members.fetch(id))?.user?.username;
                    if(username) return `@${username}`
                }
                return "";
            })

            // Emoji sanitization
            .then(a=>a.replace(/\<\:([\w\d_]{2,}:\d+)\>/g, ":$1:"))
        );
        
        let tunnel = await fetch(endpoint(messageContent, message.author.id));
        let result = await tunnel.json();

        // Reply the response to chat
        if(result.error) console.dir(result);
        else if(result.message) message.reply({
            content:result.message,
            // TTS Messages: give people a shock once a while
            tts:(message.channel.permissionsFor ? message.channel.permissionsFor(client.user).has(sendTTSPerm) : true) && Math.random() < 0.1,
            failIfNotExists:false
        });
    }catch(e){
        // error handling
        console.dir(e)
    }
});

// Login into Discord
client.login(process.env.TOKEN);

// Helper function to include the chatbot's config into querystring parameters of API request
function endpoint(message, id){
    return `https://api.affiliateplus.xyz/api/chatbot?${new URLSearchParams({
        message: message.replace(/\#\?\%/g, encodeURIComponent),
        user:id,
        ...conf
    }).toString()}`;
}

// Set presence info. Runs every 10 minutes.
function presences(){
    let data = require("./presences.json");
    client.user.setPresence(data[Math.floor(Math.random()*data.length)])
}

// https://stackoverflow.com/questions/33631041/javascript-async-await-in-replace
async function replaceAsync(str, regex, asyncFn) {
    const promises = [];
    str.replace(regex, (match, ...args) => {
        const promise = asyncFn(match, ...args);
        promises.push(promise);
    });
    const data = await Promise.all(promises);
    return str.replace(regex, () => data.shift());
}

console.log("Script running since t=%d", startTimestamp)
