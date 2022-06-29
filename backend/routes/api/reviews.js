const express = require('express')
const router = express.Router();
const asyncHandler = require('express-async-handler');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Business, Review } = require('../../db/models');


router.get('/:businessId/all',  asyncHandler(async(req, res)=>{
    const businessId = parseInt(req.params.businessId, 10)
    const reviews = await Review.findAll({
        where:{
            businessId
        }
    });
    return res.json(reviews)
}))

router.post('/', asyncHandler(async(req, res)=>{
    const {userId, businessId, rating, comment} = req.body
    const review = await Review.create({
        userId,
        businessId,
        rating,
        comment
    })
    return res.json(review);
}))

router.post('/:reviewId/delete', asyncHandler(async(req, res)=>{
    const id = parseInt(req.params.reviewId, 10);
    const review = await Review.findByPk(id)
    await review.destroy();
    return res.json(id);
}))

module.exports= router;
