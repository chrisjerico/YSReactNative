import React from 'react';
import MineList from '../views/MineList';

const defaultMineLists = [{}, {}, {}, {}, {}, {}, {}, {}];

const MineListComponent = () => defaultMineLists.map((ele, index) => <MineList key={index} {...ele} />);

export default MineListComponent;
