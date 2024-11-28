import expressLayouts from 'express-ejs-layouts';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import express from 'express';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import flash from 'express-flash';
import methodOverride from 'method-override';
import moment from 'moment';
import dotenv from 'dotenv';
import database from './config/database.js';
import adminRoutes from './routes/admin/index.js';
import clientRoutes from './routes/client/index.js';
import systemConfig from './config/system.js';

dotenv.config(); // Load environment variables

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

// Middleware configuration
app.use('/tinymce', express.static(path.join(__dirname, process.env.TINYMCE_PATH || '../node_modules/tinymce')));
app.use(cookieParser(process.env.COOKIE_SECRET || 'default_secret'));
app.use(session({
  secret: process.env.SESSION_SECRET || 'default_secret',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }
}));

app.use(flash());
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));

// App local variables
app.locals.prefixAdmin = systemConfig.prefixAdmin;
app.locals.moment = moment;

// Connect to the database
database();

// Static and view directories
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

// Route handling
adminRoutes(app);
clientRoutes(app);

// Handle 404 errors
app.get('*', (req, res) => {
  res.status(404).render('client/pages/errors/404.ejs'); // Use '404.ejs' if you want a consistent view engine
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
