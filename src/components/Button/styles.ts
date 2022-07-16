import { shade } from 'polished';
import styled, { css } from 'styled-components';

interface ContainerProps {
  isLoading: number;
  typeColor?: 'create' | 'edit' | 'delete' | 'info';
}

const backgroundVariationColor = {
  create: css`
    background: #68d391;
  `,
  edit: css`
    background: #63b3ed;
  `,
  delete: css`
    background: #fc8181;
  `,
  info: css`
    background: #ff9000;
  `,
};

export const Container = styled.button<ContainerProps>`
  background: #ff9000;
  ${props => backgroundVariationColor[props.typeColor || 'info']}
  height: 56px;
  border-radius: 10px;
  border: 0;
  padding: 0 16px;
  color: #312e38;
  width: 80%;
  justify-items: center;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  margin-top: 16px;
  transition: background-color 0.3s;

  &:hover {
    background: ${shade(0.2, '#ff9000')};
  }
  cursor: ${({ isLoading }) => (isLoading ? 'not-allowed' : 'pointer')};

  @media (max-width: 700px) {
    width: 50%;
  }
`;
