const Discord = require("discord.js");
const request = require('request');

module.exports.run = async(bot, message, args) => {
    request('https://api.mcsrvstat.us/2/play.mineclub.com', { json: true }, (err, res, body) => {
        if (err) { return console.log(err); }
        if (body.online == true){
            let embed = new Discord.MessageEmbed()
                .setColor(0x33FF41)
                .setTitle("Online")
                .addField("Server Detected As Online", `Players Online ${body.players.online}`)
            channel.send(embed)
        }else{
            let embed = new Discord.MessageEmbed()
                .setColor(0xFF5733)
                .setTitle("Offline")
                .addField("Server Detected As Offline", "No Players Online OBVS")
            channel.send(embed)
        
        }
    })
};

module.exports.help = {
    name: "status"
};
