const {
    getAllCubes,
} = require('../controllers/cubes');

const {
    Router
} = require('express');

const {
    getUserStatus
} = require('../controllers/user');

const router = Router();

router.get('/', getUserStatus, async (req, res) => {
    const cubes = await getAllCubes()
    res.render('index', {
        title: 'Cube Workshop',
        cubes,
        isLoggedIn: req.isLoggedIn
    });
});

router.get('/about', getUserStatus, (req, res) => {
    res.render('about', {
        title: 'About Cube Workshop Page',
        isLoggedIn: req.isLoggedIn
    });
});


module.exports = router;