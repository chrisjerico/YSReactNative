import React from 'react';
import MineList from '../views/MineList';

const defaultMineLists = [{}, {}, {}, {}, {}, {}, {}, {}];

const MineListComponent = () => (
  <React.Fragment>
    {defaultMineLists.map((ele, index) => (
      <MineList key={index} {...ele} />
    ))}
  </React.Fragment>
);

export default MineListComponent;
