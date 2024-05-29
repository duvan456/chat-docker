const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite'
});

sequelize.authenticate()
    .then(() => {
        console.log('conectado a sqlite');
    })
    .catch(err => {
        console.error('no contectado por:', err);
    });

module.exports = sequelize;
