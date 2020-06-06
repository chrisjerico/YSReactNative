import React from 'react';
import MineList from '../views/MineList';
import {defaultMineLists} from '../helpers/config';

const MineListComponent = () => (
  <React.Fragment>
    {defaultMineLists.map((ele, index) => (
      <MineList key={index} {...ele} />
    ))}
  </React.Fragment>
);

export default MineListComponent;
