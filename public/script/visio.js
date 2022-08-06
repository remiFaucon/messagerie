let user = { id: undefined }
socket.on('thisIsYourId', (myId) => {
    document.querySelector(".headChat img").addEventListener('click', () => {
        const peer = new Peer(undefined, {
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
            console.log(id)
            socket.emit('newVisio', room, id)
        })

        navigator.mediaDevices.getUserMedia({video: true, audio: true})
            .then((mediaStream) => {
                let myCamTag = document.createElement("video")
                let visio = document.querySelector('.visio')

                myCamTag.id = "sent"
                visio.appendChild(myCamTag)

                myCamTag.srcObject = mediaStream
                myCamTag.addEventListener("loadeddata", () => {
                    myCamTag.play()
                })

                socket.on('newUserVisio', (userId) => {
                    const call = peer.call(userId[0], mediaStream)

                    // call.on("stream", (stream) => {
                    //     console.log("a")
                    //     let userCam = document.createElement("video")
                    //     userCam.id = "received"
                    //     userCam.srcObject = stream
                    //     userCam.addEventListener("loadedmetadata", () => {
                    //         userCam.play()
                    //     })
                    //     let visioDiv = document.querySelector('.visio')
                    //     visioDiv.appendChild(userCam)
                    // })
                })

                peer.on("call", (call) => {
                    call.answer(mediaStream)

                    call.on("stream", (stream) => {
                        console.log(mediaStream)
                        console.log(stream)
                        let userCam = document.createElement("video")
                        userCam.id = "received"
                        userCam.srcObject = stream
                        userCam.addEventListener("loadedmetadata", () => {
                            userCam.play()
                        })
                        let visioDiv = document.querySelector('.visio')
                        visioDiv.appendChild(userCam)
                    })
                })
                // call.on("data", (stream) => {
                //     console.log("a")
                //
                //     // userCam.srcObject = stream
                // })
                // call.on("error", (err) => {
                //     console.log(err)
                // })
                // call.on('close', () => {
                //     // endCall()
                // })
            })
    })
})
