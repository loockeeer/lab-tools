const regex = /^(tip) (push|get|template).+/gi

module.exports = (message) => {
  if(!regex.test(message.content)) return false;
  console.log("bite");
  const args = message.content.split(/\s+/);
  
  switch (args[1]) {
    case 'push': {
      const link = args[2].split('/')
      const messageChannel = message.guild.channels.cache.get(link[5]);
      if (!messageChannel) return message.channel.send(`Salon non trouvé : ${link[5]}`)
      const tip = messageChannel.messages.fetch(link[6]);
      if (!tip) return message.channel.send(`Message non trouvé : ${link[6]}`);
      // après, j'ai la flemme aigüe :harold:
      break;
    }
    
    case 'template': {
      return message.channel.send(`
**Nom**

Description.

**Exemple**

\\\`\\\`\\\`js
code
\\\`\\\`\\\`

**Spécifications** (optionnel)
- Nom
- Nom
...

**Annexes** (optionnel)
- Lien
- Lien
...

**Auteur**
Votre pseudo github.
`)
    }
  }
}
