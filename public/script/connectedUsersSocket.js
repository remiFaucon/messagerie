const socket = io.connect('localhost:3000')
let userList = document.getElementById("connected")
let h1 = document.querySelector('h1')
let messengerLayout = document.querySelector('.chat')
let visioLayout = document.querySelector('.visio')


socket.on("notConnected", () => {
    window.location.replace("/")
})

socket.on('thisIsYourId', (id) => {
    h1.setAttribute("data-my-id", id)
    let allUsers = document.querySelectorAll('.user')
    allUsers.forEach(eachUser => {
        eachUser.addEventListener("click", () => {
            visioLayout.classList.add('hidden')
            messengerLayout.classList.remove('hidden')
            let other = eachUser.getAttribute('data-room') ? eachUser.getAttribute('data-room') : eachUser.getAttribute('data-id')
            socket.emit('changeRoom', id, other)
            let h2 = document.querySelector('h2')
            h2.innerText = eachUser.innerHTML
        })
    })
})

socket.on('newUser', (user) => {
    let me = h1.getAttribute("data-my-id")
    if (user.socketId !== me) {
        let pUser = document.createElement("p")
        pUser.innerText = user.name
        pUser.classList.add('user')
        pUser.setAttribute("data-id", user.socketId)
        userList.appendChild(pUser)
    }
    let allUsers = document.querySelectorAll('.user')

    allUsers.forEach(eachUser => {
        eachUser.addEventListener("click", () => {
            messengerLayout.classList.remove('hidden')
            let other = eachUser.getAttribute('data-room') ? eachUser.getAttribute('data-room') : eachUser.getAttribute('data-id')
            socket.emit('changeRoom', me, other)
            let h2 = document.querySelector('h2')
            h2.innerText = eachUser.innerHTML
        })
    })
})

socket.on('connectToRoom', (id) => {
    let h2 = document.querySelector('h2')
    h2.setAttribute("data-room-id", id)
})

socket.on('userDisconnect', (id) => {
    let removeUser = document.querySelector("p[data-id="+id+"]")
    if (removeUser !== undefined){
        removeUser.remove()
    }
})