const express = require('express');
const mongoose  = require('mongoose');
const fileUpload = require('express-fileupload')
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const session = require('express-session');
const { requireAuth, checkUser } = require('./server/authMiddleware/authMiddleware');


const app = express();
const PORT = 5500 || process.env.PORT;

//middlewares
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
// use file-upload // to import pictures to our website but we required it first above
app.use(fileUpload());
app.use(methodOverride('_method'));

// set view engine
app.set('view engine', 'ejs');

//DB config
const db ='mongodb+srv://pius1:pius123@webdevelopment.xav1dsx.mongodb.net/cryptoguidetrades';
//connect to mongodb
mongoose.connect(db)
.then(()=>{
    console.log('MongoDB Connected')
})
.catch(err =>{console.log(err)})

// Express session
app.use(
    session({
      secret: 'secret',
      resave: true,
      saveUninitialized: true
    })
  );

// Connect flash
app.use(flash());

// Global variables
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

app.get('*', checkUser);
app.use('/', require('./server/Route/indexRoute'));
app.use('/',requireAuth,checkUser, require('./server/Route/userRoute.js'));
app.use('/', require('./server/Route/adminRoute'));

app.listen(PORT, console.log(`Server running on  ${PORT}`));



