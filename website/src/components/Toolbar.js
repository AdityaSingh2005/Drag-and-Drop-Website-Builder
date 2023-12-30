import React from 'react';
import { useDrag } from 'react-dnd';
import { ItemTypes } from '../constants';
import '../styles.css';

const Tool = ({ type, children }) => {
  const [, drag] = useDrag({
    type: type || ItemTypes.TEXT, 
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <div ref={drag} style={{ opacity: 1 }}>
      {children}
    </div>
  );
};

const Toolbar = () => {
  return (
    <div className='toolbar'>
      <h2>Toolbar</h2>
      <Tool type={ItemTypes.TEXT}>Add Text</Tool>
      <Tool type={ItemTypes.IMAGE}>Upload Image</Tool>
    </div>
  );
};

export default Toolbar;
