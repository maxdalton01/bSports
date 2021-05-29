const db = require("../models");
const Faq = db.faq;

exports.create = (req, res) => {
    // create new faq
    const faq = new Faq({
        question: req.body.question,
        response: req.body.response
    });

    // save in database
    faq.save(faq)
      .then(data => {
          res.send(data);
      })
      .catch(err => {
          res.status(500).send({ // 500 is standard for database errors
              message: err.message || "Error loading to database"
          });
      });
};

exports.getAll = (req, res) => {
    //return all
    Faq.find()
      .then(data => {
          res.send(data);
      })
      .catch(err => {
          res.status(500).send({
              message: err.message || "Error reading from database"
          });
      });
};