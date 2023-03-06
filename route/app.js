var express = require('express')
var router = express.Router()
var DataModel = require('../models/UserModel')

router.get('/users-list', function (req, res, next) {
  DataModel.find((err, docs) => {
    if (!err) {
      res.render('index', {
        data: docs,
      })
    } else {
      console.log(err)
    }
  })
})
router.get('/delete/(:id)', function (req, res, next) {
  UseDataModelrModel.findByIdAndRemove(req.params.id, (err, doc) => {
    if (!err) {
      res.redirect('/users-list')
    } else {
      console.log(err)
    }
  })
})
module.exports = router