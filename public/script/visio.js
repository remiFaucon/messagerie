let camImg = document.querySelector(".headChat img")
let usersCam = []

camImg.addEventListener("click", () => {
    let room = document.querySelector("h2").getAttribute('data-room-id')
    socket.emit("newVisio", room)
    let myCamTag = document.createElement("img")
    let myId = h1.getAttribute("data-my-id")
    myCamTag.id = myId
    usersCam.push({ user: { userId: myId, tag: myCamTag } })
    let visio = document.querySelector('.visio')
    visio.appendChild(myCamTag)
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
            userCam.user.tag.src = 'data:image/jpeg;base64,'+image
        }
    })
})