
let socket = io.connect("https://localhost:3000",
    {
        transports: ["polling", "websocket"],
        rememberUpgrade: true,
        ca: fs.readFileSync("./cert.pem")

    })

let h1 = document.querySelector('h1')
let messengerLayout = document.querySelector('.chat')
let visioLayout = document.querySelector('.visio')


socket.on("connect", () => {

     h1.setAttribute("data-my-id", socket.id)
    let allUsers = document.querySelectorAll('.user')
    roomList(allUsers, socket.id)
    socket.on('newUser', (user: { socketId: string; name: string }) => {
        console.log("salut")
        let other = []
        let pUser = document.createElement("p")
        pUser.innerText = user.name
        pUser.classList.add('user')
        pUser.setAttribute("id", user.socketId)
        document.querySelector(".connected").appendChild(pUser)
        other.push(user.socketId)
        if (user.socketId !== socket.id && !other.includes(user.socketId)) {
            roomList(allUsers, socket.id)
        }
    })
});



socket.on('userDisconnect', (id: string) => {
    let removeUser = document.querySelector("p[id=\""+id+"\"]")
    if (removeUser !== undefined){
        removeUser.remove()
    }
})

socket.on("close", () => {
    io("https://localhost:3000");
});

socket.on("connect_error", () => {
    socket.io.opts.transports = ["polling", "websocket"];
});

function roomList(allUsers: NodeList, me: string) {
    allUsers.forEach(eachUser => {
        eachUser.addEventListener("click", () => {
            let otherId = eachUser.getAttribute('data-room') ? eachUser.getAttribute('data-room') : eachUser.id
            socket.emit('changeRoom', me, otherId)
            let h2 = document.querySelector('h2')
            h2.innerText = eachUser.innerText
            h2.setAttribute("data-room-id", otherId)
            messengerLayout.classList.remove('hidden')
        })
    })
}