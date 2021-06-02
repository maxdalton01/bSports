module.exports = app => {
    const faq = require("../controllers/faqController.js");
    var router = require("express").Router();
    const express = require("express");

    //make new question
    router.post("/", faq.create);

    // load all questions
    router.get("/", faq.getAll);

    //update answer
    router.put("/response/:id", faq.answer);

    //add like
    router.put("/:id", faq.addLike);

    //delete
    router.delete("/:id", faq.delete);

    app.use('/api/FAQ', router);
};
