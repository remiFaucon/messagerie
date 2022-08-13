import {Connected} from "../class/Connected";
import fs from "fs";

module.exports = (app) => {
    app.get('/home', (req, res) => {
        let a = []
        Connected.getAllInfo().forEach(element => {
            let id = element.hasOwnProperty("socketId") ? element.socketId : undefined
            if (id !== undefined) {
                a.push(element)
            }
        })
        res.render('pages/home', { connected: a })
    })
}