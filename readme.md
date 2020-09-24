# Collaboration rules

## Github

### Internal Collaborators

- Faites un clone du repository en local : `git clone https://github.com/Les-Laboratoires-JS/lab-tools.git`
- Créez votre propre branche avec un nom spécifiant la modification que vous voulez apporter. [Politique sur les noms des branches](#branch-names)
- Faites tous les commits de votre modification sur cette branche.
- Créez une pull request sur Github depuis votre branche vers la branche `dev` **seulement si vous avez fini de coder entièrement votre modification**.
- Laissez [CamilleAbella](https://github.com/CamilleAbella) faire le reste (merge de votre PR, tests, merge vers `master` ou `main`).

#### Branch Names

- Vos noms de branches doivent commencer par votre pseudo ou votre identifiant afin de ne pas emprunter sans le vouloir une branche qui ne vous appartient pas.
- Vos noms de branches doivent être en camel-case. C'est-à-dire en minuscule, chaque mot séparé par un tiret.

### External Collaborators

- Faites un fork du repository sur Github.
- Faite en clone de votre version du projet en local : `git clone https://github.com/Les-Laboratoires-JS/lab-tools.git`
- Faites tous les commits de votre modification sur `master` ou `main`.
- Créez une [pull request depuis votre fork](https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request-from-a-fork) depuis votre `master` ou `main` vers la branche `dev` **seulement si vous avez fini de coder entièrement votre modification**. Pensez à préciser la modification apportée dans l'intitulé ou dans la descriptiuon de la PR !
- Laissez [CamilleAbella](https://github.com/CamilleAbella) faire le reste (merge de votre PR, tests, merge vers `master` ou `main`).

- Vos noms de branche

## Coding style

- Utilisez la commande prettier avant chaque commit sur votre branche : `npm run prettier`.
- Si vous voulez accéder à quelque chose dans tout le programme, placez-le dans l'objet `client`.
- Documentez à fond chaque util que vous ajoutez via du JSDoc, pas besoin de documenter les commandes.
- N'envoyez un embed que si vous n'avez pas le choix, gardons le bot homogène au possible.
- Ne déscructurez pas vos imports ! On require tout en packets :
  - ❌ `const { RichEmbed } = require("discord.js")`
  - ✅ `const Discord = require("discord.js")`

## Command

- Exportez votre commande dans les règles du CommonJS : `module.exports = command`
- Placez `return false` dans une commande pour signifier qu'elle n'a pas été ciblée.
- Si la commande ne renvoie rien (ou autre chose que `false`), le command handler en déduis que la commande a été ciblée.
- Placez `.catch(client.throw)` après une Promise pour la debug sans trop écrire de code.

### Command Type

```ts
type Command = (message: Discord.Message) => false | any
```

### Command Example

```js
// ./commands/say.js
module.exports = (message) => {
  if (!message.content) return false

  message
    .delete()
    .catch(client.throw)
    .then(() => {
      message.channel.send(message.content).catch(client.throw)
    })
}
```

## Database

- On utilise une instance de Enmap pour la base de données: `/utils/db`.
- On ne crée une autre instance de Enmap qu'en cas de besoin légitime (demandez confirmation à [CamilleAbella](https://github.com/CamilleAbella)).
- Chaque donnée utilisée en base de donnée doit être préfixée par le nom de la feature qui l'utilise.

### Database Usage Examples

```js
// ./commands/autorole.js
const db = require("./utils/db")

module.exports = (message) => {
  // ...command args processing...
  db.ensure("autorole", role.id)
}
```

```js
// ./commands/todo.js
const db = require("./utils/db")

module.exports = (message) => {
  // ...command args processing...
  db.ensure("todo", todo, user.id)
}
```

## Local Run

- Clonez le repo sur votre disque.
- Installez les build-essentials si vous ne les avez pas déjà.
  - Linux: `sudo apt-get install build-essential`
  - Windows: `npm i -g --add-python-to-path --vs2015 --production windows-build-tools`
- Installez les dépendances: `npm i`
- Créez un fichier `.env` à la racine du projet et placez votre token de test dedans de cette façon: `TOKEN=token`.
- Lancez avec la commande `npm start`.
