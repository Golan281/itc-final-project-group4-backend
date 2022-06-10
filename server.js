
const app = require('./app');
const PORT = process.env.PORT || 8000;
const HOST = `${process.env.HOST}` || `localhost`;


app.listen(PORT,HOST, () => {
    console.log(`App listening at http://${HOST}:${PORT}`)
 });
 