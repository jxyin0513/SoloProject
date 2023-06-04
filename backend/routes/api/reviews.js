const express = require('express')
const router = express.Router();
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
// const { setTokenCookie, requireAuth } = require('../../utils/auth');
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
        .withMessage('Please provide your rating')
        .isInt({min:1, max:5})
        .withMessage('Rating must be between 1 and 5.'),
    check('comment')
        .exists({ checkFalsy: true })
        .withMessage('Please tell us about your experience')
        .isLength({min: 1, max: 255 })
        .withMessage('Please provide your comment to 1 to 255 characters'),
    handleValidationErrors
]
const editReviewValidator=[
    check('id')
        .exists({ checkFalsy: true })
        .withMessage('Please provide your ID'),
    check('rating')
        .exists({ checkFalsy: true })
        .withMessage('Please provide your rating')
        .isInt({min:1, max:5})
        .withMessage('Rating must be between 1 and 5.'),
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
    return res.json(reviews);
}))

router.post('/new', reviewValidator, asyncHandler(async(req, res)=>{
    const {userId, businessId, coverImg, rating, comment} = req.body
    const newReview = await Review.create({
        userId,
        businessId,
        rating,
        comment,
        coverImg
    })
    const review = await Review.findOne({
        where:{
            id:newReview.id
        },
        include: User
    })
    return res.json(review);
}))

router.put('/:id/edit',editReviewValidator, asyncHandler(async(req, res)=>{
    const id = parseInt(req.params.id, 10)
    const oldReview = await Review.findByPk(id);
    const newReview = await oldReview.update(req.body);
    const review = await Review.findOne({
        where:{
            id
        },
        include:User
        }
    )
    return res.json(review);
}))

router.delete('/:reviewId/delete', asyncHandler(async(req, res)=>{
    const id = parseInt(req.params.reviewId, 10);
    const review = await Review.findByPk(id)
    await review.destroy();
    return res.json(review);
}))

module.exports= router;
