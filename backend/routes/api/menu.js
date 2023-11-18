const express = require('express')
const router = express.Router();
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
// const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Menu } = require('../../db/models');
// const { route } = require('./businesses');
// const multer = require('multer');
// const upload = multer({dest:'uploads/'});
const {singlePublicFileUpload, singleMulterUpload} = require('../../aws/s3')

const MenuValidator = [
    check('restaurantId')
        .exists({ checkFalsy: true })
        .withMessage('Please provide restaurant ID.'),
    check('name')
        .exists({ checkFalsy: true })
        .withMessage('Please provide the menu name')
        .isLength({ max: 15 })
        .withMessage('Menu must be less than 15 characters'),
    check('price')
        .exists({ checkFalsy: true })
        .withMessage('Please provide menu price')
        .isInt()
        .withMessage('Please provide proper price tag'),
    handleValidationErrors
]

router.get('/:restaurantId', asyncHandler(async (req, res)=>{
    const id = parseInt(req.params.restaurantId, 10);
    const menus = await Menu.findAll({
        where:{
            restaurantId:id
        }
    })
    return res.json(menus)
}))

router.post('/new', singleMulterUpload("image"), MenuValidator, asyncHandler(async (req, res)=>{
    const {restaurantId, name, price} = req.body
    console.log(name, restaurantId)
    const profileImageUrl = await singlePublicFileUpload(req.file);
    const menu = await Menu.create({
        restaurantId,
        name,
        price,
        image_url:profileImageUrl
    })
    return res.json(menu);
}))

router.put('/:menuId/edit', singleMulterUpload('image'),MenuValidator, asyncHandler(async (req, res)=>{
    const id = parseInt(req.params.menuId, 10)
    const {restaurantId, name, price} = req.body
    const menu = await Menu.findByPk(id);
    const profileImageUrl = await singlePublicFileUpload(req.file);
    const newMenu = await menu.update({
        restaurantId,
        name,
        price,
        image_url: profileImageUrl
    });
    return res.json(newMenu);
}))

router.delete('/:menuId/delete', asyncHandler(async (req, res)=>{
    const id = parseInt(req.params.menuId,10);
    const menu = await Menu.findByPk(id);
    await menu.destroy();
    return res.json(menu)
}))

module.exports = router
