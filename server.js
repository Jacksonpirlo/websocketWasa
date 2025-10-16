// server.js
import { WebSocketServer } from "ws";

const port = process.env.PORT || 8080;
const wss = new WebSocketServer({ port });

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

  ws.on("close", () => console.log("Cliente desconectado"));
});

console.log(`Servidor WebSocket corriendo en puerto ${port}`);
