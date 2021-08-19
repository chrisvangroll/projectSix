const express = require('express');
const router = express.Router();

const Sauce = require('../models/sauces');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config')

const stuffCtrl = require('../controllers/sauces');


router.post('/', auth, multer, stuffCtrl.createThing);

//router.post('/:id/like', auth, stuffCtrl.likeThing);

router.get('/:id', auth,  stuffCtrl.getOneThing);

router.put('/:id', auth, stuffCtrl.updateThing);

router.delete('/:id', auth, stuffCtrl.deleteThing);

router.get('/' +
  '', auth, stuffCtrl.getAllthings);

module.exports = router;