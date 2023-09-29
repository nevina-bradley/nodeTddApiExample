
const database = require("./src/data/database");
const appBuilder = require("./src/app");
const app = appBuilder(database);
app.listen(8081, ()=> console.log("Server started on port 8081"))
