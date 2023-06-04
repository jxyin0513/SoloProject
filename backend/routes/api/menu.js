const express = require('express')
const router = express.Router();
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Menu } = require('../../db/models');
const { route } = require('./businesses');

const MenuValidator = [
    check('restaurantId')
        .exists({ checkFalsy: true })
        .withMessage('Please provide restaurant ID.'),
    check('name')
        .exists({ checkFalsy: true })
        .withMessage('Please provide name of the menu')
        .isLength({ max: 15 })
        .withMessage('Menu must be less than 15 characters.'),
    check('price')
        .exists({ checkFalsy: true })
        .withMessage('Please provide menu price')
        .isInt()
        .withMessage('Please provide proper price tag.'),
    check('image_url')
        .exists({ checkFalsy: true })
        .withMessage('Please upload your image'),
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

router.post('/new', MenuValidator, asyncHandler(async (req, res)=>{
    const {restaurantId, name, price, image_url} = req.body
    const menu = await Menu.create({
        restaurantId,
        name,
        price,
        image_url
    })
    return res.json(menu)
}))

router.put('/:menuId/edit', MenuValidator, asyncHandler(async (req, res)=>{
    const id = parseInt(req.params.menuId, 10)
    const menu = await Menu.findByPk(id);
    const newMenu = await menu.update(req.body);
    return res.json(newMenu);
}))

router.delete('/:menuId/delete', asyncHandler(async (req, res)=>{
    const id = parseInt(req.params.menuId,10);
    const menu = await Menu.findByPk(id);
    await menu.destroy();
    return res.json(menu);
}))

module.exports = router
