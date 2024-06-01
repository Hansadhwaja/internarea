const bodyParser = require("body-parser")
const express = require("express")
const jwt = require('jsonwebtoken')
const app = express();
const path = require("path")
const cors = require("cors");
const { connect } = require("./db")
const router = require("./Routes/index")
const port = process.env.PORT
const admin = require('./firebaseAdmin');

app.use(cors())
app.use(bodyParser.json({ limit: "50mb" }))
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }))
app.use(express.json())

app.get('/',(req,res)=>{
  const date = new Date().toLocaleString();
  res.send(data);
})

app.post("/login", (req, res) => {
  const { email } = req.body;


  admin.auth().createCustomToken(email)
    .then((customToken) => {
      res.json({ customToken });
    })
    .catch((error) => {
      console.error('Error creating custom token:', error);
      res.status(500).send('Error creating custom token');
    });

})

app.post("/login-msuser", (req, res) => {

  admin.auth().createCustomToken("Microsoft User")
    .then((customToken) => {
      res.json({ customToken });
    })
    .catch((error) => {
      console.error('Error creating custom token:', error);
      res.status(500).send('Error creating custom token');
    });

})

app.use("/api", router)
connect();
app.use((req, res, next) => {
  req.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Origin", "*")
  next()
})

app.listen(port, () => {
  console.log(`server is running on port:${port} `)
})