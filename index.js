const Discord = require("discord.js");
const YTDL = require("ytdl-core");
const PREFIX = "*";
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
    bot.user.setGame("Evoria-Life | *aide | By DaVid");
    console.log("Le Bot Lolox est connecté")
});

bot.on("guildMemberAdd", function(member) {
    let role = member.guild.roles.find("name", "Viewers");
    member.guild.channels.find("name", "général").sendMessage(member.toString() + " Bienvenue sur Evoria-Life, installe toi tranquillement ! :wink: :wink:  ");
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
        case "aide":
            var embed = new Discord.RichEmbed()
                .addField("*ping", "C'est pour savoir mon ping en ce moment")
                .addField("*musique", "Jouer une musique !")
                .addField("*membres", "Permet de savoir le nombre de personnes sur le Discord")
                .addField("*google", "Faite cette commande + (la recherche que vous souhaitez faire) !")
                .addField("*youtube", "Faite cette commande + (la recherche que vous souhaitez faire)")
                .addField("*youtubelolox", "Pour avoir la chaine Youtube de Lolox !")
                .addField("*twitch", "Pour avoir la chaine Twitch de Lolox !")
                .addField("*mystik", "Pour avoir le forum !")
                .addField("*collection", "Pour avoir la collection !")
                .addField("*serveur", " serveur Arma3")
                .setColor("#00a1ff")
                .setAuthor("Aide de Mystik | Bot")
                .setDescription("Voici les commandes")
                .setTimestamp()
                message.delete()
                message.channel.sendEmbed(embed)
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

    case "evoria":
     message.reply("Voilà le discord: https://discord.gg/cSTeY7y  :ok_hand:");
     message.delete();
    break;
      
      case "serveur":

     message.reply("Serveur arrive dans quelque temps");

     message.delete();

    break;
      
      case "musique":
     message.reply("Voie avec l'administration !");
     message.delete();
    break;
        
      
     case "collection":
     message.reply("Collection arrive bientôt Bon Jeux :wink: ");
     message.delete();
    break;
     
       case "admin":

            if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.sendMessage("Tu ne peux exécuter cette commande. ❌");

            var messagecount = parseInt(args2.join(" "));

            message.channel.fetchMessages({

            limit: messagecount

            }).then(messages => message.channel.bulkDelete(messagecount));

                    message.delete()

            var embed = new Discord.RichEmbed()

                .addField("*.purge", "Pour supprimer les messages, faites a.purge + (le nombre de message à supprimer dans le channel)")

                .addField("*.annonce", "Met un message dans Information, faites a.annonce + (le message à mettre dans information)")

                .addField("*.@annonce", "Met un message dans information avec une mention dans lequel vous avez écrit, faites a.@annonce (dans un channel) + le texte que vous voulez mettre")

                .addField("*.warn", "Pour l'utiliser, faite la commande + mention de la personne + raison")

                .setColor("#ff0000")

                .setFooter("Idée de commandes ? Proposez des commandes à DaVid en MP !")

                .setAuthor("Panel d'Aide Admin")

                .setDescription("Voici mes commandes d'Admin")

                .setTimestamp()

                message.delete()

                message.channel.sendEmbed(embed)

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
            .addField("Raison", reason)
            .addField("Heure:", message.channel.createdAt)
            .setColor("#009999")
            .setFooter("Le warn a été réalisé avec succès ! ^^")
            message.delete()
            member.guild.channels.find("name", "liste-warn").sendEmbed(embed);
            member.guild.channels.find("name", "logs").sendEmbed(embed);
            break;

      
       default:
            message.channel.sendMessage("Commande invalide Fait *aide pour voir toutes les commandes disponibles !")
            message.delete();
    }
});


bot.login(process.env.TOKEN);
