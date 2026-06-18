const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static("public"));

io.on("connection", (socket) => {
    console.log("Клієнт підключився");

    let intervalId;

    socket.on("startWeather", (data) => {

        const city = data.city;
        const interval = data.interval;

        clearInterval(intervalId);

        intervalId = setInterval(() => {

            const weather = {
                city: city,
                temperature: (Math.random() * 40 - 10).toFixed(1),
                precipitation: (Math.random() * 100).toFixed(0),
                pressure: (950 + Math.random() * 100).toFixed(0),
                windSpeed: (Math.random() * 20).toFixed(1),
                time: new Date().toLocaleTimeString()
            };

            socket.emit("weatherUpdate", weather);

        }, interval);

    });

    socket.on("disconnect", () => {
        clearInterval(intervalId);
        console.log("Клієнт відключився");
    });
});

server.listen(3000, () => {
    console.log("Server started on port 3000");
});