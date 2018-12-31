//import passport that is configured with strategies
import passport from './config/passport';
import places from './controllers/places';
const requireAuth = passport.authenticate('jwt', { session: false });

module.exports = function(app) {
  //project routes

  app.get('/api/search/', jwt_cc, places.search);

  app.put('/api/toggleChoice/', requireAuth, places.toggleChoice);

  app.get('/api/profile', requireAuth, (req, res) => {
    res.json({
      displayName: req.user.displayName,
      photo: req.user.photo
    });
  });

  //signin - signout routes
  app.get(
    '/api/signin/twitter',
    (req, res, next) => {
      req.session.searchText = req.query.location;
      next();
    },
    passport.authenticate('twitter')
  );

  app.get(
    '/api/signin/twitter/callback',
    passport.authenticate('twitter'),
    (req, res) => {
      console.log('session info : ', req.session.searchText);
      res.redirect(
        `/signin?${req.session.access_token}#${req.session.searchText}`
      );
    }
  );

  app.get('/api/signout', requireAuth, (req, res) => {
    req.logout();
    res.redirect('/');
  });

  //passport Custom Callback for authentication without redirect on failure
  function jwt_cc(req, res, next) {
    passport.authenticate('jwt', { session: false }, function(err, user, info) {
      if (err) {
        return next(err);
      }
      if (!user) {
        return next();
      }
      req.user = user;
      next();
    })(req, res, next);
  }
};
