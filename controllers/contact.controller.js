const contactModel = require('../models/contact.model');

exports.getContactController = (req, res, next) => {
    contactModel.getContact().then(contacts => {
        if (contacts.length > 0) {
            res.render('contact', { contact: contacts[0], verifUser:req.session.userId,role:req.session.role });
        } else {
            res.render('contact', { contact: {}, verifUser:req.session.userId,role:req.session.role});
        }
    });
}


exports.getUpdateContactController = (req, res, next) => {
    contactModel.getContact().then(contacts => {
        if (contacts.length > 0) {
            res.render('updatecontact', { contact: contacts[0],verifUser:req.session.userId,role:req.session.role });
        } else {
            res.render('updatecontact', { contact: {}, verifUser:req.session.userId,role:req.session.role });
        }
    });
}


exports.postUpdateContactController = (req, res, next) => {
    const contactId = req.params.contactId; // Assuming contactId is passed as a parameter in the request URL
    const { titre_contact, text_contact } = req.body; // Assuming titre_contact and text_contact are passed in the request body

    // Call the model function to update the contact
    contactModel.postUpdateContactModel(contactId,titre_contact,text_contact)
        .then(() => {
            res.status(200);
        })
        .catch(() => {
            // Error occurred while updating contact
            res.status(500);
        });
};


