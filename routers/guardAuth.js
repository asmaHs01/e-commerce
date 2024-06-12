 exports.isAuth = (req, res, next) => {
    if (req.session.userId) {
        next();
    } else {
        res.redirect('/login');
    }
};

exports.notAuth = (req, res, next) => {
    if (req.session.userId) {
        res.redirect('/');
    } else {
        next();
    }
};


exports.isAdmin = (req, res, next) => {
    if (req.session.userId && req.session.role === 'admin') {
        next();
    } else {
        res.redirect('/login');
    }
};

exports.isUser = (req, res, next) => {
    if (req.session.userId && req.session.role === 'user') {
        next();
    } else {
        res.redirect('/login');
    }
};