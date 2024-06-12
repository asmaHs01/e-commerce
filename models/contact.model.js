const mongoose = require('mongoose');

var schemaContact = mongoose.Schema({
    titre_contact: String,
    text_contact: String
   
});

var Contact = mongoose.model('contact', schemaContact);
var url = "mongodb://localhost:27017/ProjetPfe";



exports.getContact = () => {
    return new Promise((resolve, reject) => {
        mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true}).then(() => {
            return Contact.find({});
        }).then(contacts => {
            mongoose.disconnect();
            resolve(contacts);
        }).catch((err) => {
            mongoose.disconnect();
            reject(err);
        });
    });
}

 exports.postUpdateContactModel=(contactId,titre_contact,text_contact)=>{

    return new Promise((resolve,reject)=>{
        mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{

         return Contact.updateOne({_id:contactId},{titre_contact:titre_contact,text_contact:text_contact})
        }).then(()=>{
            mongoose.disconnect()
            resolve('Your contact page has been successfully updated!')
        }).catch((err)=>{
            mongoose.disconnect()
            reject(err)
        })
    })

} 




