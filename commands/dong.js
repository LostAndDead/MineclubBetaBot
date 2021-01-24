const Discord = require("discord.js");

module.exports.run = async(bot, message, args) => {
    let num = Math.floor(Math.random() * 11);
    let shlong = ""
    while (num > 0){
        shlong += "=";
        num--;
    }
    message.channel.send(`Your dick is:\n8${shlong}D`)
};

module.exports.help = {
    name: "dick"
};
