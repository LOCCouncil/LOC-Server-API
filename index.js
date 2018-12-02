const express = require('express');
const app = express();
const os = require('os');
const si = require('systeminformation');
const port = 80

const server = app.listen(port, function() {
    console.log(`API is now running on port ${port}`);
});

const router = express.Router();

app.get('/os', function (req, res) {
    const gbU =  os.totalmem / 1000000000;
    const gbR = Math.round(gbU);
      
    const freegbU = os.freemem / 1000000000;
    const freegbR = Math.round(freegbU);
    const freegbF = gbR - freegbR;
  
    const hours = os.uptime / 1440;
    const sysuptime = Math.floor(hours);
    const days = hours / 24;
    const sysuptimeDays = Math.round(days);
    const thisObject = {
        name: os.hostname(),
        type: os.type(),
        info: {
            name: si.osInfo().then(d => d.distro),
            hostname: os.hostname(),
            type: os.type(),
        },
        cpu: {
            name: os.cpus()[0].model,
            cores: os.cpus().length,
            usage: process.cpuUsage().user
        },
        memory: `${freegbF}GB/${gbR}GB`,
        uptime: `${sysuptimeDays} days | ${sysuptime} total hours`
    }
    res.status(200).send(thisObject);
});

/*app.post('/node/:process', function (req, res) {
    const { execFile } = require('child_process');
const child = execFile('node', [`${req.body}`], (error, stdout, stderr) => {
  if (error) {
    res.status(400).send(error);
  }
  res.status(400).send(stdout);
});
})*/

