const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const RouterService = require('./routers/service.route');
const RouterAuth = require('./routers/auth.route');
const routeContact = require('./routers/contact.route');
const routePaiment = require('./routers/paiment.route');
const routeSolution = require('./routers/solution.route');
const routeAdminUser = require('./routers/adminUser.route');
const routeAbout = require('./routers/about.route');
const routeDemandeAdmin = require('./routers/admin.route');
const GuardAuth = require('./routers/guardAuth');
const Services = require('./routers/allservice');
const Myservices = require('./routers/myservices.route');
const session = require('express-session');
const MongoDbStore = require('connect-mongodb-session')(session);
const flash = require('connect-flash');

const app = express();

app.use(express.static(path.join(__dirname, 'assets')));
app.set('view engine', 'ejs');
app.set('views', 'views');

var Store = new MongoDbStore({
    uri: 'mongodb://localhost:27017/ProjetPfe',
    collection: 'sessions'
});

app.use(flash());

app.use(session({
    secret: "secret key is gseythsbddjklsueyrylvnmpoavwgqfrdyndb",
    cookie: {
        maxAge: 360000000000 
    },
    store: Store,
    resave: true,
    saveUninitialized: true
}));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', RouterService);
app.use('/', RouterAuth);
app.use('/admin/adminservice', Myservices);
app.use('/', routeContact);
app.use('/', routeSolution);
app.use('/', routeAbout);
app.use('/', routePaiment);
app.use('/', Services);
app.use('/', routeAdminUser);
app.use('/', routeDemandeAdmin);

app.get('/admin/adminservice', GuardAuth.isAuth, GuardAuth.isAdmin, (req, res, next) => {
    res.render('adminservice');
});

app.get('/admin', GuardAuth.isAuth, GuardAuth.isAdmin, (req, res, next) => {
    res.render('admin');
});

app.get('/admin/admin', GuardAuth.isAuth, GuardAuth.isAdmin, (req, res, next) => {
    res.render('admin');
});

app.get('/admin/addusers', GuardAuth.isAuth, GuardAuth.isAdmin, (req, res, next) => {
    res.render('addusers');
});

app.listen(2002, () => console.log('server running'));
