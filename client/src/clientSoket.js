export const connectToServerSocket = (auth) => {
    const id = auth.user._id;
    const name = auth.user.firstname + " " + auth.user.secondname;
    const socket = new WebSocket('ws://localhost:4000/')
    socket.onopen = () => {
        socket.send(JSON.stringify({
            method: "connection",
            id: id,
            name:name
        }))
    }
    socket.onmessage = (e) => {
        console.log(e.data)
    }
}

