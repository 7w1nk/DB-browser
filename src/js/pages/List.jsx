import React from 'react';
import { useNavigate } from 'react-router-dom';

import MyButton from '../component/UI/button/Button'
import FileRead from '../component/UI/fileReader/FileRead'

const List = () => {
  const router = useNavigate();
  
  return (
    <>
      <FileRead />
      <MyButton onClick={() => router(-1)}>Назад</MyButton >
    </>
  );
}

export default List;