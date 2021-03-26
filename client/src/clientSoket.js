export const connectToServerSocket = (user,project) => {
    const id = user._id;
    const name = user.firstname + " " + user.secondname;
    const socket = new WebSocket('ws://localhost:4000/')
    socket.onopen = () => {
        console.log("You connect to server")
        socket.send(JSON.stringify({
            method: "connection",
            id: id,
            name:name,
            project_id: project._id
        }))
    }
    socket.onmessage = (e) => {
        console.log(e.data)
    }
}

