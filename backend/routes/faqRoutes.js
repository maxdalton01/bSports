module.exports = app => {
    const faq = require("../controllers/faqController.js");
    var router = require("express").Router();

    //make new question
    router.post("/", faq.create);

    // load all questions
    router.get("/", faq.getAll);

    app.use('/api/FAQ', router);
};
