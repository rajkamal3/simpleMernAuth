const dotenv = require('dotenv');
const mongoose = require('mongoose');
const app = require('./app');

dotenv.config({
    path: './config.env'
});

mongoose
    .connect(process.env.DB, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log(`DB connected!`);
    });

app.listen(3000, () => {
    console.log(`App running on port 3000.`);
});
