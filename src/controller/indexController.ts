module.exports = (app, user) => {
    app.get('/', function (req, res) {
        res.render('pages/index')
    })

    app.post('/', (req, res) => {
        req["body"]["name"]
        if (req.body.name === undefined || req.body.name.trim() === ""){
            req.session.name = "annonyme"
        }
        else {
            req.session.name = req.body.name
        }
        user.setName(req.session.name)
        res.redirect("/home")
    })
}
