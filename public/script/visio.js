let usersCam = []

socket.on("connectedVisio", (usersAlreadyConnect) => {
    let myId = h1.getAttribute("data-my-id")
    let myCamTag = document.createElement("img")
    let visio = document.querySelector('.visio')

    usersCam.push({ user: { userId: myId, tag: myCamTag } })
    myCamTag.id = myId
    visio.appendChild(myCamTag)

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
    // setTimeout(() => {
        let visio = document.querySelector('.visio')
        visio.appendChild(userCam)
        usersCam.push({ user: { userId: userId, tag: userCam } })
    // },1000)
})

socket.on('newImageForVisio', (clientId, image) => {
    usersCam.forEach(userCam => {
        if (userCam.user.userId === clientId){
            userCam.user.tag.src = 'data:image/jpeg;base64,'+image
        }
    })
})