const Discord = require("discord.js");
const YTDL = require("ytdl-core");
const PREFIX = "!";
const queue = new Map();
const EVERYONE = "@";

var client = new Discord.Client();

var bot = new Discord.Client();

var servers = {};

function play(connection, message) {
 var server = servers[message.guild.id];

    server.dispatcher = connection.playStream(YTDL(server.queue[0], {filter: "audioonly"}));

    server.queue.shift();

    server.dispatcher.on("end", function() {
     if (server.queue[0]) play(connection, message);
     else connection.disconnect();
    });
}

bot.on("ready", function() {
    bot.user.setGame("Mystik Roleplay | !help | By DaVid");
    console.log("Le Bot Lolox est connecté")
});

bot.on("guildMemberAdd", function(member) {
    let role = member.guild.roles.find("name", "Viewers");
    member.guild.channels.find("name", "général").sendMessage(member.toString() + " Bienvenue sur Lolox Army (Mystik Roleplay), installe toi tranquillement ! :wink: :wink:  ");
    member.addRole(role);
});

bot.on("message", async function(message) {
    if (message.author.equals(bot.user)) return;

    if (!message.content.startsWith(PREFIX)) return;

    var args = message.content.substring(PREFIX.length).split (" ");

    var args2 = message.content.split(" ").slice(1);

    var suffix = args2.join(" ");

    var reason = args2.slice(1).join(" ");
    
    var reasontimed = args2.slice(2).join(' ')

    var user = message.mentions.users.first();
    
    var guild = message.guild;
    
    var member = message.member;
   
    var modlog = member.guild.channels.find("name", "logs")
    
    var user = message.mentions.users.first();

    switch (args[0].toLowerCase()) {
        case "play":
            if (!args[1]) {
             message.channel.sendMessage("[` Musique`] - Vous devez mettre un lien.");   
             return;
            }
            if(!message.member.voiceChannel) {
             message.channel.sendMessage("[` Musique`] - Vous devez être dans un salon vocal.");   
             return;
            }
            
            if(!servers[message.guild.id]) servers[message.guild.id] = {
                queue: []
            };
            
            var server = servers[message.guild.id];
      
            server.queue.push(args[1]);
            
            if(!message.guild.voiceConnection) message.member.voiceChannel.join().then(function(connection) {
               play(connection, message) 
            });
        break;    

        

        case "stop":
             if(!message.member.voiceChannel) {
             message.channel.sendMessage("[` Musique`] - Vous devez être dans un **salon vocal**.");   
             return;
            }
            var server = servers[message.guild.id];
            if(server.dispatcher) server.dispatcher.end();
        break;

        case "help":
            var embed = new Discord.RichEmbed()
                .addField("!ping", "C'est pour savoir mon ping en ce moment")
                .addField("!play", "Jouer une musique !  Pour l'utiliser, faites !play (lien) !")
                .addField("!stop", "Arreter la musique  Pour l'utiliser, faites !stop !")
                .addField("!membres", "Permet de savoir le nombre de personnes sur le Discord")
                .addField("!traductionhelp", "Pour afficher le Panel d'Aide de Traduction") 
                .addField("!google", "Faite cette commande + (la recherche que vous souhaitez faire) !")
                .addField("!youtube", "Faite cette commande + (la recherche que vous souhaitez faire)")
                .addField("!youtubelolox", "Pour avoir la chaine Youtube de Lolox !")
                .addField("!twitch", "Pour avoir la chaine Twitch de Lolox !")
                .addField("!mystik", "Pour avoir le forum !")
                .setColor("#00a1ff")
                .setFooter("Idée de commandes ? Proposez des commandes à DaVid en MP !")
                .setAuthor("Panel d'Aide de Mystik | Bot")
                .setDescription("Voici mes commandes")
                .setTimestamp()
                message.delete()
                message.channel.sendEmbed(embed)
            break;

        case "traductionhelp":
            var embed = new Discord.RichEmbed()
                 .addField("!tradenfr", "Traduction Anglais ==> Français !") 
                 .addField("!tradfren", "Traduction Français ==> Anglais !")
                 .addField("!tradesfr", "Traduction Espagnol ==> Français !")
                 .addField("!tradfres", "Taduction Français ==> Espagnol !")
                 .addField("!tradesen", "Traduction Espagnol ==> Anglais !")
                 .addField("!tradenes", "Taduction Anglais ==> Espagnol !")            
                .setColor("#ff0021")
                .setFooter("Amuse toi à traduire petit enfant !")
                .setAuthor("Pannel d'Aide de Traduction")
                .setDescription("Petit rappelle, je vais seulement envoyé un liens google traduction !")
                .setTimestamp()
                message.delete()
                message.channel.sendEmbed(embed)
             console.log("Il veut traduire" + message.author.username + "!")
            break;

        case "tradenfr":
        let tradenfr = message.content.split(' ');
        tradenfr.shift();
        console.log("Traduction Anglais ==> Français");
        message.reply('https://translate.google.fr/#en/fr/' + tradenfr.join('%20'));
        break;

        case "tradfren":
         let tradfren = message.content.split(' ');
         tradfren.shift();
         console.log("Traduction Français ==> Anglais");
         message.reply('https://translate.google.fr/#fr/en/' + tradfren.join('%20'));
         break;

         case "tradesfr":
         let tradesfr = message.content.split(' ');
         tradesfr.shift();
         console.log("Traduction Espagnol ==> Français");
         message.reply('https://translate.google.fr/#es/fr/' + tradesfr.join('%20'));
         break;
      
        case "tradfres":
         let tradfres = message.content.split(' ');
         tradfres.shift();
         console.log("Traduction Français ==> Espagnol");
         message.reply('https://translate.google.fr/#fr/es/' + tradfres.join('%20'));
         break;      
      
        case "tradenes":
         let tradenes = message.content.split(' ');
         tradenes.shift();
         console.log("Traduction Anglais ==> Espagnol");
         message.reply('https://translate.google.fr/#en/es/' + tradesen.join('%20'))
         break;

        case "ping":
        message.channel.sendMessage("Pong! J'ai actuellement `" + bot.ping + " ms !`");
        message.delete();
        break;

        case "purge":
            if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.sendMessage("Tu ne peux exécuter cette commande. ❌");
            var messagecount = parseInt(args2.join(" "));
            message.channel.fetchMessages({
                limit: messagecount
            }).then(messages => message.channel.bulkDelete(messagecount));
                        message.delete()
            var embed = new Discord.RichEmbed()
            .addField("Commande :", "Purge d'un Channel")
            .addField("Modérateur :", message.author.username)
            .addField("Message supprimé", messagecount)
            .addField("Heure:", message.channel.createdAt)
            .setColor("#009999")
            .setFooter("Ouf ! Sa as fait un bon ménage dans le serveur ! ^^")
            message.delete()
            member.guild.channels.find("name", "logs").sendEmbed(embed);
            break;

        case "membres":
     message.reply("Nous sommes actuellement ``" + message.guild.memberCount + " membres`` sur ``" + message.guild.name + "`` !");
     message.delete();
     break;

        case "google":
    let glg = message.content.split(' ');
    glg.shift();
    console.log("J'ai rechercher sur Google!" + message.author.username + " !!");
    message.reply('https://www.google.fr/#q=' + glg.join('%20'));
    message.delete();
    break;

        case "youtube":
    let ytb = message.content.split(' ');
    ytb.shift();
    console.log("J'ai rechercher sur Youtube!" + message.author.username + " !!");
    message.reply('https://m.youtube.com/results?search_query=' + ytb.join('+'));
    message.delete();
    break;

    case "youtubelolox":
     message.reply("Voilà sa Chaine: https://www.youtube.com/channel/UCQmyH_HI5Sl41oBqGw7o7gw :ok_hand:");
     message.delete();
    break;

    case "twitch":
     message.reply("Voilà sa Chaine: https://www.twitch.tv/lolox_fr  Bon Live :wink: ");
     message.delete();
    break;

    case "mystik":
     message.reply("Voilà le forum: http://loloxcity.fr  :ok_hand:");
     message.delete();
    break;

    case "annonce":
         if(!message.member.hasPermission("MANAGE_GUILD")) return message.channel.sendMessage("Tu ne peux exécuter cette commande. ❌");
            var messagecount = parseInt(args2.join(" "));
            message.channel.fetchMessages({
                limit: messagecount
            }).then(messages => message.channel.bulkDelete(messagecount));
                        message.delete()
     let sondage = message.content.split(" ");
     sondage.shift();
   var embed = new Discord.RichEmbed()
   .addField("Nouvauté!", " "+ sondage.join(" "))
   .setColor("#fcff00")
   .setTimestamp()
   message.delete();
   member.guild.channels.find("name", "information").sendEmbed(embed);
   break;

        case "@annonce":
         if(!message.member.hasPermission("MANAGE_GUILD")) return message.channel.sendMessage("Tu ne peux exécuter cette commande. :x:");
            var messagecount = parseInt(args2.join(" "));
            message.channel.fetchMessages({
                limit: messagecount
            }).then(messages => message.channel.bulkDelete(messagecount));
                        message.delete()
       let newi = message.content.split(" ");
       newi.shift();
     var embed = new Discord.RichEmbed()
     .addField("Annonces !", " "+ newi.join(" "))
     .setColor("#fcff00")
     .setTimestamp()
     message.delete();
     message.channel.send("@everyone Du nouveau sur le serveur, regardez dans #information !")
     member.guild.channels.find("name", "information").sendEmbed(embed);
     break;

     case "warn":
            if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.sendMessage("Tu n'as pas la permission d'exécuter cette commande. :x:");
            if (reason.length < 1) return message.reply("Tu as oublié la raison ! :D");
            if (message.mentions.users.size < 1) return message.reply("Tu n'as pas mis son pseudo au complet ! :o")
            message.channel.send(user.toString() + " a été averti pour " + reason + " :white_check_mark:")
            var messagecount = parseInt(args2.join(" "));
            message.channel.fetchMessages({
                limit: messagecount
            }).then(messages => message.channel.bulkDelete(messagecount));
                        message.delete()
            var embed = new Discord.RichEmbed()
            .addField("Commande :", "Warn")
            .addField("Modérateur :", message.author.username)
            .addField("Heure:", message.channel.createdAt)
            .setColor("#009999")
            .setFooter("Ouf ! Sa as fait un bon ménage dans le serveur ! ^^")
            message.delete()
            member.guild.channels.find("name", "liste-warn").sendEmbed(embed);
            member.guild.channels.find("name", "logs").sendEmbed(embed);
            break;

        default:
            message.channel.sendMessage("Commande invalide Fait !help pour voir toutes les commandes disponibles !")
            message.delete();
    }
});


bot.login(process.env.TOKEN);
