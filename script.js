const socket = io();

document.getElementById("startBtn").addEventListener("click", () => {

    const city =
        document.getElementById("city").value;

    const interval =
        parseInt(document.getElementById("interval").value);

    socket.emit("startWeather", {
        city,
        interval
    });
});

socket.on("weatherUpdate", (data) => {

    document.getElementById("cityName").textContent =
        data.city;

    document.getElementById("temperature").textContent =
        data.temperature;

    document.getElementById("precipitation").textContent =
        data.precipitation;

    document.getElementById("pressure").textContent =
        data.pressure;

    document.getElementById("wind").textContent =
        data.windSpeed;

    document.getElementById("time").textContent =
        data.time;
});