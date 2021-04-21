const express = require('express');
const bodyParser = require('body-parser');
const feedbackRouter = express.Router();
feedbackRouter.use(bodyParser.json());
const Feedback = require('../models/feedbackform');
var authenticate = require('../authenticate');
const cors = require('./cors');

feedbackRouter.route('/')
    .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
    .get(cors.cors, authenticate.verifyUser, (req, res, next) => {
        Feedback.find(req.query)
            .then((feedback) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json')
                res.json(feedback);
            }, err => next(err))
            .catch(err => next(err))
    })

    .put(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
        res.end('Put request not valid on the /myhelp end point')
    })

    .post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
        Feedback.create(req.body)
            .then((feedback) => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json')
                    res.json(feedback);
            }, (err) => next(err))
            .catch((err) => next(err))
    })
    .delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
        Feedback.deleteMany(req.query)
            .then((response) => {
                res.statusCode = 200;
                res.setHeader('Content-type', 'application/json');
                res.json(response);
            }, (err) => next(err))
    })

feedbackRouter.route('/:feedbackId')
    .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
    .put(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
        Feedback.findById(req.params.feedbackId)
            .then((feedback) => {
                if (feedback != null) {
                    Feedback.findByIdAndUpdate(req.params.feedbackId, {
                        $set: req.body
                    }, { new: true })
                        .then((feedback) => {
                            Feedback.findById(feedback._id)
                                .then((feedback) => {
                                    res.statusCode = 200;
                                    res.setHeader('Content-type', 'application/json');
                                    res.json(feedback);
                                }, err => next(err))
                        }, err => next(err))
                }
            }, err => next(err))
    })

    .delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
        Feedback.findByIdAndDelete(req.params.feedbackId)
            .then((response) => {
                res.statusCode = 200;
                res.setHeader('Content-type', 'application/json');
                res.json(response);
            }, err => next(err))
            .catch(err => next(err))
    })

module.exports = feedbackRouter;

