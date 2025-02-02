const express = require('express');
const FAQController = require('../controllers/faqController');
const router = express.Router();

router.get('/', FAQController.getFAQs);
router.post('/', FAQController.addFAQ);

module.exports = router;
