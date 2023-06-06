const express = require('express')
const dotenv = require('dotenv');
const cors = require("cors");
const db = require("./utils/db");
const app = express()
app.use(express.json());
dotenv.config({ path: './.env' });
const port = process.env.PORT || 7000;
const corsOptions = {
    origin: '*',
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200,
}

app.use(cors(corsOptions)) // Use this after the variable declarationd

app.get('/getUser', async (req, res) => {
    try {
        await db.db.connect();
        const collection = await db.db.createCollection.collection("user");
        const data = await collection.find().toArray();

        await db.db.disconnect();
        res.json(data);
    } catch (error) {
        res.send("Some Error Occured");
    }

})

app.get('/', async (req, res) => {
    res.status(200).send({ msg: "Connected to SIH Project!!" });
})
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})