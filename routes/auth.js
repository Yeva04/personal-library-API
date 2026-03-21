const express = require('express');
const passport = require('passport');

const router = express.Router();

/**
 * @route   GET /auth/google
 * @desc    Start Google OAuth login
 */
router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

/**
 * @route   GET /auth/google/callback
 * @desc    Google OAuth callback
 */
router.get('/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/'
  }),
  (req, res) => {
  res.redirect('/api-docs'); // after user logs in with their email, it redirect them to SwaggerUI to test endpoints
}
);

/**
 * @route   GET /auth/logout
 * @desc    Logout user
 */
router.get('/logout', (req, res) => {
  req.logout(() => {
    res.send('👋 Logged out');
  });
});

module.exports = router;