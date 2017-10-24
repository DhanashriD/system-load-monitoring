#node-service
The node backend calculates the cpu load using os.cpus(). It uses socket.emit to send the cpu load information. The node server runs
on port 8000 when you execute node app.js
Steps -
  1. npm install
  2. node app.js

# system-load-monitor
This is a react frontend, which gets realtime cpu load from node-service backend. The react-gauge is used to show the realtime system load.
It recieved the cpu-load data from the node backend using socket-io-client.
Steps - 
  1. npm install  
  2. npm run build
  3. npm start
In your browser open http://localhost:3000/ 


