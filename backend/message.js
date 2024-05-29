const { DataTypes } = require('sequelize');
const sequelize = require('./database');


const Message = sequelize.define('Message', {
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    message: {
        type: DataTypes.STRING,
        allowNull: false
    },
    timestamp: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
});


Message.sync();

module.exports = Message;
