function endpoint(message, name, user){return `https://api.affiliateplus.xyz/api/chatbot?message=${encodeURIComponent(message)}`};
require('dotenv').config();
const djs = new require('discord.js'),
client = new djs.Client({intents:[djs.Intents.FLAGS.GUILDS, djs.Intents.FLAGS.GUILD_MESSAGES]}),
fetch = require('node-fetch');
client.on('ready', ()=>console.log('ready'))
client.on('messageCreate', async message=>{
    if(message.author.bot) return;
    let tunnel = await fetch(endpoint(message.content));
    let result = await tunnel.json();
    if(result.error) message.reply('Error occured')
    else message.reply(result.message)
})
client.login(process.env.TOKEN)