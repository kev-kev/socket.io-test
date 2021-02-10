const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

http.listen(3000, () => {
  console.log("listening on *:3000");
});

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.broadcast.emit("user joined");

  socket.on("disconnect", () => {
    console.log("a user disconnected");
    io.emit("user disconnected");
  });

  socket.on("chat message", (msg) => {
    console.log("message: " + msg);
    socket.broadcast.emit("chat message", msg);
  });
});