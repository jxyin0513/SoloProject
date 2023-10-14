const express = require('express')
const router = express.Router();
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
// const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Business } = require('../../db/models');
const {singlePublicFileUpload, singleMulterUpload} = require('../../aws/s3')

const businessValidators = [
    check('name')
        .exists({ checkFalsy: true })
        .withMessage('Please provide your business name')
        .isLength({ max: 50 })
        .withMessage('Name must be less than 50 characters'),
    check('phoneNumber')
        .exists({ checkFalsy: true })
        .withMessage('Please provide business phone number')
        .matches(/^[0-9]{3}(-)?[0-9]{3}(-)?[0-9]{4}/, 'g')
        .withMessage('Please follow correct phone number format'),
    check('description')
        .isLength({min:1, max: 255 })
        .withMessage('Please write your description under 255 characters'),
    check('address')
        .exists({ checkFalsy: true })
        .withMessage('Please provide your address'),
    check('city')
        .exists({ checkFalsy: true })
        .withMessage('Please provide your city'),
    check('state')
        .exists({ checkFalsy: true })
        .withMessage('Please provide your state'),
    check('zipCode')
        .exists({ checkFalsy: true })
        .withMessage('Zip code must be included')
        .matches(/^[0-9a-zA-Z]{5}/, 'g')
        .withMessage("Please provide correct zip code"),
    handleValidationErrors
]

router.get('/all', asyncHandler( async (req, res)=>{
    const businesses = await Business.findAll();
    return res.json(businesses)

}))

router.get('/:businessId', asyncHandler(async (req, res)=>{
    const id = parseInt(req.params.businessId, 10);
    const business = await Business.findByPk(id)
    return res.json(business);
}))

router.put('/:businessId/edit', businessValidators, asyncHandler(async (req, res)=>{
    const id = parseInt(req.params.businessId, 10)
    const business = await Business.findByPk(id);
    const newBusiness = await business.update(req.body);
    return res.json(newBusiness);
}))

router.delete('/:businessId/delete', asyncHandler(async (req, res)=>{
    const businessId = parseInt(req.params.businessId,10);
    const deleteBusiness = await Business.findByPk(businessId);
    await deleteBusiness.destroy();
    return res.json(deleteBusiness)
}))

router.post('/create-business', businessValidators, asyncHandler( async(req, res)=>{
    const {ownerId, name, phoneNumber, description, coverImg, logo, address, city, state, zipCode} = req.body;

    const newBusiness = await Business.create({
        ownerId,
        name,
        phoneNumber,
        description,
        coverImg,
        logo,
        address,
        city,
        state,
        zipCode
    })
    return res.json(newBusiness);
}))




module.exports = router
