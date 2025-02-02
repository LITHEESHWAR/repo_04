const FAQ = require('../models/FAQ');
const cache = require('../config/cache');
const translate = require('@vitalets/google-translate-api');

// Correct usage
translate('Hello', { to: 'es' }).then(res => {
    console.log(res.text);  // Output: "Hola"
}).catch(err => {
    console.error(err);
});

exports.getFAQs = async (req, res) => {
  try {
    let faqs = await cache.get('faqs');
    if (!faqs) {
      faqs = await FAQ.getAll();
      await cache.set('faqs', faqs);
    }
    res.json(faqs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.addFAQ = async (req, res) => {
  try {
    const { question, answer } = req.body;
    const question_hi = (await translate(question, { to: 'hi' })).text;
    const question_bn = (await translate(question, { to: 'bn' })).text;

    await FAQ.create(question, answer, question_hi, question_bn);
    await cache.del('faqs');

    res.status(201).json({ message: 'FAQ added successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
