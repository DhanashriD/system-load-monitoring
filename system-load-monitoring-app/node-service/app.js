const express = require('express');
const app = express();
const os = require('os');
const cors = require('cors');
const http = require("http");
const socketIo = require("socket.io");
const server = http.createServer(app);
const io = socketIo(server);
const port = process.env.PORT || 8000;

app.use(cors());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header('Access-Control-Allow-Methods', 'DELETE, PUT, GET, POST');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/app.html');
});

function calculateLoad() {
    const cpus = os.cpus()

    return cpus.map(cpu => {
        const times = cpu.times
        return {
            tick: Object.keys(times).filter(time => time !== 'idle').reduce((tick, time) => { tick += times[time]; return tick }, 0),
            idle: times.idle,
        }
    })
}

io.on("connection", socket => {
    console.log("New client connected"), setInterval(
        () => getDataAndEmit(socket),
        10000
    );
    socket.on("disconnect", () => console.log("Client disconnected"));
});

let startMeasures = calculateLoad()
const getDataAndEmit = function(socket) {
    const endMeasures = calculateLoad()
    const percentageCPU = endMeasures.map((end, i) => {
        return ((end.tick - startMeasures[i].tick) / (end.idle - startMeasures[i].idle) * 100).toFixed(3)
    })

    socket.emit("FromAPI", percentageCPU);
};

server.listen(port, () => console.log(`Listening on port ${port}`));