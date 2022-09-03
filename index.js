const { WebhookClient, EmbedBuilder } = require("discord.js")
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

const tempo = 5 // Tempo (em minutos) que a mensagem vai ficar sendo atualizada
const server = "br-plus-1.enxadahost.com:12094" // Ip do seu servidor
const messageId = "1015683370572853258" // Id da mensagem que o webhook vai ficar editando (se ainda n tiver nenhuma msg so fazer ele enviar uma com o webhook.send("mensagem"))
const url = "" // Url do seu webhook

const webhook = new WebhookClient({ url: url })
setInterval(async () => {
    const message = await webhook.client.fetchMessage(messageId)
    fetch(`https://mcapi.us/server/status?ip=${server}`).then((data) => {
        return data.json()
    }).then((data) => {
        if (!data.online) {
            const embed = new EmbedBuilder()
                .setAuthor({ name: "Status do servidor de minecraft", iconURL: "https://th.bing.com/th/id/R.f94589bc714dd18abd987e29e42d77ac?rik=as5Id9TUZi%2bVzg&riu=http%3a%2f%2f3.bp.blogspot.com%2f-TodwQ1IDs3g%2fVbKKNmZTJPI%2fAAAAAAAAL90%2fIfuJQ4OvBP4%2fs1600%2ftexturas-minecraft-terra-gramada.jpg&ehk=10%2fDKTO7y8xB2WPp%2bwXR1Wmjj9x%2bwVCiyGm8PaF6VD4%3d&risl=&pid=ImgRaw&r=0" })
                .setColor(0xff0000)
                .setDescription("<:offline:1015674554045173770> O servidor está offline.")
                .setFooter({ text: "Está mensagem é atualizada a cada 5 minutos." })
                .setTimestamp()
            webhook.client.editMessage(message, { embeds: [embed] })
        } else {
            const embed = new EmbedBuilder()
                .setAuthor({ name: "Status do servidor de minecraft", iconURL: "https://th.bing.com/th/id/R.f94589bc714dd18abd987e29e42d77ac?rik=as5Id9TUZi%2bVzg&riu=http%3a%2f%2f3.bp.blogspot.com%2f-TodwQ1IDs3g%2fVbKKNmZTJPI%2fAAAAAAAAL90%2fIfuJQ4OvBP4%2fs1600%2ftexturas-minecraft-terra-gramada.jpg&ehk=10%2fDKTO7y8xB2WPp%2bwXR1Wmjj9x%2bwVCiyGm8PaF6VD4%3d&risl=&pid=ImgRaw&r=0" })
                .setColor(0x4BBF40)
                .setDescription("<:online:1015674441524588634> O servidor está online.")
                .addFields({
                    name: `👥 Jogadores online: (${data.players.sample.length})`, value: data.players.sample.map((el) => el.name).join("\n") || "Ninguem está jogando."
                })
                .setFooter({ text: "Está mensagem é atualizada a cada 5 minutos." })
                .setTimestamp()
            webhook.client.editMessage(message, { embeds: [embed] })
        }
    })
}, 60000 * tempo);
