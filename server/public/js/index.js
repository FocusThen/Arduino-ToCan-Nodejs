const socket = io.connect("localhost:3000");

// document.addEventListener("DOMContentLoaded", onDomReadyHandler);

function onDomReadyHandler(event) {
  socket.on("carInfo", (data) => {
    const clean = data.rawData.filter((x) => x !== "");
    console.log(data.id, clean);
  });
}
