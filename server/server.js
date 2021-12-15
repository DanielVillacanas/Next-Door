const app = require("./app");
const socket = require("socket.io");
const PORT = process.env.PORT || 5005;

const server = app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`);
});

const io = socket(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

let users = [];

const addUser = (userId, socketId) => {
<<<<<<< HEAD
  console.log({ userId, socketId });
  !users.some((user) => user.userId === userId) && users.push({ userId, socketId });
=======
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
>>>>>>> b7caf481595d8dccedb41e70d6c6bcfd0fdf81b3
};

const getUser = (receiverId) => {
  console.log(users);
  return users.find((user) => user.userId === receiverId);
};

io.on("connection", (socket) => {
  socket.on("addUser", (userId) => {
    console.log("usuario conectado");
    addUser(userId, socket.id);
    io.emit("getUsers", users);
  });

  // socket.on("sendMessage", () => {
  //   const user = getUser(receiverId);
  //   io.to(user.socketId).emit("getMessage", {
  //     senderId,
  //     text,
  //   });
  // });

  socket.on("sendMessageRomm", (roomId, { senderId, text }) => {
    console.log(roomId, { senderId, text });
    io.emit(`sentToFront${roomId}`, {
      senderId,
      text,
    });
  });

<<<<<<< HEAD
  // socket.on("disconnect", (userId) => {
  //   removeUser(socket.id);
  //   io.emit("getUsers", users);
  // });
=======
  socket.on("disconnect", (userId) => {
    console.log("usuario desconectado");
  });
>>>>>>> b7caf481595d8dccedb41e70d6c6bcfd0fdf81b3
});
