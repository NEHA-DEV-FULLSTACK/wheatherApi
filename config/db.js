const mongoose=require('mongoose');

const ConnectDB =async()=>{
    try{
        const uri = "mongourl";
        await mongoose.connect(uri,{
            useNewUrlParser:true,
            useUnifiedTopology:true,
        });
        console.log('MongoDB connected');
    }catch(err){
        console.error(err.message);
        process.exit(1);
    }
};

module.exports=ConnectDB;
