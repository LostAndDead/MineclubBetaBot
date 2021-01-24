const Discord = require("discord.js");
module.exports.run = async(bot, message, args) => {
    let num = Math.floor(Math.random() * 11);
    message.channel.send(`Your dick is:\n8${"="*num}D`)
};

module.exports.help = {
    name: "dick"
};
