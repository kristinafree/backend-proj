const UserController = require('./UserController');
const EventController = require('./EventController');

module.exports = {
    UserCtrl: new UserController(),
    EventCtrl: new EventController()
}; 