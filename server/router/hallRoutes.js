const express = require('express');
const router = express.Router();
const hallController = require('../controllers/hallController');
const authenticate = require("../middleware/authenticate");


router.get('/halls', hallController.getHalls);
router.get('/halls/:hallId',authenticate, hallController.getHallById);
router.post('/halls',authenticate, hallController.createHall);
router.put('/halls/:hallId',authenticate, hallController.updateHall);
router.delete('/halls/:hallId',authenticate, hallController.deleteHall);

module.exports = router;
