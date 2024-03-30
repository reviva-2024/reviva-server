const express = require('express');
const router = express.Router();

// Define your routes here
router.get('/example', (req, res) => {
  res.send('Example route');
});

module.exports = router;
