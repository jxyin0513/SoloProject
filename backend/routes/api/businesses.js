const express = require('express')
const router = express.Router();
const asyncHandler = require('express-async-handler');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Business } = require('../../db/models');


router.get('/', (req, res)=>{


})

router.get('/:businessId', (req, res)=>{


})


router.post('/create-business', async(req, res)=>{
    const {owner, name, phoneNumber, description, zipCode} = req.body;
    const newBusiness = await Business.create({
        ownerId: owner.id,
        name,
        phoneNumber,
        description,
        zipCode
    })
    res.json(newBusiness)
})

// router.post()




module.exports = router
