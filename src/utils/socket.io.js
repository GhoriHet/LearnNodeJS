const { Server } = require("socket.io")

const connectSocket = () => {
    const io = new Server({
        cors: {
            origin: '*',
            credentials: true,
            methods: ['GET', 'POST']
        }
    });

    io.on("connection", (socket) => {
        // console.log('User connected:', socket.id);

        io.emit("send-message", "My event is occured!") //all
        // socket.broadcast.emit("send-message", "My event is occured!") //all exept itself

        socket.on("message", ({ room, message }) => {

            io.to(room).emit("receive-message", message)
        });

        socket.on("join_group", (groupID, message) => {
            socket.join(groupID)
            io.to(groupID).emit("join_group", message)
        })
    });

    io.listen(4000);
}

module.exports = connectSocket