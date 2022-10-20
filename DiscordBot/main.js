const { Discord, Client, Events, IntentsBitField, Partials } = require('discord.js');
const WOK = require("wokcommands");
const path = require("path");
const { token } = require('./utils/config.json');
const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.DirectMessages,
        IntentsBitField.Flags.MessageContent,
    ],
    partials: [Partials.Channel],
});

client.on("ready", () => {
    new WOK({
    client,

    commandsDir: path.join(__dirname, "commands"),
    events: {
        dir: path.join(__dirname, "events"),
        },

    mongoUri: process.env.MONGO_URI || '',

    testServers: ["991093083007483926"],

    botOwners: ["299791979514953728"],

    disabledDefaultCommands: [
        // "channelcommand",
        // "customcommand",
        // "delcustomcommand",
        // "prefix",
        // "requiredpermissions",
        // "requiredroles",
        // "togglecommand",
    ],
    cooldownConfig: {
        errorMessage: "`[IE_INFO] this command is currently on cooldown, please wait {TIME}`",
            botOwnersBypass: false,
                dbRequired: 300,
        },

    // Dynamic validations
    validations: {
        syntax: path.join(__dirname, "validations", "syntax"),
            runtime: path.join(__dirname, "validations", "runtime"),
    }
    });
	console.log(`Ready! Logged in as ${c.user.tag}`);
});

client.login(token);