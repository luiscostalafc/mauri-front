import { shade } from 'polished';
import styled, { keyframes } from 'styled-components';

export const Container = styled.div`
  height: 100%;
  display: flex;
  align-items: stretch;
  background-color: #e2e8f0;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 700%;
`;

const appearFromLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-200px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

export const AnimationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  form {
    margin: 80px 0;
    width: 600px;
    text-align: center;
    padding: 10px;

    h1 {
      margin-top: 30px;
      margin-bottom: 10px;
    }
  }

  > a {
    color: #ed8936;
    display: block;
    margin-top: 10px;
    margin-bottom: 20px;
    text-decoration: none;
    outline: 0;
    transition: color 0.2s;

    display: flex;
    align-items: center;

    svg {
      margin-right: 16px;
    }

    &:hover {
      color: ${shade(0.2, '#ED8936')};
    }
  }
`;

export const ButtonOptions = styled.button`
  background: #ff9000;
  height: 56px;
  border-radius: 10px;
  border: 0;
  padding: 0 16px;
  color: #312e38;
  width: 100%;
  font-weight: 500;
  margin-top: 16px;
  transition: background-color 0.3s;
  &:hover {
    background: ${shade(0.2, '#ff9000')};
  }
`;
export const Background = styled.div`
  max-width: 1080px;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
`;

export const Image = styled.img`
  max-width: 1080px; /* Máximo da largura da imagem */
  width: 100%;
  max-height: 100%; /* Máximo da altura da imagem */
  min-height: auto; /* Mínimo da altura, por padrão “auto” */
  background-size: 100%;
  background-repeat: no-repeat;
  padding: 20px;
`;

export const ImageCart = styled.img`
  animation: ${appearFromLeft} 1.5s;
  max-width: 1080px; /* Máximo da largura da imagem */
  width: 100%;
  max-height: 100%; /* Máximo da altura da imagem */
  min-height: auto; /* Mínimo da altura, por padrão “auto” */
  background-size: 100%;
  background-repeat: no-repeat;
  padding: 20px;
`;
export const ContainerSignup = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;

  @media (max-width: 880px) {
    grid-template-columns: 1fr;
  }
`;
