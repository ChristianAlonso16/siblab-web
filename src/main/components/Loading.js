import React from 'react';
import styled, { keyframes } from 'styled-components';

const Loading = ({ message }) => {
  return (
    <Overlay>
      <Spinner />
      <Message>Cargando informacion...</Message>
    </Overlay>
  );
};

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const Overlay = styled.div`
  position: fixed;
  z-index: 1000;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Spinner = styled.div`
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: #fff;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: ${spin} 1s linear infinite;
`;

const Message = styled.p`
  color: #fff;
  font-size: 1.2rem;
  margin-top: 1rem;
`;

export default Loading;
