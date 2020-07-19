// server
const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);

// port
const SerialPort = require("serialport");
const Readline = require("@serialport/parser-readline");
const port = new SerialPort("COM4", { baudRate: 38400 });
const parser = new Readline();
port.pipe(parser);

parser.on("data", (receiveData) => {
  const arrData = receiveData.split(",");
  const id = parseInt(arrData[0]);
  const rawData = arrData[1].split("-");
  const data = {
    id,
    rawData,
  };
  io.emit("carInfo", data);
});

server.listen(5000, ()=> console.log('server is running'));
