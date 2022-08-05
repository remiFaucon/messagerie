module.exports = (app, connected) => {
    app.get('/home', (req, res) => {
        res.render('pages/home', { connected: connected })
    })
}