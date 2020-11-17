const connection = require('../database/connection');
const { v4: uuid } = require('uuid');
const bot = require('../services/telegramBot');

module.exports = {
    async catch(request, response) {
        bot.initialize(process.env.TOKEN);
        const { name, email, whatsapp } = request.body;
        var lead = await connection('leads').select('id')
            .where('email', email)
            .first();

        if (!lead) {
            await connection('leads').insert({
                id: uuid(),
                name,
                email,
                whatsapp
            })
            var countLeads = await connection('leads').count('name');
            await bot.sendMessage(process.env.ID_TELEGRAM, `Eae seus aligenigenas, um novo usuário chamada(o) ${name} foi capturada(o), ao todo já temos ${countLeads[0].count} leads.`);
            return response.status('200').json({ message: "cadastro ok" })
        }
        else {
            return response.status('400').json({ error: "user já existe" })
        }
    }
}