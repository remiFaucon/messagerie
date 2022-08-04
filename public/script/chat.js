let submitInput = document.querySelector("input[type='submit']")
let divChat = document.querySelector('.messages')


submitInput.addEventListener('click', () => {
    let message = document.querySelector("input[type='text']").value
    document.querySelector("input[type='text']").value = ""
    let room = document.querySelector("h2").getAttribute('data-room-id')
    socket.emit('newMessage', message, room)

    let sentMsg = document.createElement('p')
    sentMsg.innerText = message
    sentMsg.classList.add('sent')
    divChat.appendChild(sentMsg)
})

socket.on('youHaveReceiveMsg', (message) => {
    console.log(message)
    let receivedMsg = document.createElement('p')
    receivedMsg.innerText = message
    receivedMsg.classList.add('receive')
    divChat.appendChild(receivedMsg)
})

