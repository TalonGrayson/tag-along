// Require the necessary discord.js classes
const { Client, Intents } = require("discord.js");
const token = process.env.DISCORD_TOKEN;

// Create a new client instance
const client = new Client({ fetchAllMembers: true, intents: [Intents.FLAGS.GUILDS] });

// When the client is ready, run this code (only once)
client.once('ready', () => {
	console.log('Discord bot is connected.');	
});

// Login to Discord with your client's token
client.login(token);

module.exports.client = client;