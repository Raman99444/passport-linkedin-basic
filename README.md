# passport-linkedin-basic

## Install

    $ npm install passport-linkedin-basic

## Usage

#### Configure Strategy

The linkedin basic authentication strategy authenticates users using a userEmail or phone number and
password.  The strategy requires a `verify` callback, which accepts these
credentials and calls `done` providing a user.

    passport.use(new LinkedInBasicAuthStrategy(
      async (userEmail, password, done) {
        //handle the user requirement here
      }
    ));

#### Authenticate Requests

Use `passport.authenticate()`, specifying the `'linkedin_basic'` strategy, to
authenticate requests.

For example, as route middleware in an [Express](http://expressjs.com/)
application:

    app.post('/login', 
      passport.authenticate('linkedin_basic', { failureRedirect: '/login' }),
      function(req, res) {
        res.redirect('/');
      });


## Tests

    $ npm install

## License

[The MIT License](http://opensource.org/licenses/MIT)
