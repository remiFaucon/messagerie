// const messages = require('../models/messages')
//
// const getMessages = ((req, res) => {
//     messages.find({})
//         .then(result => res.status(200).json({ result }))
//         .catch(error => res.status(500).json({msg: error}))
// })
//
// const createMessage = ((req, res) => {
//     messages.create(req.body)
//         .then(result => res.status(200).json({ result }))
//         .catch((error) => res.status(500).json({msg:  error }))
// })
//
// const deleteMessages = ((req, res) => {
//     messages.deleteMany({})
//         .then(result => res.status(200).json({ result }))
//         .catch((error) => res.status(404).json({msg: 'message not found' }))
// })
//
// module.exports = {
//     getMessages,
//     createMessage,
//     deleteMessages
// }