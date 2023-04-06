const express = require('express')
const env = process.env

const PORT = env.MODE === 'live'? env.PORT : 5000

const app = express()

const cryptoRoute = require('./routes/api/v1/crypto')

app.use("/api/v1", cryptoRoute);

app.listen(PORT, () => console.log(`Server running on port ==> ${PORT}`))