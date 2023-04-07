const env = process.env;

const MODE = env.MODE;

const PORT = MODE === "live" ? env.PORT : 5000;

module.exports = { MODE, PORT };
