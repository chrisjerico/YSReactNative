import React from 'react';
import MineList from '../views/MineList';
import {defaultMineLists} from '../helpers/config';

const MineListComponent = () => (
  <React.Fragment>
    {defaultMineLists.map((list, index) => (
      <MineList key={index} {...list} />
    ))}
  </React.Fragment>
);

export default MineListComponent;
