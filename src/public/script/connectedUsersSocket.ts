const myInit: RequestInit = { method: 'GET' };
let h1 = document.querySelector('h1')
let messengerLayout = document.querySelector('.chat')
let visioLayout = document.querySelector('.visio')

let ssl = {
    cert: undefined,
    key:undefined,
}

fetch('/ssl/cert',myInit)
    .then((response) => {
        response.body.getReader().read().then(rep => {
            ssl.cert = new TextDecoder().decode(rep.value.buffer)
        })
    })

fetch('/ssl/key',myInit)
    .then((response) => {
        response.body.getReader().read().then(rep => {
            ssl.key =  new TextDecoder().decode(rep.value.buffer)
        })
    })

// fetch('/ssl',myInit)
//     .then((response) => {
//         response.body.getReader().read().then(rep => {
//             return console.log(new TextDecoder().decode(rep.value.buffer))
//         })
//     })
            // Buffer.alloc(JSON.stringify(json));
let socket = io.connect("https://localhost:3000",
    {
        transports: ["socket", "polling"],
    //     rememberUpgrade: true,
    //     // secure: true,
        ca: ssl.cert
    })

socket.on("close", () => {
    socket.io.opts.transports = ["polling", "websocket"];
})



socket.on("connect", () => {
     h1.setAttribute("data-my-id", socket.id)
    let allUsers = document.querySelectorAll('.user')
    roomList(allUsers, socket.id)
    socket.on('newUser', (user: { socketId: string; name: string }) => {
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


socket.on("connect_error", (err) => {
    socket.io.opts.transports = ["polling", "websocket"];
    console.log(err)
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
    //     }))
    // })


