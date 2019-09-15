import React, { useState, useContext, useEffect } from 'react';
import ContactContext from '../../context/contact/ContactContext';

const ContactForm = () => {
  const contactContext = useContext(ContactContext);

  const { addContact, current, clearCurrent, updateContact } = contactContext;

  useEffect(() => {
    if (current !== null) {
      setContact(current);
    } else {
      setContact({
        invocation: '',
        phone: '',
        message: ''
      });
    }
  }, [contactContext, current]);

  const [contact, setContact] = useState({
    invocation: '',
    phone: '',
    message: ''
  });

  const { invocation, phone, message } = contact;

  const onChange = e =>
    setContact({ ...contact, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    if (current === null) {
      addContact(contact);
    } else {
      updateContact(contact);
      clearAll();
    }

    setContact({
      invocation: '',
      phone: '',
      message: ''
    });
  };

  const clearAll = () => {
    clearCurrent();
  };

  return (
    <form onSubmit={onSubmit}>
      <h2 className="text-primary">
        {current ? 'Edit Command' : 'Add Command'}{' '}
      </h2>
      <input
        type="text"
        placeholder="Invocation"
        name="invocation"
        value={invocation}
        onChange={onChange}
      />
      <input
        type="text"
        placeholder="Phone"
        name="phone"
        value={phone}
        onChange={onChange}
      />
      <input
        type="text"
        placeholder="Message"
        name="message"
        value={message}
        onChange={onChange}
      />

      <div>
        <input
          type="submit"
          value={current ? 'Update Command' : 'Add Command'}
          className="btn btn-primary btn-block"
        />
      </div>
      {current && (
        <div>
          <button className="btn btn-light btn-block" onClick={clearAll}>
            Clear
          </button>
        </div>
      )}
    </form>
  );
};

export default ContactForm;
