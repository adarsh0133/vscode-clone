var express = require('express');
var router = express.Router();
const fs = require("fs");

router.get('/', function (req, res, next) {
  fs.readdir("./uploads", { withFileTypes: true }, function (err, files) {
    if (err) console.log(err)
    else {
      res.render("index", { files })
    }
  })
});

router.get('/file/:filename', function (req, res, next) {
  fs.readdir("./uploads", { withFileTypes: true }, function (err, files) {
    if (err) console.log(err)
    else {
      fs.readFile(`./uploads/${req.params.filename}`, "utf-8", function (err, data) {
        if (err) throw err
        else {
          res.render("changed", { files, filename: req.params.filename, data })
        }
      })
    }
  })
});

router.post('/update/:filename', function (req, res, next) {
  fs.writeFile(`./uploads/${req.params.filename}`, req.body.data, function (err) {
    res.redirect("back")
  })
});

router.post('/rename/:filename', function (req, res, next) {
  fs.rename(`./uploads/${req.params.filename}`, `./uploads/${req.body.newName}`, function (err) {
    if(err){
      console.log(err)
    }else{
      res.redirect("back")
    }
  })
});

router.get('/refresh', function (req, res, next) {
  res.redirect("back")
});

router.get('/delete/:type/:filename', function (req, res, next) {
  if (`${req.params.type}` === "folder") {
    fs.rmdir(`./uploads/${req.params.filename}`, function (err) {
      res.redirect("back")
    })
  } else {
    fs.unlink(`./uploads/${req.params.filename}`, function (err) {
      if (err) console.log(err)
      else res.redirect("back");
    })
  }
});

router.post('/createfile', function (req, res, next) {
  fs.writeFile(`./uploads/${req.body.filename}`, "", function (err) {
    if (err) console.log(err)
    else res.redirect("back")
  })
});

router.post('/createfolder', function (req, res, next) {
  fs.mkdir(`./uploads/${req.body.foldername}`, function (err) {
    if (err) console.log(err);
    else res.redirect("back")
  })
});

module.exports = router;
