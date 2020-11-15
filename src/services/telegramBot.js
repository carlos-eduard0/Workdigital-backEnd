const superagent = require('superagent'); 
let botToken = null;

const telegram_bot = {
  initialize: (token) => {
    botToken=token;
    console.log('Bot inicializado.');
  },
  sendMessage: async(chatId, message) => {
    await superagent
      .post(`https://api.telegram.org/bot${botToken}/sendMessage`)
      .send({ chat_id: `${chatId}`, text: message })
      .set('Accept', 'application/json')
      .then(res => {
        if (res.body.ok)
          console.log('A mensagem foi enviada com sucesso!');
      })
      .catch(err => {
        console.log(err.message);  
      });
  }
}
module.exports = telegram_bot;