const express = require("express")
const router = express.Router()
const indexController = require("../controllers/index")


router.get("/", indexController.index);
router.post("/send-contact-form", indexController.sendContactForm);
module.exports = router