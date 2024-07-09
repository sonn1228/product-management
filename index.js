const moment = require('moment');
const path = require('path');
const session = require('express-session')
const cookieParser = require('cookie-parser')
const flash = require('express-flash')
const express = require('express');
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const database = require('./config/database');
require('dotenv').config()
const adminRoutes = require('./routes/admin');
const clientRoutes = require('./routes/client');
const systemConfig = require('./config/system');
const app = express();
const port = process.env.PORT;

// tinymce
app.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce')));

// express flash
app.use(cookieParser('keyboard cat'));
app.use(session({ cookie: { maxAge: 60000 } }));
app.use(flash());

// body parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.urlencoded({ extended: false }))
// method override
app.use(methodOverride('_method'))

// app local variable: Chỉ dùng ở trong file pug
app.locals.prefixAdmin = systemConfig.prefixAdmin;
app.locals.moment = moment;
// system config


// connect database
database.connect();
// static dir
app.use(express.static(`${__dirname}/public`));
// view dir 
app.set('views', `${__dirname}/views`);


// routes
adminRoutes(app);
clientRoutes(app);







app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})