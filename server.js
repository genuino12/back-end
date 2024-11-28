const express = require('express');
const cors = require('cors');
const gastoRoute = require('./routes/gastoRoute.js');
const app = express()

app.use(cors({
    origin: 'http://localhost:3000', 
  }));
  
app.use(express.json())

app.use('/despesas', gastoRoute)


app.listen(4000,()=> console.log('Servidor Rodando na Porta 4000'));