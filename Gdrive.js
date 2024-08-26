const {google} = require('googleapis'); 
const auth = new google.auth.GoogleAuth({
    keyFile: './private/realtimechat59-4f88949d8c8b.json',
    scopes: ['https://www.googleapis.com/auth/drive'],
  });
const drive = google.drive({version: 'v3', auth});
console.log('google drive connected...');

module.exports = {drive};























// async function getStorageQuota() {
//     try {
//       const response = await drive.about.get({
//         fields: 'storageQuota'
//       });
//       const quota = response.data.storageQuota;
//       console.log(`Total Storage: ${quota.limit}`);
//       console.log(`Used Storage: ${quota.usage}`);
//       console.log(`Remaining Storage: ${quota.limit - quota.usage}`);
//     } catch (error) {
//       console.error('Error retrieving storage quota:', error);
//     }
//   }

// async function createDir(fileName){
//     const folderName = 'Video';
//     const fileMetadata = {
//         'name': folderName,
//         'mimeType': 'application/vnd.google-apps.folder'
//     };

//     const folder = await drive.files.create({
//         resource: fileMetadata,
//         fields: 'id'
//     });

//     return folder.data.id;
// }

