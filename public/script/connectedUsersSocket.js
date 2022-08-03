const socket = io.connect('localhost:3000')
let userList = document.getElementById("connected")

socket.on('newUser', (user) => {
    let pUser = document.createElement("p")
    pUser.innerText = user.name
    pUser.setAttribute("data-id", user.socketId)
    pUser.classList.add('user')
    userList.appendChild(pUser)

    let allUsers = document.querySelectorAll('.user')
    console.log(allUsers)
    allUsers.forEach(eachUser => {
        eachUser.addEventListener("click", () => {
            let me = document.querySelector('#me').getAttribute("data-id")
            let other = eachUser.getAttribute('data-room') ? eachUser.getAttribute('data-room') : eachUser.getAttribute('data-id')
            socket.emit('changeRoom', me, other)
        })
    })
})

socket.on('userDisconnect', (id) => {
    let removeUser = document.querySelector("p[data-id="+id+"]")
    if (removeUser !== undefined){
        removeUser.remove()
    }
})