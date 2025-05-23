const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();

router.use(bodyParser.json());

// Hardcoded user credentials
const user = {
  email: 'awsabry2000@gmail.com',
  password: '123456',
};

// Auth endpoint
router.post('/auth', (req, res) => {
  const { email, password } = req.body;

  if (email === user.email && password === user.password) {
    res.json({ message: 'Authentication successful', status: 200 });
  } else {
    res.status(401).json({ message: 'Invalid email or password', status: 401 });
  }
});

module.exports = router;

