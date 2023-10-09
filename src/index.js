const app = require('./app.js');
const { connectDB } = require( '../src/config/database.js');

connectDB();
app.listen(process.env.PORT);
console.log("server is run!! in the port: " + process.env.PORT);
