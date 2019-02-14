const express = require('express');
const router = express.Router();
const userService = require('../service/user.service');
const Result = require('../shared/result');

router.post('/register', async (req, res, next) => {
    try {
        await userService.create(req.body);
        let result = new Result();
        result.setSuccessMessage("Successfully registered user");
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
        next(error);
    }
});

router.post('/authenticate', async (req, res, next) => {
    try {
        const data = await userService.authenticate(req.body);
        res.status(200).json(data);
    } catch (error) {
        console.log(error);
        next(error);
    }
});

router.put('/update', async (req, res, next) => {
    try {
        await userService.update(req.params.id, req.body);
        let result = new Result();
        result.setSuccessMessage("User update sucessfully");
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
        next(error);
    }
});


router.get('/getAll', async (req, res, next) => {
    try {
        const data = await userService.getAll();
        let result = new Result();
        result.setData(data);
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
        next(error);
    }
});

router.delete('/delete', async (req, res, next) => {
    try {
        await userService.delete(req.param.id);
        let result = new Result();
        result.setSuccessMessage("User delete sucessfully");
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
        next(error);
    }
});


/*
function getCurrent(req, res, next) {
    userService.getById(req.user.sub)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

function getById(req, res, next) {
    userService.getById(req.params.id)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}
*/



//router.get('/current', getCurrent);
//router.get('/:id', getById);


module.exports = router;
