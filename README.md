# Bot le chat
A chatbot for discord, made with the `api.affiliateplus.com` API.
You can invite it or host it yourself. (see below)

## [Invite link](https://discord.com/api/oauth2/authorize?client_id=962877894911201321&permissions=274877913088&scope=bot)

Permissions needed:
|Permission name| Use TTS perm | Send Messages in threads | Send Messages | Know your IP |
|---|---|---|---|---|
|Optional|Yes|Yes|Yes if you don't want to use the bot| No unless I tell you otherwise \[jk] |
|Description | Enable to see a *amusing* and *interesting* effect | Quite obselete but I know some people still use threads | If you don't want to use a bot and just want more members in your server, disable it | Use it so I can DDoS you |

## Host it yourself

### Prerequisites

Latest versions of [`Node.js`](https://nodejs.org) and [`npm`](https://npmjs.org)(installed with Node.js)

### Setup

Clone the repo

Run `npm i`

Go to discord dev portal and get a bot token

**Allow the message priviliged intent in the Bot settings**

Create file `.env` and put in `TOKEN=[token here]`

Add discord bot to your server

Tada! Your bot is all set. Run `node index` to start it up

### Project Structure
### Config

`defaultConfig.json` - refer to [the API's docs](https://api.affiliateplus.xyz/api/docs/chatbot)

`.env` - insert bot token