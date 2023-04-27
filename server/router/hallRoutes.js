const express = require('express');
const router = express.Router();
const hallController = require('../controllers/hallController');

router.get('/halls', hallController.getHalls);
router.get('/halls/:id', hallController.getHallById);
router.post('/halls', hallController.createHall);
router.put('/halls/:id', hallController.updateHall);
router.delete('/halls/:id', hallController.deleteHall);

module.exports = router;
