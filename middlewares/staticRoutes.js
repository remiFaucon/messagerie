const express = require("express");
module.exports = (app) => app.use('/assets', express.static('public'))
