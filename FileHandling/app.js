const fs = require("fs");

const person = {
    One: {
        name: "John Doe",
        age: 30
    },
    Two: {
        name: "John Michel",
        age: 30
    },
    Third: {
        name: "John Smith",
        age: 30
    }
}

fs.writeFileSync("data.json", JSON.stringify(person));

const data = fs.readFileSync("data.json");
console.log(JSON.parse(data));
