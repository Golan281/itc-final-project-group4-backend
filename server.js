const app = require('./app');
const PORT = process.env.PORT || 4000;
const HOST = `localhost`;


app.listen(PORT,HOST, () => {
    console.log(`App listening at http://${HOST}:${PORT}`)
 });
 