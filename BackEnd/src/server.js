"use strict"

require('./database/MongoDB/db')
require('./database/MySql/db')
require('./database/Redis/db')

const app = require("./app.js");


app.listen(3000, () => console.log("Server running on port 3000"))