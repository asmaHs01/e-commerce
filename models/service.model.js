//service.model
const mongoose=require('mongoose')

var schemaService=mongoose.Schema({
        nom_service:String,
        description:String,
        prix:Number,
        capacite_stockage:String,
        disponibilite:String,
        image:String,
        userId:String
        
    })

var Service=mongoose.model('service',schemaService)
var url="mongodb://localhost:27017/ProjetPfe"


exports.getAllServices=()=>{
    return new Promise((resolve,reject)=>{
       mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
          return  Service.find({})
   }).then(services=>{
      mongoose.disconnect()
      resolve(services)
   }).catch(err=>reject(err))
 })
}


exports.getOneServiceDetails=(id)=>{
    return new Promise((resolve,reject)=>{

       mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
          return  Service.findById(id)

   }).then(services=>{
      mongoose.disconnect()
      resolve(services)

   }).catch(err=>reject(err))

 })
}


exports.postDataServiceModel=(nom_service,description,prix,capacite_stockage,disponibilite,image,userId)=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{

            let service=new Service({
                nom_service:nom_service,
                description:description,
                prix:prix,
                capacite_stockage:capacite_stockage,
                disponibilite:disponibilite,
                image:image,
                userId:userId
            })
           return service.save()


        }).then(()=>{
            mongoose.disconnect()
            resolve('Your service has been successfully added. !')
        }).catch((err)=>{
            mongoose.disconnect()
            reject(err)
        })
    })
   }


exports.getMyServices=()=>{
    return new Promise((resolve,reject)=>{
       mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
          return  Service.find({})

   }).then(services=>{
      mongoose.disconnect()
      resolve(services)

   }).catch(err=>reject(err))

 })
}

exports.deleteservice=(id)=>{
    return new Promise((resolve,reject)=>{

       mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
          return  Service.deleteOne({_id:id})

   }).then(()=>{
      mongoose.disconnect()
      resolve(true)

   }).catch(err=>reject(err))

 })
}


exports.getPageUpdateServiceModel=(id)=>{
    return new Promise((resolve,reject)=>{
    
     mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
         return Service.findById(id)  
       }).then(services=>{
           mongoose.disconnect()
           resolve(services)
       }).catch(err=>reject(err))
    });
 }


exports.postUpdateServiceModel=(serviceId,nom_service,description,prix,capacite_stockage,disponibilite,filename,userId) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(url, {useNewUrlParser:true, useUnifiedTopology:true}).then(() => {
          return Service.updateOne(
            {_id: serviceId},{nom_service:nom_service,description:description,prix:prix,capacite_stockage:capacite_stockage,disponibilite:disponibilite,image:filename,userId:userId});
        }).then(() => {
            mongoose.disconnect();
            resolve('Updated!');
        }).catch((err) => {
            mongoose.disconnect();
            reject(err);
        });
    });
}
