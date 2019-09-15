const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');
const accountSid = 'AC20691a0e3afd4fd598d561e3254ba5cd';
const authToken = 'e6f0d57f4911466afb786c405cf13452';
const VoiceResponse = require('twilio').twiml.VoiceResponse;
const client = require('twilio')(accountSid, authToken);

const User = require('../models/User');
const Contact = require('../models/Contact');

// @route   POST api/contacts/call
// @desc    Call calling number with message given command
// @access  public
router.post('/call', async (req, res) => {
  try {
    const contact = await Contact.find({ invocation: req.body.invocation });
    const phone = contact.phone;
    const message = contact.message;
    const response = new VoiceResponse();
    response.say(message);

    client.calls
      .create({
        url: response,
        to: phone,
        from: '+16473615839'
      })
      .then(call => console.log(call.sid));
  } catch (error) {
    console.error(error.message);
    res.status(500).send('server error');
  }
});

// @route   GET api/contacts/
// @desc    Get all user's contacts
// @access  Private
router.get('/', async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.json(contacts);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('server error');
  }
});

// @route   POST api/contacts/
// @desc    Add new contact
// @access  Private
router.post(
  '/',
  [
    auth,
    check('invocation', 'Invocation is required')
      .not()
      .isEmpty(),
    check('phone', 'Phone is required')
      .not()
      .isEmpty(),
    check('message', 'Message is required')
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { invocation, phone, message } = req.body;

    try {
      const newContact = new Contact({
        invocation,
        phone,
        message,
        user: req.user.id
      });

      const contact = await newContact.save();

      res.json(contact);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('server error');
    }
  }
);

// @route   PUT api/contacts/:id
// @desc    Update a contact
// @access  Private
router.put('/:id', auth, async (req, res) => {
  const { invocation, phone, message } = req.body;

  const contactFields = {};
  if (invocation) contactFields.invocation = invocation;
  if (phone) contactFields.phone = phone;
  if (message) contactFields.message = message;

  try {
    let contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).json({ msg: 'Contact not found' });

    // Make sure user owns contact
    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { $set: contactFields },
      { new: true }
    );
    res.json(contact);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('server error');
  }
});

// @route   DELETE api/contacts/:id
// @desc    Delete new contact
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    let contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).json({ msg: 'Contact not found' });

    // Make sure user owns contact
    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    await Contact.findByIdAndRemove(req.params.id);
    res.json({ msg: 'Contact Removed' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('server error');
  }
});

module.exports = router;
