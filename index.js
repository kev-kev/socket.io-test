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
  socket.broadcast.emit("user joined");
  socket.username = "Guest"
  
  socket.on("set username", (username) => {
    socket.username = username;
  });

  socket.on("disconnect", () => {
    io.emit("user disconnected");
  });

  socket.on("chat message", (msg) => {
    socket.broadcast.emit("chat message", {msg, username: socket.username});
  });
});
