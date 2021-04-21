const express = require('express');
const bodyParser = require('body-parser');
const bookingRouter = express.Router();
bookingRouter.use(bodyParser.json());
const Bookings = require('../models/bookings');
var authenticate = require('../authenticate');
const cors = require('./cors');

bookingRouter.route('/')
    .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
    .get(cors.cors, authenticate.verifyUser, (req, res, next) => {
        Bookings.find(req.query)
            .then((bookings) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json')
                res.json(bookings);
            }, err => next(err))
            .catch(err => next(err))
    })

    .put(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
        res.end('Put request not valid on the /myhelp end point')
    })

    .post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
        Bookings.create(req.body)
            .then((booking) => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json')
                    res.json(booking);
            }, (err) => next(err))
            .catch((err) => next(err))
    })
    .delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
        Bookings.deleteMany(req.query)
            .then((response) => {
                res.statusCode = 200;
                res.setHeader('Content-type', 'application/json');
                res.json(response);
            }, (err) => next(err))
    })

bookingRouter.route('/:bookingId')
    .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
    .put(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
        Bookings.findById(req.params.bookingId)
            .then((booking) => {
                if (booking != null) {
                    Bookings.findByIdAndUpdate(req.params.bookingId, {
                        $set: req.body
                    }, { new: true })
                        .then((booking) => {
                            Bookings.findById(booking._id)
                                .then((booking) => {
                                    res.statusCode = 200;
                                    res.setHeader('Content-type', 'application/json');
                                    res.json(booking);
                                }, err => next(err))
                        }, err => next(err))
                }
            }, err => next(err))
    })

    .delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
        Bookings.findByIdAndDelete(req.params.bookingId)
            .then((response) => {
                res.statusCode = 200;
                res.setHeader('Content-type', 'application/json');
                res.json(response);
            }, err => next(err))
            .catch(err => next(err))
    })

module.exports = bookingRouter;

