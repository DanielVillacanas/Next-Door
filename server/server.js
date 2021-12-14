const app = require("./app");
const socket = require("socket.io");
const PORT = process.env.PORT || 5005;

const server = app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`);
});

io = socket(server);

io.on("connection", (socket) => {
  console.log(socket.id);

  socket.on("join _room", (data) => {
    socket.join(data);
    console.log("User Connect");
  });

  socket.on("disconnect", () => {
    console.log("User disconnect");
  });
});
