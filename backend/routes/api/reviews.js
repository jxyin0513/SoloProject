const express = require('express')
const router = express.Router();
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const {User, Review } = require('../../db/models');

const reviewValidator=[
    check('userId')
        .exists({ checkFalsy: true })
        .withMessage('Please provide your ID'),
    check('businessId')
        .exists({ checkFalsy: true })
        .withMessage('Please provide ID of business you want to review on'),
    check('rating')
        .exists({ checkFalsy: true })
        .withMessage('Please provide your rating'),
    check('comment')
        .exists({ checkFalsy: true })
        .withMessage('Please tell us about your experience')
        .isLength({min: 10, max: 255 })
        .withMessage('Please provide your comment to 10 to 255 characters'),
    handleValidationErrors
]

router.get('/:businessId/all',  asyncHandler(async(req, res)=>{
    const businessId = parseInt(req.params.businessId, 10)
    const reviews = await Review.findAll({
        where:{
            businessId,

        },
        include:User
    });
    console.log(reviews)
    return res.json(reviews)
}))

router.post('/', reviewValidator, asyncHandler(async(req, res)=>{
    const {userId, businessId, coverImg, rating, comment} = req.body
    const review = await Review.create({
        userId,
        businessId,
        rating,
        comment,
        coverImg
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
