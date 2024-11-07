// routes/identify.js
const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

router.post('/identify', async (req, res) => {
  const { email, phoneNumber } = req.body;

  try {
    let matchingContacts = await Contact.findAll({
      where: {
        [Op.or]: [{ email }, { phoneNumber }],
      },
    });

    if (matchingContacts.length === 0) {
      // Case 1: No matching contacts, create a new primary contact
      const newContact = await Contact.create({
        email,
        phoneNumber,
        linkPrecedence: 'primary',
      });
      return res.status(200).json({ 
        primaryContactId: newContact.id, 
        emails: [newContact.email],
        phoneNumbers: [newContact.phoneNumber],
        secondaryContactIds: []
      });
    } else {
      // Case 2: Matching contacts found, link as secondary if needed
      // Implementation logic to consolidate and link contacts
    }
  } catch (error) {
    res.status(500).json({ message: 'An error occurred' });
  }
});

module.exports = router;
