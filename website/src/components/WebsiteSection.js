import React, { useState } from 'react';
import { useDrop } from 'react-dnd';
import { ItemTypes } from '../constants';
import '../styles.css';  

const WebsiteSection = () => {
  const [elements, setElements] = useState([]);

  const [, drop] = useDrop({
    accept: [ItemTypes.TEXT, ItemTypes.IMAGE],
    drop: (item, monitor) => {
       
      const isTextOrImage = monitor.getItemType();
      if (isTextOrImage === ItemTypes.TEXT || isTextOrImage === ItemTypes.IMAGE) {
        setElements((prevElements) => [
          ...prevElements,
          { type: isTextOrImage, content: isTextOrImage === ItemTypes.IMAGE ? null : '', id: Date.now() },
        ]);
      }
    },
  });

  const handleContentChange = (id, newContent) => {
    setElements((prevElements) => {
      const updatedElements = [...prevElements];
      const elementIndex = updatedElements.findIndex((element) => element.id === id);
      updatedElements[elementIndex].content = newContent;
      return updatedElements;
    });
  };

  const handleImageUpload = (id, event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setElements((prevElements) => {
          const updatedElements = [...prevElements];
          const elementIndex = updatedElements.findIndex((element) => element.id === id);
          updatedElements[elementIndex].content = e.target.result;
          return updatedElements;
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    console.log('Saved Elements:', elements);
    alert('Project is saved!');
  };

  return (
    <div className="website-section" ref={drop}>
      <h2>Website Section</h2>
      {elements.map((element) => (
        <div key={element.id} className="element">
          {element.type === ItemTypes.TEXT && (
            <input
              type="text"
              placeholder="Your text goes here..."
              value={element.content}
              onChange={(e) => handleContentChange(element.id, e.target.value)}
            />
          )}
          {element.type === ItemTypes.IMAGE && (
            <div>
              {element.content && <img src={element.content} alt="Uploaded" />}
              {!element.content && (
                <label className="custom-file-input">
                  Choose File
                  <input type="file" onChange={(e) => handleImageUpload(element.id, e)} />
                </label>
              )}
            </div>
          )}
        </div>
      ))}
      <button className="save-button" onClick={handleSave}>
        Save
      </button>
    </div>
  );
};

export default WebsiteSection;
