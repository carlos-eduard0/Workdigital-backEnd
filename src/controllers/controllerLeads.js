const connection = require('../database/connection');
const { v4: uuid } = require('uuid');
const bot = require('../services/telegramBot');

module.exports = {
    async catch(request, response) {
        bot.initialize('1359045269:AAHyP4kSx2LaPcZHAKiLGjDzRD-SFzJRfbg');
        const { name, email, whatsapp } = request.body;
        var lead = await connection('leads').select('id')
            .where('email', email)
            .first();

        var countLeads = await connection('leads').count('name');

        if(countLeads[0].count == 0){
            countLeads[0].count = 1;
        };
    
        if (!lead) {
            await connection('leads').insert({
                id: uuid(),
                name,
                email,
                whatsapp
            })
            await bot.sendMessage('-1001249886116',`Boa tarde chefinho, um novo usuário chamada(o) ${name} foi capturada(o), ao todo já temos ${countLeads[0].count} leads.`);
            return response.status('200').json({ message: "cadastro ok" })
        }
        else {
            return response.status('400').json({ error: "user já existe" })
        }
    }
}