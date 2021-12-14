import React, { useState, useEffect } from "react";
import io from "socket.io-client";

let socket;
const CONNECTION_PORT = "localhost:3000/";

export default function Chat(props) {
  let encrypt = [props.user._id, props.id];
  let roomId = encrypt.join("");
  console.log(roomId);
  const [room, setRoom] = useState(roomId);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    socket = io(CONNECTION_PORT);
  }, [CONNECTION_PORT]);

  const connetToRoom = () => {
    socket.emit("join_room", room);
  };
  return <>asd</>;
}
