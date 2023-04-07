const express = require('express')
const {PORT} = require("./config")

const app = express()

const cryptoRoute = require('./routes/api/v1/crypto')

app.use("/api/v1", cryptoRoute);

app.listen(PORT, () => console.log(`Server running on port ==> ${PORT}`))