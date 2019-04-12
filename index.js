const express = require('express')
const app = express()
const passport = require('passport')
const FacebookStrategy = require('passport-facebook').Strategy;
const port = 5000;
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});

app.get('/', (req, res) => {
    res.send("<h1>hello world</h1> \n <a href='/auth/facebook'> login with facebook</a>")
})

// Redirect the user to Facebook for authentication.  When complete,
// Facebook will redirect the user back to the application at
//     /auth/facebook/callback
app.get('/auth/facebook',
    passport.authenticate('facebook', {
        scope: 'email'
    })
);

// Facebook will redirect the user to this URL after approval.  Finish the
// authentication process by attempting to obtain an access token.  If
// access was granted, the user will be logged in.  Otherwise,
// authentication has failed.
app.get('/auth/facebook/callback',
        passport.authenticate('facebook'),
        (req, res) => {
            // res.redirect(prod_url+"/myApps")
            res.redirect("/")
        }
    );

// For at du kan bruge facebooks oauth, skal du melde dig som facebook developer. 

passport.use(new FacebookStrategy({
    clientID: "DIT EGET ID",
    clientSecret: "DIN EGEN SECRET",
    callbackURL: "/auth/facebook/callback",
    profileFields: ['id', 'emails', 'name', 'picture.type(large)']
  },
  function(accessToken, refreshToken, profile, done) {
    if (profile) {
        const user = profile._json;
        console.log('------------------------------------');
        console.log("Hele profile objektet: ", profile);
        console.log('------------------------------------');
        console.log("accessToken: ", accessToken);
        console.log('------------------------------------');
        console.log("user ",user)
        console.log('------------------------------------');
        done(null, user)
    } else {
        done(null, false);
    }
  }
));

app.listen(port, () => console.log(`Facebook OAuth eksempel app listening on port ${port}!`))