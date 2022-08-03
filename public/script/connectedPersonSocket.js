const socket = io.connect('localhost:3000')
let userList = document.getElementById("connected")

socket.on('newUser', (user) => {
    let pUser = document.createElement("p")
    pUser.innerText = user.name
    pUser.setAttribute("data-id", user.socketId)
    userList.appendChild(pUser)
})

socket.on('userDisconnect', (id) => {
    let removeUser = document.querySelector("p[data-id="+id+"]")
    if (removeUser !== undefined){
        removeUser.remove()
    }
})