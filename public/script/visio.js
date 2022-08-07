let user = { id: undefined }

socket.on('thisIsYourId', (myId) => {
    const peer = new Peer(Math.round(Math.random()*1000000000), {
        host: "192.168.1.120",
        port: 3000,
        path: "/peerjs/visio",
        secure: true,
        config: {
            'iceServers': [
                { url: 'stun:35.177.230.92:3478' },
                {
                    url: 'turn:35.177.230.92:3478',
                    credential: '123456',
                    username: 'faucon'
                }
            ]
        },
        debug: 2
    })
    document.querySelector(".headChat img").addEventListener('click', () => {


        let room = document.querySelector("h2").getAttribute('data-room-id')
        let messengerLayout = document.querySelector('.chat')
        let visioLayout = document.querySelector('.visio')
        messengerLayout.classList.add('hidden')
        visioLayout.classList.remove('hidden')

        peer.on("open", (id) => {
            socket.emit('newVisio', room, id)
        })

        navigator.mediaDevices.getUserMedia({video: true, audio: true})
            .then((mediaStream) => {
                socket.emit("call", getUserId(room, myId))
                newUserVisio(mediaStream, "sent")
                socket.on('newUserVisio', (userId) => {

                    peer.connect(userId[0])
                    const call = peer.call(userId[0], mediaStream)


                    call.on("stream", (stream) => {
                        newUserVisio(stream, "received")
                    })
                    // call.on("data", (stream) => {
                    //     document.getElementById("received").srcObject = stream
                    // })


                    peer.on("call", (call) => {
                        call.answer(mediaStream)
                        call.on("stream", (stream) => {
                            newUserVisio(stream, "received")
                        })
                        // call.on("data", (stream) => {
                        //     document.getElementById("received").srcObject = stream
                        // })
                        call.on('close', () => {
                            // endCall()
                            console.log("ca a couper")
                        })
                    })

                    peer.on("error", (err) => {
                        console.log(err)
                    })
                })
            })
    })
})


const newUserVisio = (stream, idVideo) => {
    let userCam = document.createElement("video")
    userCam.id = idVideo
    userCam.srcObject = stream
    userCam.addEventListener("loadedmetadata", () => {
        userCam.play()
    })

    // stream.addEventListener('error', event => {
    //     const error = event.path[0].error;
    //     console.log(error);
    //     alert(error.message);
    // }, true);

    let visioDiv = document.querySelector('.visio')
    userCam.setAttribute("autoplay", "autoplay")
    visioDiv.appendChild(userCam)
}

function getUserId(room, myId) {
    let a = room.split("")
    let c = ''
    let d = ''
    let count = 0
    a.forEach(b => {
        if (count < 20){
            c += b
        }
        else {
            d += b
        }
        count++
    })
    return c === myId ? d : c
}
