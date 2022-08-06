let user = { id: undefined }
socket.on('thisIsYourId', (myId) => {
    document.querySelector(".headChat img").addEventListener('click', () => {
        const peer = new Peer(Math.round(Math.random()*100000), {
            host: "192.168.1.120",
            port: 3000,
            path: "/peerjs/visio"
        })

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
                newUserVisio(mediaStream, "sent")

                socket.on('newUserVisio', (userId) => {
                    const call = peer.call(userId[0], mediaStream)
                    call.on("stream", (stream) => {
                        newUserVisio(stream, "received").then(() => console.log("cest good")).catch(() => console.log("eh bas non"))
                    })
                    call.on("data", (stream) => {
                        document.getElementById("received").srcObject = stream
                    })
                })

                peer.on("call", (call) => {
                    call.answer(mediaStream)
                    call.on("stream", (stream) => {
                        newUserVisio(stream, "received")
                    })
                    call.on("data", (stream) => {
                        document.getElementById("received").srcObject = stream
                    })
                })

                // call.on("error", (err) => {
                //     console.log(err)
                // })
                // call.on('close', () => {
                //     // endCall()
                // })
            })
    })
})

const newUserVisio = async (stream, idVideo) => {
    let userCam = document.createElement("video")
    userCam.id = idVideo
    userCam.srcObject = stream
    userCam.addEventListener("loadedmetadata", () => {
        userCam.play()
    })

    stream.addEventListener('error', event => {
        const error = event.path[0].error;
        console.log(error);
        alert(error.message);
    }, true);

    let visioDiv = document.querySelector('.visio')
    userCam.setAttribute("autoplay", "autoplay")
    visioDiv.appendChild(userCam)
}
