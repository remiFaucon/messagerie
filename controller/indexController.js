module.exports = (app, connected) => {
    app.get('/', (req, res) => {
        res.render('pages/index')
        })

    app.post('/', (req, res) => {
        if (req.body.name === undefined || req.body.name.trim() === ""){
            req.session.name = "annonyme"
        }
        else {
            req.session.name = req.body.name
        }
        connected.push({ name: req.session.name, socketId: null })
        res.redirect("/home")
    })
}