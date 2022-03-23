// Require the necessary discord.js classes
const { Client, Intents } = require("discord.js");
const token = process.env.DISCORD_TOKEN;

// Create a new client instance
const client = new Client({ fetchAllMembers: true, intents: [Intents.FLAGS.GUILDS] });
// let member;

// When the client is ready, run this code (only once)
client.once('ready', () => {
	console.log('Firebeard is connected.');
	// const guild = client.guilds.cache.get(process.env.DISCORD_SERVER_ID);
	// guild.members.fetch(process.env.USER_DISCORD_ID)
	// .then(data => {
	// 	member = data;
	// });
	
});

// Login to Discord with your client's token
client.login(token);

module.exports.client = client;