function ifNotLoggedin(req, res, next) {
    if (!req.session.isLoggedIn) {
      res.redirect('/devices/accessdenied'); // You can redirect to the login page if not logged in
    } else {
      next();
    }
  }
   
  function ifLoggedin(req, res, next) {
    if (req.session.isLoggedIn) {
      res.redirect('/devices/หน้าแรก'); // Redirect to the home page if already logged in
    } else {
      next();
    }
  }
   
  module.exports = {
    ifNotLoggedin,
    ifLoggedin,
  };
   