const connection = require('../database/connection');
const { v4: uuid } = require('uuid');

module.exports = {
    async catch(request, response) {
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
            return response.status('200').json({ message: "cadastro ok"})
        }
        else {
            return response.status('400').json({ error: "user já existe" })
        }
    }
}