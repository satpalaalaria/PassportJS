const express=require('express');
const authRoutes=require('./routes/auth-routes');
const profileRoutes=require('./routes/profile');
const passportSetup=require('./config/passport-setup');
const knex=require('./modules/user')
const cookieSession=require('cookie-session');
const passport=require('passport');

const app=express();

//set up view engine

app.set('view engine','ejs');


app.use(cookieSession({
    maxAge:24*60*60*1000,
    keys:['qwertyuiop']
}));

//intialize passport

app.use(passport.initialize());
app.use(passport.session());
//set up routes

app.use('/auth',authRoutes);
app.use('/profile',profileRoutes);

//create home route;
app.get('/',(req,res)=>{
    res.render('home',{user:req.user});
})


app.listen(4002,()=>{
    console.log("request on port 4002");
});