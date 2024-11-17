import express from "express";
import logger from "./logger.js";
import morgan from "morgan";

const morganFormat = ":method :url :status :response-time ms"
const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;
app.use(
    morgan(morganFormat, {
        stream: {
            write: (message) => {
                const logObject = {
                    method: message.split(" ")[0],
                    url: message.split(" ")[1],
                    status: message.split(" ")[2],
                    responseTime: message.split(" ")[3],
                };
                logger.info(JSON.stringify(logObject));
            },
        },
    })
);

let testData = [];
let nextID = 1;
app.post("/teas", (req, res) => {
    logger.warn("On Item Added ");
    const { name, price } = req.body;
    let newData;
    (name === "" && price === "") ? res.status(400).send("Bad Request") : newData = { id: nextID++, name, price };
    testData.push(newData);
    res.send(newData);
});

app.get("/teas", (req, res) => {
    res.send(testData);
})

app.get("/teas/:id", (req, res) => {
    const tea = testData.find(t => t.id === parseInt(req.params.id));
    if (!tea) {
        res.status(404);
    }
    res.send(tea);
})

app.put("/teas/:id", (req, res) => {
    const tea = testData.find(t => t.id === parseInt(req.params.id));
    if (!tea) {
        res.status(404);
    }
    const { name, price } = req.body;
    tea.name = name;
    tea.price = price;
    res.send(tea);
})

app.delete("/teas/:id", (req, res) => {
    let index = testData.findIndex(t => t.id === parseInt(req.params.id));
    if (index === -1) {
        return res.status(404).send("Tea not found")
    }
    testData.splice(index, 1)
    return res.status(204).send("Tea deleted")
}
)

app.listen(port, () => {
    console.log(`Server running at http://127.0.0.1:${port}/`);
})