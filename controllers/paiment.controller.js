const authModel = require('../models/auth.model');

exports.getPagePaiment = (req, res, next) => {
    const userId = req.session.userId;
    if (!userId) {
        req.flash('error', 'User not authenticated');
        return res.redirect('/login');
    }

    authModel.getUserById(userId).then(user => {
        if (!user) {
            req.flash('error', 'User not found');
            return res.redirect('/login');
        }
        res.render('paiment', {
            user: user,
            verifUser: req.session.userId,
            role: req.session.role
        });
    }).catch(err => {
        console.error('Error fetching user:', err);
        req.flash('error', 'An error occurred');
        res.redirect('/login');
    });
};