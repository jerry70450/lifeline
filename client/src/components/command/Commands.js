import React, { Fragment } from 'react';
import CommandItem from './CommandItem';

const Commands = () => {
  const commands = [
    {
      _id: '001',
      command: 'medical emergency',
      phone: '911',
      msg: 'Please come to 1 uwaterloo to save my life'
    },
    {
      _id: '002',
      command: 'where is the hotel',
      phone: '4168317057',
      msg: 'Emergency at 155 water avenue, robbery, please help'
    }
  ];

  if (commands !== null && commands.length === 0) {
    return <h4> Please add a new command </h4>;
  }

  return (
    <Fragment>
      {commands.map(command => (
        <CommandItem key={command._id} item={command} />
      ))}
    </Fragment>
  );
};

export default Commands;
