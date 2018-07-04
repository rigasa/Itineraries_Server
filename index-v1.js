/*
 * YABE launcher.
 */
"use strict";

const app = require("./app");
// Connect to DB

app.locals.connect().then(() => {
    // launch our application
    console.log('Connected to MongoDB');
    app.listen(app.locals.port, () => {
        console.log(app.locals.name + ' listening on port ' + app.locals.port);
    });
})