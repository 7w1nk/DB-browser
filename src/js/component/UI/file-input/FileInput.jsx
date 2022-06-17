import React, { useState, useEffect } from 'react'

const FileInput = ({d, value, ...props }) => {
  const [title, settitle] = useState(0);
  const name = value === 0 ? `Choose a file...` : value.length > 1 ? `${value.length} files selected` : `${value[0].name}`;
  return (
    <>
      <input {...props} />
      <label for={props.id} class={props.class}>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="17" viewBox="0 0 20 17">
          <path d={d} />
        </svg>
        <span>{name}</span>
      </label>
    </>
  );
};

export default FileInput;