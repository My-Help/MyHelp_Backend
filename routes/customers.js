const express = require("express");
const bodyParser = require("body-parser");

const authenticate = require("../authenticate");
const cors = require("./cors");
const Customers = require('../models/customers');

const customerRouter = express.Router();

customerRouter.use(bodyParser.json());

customerRouter.route('/')
.options(cors.corsWithOptions,(req,res)=>{res.sendStatus(200)})
.get(cors.cors,(req,res,next)=>{
    Customers.find(req.query)
        .then((customers)=>{
            res.statusCode=200;
            res.setHeader('Content-Type','application/json');
            res.json(customers);
        },(err)=>next(err))
            .catch((err)=>next(err));
})

.post(cors.corsWithOptions,(req,res,next)=>{
    Customers.create(req.body)
    .then((customers)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(customers);
    },(err)=>next(err))
    .catch((err)=>next(err));
});


customerRouter.route('/:customerId')
.options(cors.corsWithOptions,(req,res)=>res.sendStatus(200))
.get(cors.cors,(req,res,next) => {
    Customers.findById(req.params.customerId)
    .then((customers)=>{
      res.statusCode=200;
      res.setHeader('Content-Type','application/json');
      res.json(customers);
    },(err)=>next(err))
      .catch((err)=>next(err));
})

.post(cors.corsWithOptions,authenticate.verifyUser,(req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /customers/'+ req.params.customerId);
})

.put(cors.corsWithOptions,authenticate.verifyUser,(req, res, next) => {
    Customers.findByIdAndUpdate(req.params.customerId,{$set:req.body},{new:true})
      .then((customers)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(customers);
      },(err)=>next(err))
        .catch((err)=>next(err));
})

module.exports = customerRouter;