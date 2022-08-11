module.exports = (app, express) => app.use('/assets', express.static('./dist/public'))
