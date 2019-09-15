import React from 'react';
import PropTypes from 'prop-types';

const CommandItem = ({ item }) => {
  const { _id, command, phone, msg } = item;

  return (
    <div className="card bg-light">
      <h3 className="text-primary text-left">
        {command}
        <ul className="list">
          {phone && (
            <li>
              <i className="fas fa-phone" /> {phone}
            </li>
          )}
          {msg && (
            <li>
              <i class="fas fa-file-alt" /> {msg}
            </li>
          )}
        </ul>
        <p>
          <button className="btn btn-dark btn-sm">Edit</button>
          <button className="btn btn-danger btn-sm">Delete</button>
        </p>
      </h3>
    </div>
  );
};

CommandItem.propTypes = {
  command: PropTypes.object.isRequired
};

export default CommandItem;
