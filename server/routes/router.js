const express = require('express');
const UserDb = require('../model/model');
const route = express.Router();
const axios = require('axios');

// home
route.get('/', (req, res) => {
    axios.get('http://localhost:3000/api/users').then(function (response) {
        res.render('index', { users: response.data });
    }).catch(err => {
        res.send(err);
    });
});

// add user
route.get('/add_user', (req, res) => {
    res.render('add_user');
});

// update user
route.get('/update_user', (req, res) => {
    axios.get('http://localhost:3000/api/users', { params: { id: req.query.id } }).then(function (userdata) {
        res.render("update_user", { user: userdata.data });
    }).catch(err => {
        res.send(err);
    });
});

//api
// create and save user
route.post('/api/users', (req, res) => {
    //validate user
    if (!req.body) {
        res.status(400).send({ message: "Content cannot be empty" });
        return;
    }
    //new user
    const user = new UserDb({
        name: req.body.name,
        email: req.body.email,
        gender: req.body.gender,
        status: req.body.status
    })
    
    // save user in the database
    user
        .save(user)
        .then(data => {
            // res.send(data);
            res.redirect('/add_user')
        })
        .catch(err => {
            res.status(500).send({ message: err.message || "some error occured while creating a user" });
        });
});
// find user
route.get('/api/users', (req, res) => {
    const id = req.query.id;
    if (id) {
        UserDb.findById(id)
            .then(data => {
                if (!data) {
                    res.status(400).send({ message: "not found data with " + id + " id" });
                }
                else {
                    res.send(data);
                }
            })
            .catch(err => {
                res.status(500).send({ message: err.message || "some error occured while retriving a user" });
            });
    } else {
        UserDb.find()
            .then(user => {
                res.send(user);
            })
            .catch(err => {
                res.status(500).send({ message: err.message || "some error occured while retriving a user" });
            });
    }


});
// update a user
route.put('/api/users/:id', (req, res) => {
    if (!req.body) {
        return res.status(400).send({ message: "Data updated cannot be empty" });
    }
    const id = req.params.id;
    UserDb.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({ message: `cannot update user with ${id}. May be user not found!.` });
            } else {
                res.send(data);
            }
        })
        .catch(err => {
            res.status(500).send({ message: err.message || "some error occured while updating a user" });
        })
});
// delete a user
route.delete('/api/users/:id', (req, res) => {
    const id = req.params.id;
    UserDb.findByIdAndDelete(id)
        .then(data => {
            if (!data) {
                res.status(404).send({ message: `cannot delete user with ${id}. May be user not found!.` });
            } else {
                res.send("deleted succesfully");
            }
        })
        .catch(err => {
            res.status(500).send({ message: err.message || "some error occured while deleting a user " + id });
        })
});

module.exports = route;