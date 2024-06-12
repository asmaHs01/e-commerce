const User = require('../models/auth.model')


exports.getAllUsersController=(req,res,next)=>{
    User.getAllUsers().then(users=>{
        res.render('tableusers',{users:users,verifUser: req.session.userId,role:req.session.role})
    })
}

exports.getOneUserDetailsController=(req,res,next)=>{
    let userId=req.params.userId
    User.getUserById(userId).then(user=>{
        res.render('userdetails',{user:user,verifUser: req.session.userId,role:req.session.role})
    })
}


exports.deleteUserController=(req,res,next)=>{
    let id=req.params.id
    User.deleteUser(id).then((verif)=>{
       res.redirect('/admin/tableusers')
    }).catch(error => {
            console.error('Error deleting user:', error);
            res.status(500).send('Internal Server Error');
    })
}

exports.getAddUserController =(req,res,next)=>{
    res.render('addusers',{verifUser: req.session.userId, role: req.session.role})
}

exports.postAddUserController=(req,res,next) => {
    console.log('Received form data:', req.body);

    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const email = req.body.email;
    const age = req.body.age;
    const password = req.body.password;

    if (!firstname || !lastname || !email || !age || !password) {
        req.flash('error', 'All fields are required');
        return res.redirect('/admin/addusers')
    }

    User.registerFunctionModel(firstname, lastname, email, age, password)
        .then(() => {
            req.flash('Successmessage','User has been successfully added!')
            res.redirect('/admin/tableusers')
        })
        .catch(err => {
            req.flash('Errormessage', err.message);
            res.redirect('/admin/addusers')
        })
}

exports.updateUserRoleController = (req, res, next) => {
    const userId = req.params.userId;
    const newRole = req.body.role;

    if (!newRole || !['user', 'admin'].includes(newRole)) {
        req.flash('Errormessage', 'Invalid role');
        return res.redirect('/admin/tableusers');
    }

    User.updateUserRole(userId, newRole)
        .then(() => {
            req.flash('Successmessage', 'User role updated successfully!');
            res.redirect('/admin/tableusers');
        })
        .catch(err => {
            console.error('Error updating user role:', err);
            req.flash('Errormessage', 'Failed to update user role');
            res.redirect('/admin/tableusers');
        });
};