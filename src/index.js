require('dotenv/config');
const express = require('express');
const cors = require('cors');
const routes = require('./routes');

const app = express();

app.use(cors());
app.options('*', cors());
app.use(express.json());

app.use(routes);
app.listen(process.env.PORT || 7070);

if (process.env.PORT) {
    console.log('WebService online na porta 3333 - Modo de produção');
}

else {
    console.log('WebService online na porta 7070 - Modo de desenvolvimento');
}

