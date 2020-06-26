module.exports = {
    development: {
        port: process.env.PORT,
        databaseUrl: process.env.DATABASE_URL,
        privateKey: process.env.PRIVATE_KEY,

    },
    production: {}
};