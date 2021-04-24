const express = require("express");
const bodyParser = require("body-parser");

const authenticate = require("../authenticate");
const cors = require("./cors");
const ServiceProviders = require('../models/serviceProviders');

const serviceProviderRouter = express.Router();

serviceProviderRouter.use(bodyParser.json());

serviceProviderRouter.route('/')
.options(cors.corsWithOptions,(req,res)=>{res.sendStatus(200)})
.get(cors.cors,(req,res,next)=>{
    ServiceProviders.find(req.query)
        .then((serviceproviders)=>{
            res.statusCode=200;
            res.setHeader('Content-Type','application/json');
            res.json(serviceproviders);
        },(err)=>next(err))
            .catch((err)=>next(err));
})

.post(cors.corsWithOptions,(req,res,next)=>{
    ServiceProviders.create(req.body)
    .then((serviceproviders)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(serviceproviders);
    },(err)=>next(err))
    .catch((err)=>next(err));
});


serviceProviderRouter.route('/:serviceProviderId')
.options(cors.corsWithOptions,(req,res)=>res.sendStatus(200))
.get(cors.cors,(req,res,next) => {
    ServiceProviders.findById(req.params.serviceProviderId)
    .then((serviceproviders)=>{
      res.statusCode=200;
      res.setHeader('Content-Type','application/json');
      res.json(serviceproviders);
    },(err)=>next(err))
      .catch((err)=>next(err));
})

.post(cors.corsWithOptions,authenticate.verifyUser,(req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /serviceProvider/'+ req.params.serviceProviderId);
})

.put(cors.corsWithOptions,authenticate.verifyUser,(req, res, next) => {
    ServiceProviders.findByIdAndUpdate(req.params.serviceProviderId,{$set:req.body},{new:true})
      .then((serviceproviders)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(serviceproviders);
      },(err)=>next(err))
        .catch((err)=>next(err));
})

module.exports = serviceProviderRouter;