// server.js
import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8080 });

wss.on("connection", (ws) => {
  console.log("Cliente conectado");

  // Cuando llega un mensaje de un cliente
  ws.on("message", (message) => {
    console.log("Mensaje recibido:", message.toString());

    // Reenviar el mensaje a todos los clientes conectados
    wss.clients.forEach((client) => {
      if (client.readyState === ws.OPEN) {
        client.send(message.toString());
      }
    });
  });

  ws.on("close", () => console.log(" liente desconectado"));
});

console.log("Servidor WebSocket corriendo en ws://localhost:8080");
