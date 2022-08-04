
const router = require('express').Router();

const thoughtRoutes = require('./api/thought-routes');
const userRoutes = require('./api/user-routes');

router.use('/api/thoughts', thoughtRoutes);
router.use('/api/users', userRoutes);

module.exports = router; 