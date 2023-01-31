import fs from "fs";
export = (app) => {
    app.get('/ssl/cert', (req, res) => {
        res.setHeader('Content-type', 'application/json');
        res.send(fs.readFileSync("src/ssl/cert.pem").toString())
    })

    app.get('/ssl/key', (req, res) => {
        res.setHeader('Content-type', 'application/json');
        res.send(fs.readFileSync("src/ssl/key.pem").toString())
    })
}
