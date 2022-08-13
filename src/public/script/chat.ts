let submitInput = document.querySelector(".submit")
let divChat = document.querySelector('.messages')

submitInput.addEventListener('click', () => {
    let inputMessage = document.querySelector("input[type='text']")
    let message = inputMessage.value
    inputMessage.value = ""
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

socket.on('connectToRoom', (roomId: string, messages: object) => {
    let h2 = document.querySelector('h2')
    h2.setAttribute("data-room-id", roomId)
    Object.entries(messages).forEach(message => {
        if (message[1].sendBy == document.querySelector("h1").getAttribute("data-my-id")){
            newMsg(message[1].message, "sent")
        }
        else {
            newMsg(message[1].message, "received")
        }
    })
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

