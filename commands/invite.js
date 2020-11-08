const Discord = require("discord.js")
const { URL } = require("url")
const utils = require("../utils")

module.exports = async function invite(message) {
  let here = true,
    bot

  if (message.content.startsWith("--here")) {
    message.content = message.content.replace("--here", "").trim()
    here = true
  } else if (message.content.startsWith("--no-here")) {
    message.content = message.content.replace("--no-here", "").trim()
    here = false
  }

  if (message.mentions.members.size > 0) {
    bot = message.mentions.members.first().user
    here = here ?? false
  } else if (/^\d+$/.test(message.content)) {
    bot = await message.client.users.fetch(message.content, false, true)
    here = here ?? true
  }

  if (!bot) {
    return message.channel.send(
      "Tu dois donner un identifiant valide ou mentionner un bot !"
    )
  }

  const url = new URL("/oauth2/authorize", "https://discord.com/")

  url.searchParams.append("scope", "bot")
  url.searchParams.append("client_id", bot.id)

  if (here) {
    url.searchParams.append("permissions", "0")
    url.searchParams.append("guild_id", message.guild.id)
  } else {
    url.searchParams.append("permissions", "2146958847")
  }

  await message.channel.send(
    new Discord.MessageEmbed()
      .setAuthor(
        `Invitez ${bot.username} ${here ? "ici" : ""}`,
        message.guild.iconURL({ dynamic: true }),
        url.toString()
      )
      .setDescription(
        utils.code(
          JSON.stringify(
            Object.fromEntries(url.searchParams.entries()),
            (key, val) => {
              if (/^\d+$/.test(val) && val.length < 12 && !val.startsWith("0"))
                return Number(val)
              return val
            },
            2
          ),
          "json"
        )
      )
      .setThumbnail(bot.displayAvatarURL({ dynamic: true }))
      .setURL(url.toString())
  )
}

module.exports.aliases = ["invitation", "bot", "cobaye"]
