socket.on('thisIsYourId', (myId) => {
    let notifications = document.querySelector(".notifications")

    socket.on("callNotification", (userId) => {
        newNotif(userId, "call")
    })

    socket.on("messageNotification", (userId) => {
        newNotif(userId, "message")
    })

    notifications.addEventListener("notif", () => {
        notifications.querySelectorAll(".notification").forEach(notif => {
            notif.addEventListener("click", (pointer) => {
                if (pointer.path[0] !== notif.querySelector('.cancel')) {
                    let other = notif.id
                    console.log(notif.classList)
                    if (notif.classList[1] === "call") {
                        document.dispatchEvent(new Event("visio"))
                    } else {
                        visioLayout.classList.add('hidden')
                        messengerLayout.classList.remove('hidden')
                        socket.emit('changeRoom', myId, notif.id)
                        let h2 = document.querySelector('h2')
                        h2.innerText = document.getElementById("connected").querySelector("#" + notif.id).innerText
                    }
                }
                notif.remove()
            })
        })
    })

    function newNotif(userId, type) {
        let a = {
            call: {
                class: "call",
                img: "/assets/images/telephone.png",
                msg: document.getElementById(userId).innerText + " t'appel",
                audio: "/assets/sounds/call.mp3"
            },
            message: {
                class: "message",
                img: "/assets/images/message.png",
                msg: document.getElementById(userId).innerText + " t'as envoyé un message",
                audio: "/assets/sounds/message.mp3"
            }
        }

        let notif = notifications.querySelector(".notificationLayout").cloneNode(true)
        notif.classList.remove("notificationLayout")
        notif.classList.add("notification")
        notif.classList.add(a[type].class)
        notif.id = userId
        notif.querySelector("img").src = a[type].img
        notif.querySelector("p").innerText = a[type].msg
        let audio = notif.querySelector("audio")
        audio.src = a[type].audio
        audio.addEventListener("loadedmetadata", () => {
            audio.play()
        })
        notifications.appendChild(notif)
        notifications.dispatchEvent(new Event("notif"))
    }
})