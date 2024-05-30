const express = require('express');
const History = require('../Model/History');
const router = express.Router();

router.post('/', async (req, res) => {
    const userInfo = req.body;
    const ipAddress = req.headers['x-forwarded-for'] || req.socket.remoteAddress ;

    // Log or process the data as needed
    console.log(`Browser: ${userInfo.browser}`);
    console.log(`OS: ${userInfo.os}`);
    console.log(`Device Type: ${userInfo.deviceType}`);
    console.log(`IP Address: ${ipAddress}`);
    console.log(`UID:${userInfo.uid}`);
    const historyData ={
        browser:userInfo.browser,
        os:userInfo.os,
        deviceType:userInfo.deviceType,
        IPAddress:ipAddress,
        uid:userInfo.uid
    }

   const data = await History.create(historyData);
   console.log(data);

    res.json({ status: 'success' });
});

router.get('/', async (req, res) => {
   
   const data = await History.find({});
    res.send(data);
});


module.exports = router