const admin = require('firebase-admin');
const serviceAccount = require('./private/realtimechat-ea555-firebase-adminsdk-rhfxu-27e6017626.json');

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
  console.log('firebase initialized...');
}


const db = admin.firestore();
module.exports = {admin, db};
