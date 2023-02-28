
const mongoose = require('mongoose');

const dbConection = async () => {
    try {
        mongoose.set("strictQuery", false);
        await mongoose.connect(process.env.DB_CN);
        console.log('Db Online');

    } catch (error) {
        console.log(error);
        throw new Error('Error al inicializar la DB');
    }
}

module.exports = {
    dbConection
}