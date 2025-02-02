const express = require('express');
const bodyParser = require('body-parser');
const faqRoutes = require('./routes/faqRoutes');

const app = express();
app.use(bodyParser.json());
app.use('/api/faqs', faqRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
