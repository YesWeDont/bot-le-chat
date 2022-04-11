# Bot le chat
A chatbot for discord, made with the `api.affiliateplus.com` API
You can invite it or host it yourself (see below)

## [Invite link](https://discord.com/api/oauth2/authorize?client_id=962877894911201321&permissions=274877913088&scope=bot)
"Use TTS" permission is OPTIONAL...

**...but the rest aren't**

## Host it yourself

### Prerequisites

Latest versions of [`Node.js`](https://nodejs.org) and [`npm`](https://npmjs.org)(installed with Node.js)

### Setup

Clone the repo

`npm i`

Go to discord dev portal and get a bot token

**Allow the message priviliged intent in the Bot settings**

Create file `.env` and put in `TOKEN=[token here]`

Add discord bot to your server

RUN `node index`

Tada!


### Config

`defaultConfig.json` - refer to [the API's docs](https://api.affiliateplus.xyz/api/docs/chatbot)

`.env` - insert bot token there