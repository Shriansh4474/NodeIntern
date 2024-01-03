const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/notes-api",{
    family: 4
})
.then(() => {
    console.log("connection is successful");
}).catch((e) => {
    console.log("No Connection");
});
