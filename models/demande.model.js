// demande.model.js
const mongoose = require('mongoose');

const schemaDemande = mongoose.Schema({
    name: String,
    email: String,
    phone: Number,
    company: String,
    message: String
});

const Demande = mongoose.model('demande', schemaDemande);

exports.getAllDemandes = (url) => {
    return mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
            return Demande.find({});
        })
        .catch(err => {
            console.error('Error fetching demands:', err);
            throw err;
        });
};

exports.postDataDemandeModel = (name,email,phone,company,message) => {
    return new Promise((resolve,reject) => {
        mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => {
                let demande =new Demande({
                name:name,
                email:email,
                phone:phone,
                company:company,
                message:message
            })
           return demande.save()


        }).then(()=>{
            mongoose.disconnect()
            resolve('Your demande has been successfully added. !')
        }).catch((err)=>{
            mongoose.disconnect()
            reject(err)
        })
    })
   }

   