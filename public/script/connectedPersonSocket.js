const socket = io.connect('localhost:3000')
let userList = document.getElementById("connected")

socket.on('newUser', (name) => {
    let pUser = document.createElement("p")
    pUser.innerText = name
    userList.appendChild(pUser)
})

let test = document.createElement("button")
test.innerText = 'reerffer'
document.querySelector('body').appendChild(test)
test.onclick = () => socket.emit("userDisconnection")

window.addEventListener("beforeunload",() => {
    socket.emit("userDisconnection")
})