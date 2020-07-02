const { validationResult } = require('express-validator')
const { Event, User } = require('../models');
const mongoose = require('mongoose');

function EventController() {}

const create = async function(req, res) {
    const errors = validationResult(req);

    const data = {
        user: req.body.user,
        bodyPart: req.body.bodyPart,
        theme: req.body.theme,
        price: req.body.price,
        date: req.body.date,
        time: req.body.time
    };

    if(!errors.isEmpty()) {
        return res.status(422).json({ 
            success: false,
            message: errors.array() 
        }); 
    }

    try {
        await User.findOne({_id: data.user});
    } catch(e) {
        return res.status(404).json({
            success: false,
            message: 'USER_NOT_FOUND'
        })
    }
    

    Event.create(data, function(err, doc) {
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
    const eventId = req.params.id;
    const errors = validationResult(req);

    const data = {
        user: req.body.user,
        bodyPart: req.body.bodyPart,
        theme: req.body.theme,
        price: req.body.price,
        date: req.body.date,
        time: req.body.time
    };

    if(!errors.isEmpty()) {
        return res.status(422).json({ 
            success: false,
            message: errors.array() 
        }); 
    }

    Event.updateOne( { _id: eventid }, { $set: data }, function(err,doc) {
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
            })
        }


        res.json({
            status: true,
            data: doc
        });
    });
};

const remove = async function(req, res) {
    const id = req.params.id;

    try {
        await Event.findOne({_id: id});
    } catch (e) {
        return res.status(404).json({
            success: false,
            message: 'EVENT_NOT_FOUND'
        })
    }


    Event.deleteOne({ _id: id }, err => {
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

const all = function(req, res) {
    Event.find({}) 
        .populate('user') 
        .exec(function(err, docs) {
        if(err) {
            return res.status(500).json({
                success: false,
                message: err
            });
        }

        res.json({
            status: 'success',
            data: docs
        });
    });
};

EventController.prototype = {
    all,
    create,
    remove,
    update
};

module.exports = EventController;