//service.controller
const serviceModel=require('../models/service.model')

exports.getAllServicesController=(req,res,next)=>{
    serviceModel.getAllServices().then(services=>{
        res.render('index',{services:services,verifUser: req.session.userId,role:req.session.role})
    })
}

exports.getAllServices=(req,res,next)=>{
    serviceModel.getAllServices().then(services=>{
        res.render('services',{services:services,verifUser:req.session.userId,role:req.session.role})
    })
}

exports.getOneServiceDetailsController=(req,res,next)=>{
    let id=req.params.id
    serviceModel.getOneServiceDetails(id).then(service=>{
        res.render('details',{service:service,verifUser: req.session.userId,role:req.session.role})
    })
}

exports.getAddServiceController =(req,res,next)=>{
    res.render('addcategorie',{verifUser: req.session.userId, role: req.session.role,Smessage:req.flash('Successmessage')[0],Emessage:req.flash('Errormessage')[0]})
}

exports.postAddServiceController=(req,res,next)=>{
    console.log(req.body)
    console.log(req.file.filename)    
    serviceModel.postDataServiceModel(req.body.nom_service,req.body.description,req.body.prix,req.body.capacite_stockage,req.body.disponibilite,req.file.filename,req.session.userId).then((msg)=>{
        req.flash('Successmessage',msg)
        res.redirect('/admin/adminservice')
    }).catch((err)=>{
        req.flash('Errormessage',err)
        res.redirect('/admin/adminservice')
    })

}



exports.getMyServicesPage=(req,res,next)=>{
    serviceModel.getMyServices().then(services=>{
        res.render('adminservice',{services:services,verifUser: req.session.userId, role: req.session.role})
    })
}


exports.deleteServiceController=(req,res,next)=>{
    let id=req.params.id
    serviceModel.deleteservice(id).then((verif)=>{
       res.redirect('/admin/adminservice')
    }).catch(error => {
            console.error('Error deleting service:', error);
            res.status(500).send('Internal Server Error');
    })
}



exports.getMyserviceUpdatePage=(req,res,next)=>{
    let id=req.params.id
    serviceModel.getPageUpdateServiceModel(id).then((service)=>{
        console.log(service)
        res.render('updateService',{serviceUpdate:service,verifUser:req.session.userId,role:req.session.role,Smessage:req.flash('Successmessage')[0],Emessage:req.flash('Errormessage')[0]})
    })

}

exports.postUpdateServiceController = (req, res, next) => { 
    if(req.file){
        serviceModel.postUpdateServiceModel(
            req.body.serviceId,
            req.body.nom_service,
            req.body.description,
            req.body.prix,
            req.body.capacite_stockage,
            req.body.disponibilite,
            req.file.filename,
            req.session.userId
        ).then((msg) => {
            req.flash('Successmessage', msg)
            res.redirect(`/admin/adminservice/update/${req.body.serviceId}`)
        }).catch((err) => {
            req.flash('Errormessage', err)
            res.redirect(`/admin/adminservice/update/${req.body.serviceId}`)
        });
    } else {
        serviceModel.postUpdateServiceModel(
            req.body.serviceId,
            req.body.nom_service,
            req.body.description,
            req.body.prix,
            req.body.capacite_stockage,
            req.body.disponibilite,
            req.body.oldImage,
            req.session.userId
        ).then((msg) => {
            req.flash('Successmessage', msg)
            res.redirect(`/admin/adminservice/update/${req.body.serviceId}`)
        }).catch((err) => {
            req.flash('Errormessage', err)
            res.redirect(`/admin/adminservice/update/${req.body.serviceId}`)
        });
    }
}