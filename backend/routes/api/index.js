const router = require('express').Router();
const asyncHandler = require('express-async-handler');
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const businessRouter = require('./businesses');
const reviewRouter = require('./reviews.js')

router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/businesses', businessRouter);
router.use('/reviews', reviewRouter)

router.post('/test', function(req, res) {
    res.json({ requestBody: req.body });
  });




module.exports = router;
