const Discord = require("discord.js");

module.exports.run = async(bot, message, args) => {
    var on = "▰"
    var off = "▱"

    var messages = [
        "No homo",
        "Bet you wear socks and sandles",
        "You seem like the kind of person to enjoy dad jokes.",
        "The occasional cuddle with the homies",
        "In denial are we?",
        "Over the tipping point.",
        "IDK man, seems kinda gay to me.",
        "When a lesbian asks for directions, never tell them to go straight.",
        "The rock be lookin kinda hot right?",
        "\"But senpi im straight\", \"So is spaghetti till it's wet.\"",
    ]

    let num = Math.ceil(Math.random() * 10);
    let numclone = num
    let num2 = 10 - num
    let bar = ""

    while (num > 0){
        bar += on
        num--
    }
    while (num2 > 0){
        bar += off
        num2 -- 
    }
    var embed = new Discord.MessageEmbed()
    .setTitle(bar)
    .setDescription(`${numclone}/10 - ${messages[numclone-1]}`)
    message.channel.send(embed)
};

module.exports.help = {
    name: "howgay"
};
