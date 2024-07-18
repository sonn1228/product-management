"use strict";

var moment = require('moment');

var path = require('path');

var session = require('express-session');

var cookieParser = require('cookie-parser');

var flash = require('express-flash');

var express = require('express');

var bodyParser = require('body-parser');

var methodOverride = require('method-override');

var database = require('./config/database');

require('dotenv').config();

var adminRoutes = require('./routes/admin');

var clientRoutes = require('./routes/client');

var systemConfig = require('./config/system');

var app = express();
var port = process.env.PORT; // socket io

var _require = require('node:http'),
    createServer = _require.createServer;

var _require2 = require('socket.io'),
    Server = _require2.Server;

var server = createServer(app);
var io = new Server(server);
global._io = io; // tinymce

app.use('/tinymce', express["static"](path.join(__dirname, 'node_modules', 'tinymce'))); // express flash

app.use(cookieParser('keyboard cat'));
app.use(session({
  cookie: {
    maxAge: 60000
  }
}));
app.use(flash()); // body parser

app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.urlencoded({
  extended: false
})); // method override

app.use(methodOverride('_method')); // app local variable: Chỉ dùng ở trong file pug

app.locals.prefixAdmin = systemConfig.prefixAdmin;
app.locals.moment = moment; // system config
// connect database

database.connect(); // static dir

app.use(express["static"]("".concat(__dirname, "/public"))); // view dir 

app.set('views', "".concat(__dirname, "/views")); // routes

adminRoutes(app);
clientRoutes(app);
app.get("*", function (req, res) {
  res.render('client/pages/errors/404.pug');
}); // app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`);
// })

server.listen(3000, function () {
  console.log("server running at http://localhost:".concat(port));
});