const cron = require('node-cron');
const { admin, db} = require('./firebase');
const { drive } = require('./Gdrive');

async function deleteFile(file_id){
    console.log(file_id);
    try{
        await drive.files.delete({fileId : file_id});
        console.log(`File with ID: ${file_id} has been deleted.`);
    }catch(err){
        console.error('File deletion failed', err);
    }
}

const cleanUpOldChats = async()=>{
    try{
        const fiveHourAgoMillis = admin.firestore.Timestamp.now().toMillis() - (5*3600*1000);
        const fiveHourAgo = new admin.firestore.Timestamp( Math.floor(fiveHourAgoMillis/1000), (fiveHourAgoMillis%1000)*1000000);
        const chatRef = db.collection('chat');
        console.log(fiveHourAgo);
        const snapShot = await chatRef.where('timestamp', '<', fiveHourAgo).get();
        if(snapShot.empty){
            console.log('Database is already clean');
        }
        else{
            console.log(`Database is cleaning......(total: ${snapShot.docs.length})`);
            const batch = db.batch();
            for(const doc of snapShot.docs){
                const data = doc.data();
                if(data.type!=='text') await deleteFile(data.content);
                batch.delete(doc.ref);
            }
            await batch.commit();
            console.log('Database is clean');
        }

    }catch(err){
        console.error('Error cleaning database', err);
    }
}


cron.schedule('* * * * *', cleanUpOldChats);

cleanUpOldChats();