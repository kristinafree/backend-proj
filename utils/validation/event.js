const { check } = require('express-validator');

const validation = {
    create: [
        check('bodyPart').isInt({ min: 1, max: 48 }),
        check('price').isInt({ min: 0, max: 200000 }),
        check('theme').isLength({ min: 3, max: 200 }),
        check('date').isLength({ min: 3, max: 50}),
        check('time').isLength({ min: 3, max: 50 }),
        check('user').isLength({ min: 3, max: 50 })
    ],

    update: [
        check('bodyPart').isInt({ min: 1, max: 48 }),
        check('price').isInt({ min: 0, max: 200000 }),
        check('theme').isLength({ min: 3, max: 200 }),
        check('date').isLength({ min: 3, max: 50}),
        check('time').isLength({ min: 3, max: 50 }),
        check('user').isLength({ min: 3, max: 50 })
    ]
};

module.exports = validation;