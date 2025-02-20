import React from 'react';
import './Loading.css';

const Loading = () => {
  return (
    <div className="overlay">
      <div className="spinner">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loading;