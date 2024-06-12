// adminDemande.controller.js
const Demande = require('../models/demande.model');

exports.getAllDemandesController = (req, res, next) => {
    const url = "mongodb://localhost:27017/ProjetPfe"; // Define your MongoDB connection URL here
    Demande.getAllDemandes(url)
        .then(demands => {
            res.render('demandedevis', { demands: demands });
        })
        .catch(error => {
            console.error('Error fetching demands:', error);
            res.status(500).send('Internal Server Error');
        });
};

exports.getAddDemandeController =(req,res,next)=>{
    res.render('contact',{verifUser: req.session.userId, role: req.session.role})
}
exports.postAddDemandeController = (req,res,next) => {
    console.log(req.body);
    Demande.postDataDemandeModel(req.body.name,req.body.email,req.body.phone,req.body.company,req.body.message)
        .then(() => {
            res.redirect('/contact');
        })
        .catch((err) => {
            res.redirect('/contact');
        });
};