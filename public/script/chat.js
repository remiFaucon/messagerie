let submitInput = document.querySelector("input[type='submit']")
let divChat = document.querySelector('.messages')

submitInput.addEventListener('click', () => {
    let message = document.querySelector("input[type='text']").value
    document.querySelector("input[type='text']").value = ""
    let room = document.querySelector("h2").getAttribute('data-room-id')
    socket.emit('newMessage', message, room)

    let divSentMsg = document.createElement('p')
    divSentMsg.classList.add('divSent')
    let sentMsg = document.createElement('p')
    sentMsg.innerText = message
    sentMsg.classList.add('sent')
    divChat.appendChild(divSentMsg)
    divSentMsg.appendChild(sentMsg)
})

socket.on('youHaveReceiveMsg', (message) => {
    let divReceivedMsg = document.createElement('p')
    divReceivedMsg.classList.add('divReceived')
    let receivedMsg = document.createElement('p')
    receivedMsg.innerText = message
    receivedMsg.classList.add('receive')
    divChat.appendChild(divReceivedMsg)
    divReceivedMsg.appendChild(receivedMsg)
})

document.querySelector(".headChat img").addEventListener('click', () => {
    let room = document.querySelector("h2").getAttribute('data-room-id')
    socket.emit("newVisio", room)
    let messengerLayout = document.querySelector('.chat')
    let visioLayout = document.querySelector('.visio')
    messengerLayout.classList.add('hidden')
    visioLayout.classList.remove('hidden')
})
