const mongoose = require("mongoose");


MONGODB_URI =" mongodb+srv://aswarnalaxmip:<aswarnalaxmip9012>@cluster0.inv1htx.mongodb.net/"

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('mongoose connected');
    })
    .catch((e) => {
        console.error('Failed to connect to MongoDB:', e.message);
    });


const logInSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});


const LogInCollection = mongoose.model('LogInCollection', logInSchema);

module.exports = LogInCollection;
