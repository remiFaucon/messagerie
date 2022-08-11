let submitInput = document.querySelector("input[type='submit']")
let divChat = document.querySelector('.messages')

submitInput.addEventListener('click', () => {
    let message = document.querySelector("input[type='text']").value
    document.querySelector("input[type='text']").value = ""
    let room = document.querySelector("h2").getAttribute('data-room-id')
    socket.emit('newMessage', message, room)

    newMsg(message, 'sent')
})

socket.on('youHaveReceiveMsg', (message: string) => {
    newMsg(message, 'received')
})

socket.on('MsgNotification', (type: string, userId: string) => {
    switch (type) {
        case 'call':
            newMsg(document.getElementById(userId).innerText + " a demarrer une visio, rejoins-le", "server")
    }
})

function newMsg(message: string, classMsg: string) {
    let divReceivedMsg = document.createElement('p')
    divReceivedMsg.classList.add('div' + classMsg)
    let receivedMsg = document.createElement('p')
    receivedMsg.innerText = message
    receivedMsg.classList.add(classMsg)
    divChat.appendChild(divReceivedMsg)
    divReceivedMsg.appendChild(receivedMsg)
}