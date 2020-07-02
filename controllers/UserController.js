const { validationResult } = require('express-validator');
const { User } = require('../models');
const mongoose = require('mongoose');

function UserController() {} 

const create = function(req, res) {
    const errors = validationResult(req);
    const data = {
        fullname: req.body.fullname,
        phone: req.body.phone
    };

    if(!errors.isEmpty()) {
        return res.status(422).json({ 
            success: false,
            message: errors.array() 
        }); 
    }

    User.create(data, function(err, doc) {
        if(err) {
            return res.status(500).json({
                success: false,
                message: err
            });
        }

        res.status(201).json({
            success: true,
            data: doc
        });
    });
};

const update = async function(req, res) {
    const userId = req.params.id;
    const errors = validationResult(req);

    const data = {
        fullname: req.body.fullname,
        phone: req.body.phone
    };

    if(!errors.isEmpty()) {
        return res.status(422).json({ 
            success: false,
            message: errors.array() 
        }); 
    }

    User.updateOne( { _id: userid }, { $set: data }, function(err, doc) {
        if (err) {
            return res.status(500).json({
                success: false,
                message: err
            });
        }
    
        if(!doc) {
            return res.status(404).json({
                success: false,
                message: 'USER_NOT_FOUND'
            });
        }

        res.json({
            status: true
        });
    });
};

const remove = async function(req, res) {
    const id = req.params.id;

    try {
        await User.findOne({_id: id});
    } catch (e) {
        return res.status(404).json({
            success: false,
            message: 'USER_NOT_FOUND'
        })
    }


    User.deleteOne({ _id: id }, err => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: err
            })
        }

        res.json({
            status: 'success'
        })
    });
};

const show = async function(req, res) {
    const id = req.params.id;
    try {
        const user = await User.findById(id).exec();
        res.json({
            status: 'success',
            data: user
        });
    } catch (e) {
        return res.status(404).json({
            success: false,
            message: 'USER_NOT_FOUND'
        })
    }
}

const all = function(req, res) {
    User.find({}, function(err) {
        if(err) {
            return res.status(500).json({
                success: false,
                message: err
            })
        }

        res.json({
            status: 'success'
        });
    });
};

UserController.prototype = {
    all,
    create,
    remove,
    update,
    show
}

module.exports = UserController;