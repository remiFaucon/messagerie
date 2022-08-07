socket.on("callNotification", (userId) => {
    let notif = document.querySelector(".notification")
    notif.querySelector("img").src = "/assets/images/telephone.png"
    console.log(document.getElementById(userId))
    notif.querySelector("p").innerText = document.getElementById(userId).innerText + " t'appel"
    let audio = notif.querySelector("audio")
    audio.src = "/assets/sounds/call.mp3"
    audio.addEventListener("loadedmetadata", () => {
        audio.play()
    })
    document.querySelector(".notifications").classList.remove("hidden")
})