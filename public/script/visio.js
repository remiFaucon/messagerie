let usersCam = []


document.querySelector(".headChat img").addEventListener('click', () => {
    const peer = new Peer("pas undefined", {
        host: "192.168.1.120",
        port: 3000,
        path: "/peerjs/visio"
    })
    let room = document.querySelector("h2").getAttribute('data-room-id')
    socket.emit("newVisio", room)

    let messengerLayout = document.querySelector('.chat')
    let visioLayout = document.querySelector('.visio')
    messengerLayout.classList.add('hidden')
    visioLayout.classList.remove('hidden')
})

socket.on("connectedVisio", (usersAlreadyConnect) => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        .then((mediaStream) => {
            let myId = h1.getAttribute("data-my-id")
            let myCamTag = document.createElement("video")
            let visio = document.querySelector('.visio')

            usersCam.push({ user: { userId: myId, tag: myCamTag } })
            myCamTag.id = myId
            visio.appendChild(myCamTag)

            let video = new ImageCapture(mediaStream.getVideoTracks()[0])
            // myCamTag.srcObject = video
            myCamTag.addEventListener("loadeddata", () => {
                // myCamTag.play()
            })

            peer.call()
        })

    if (usersAlreadyConnect === null){
        usersAlreadyConnect.forEach(user => {
            let camTag = document.createElement('img')
            camTag.id = user
            visio.appendChild(camTag)
        })
    }
})

socket.on('emitNewVisio', (userId) => {
    let userCam = document.createElement("img")
    userCam.id = userId
    let visio = document.querySelector('.visio')
    visio.appendChild(userCam)
    usersCam.push({ user: { userId: userId, tag: userCam } })
})

socket.on('newImageForVisio', (clientId, image) => {
    usersCam.forEach(userCam => {
        if (userCam.user.userId === clientId){
            userCam.user.tag.src = 'data:video/mp4;base64,'+image
        }
    })
})