const express = require('express')
const router = express.Router();
const asyncHandler = require('express-async-handler');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Business } = require('../../db/models');


router.get('/', asyncHandler( async (req, res)=>{
    const businesses = await Business.findAll();
    console.log(businesses)
    return res.json(businesses)

}))

router.get('/:businessId', asyncHandler(async (req, res)=>{
    const id = parseInt(req.params.businessId, 10);
    const business = await Business.findByPk(id)
    return res.json(business)
}))

router.post('/:businessId/edit', asyncHandler(async (req, res)=>{
    const id = parseInt(req.params.businessId, 10)
    const business = await Business.findByPk(id);
    const newBusiness = await business.update(req.body);
    return res.json(newBusiness)
}))

router.post('/:businessId/delete', asyncHandler(async (req, res)=>{
    const businessId = parseInt(req.params.businessId,10);
    const deleteBusiness = await Business.findByPk(businessId);

    await deleteBusiness.destroy();

    return res.json(businessId)
}))

router.post('/create-business', asyncHandler( async(req, res)=>{
    const {owner, name, phoneNumber, description, coverImg, address, city, state, zipCode} = req.body;
    const newBusiness = await Business.create({
        ownerId: owner.id,
        name,
        phoneNumber,
        description,
        coverImg,
        address,
        city,
        state,
        zipCode
    })
    return res.json(newBusiness)
}))

// router.post()




module.exports = router
