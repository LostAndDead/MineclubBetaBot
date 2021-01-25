const Discord = require("discord.js");
const fs = require("fs");
const yaml = require('js-yaml');
const request = require('request');

const bot = new Discord.Client({ disableEveryone: true });

let Config = null;

try {
    let fileContents = fs.readFileSync('./config.yml', 'utf8');
    Config = yaml.load(fileContents);
}
catch (e) {
    console.log(e);
}

//define command collection
bot.commands = new Discord.Collection();

// command handler
fs.readdir("./commands/", (err, file) => {

    if (err) console.log(err);

    let jsfile = file.filter(f => f.split(".").pop() === "js");
    if (jsfile.length <= 0) {
        console.log("Cant Find Commands");
        return;
    }

    jsfile.forEach((f, i) => {
        let props = require(`./commands/${f}`);
        bot.commands.set(props.help.name, props);
    });
    console.clear()
    console.log("All commands loaded successfully\n");
});

// D.JS Client listeners
bot.on("error", (e) => console.error(e));
bot.on("warn", (e) => console.warn(e));
//bot.on("debug", (e) => console.info(e));
bot.on('reconnecting', () => console.log('Reconnecting WS...'));
bot.on('disconnect', () => {
    console.log('Disconnected, trying to restart...');
    process.exit();
});

// NodeJS process listeners
process.on('unhandledRejection', console.error);
process.on('warning', console.warn);

//on ready statment
bot.on("ready", async() => {
    console.log("\nThe bot is now online")
    console.log("Keep this window open for the bot to run\n")
    console.log(`Invite me to a server with the following link.\nhttps://discordapp.com/api/oauth2/authorize?client_id=${bot.user.id}&permissions=125952&scope=bot\n`);
    console.log("Press CTRL+C to exit\n")
    bot.user.setPresence({
        status: "online",
        activity: {
            name: Config.Settings.StatusMessage,
            type: Config.Settings.StatusType
        }
    });
    check_server()
});

bot.on("message", async message => {
    if (message.author.bot) return;
    let messageArray = message.content.split(" ");
    let args = messageArray.slice();
    let cmd = messageArray[0].toLowerCase();
    args = messageArray.slice(1);
    if (Config.Setup.Prefix == cmd.slice(0, 1)) {
        let Commandfile = bot.commands.get(cmd.slice(Config.Setup.Prefix.length));
        if (Commandfile) Commandfile.run(bot, message, args);
    }else{
        let contains = "#stairgang"
        let contains2 = "#**stairgang**"
        if (message.content.toLowerCase().includes(contains) || message.content.toLowerCase().includes(contains2)){
            message.channel.send("#**StairGang**")
        }else{
            let num = Math.floor(Math.random() * 101);
            if(num == 69){
                message.channel.send("Thats a **#StairGang** moment.")
            }
        }
    }
});

function check_server(){
    let guild = bot.guilds.cache.find(guild => guild.id == "802159815706542100")
    let channel = guild.channels.cache.find(channel => channel.id == "802160676599758888")
    request('https://api.mcsrvstat.us/2/play.mineclub.com', { json: true }, (err, res, body) => {
        if (err) { return console.log(err); }
        if (body.online == true){
            if(body.players.online < 3){
                let embed = new Discord.MessageEmbed()
                    .setColor(d92e2e)
                    .setTitle("Offline")
                    .addField("Server Detected As Offline", "This was detected by the player count being lover than 3")
                channel.send(embed)
            }
        }else{
            let embed = new Discord.MessageEmbed()
                .setColor(d92e2e)
                .setTitle("Offline")
                .addField("Server Detected As Offline", "This was detected by the server returning offline.")
            channel.send(embed)
        }
        
    });

    let repeat = setTimeout(check_server, 10000)
}

bot.login(Config.Setup.Token);