import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import ContactContext from '../../context/contact/ContactContext';

const ContactItem = ({ contact }) => {
  const contactContext = useContext(ContactContext);
  const { deleteContact, setCurrent, clearCurrent } = contactContext;
  const { _id, invocation, phone, message } = contact;

  const onDelete = () => {
    deleteContact(_id);
    clearCurrent();
  };

  return (
    <div className="card bg-white">
      <h3 className="text-primary text-left">
        <ul className="list">
          {invocation && (
            <li>
              <i className="fas fa-info-circle" /> {invocation}
            </li>
          )}
          {phone && (
            <li>
              <i className="fas fa-phone" /> {phone}
            </li>
          )}
          {message && (
            <li>
              <i className="fas fa-sticky-note" /> {message}
            </li>
          )}
        </ul>
        <p>
          <button
            className="btn btn-dark btn-sm"
            onClick={() => setCurrent(contact)}
          >
            Edit
          </button>
          <button className="btn btn-danger btn-sm" onClick={onDelete}>
            Delete
          </button>
        </p>
      </h3>
    </div>
  );
};

ContactItem.propTypes = {
  contact: PropTypes.object.isRequired
};

export default ContactItem;
