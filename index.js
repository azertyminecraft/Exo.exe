const Discord = require('discord.js');
const bot = new Discord.Client({disableEveryone: true});
const botconfig = require("./botconfig.json");
const tokenfile = process.env.token
const fs = require('fs');


bot.on('ready', function () {
  console.log(`Je suis connecté sur ${bot.guilds.size} serveurs avec ${bot.users.size} utilisateurs !`)
  bot.user.setActivity(`${bot.users.size} utilisateurs | ${bot.guilds.size} serveurs`, {type: "WATCHING"});
})

bot.login(tokenfile);


//bot.on('guildCreate', (guild) => {
 // const channel = bot.guilds.get('451101776859627530').channels.get(`451119456043925533`).send('**Nouveau serveur:** '+guild.name+', **Propriétaire: **'+guild.owner.user.username+', **Nombre de membres: **'+guild.memberCount);
//})
//bot.on('guildDelete', (guild) => {
 // const channel = bot.guilds.get('451101776859627530').channels.get(`451119456043925533`).send('**Ancien serveur:** '+guild.name+', **Propriétaire: **'+guild.owner.user.username+', **Nombre de membres: **'+guild.memberCount);
//})

bot.on('message', message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return message.reply("Merci d'effectuer mes commandes dans un serveur.")

  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let prefix = botconfig.prefix;
  let args = messageArray.slice(1);
  let sender = message.author;
  let msg = message.content.toUpperCase();

  if(cmd === `<@418338601382969345>`){
    message.reply("Mon préfix est ``th!``.**th!aide** pour voir mes commandes")
  }
  //if(cmd === `${prefix}suggest` || cmd === `${prefix}suggestion`){
  //  let suggestEmbed = new Discord.RichEmbed()
  //  let contenu = args.join(" ").slice()
 //   const channel = bot.guilds.get('451101776859627530').channels.get(`451122104209899520`)
  //  .setTitle("__Suggestion__")
  //  .addField("Author", message.author)
  //  .addField("Date", message.date)
  //  .addField("Contenu", contenu)
  //
 //   channel.send(suggestEmbed)
 // }
  if(cmd === `${prefix}creator`){
    let creatorembed = new Discord.RichEmbed()

    .setTitle("__Qui est mon créateur ?__")
    .setDescription("Mon créateur est <@205752580251451392> avec l'id **205752580251451392**")

    message.channel.send(`<@${sender.id}>`)
    message.channel.send(creatorembed)
  }
  if(cmd === `${prefix}maintenance`){
    if(message.author.id === '205752580251451392'){
      bot.user.setActivity('maintenance en cours...', {type: "PLAYING"});
      bot.user.setStatus('dnd')
      message.reply("Maintenance Activé !")
    }else{
      message.reply("Tu n'es pas mon **créateur**.")
    }
  }
  if(cmd === `${prefix}servers`){
    message.channel.send(`Je suis sur ${bot.guilds.size} serveurs ! \n Voici la liste: ` + bot.guilds.map(r => r.name))
  }
  if(cmd === `${prefix}sinfo`){

    let sicon = message.guild.iconURL;
    let serveurembed = new Discord.RichEmbed()
    .setTitle("__Information du serveur__")
    .setColor("#15f153")
    .setThumbnail(sicon)
    .addField("Nom du serveur", message.guild.name)
    .addField("Crée le", message.guild.createdAt)
    .addField("Proprétaire", guild.owner.user.username)
    .addField("Rejoins le", message.member.joinedAt)
    .addField("Membres total", message.guild.memberCount)
    .addField("Humains", message.guild.members.filter(m => ! m.user.bot).size)
    .addField("Robot", message.guild.members.filter(m => m.user.bot).size)
    .setFooter(`${message.guild.name}`, sicon)

    message.channel.send(`<@${sender.id}>`, serveurembed)
  }
  if(cmd === `${prefix}membercount`){

    let bicon = bot.user.displayAvatarURL;
    let sicon = message.guild.iconURL;
    let membercountembed = new Discord.RichEmbed()
    .setTitle("__Membres du serveur__")
    .setColor("#15f153")
    .setThumbnail(bicon)
    .addField("Membres total", message.guild.memberCount)
    .addField("Humains", message.guild.members.filter(m => ! m.user.bot).size)
    .addField("Robot", message.guild.members.filter(m => m.user.bot).size)
    .setFooter(`${message.guild.name}`, sicon)

    message.channel.send(`<@${sender.id}>`, membercountembed)
  }

  if(cmd === `${prefix}binfo`){

    let sicon = message.guild.iconURL;
    let bicon = bot.user.displayAvatarURL;
    let botembed = new Discord.RichEmbed()
    .setTitle("_Information du bot_")
    .setColor("#15f153")
    .setThumbnail(bicon)
    .addField("Nom du bot", bot.user.username)
    .addField("Créateur", "<@205752580251451392>")
    .addField("Crée le", bot.user.createdAt)
    .addField("Utilisateurs", bot.users.size)
    .addField("Serveurs", bot.guilds.size)
    .setFooter(`${message.guild.name}`, sicon)

    message.channel.send(`<@${sender.id}>`, botembed)
  }
  if(cmd === `${prefix}say`){
    if(message.author.id === '205752580251451392'){
      let say = args.join(" ").slice();
      message.delete(message.author)

      message.channel.send(say)
      
    } else {
      message.reply("Tu n'es pas mon **créateur**.")
    }
  }
//Page d'aide
  if(cmd === `${prefix}aide` || cmd === `${prefix}help`){

    let bicon = bot.user.displayAvatarURL;
    let sicon = message.guild.iconURL;
    let helpembed = new Discord.RichEmbed()
    .setTitle("_Pages d'aides_")
    .setColor("#15f153")
    .setThumbnail(bicon)
    .setDescription("Liste des commandes disponible", "Théo est un bot Français crée par <@205752580251451392>.")
    .addBlankField()
    .addField("Pages d'aides", "``howner``,``help``")
    .addField(":gear: Utiles", "``binfo``,``sinfo``,``membercount``,``servers``")
    .setFooter(`${message.guild.name}`, sicon)

    message.channel.send(`<@${sender.id}>`, helpembed)
  }
  if(cmd === `${prefix}howner` || cmd === `${prefix}aowner`){
    if(message.author.id === '205752580251451392'){
      let bicon = bot.user.displayAvatarURL;
      let hownerembed = new Discord.RichEmbed()
      .setTitle("_Pages d'aides Créateur_")
      .setColor("#15f153")
      .setThumbnail(bicon)
      .setDescription("Bonjour Théo voici toutes vos commandes", "Faites votre choix ! :wink: ")
      .addBlankField()
      .addField("Pages d'aides", "``hbeta``,``howner``,``help``")
      .addField(":gear: Commandes", "``say``,``sondage``,``setuser``,``setstatus``,``setgamep``,``setgamew``,``maintenance``,``new``")
      message.reply(":envelope_with_arrow: Regarder vos messages privé !")
      message.author.send(hownerembed)
      
    }
  }
//Profile
  if(cmd === `${prefix}profile` || cmd === `${prefix}profil`){
    if(message.author.id === '205752580251451392'){
      let profileembed = new Discord.RichEmbed()
      .setTitle("__Profile__")
      .setColor("#15f153")
      .addField("Badge", ":flag_fr:")
      .addField("Grade", "Créateur")
      .addField("Trophée", "Non disponible")
      .addField("Reputation", "Non disponible")
      .addField("Description", "Créateur du bot Théo")

      message.channel.send(`<@${sender.id}>`, profileembed)
    }
  }

})
