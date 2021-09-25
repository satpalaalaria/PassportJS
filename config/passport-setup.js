const {serializeUser}  = require('passport');
const passport=require('passport');
const GoogleStrategy=require('passport-google-oauth20');
require('dotenv').config();
const knex=require('../modules/user')



passport.serializeUser((currentUser, done)=> {
    done(null, currentUser);
  });
  
  passport.deserializeUser((currentUser, done)=> {
    done(null, currentUser);
  });


passport.use(
    new GoogleStrategy(
      {
        clientID:process.env.clintid,
        clientSecret:process.env.clintscret,
        callbackURL: '/auth/google/redirect'
      },(accessToken, refreshToken, profile, done)=>{
        // console.log('passport callback function fired');
        // console.log(profile);
        // console.log(profile.photos[0].value);
        // console.log(profile);
//check if user alredy exist
        knex.select('*').from('user2').where('googleid',profile.id).then((currentUser)=>{
            if(currentUser.length>0){
                //alredy have user
                // console.log('user is: already exits');
                done(null,"login succsesful");
            }else{
                //if not create user in our db
                knex('user2').insert({
                    name:profile.displayName,
                    googleid:profile.id,
                    photo:profile.photos[0].value
                }).then((data)=>{
                    console.log("successful");
                    done(null,'signup succesfull')
                }).catch((err)=>{
                    console.log(err.message);
                });
            }
        }); 
      }
    )
  );
