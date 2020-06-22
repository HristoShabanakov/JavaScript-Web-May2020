module.exports = {
    development: {
        port: process.env.PORT || 3000,
        privateKey: 'CUBE-WORKSHOP-SOFTUNI',
        databaseUrl: `mongodb+srv://Shabby:${process.env.DB_PASSWORD}@softuni-wr4u8.mongodb.net/cubicle?retryWrites=true&w=majority`
    },
    production: {}
};