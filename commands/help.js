const Discord = require("discord.js");
const fs = require("fs");
const yaml = require('js-yaml');

let Config = null;

try {
    let fileContents = fs.readFileSync('./config.yml', 'utf8');
    Config = yaml.load(fileContents);
}
catch (e) {
    console.log(e);
}

module.exports.run = async(bot, message, args) => {
    let embed = new Discord.MessageEmbed()
    .setTitle("Help")
    .setDescription(
    `
    **Prefix** \`${Config.Setup.Prefix}\`
    *If you ever see* \`&\` *being used as a prefix then its a dev version*
    `)
    .addField("Commands", 
    `
    ${Config.Setup.Prefix}ping -> Pong :ping_pong:
    ${Config.Setup.Prefix}status -> Get the status and player count of the Mineclub server
    ${Config.Setup.Prefix}dick -> You wanna see how big it is ;)
    ${Config.Setup.Prefix}mineclub -> Get a link to the Mineclub Discord and website
    ${Config.Setup.Prefix}howgay -> Well how gay is it?
    `)
    message.channel.send(embed)
};

module.exports.help = {
    name: "help"
};
