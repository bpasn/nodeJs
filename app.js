import express from "express";
// import data from "./data.js";
import nvision from '@nipacloud/nvision'
const app = express();
const objectDetectionService = nvision.objectDetection({
    apiKey: "cdb29f355cb4059995e05420dc8d963f657898bf3a5f2f5e7a88c58279f5e4a0a1c4c4cf874594b42e413fc45c425425ac"
});
app.use(express.json({ limit: '25mb' }));

app.use(express.urlencoded({ extended: true }));

app.post('/api', (req, res) => {
    
    objectDetectionService.predict({
        rawData: req.body.base
    }).then((result) => {
        console.log(result)
        res.json({ status: 200, result: result })
    }).catch(error => res.json({ error: error, status: 404 }));
})
app.get("/", (req, res) => {
    res.send("server in ready");
});



const port = process.env.PORT || 5001;
app.listen(port, () => console.log(`server started http://localhost:${port}`));
