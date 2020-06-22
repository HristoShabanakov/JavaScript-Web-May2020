const env = process.env.NODE_ENV || 'development';
const express = require('express');
const jwt = require('jsonwebtoken');
const config = require('../config/config')[env];
const router = express.Router();
const Cube = require('../models/cube');
const {
    checkAuthentication,
    getUserStatus,
} = require('../controllers/user');

const {
    getCubeWithAccessories,
} = require('../controllers/cubes');

router.get('/edit', checkAuthentication, getUserStatus, (req, res) => {
    res.render('editCubePage', {
        isLoggedIn: req.isLoggedIn
    });
});

router.get('/delete', checkAuthentication, getUserStatus, (req, res) => {
    res.render('deleteCubePage', {
        isLoggedIn: req.isLoggedIn
    });
});

router.get('/details/:id', getUserStatus, async (req, res) => {

    const cube = await getCubeWithAccessories(req.params.id);

    res.render('details', {
        title: 'Details | Cube Workshop',
        ...cube,
        isLoggedIn: req.isLoggedIn
    });
});

router.get('/create', checkAuthentication, getUserStatus, (req, res) => {
    res.render('create', {
        title: 'Create Cube | Workshop',
        isLoggedIn: req.isLoggedIn
    });
});


router.post('/create', (req, res) => {
    const {
        name,
        description,
        imageUrl,
        difficultyLevel
    } = req.body;

    const token = req.cookies['aid'];
    const decodedObject = jwt.verify(token, config.privateKey);

    const cube = new Cube({
        name,
        description,
        imageUrl,
        difficulty: difficultyLevel,
        creatorId: decodedObject.userID
    });

    cube.save((err) => {
        if (err) {
            console.error(err)
            res.redirect('/create')
        } else {
            res.redirect('/')
        }
    });
});

module.exports = router;