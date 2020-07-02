const express = require('express');
const cors = require('cors');

const db = require('./core/db');
const {userValidation, eventValidation} = require('./utils/validation');
const { UserCtrl, EventCtrl } = require('./controllers')

const app = express();
app.use(express.json());
app.use(cors());

app.get('/users', UserCtrl.all);
app.post('/users', userValidation.create, UserCtrl.create);
app.delete('./users/:id', UserCtrl.remove);
app.patch('./users/:id', userValidation.create, UserCtrl.update);
app.get('./users/:id', UserCtrl.show);

app.get('/events', EventCtrl.all);
app.post('/events', eventValidation.create, EventCtrl.create);
app.delete('./events/:id', EventCtrl.remove);
app.patch('./events/:id', eventValidation.update, EventCtrl.update);

app.listen(6666, function(err) {
    if (err) {
        return console.log(err);
    }
    console.log('Server runned!');
});