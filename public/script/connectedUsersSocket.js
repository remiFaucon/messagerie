const socket = io.connect('localhost:3000')
let userList = document.getElementById("connected")
let h1 = document.querySelector('h1')

socket.on('thisIsYourId', (id) => {
    h1.setAttribute("data-my-id", id)
})

socket.on('newUser', (user) => {
    let me = h1.getAttribute("data-my-id")
    console.log(me)
    if (user.socketId !== me) {
        let pUser = document.createElement("p")
        pUser.innerText = user.name
        pUser.setAttribute("data-id", user.socketId)
        pUser.classList.add('user')
        userList.appendChild(pUser)
    }

    let allUsers = document.querySelectorAll('.user')
    allUsers.forEach(eachUser => {
        eachUser.addEventListener("click", () => {
            let other = eachUser.getAttribute('data-room') ? eachUser.getAttribute('data-room') : eachUser.getAttribute('data-id')
            socket.emit('changeRoom', me, other)
            document.querySelector('h2').innerText = eachUser.innerHTML
        })
    })
})

socket.on('userDisconnect', (id) => {
    let removeUser = document.querySelector("p[data-id="+id+"]")
    if (removeUser !== undefined){
        removeUser.remove()
    }
})