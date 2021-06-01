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

exports.answer = (req, res) => {
    if(!req.body) {
        return res.status(400).send({ // standard code for bad request
            message: "Bad request"
        });
    }
    const id = req.params.id;

    Faq.findByIdAndUpdate(id, {response: req.body.response}, { useFindAndModify: false })
        .then((data) => {
            if(!data) {
                res.status(404).send({
                    message: "Question not found"
                });
            } else {
                res.send({
                    message: "Question found answer updated"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating database"
            });
        });
}

// exports.addLike = (req, res) => {
//     if(!req.body) {
//         return res.status(400).send({ // standard code for bad request
//             message: "Bad request"
//         });
//     }
//     const id = req.params.id;

//     // deprecation warning without the useFindAndModify set to false
//     // $inc is a mongodb functionality for incrementing int types in database
//     Event.findByIdAndUpdate(id, {$inc : {'attendees' : 1} }, { useFindAndModify: false })
//       .then((data) => {
//           if(!data) {
//               res.status(404).send({
//                   message: "Event not found"
//               });
//           } else {
//               res.send({
//                   message: "Event found and attendee added"
//               });
//           }
//       })
//       .catch(err => {
//           res.status(500).send({
//               message: "Error updating database"
//           });
//       });
// };