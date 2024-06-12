const  mongoose = require('mongoose')
const bcrypt=require('bcrypt')


var schemaAuth=mongoose.Schema({
        firstname:String,
        lastname:String,
        email:String,
        age:Number,
        password:String,
        role: { type: String, enum: ['admin', 'user'], default: 'user' }
})


var User=mongoose.model('user',schemaAuth)
var url="mongodb://localhost:27017/ProjetPfe"


exports.registerFunctionModel = (firstname, lastname, email, age, password, role = 'user') => {
    return new Promise((resolve, reject) => {
        mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => User.findOne({ email: email }))
            .then(user => {
                if (user) {
                    mongoose.disconnect();
                    reject('Oops! Email already exists. Please try again with a different email address');
                } else {
                    return bcrypt.hash(password, 10);
                }
            })
            .then(hPassword => {
                let user = new User({
                    firstname: firstname,
                    lastname: lastname,
                    email: email,
                    age: age,
                    password: hPassword,
                    role: role
                });
                return user.save();
            })
            .then(user => {
                mongoose.disconnect();
                resolve('registered');
            })
            .catch(err => {
                mongoose.disconnect();
                reject(err);
            })
    })
}


exports.loginFunctionModel = (email, password) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
            return User.findOne({ email: email });
        }).then((user) => {
            if (user) {
                bcrypt.compare(password, user.password).then((verif) => {
                    if (verif) {
                        mongoose.disconnect();
                        resolve(user); // Resolve with the user object
                    } else {
                        mongoose.disconnect();
                        reject("Sorry, the password entered is incorrect. Try again");
                    }
                });
            } else {
                mongoose.disconnect();
                reject("Sorry, user not found. Please verify and try again");
            }
        }).catch((err) => {
            mongoose.disconnect();
            reject(err);
        });
    });
};


exports.getAllUsers=()=>{
    return new Promise((resolve,reject)=>{
       mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
          return  User.find({})

   }).then(users=>{
      mongoose.disconnect()
      resolve(users)

   }).catch(err=>reject(err))

 })
}
       
exports.getUserById = (userId) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => {
                return User.findById(userId)
            })
            .then((user) => {
                mongoose.disconnect()
                resolve(user)
            })
            .catch((err) => {
                mongoose.disconnect()
                reject(err)
            })
    })
}


exports.deleteUser = (userId) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
            return User.deleteOne({ _id: userId });
        }).then(() => {
            mongoose.disconnect();
            resolve();
        }).catch(err => reject(err));
    });
};

exports.updateUserRole = (userId, newRole) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
            return User.findByIdAndUpdate(userId, { role: newRole }, { new: true });
        }).then((updatedUser) => {
            mongoose.disconnect();
            resolve(updatedUser);
        }).catch(err => {
            mongoose.disconnect();
            reject(err);
        });
    });
};