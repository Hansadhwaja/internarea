const admin = require('firebase-admin');
const serviceAccount = require('../backend/intern-area-d2680-firebase-adminsdk-pm9na-1f6bdd812b.json'); 

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

module.exports = admin;
