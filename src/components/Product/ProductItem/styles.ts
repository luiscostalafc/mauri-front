import { darken } from 'polished';
import styled from 'styled-components';

export const Container = styled.div`
  span {
    font-size: 21px;
    font-weight: bold;
    margin: 5px 0 20px;
  }
  button {
    background: #ff9000;
    color: #fff;
    border: 0;
    border-radius: 4px;
    overflow: hidden;
    margin-top: auto;
    display: flex;
    align-items: center;
    transition: background 0.2s;

    &:hover {
      background: ${darken(0.3, '#ff9000')};
    }

    div {
      display: flex;
      align-items: center;
      padding: 12px;
      background: rgba(0, 0, 0, 0.2);
      svg {
        margin-right: 5px;
      }
    }
  }
`;

export const StyledBadge = styled.div`
  max-width: 200px;
  word-wrap: break-word;
  background-color: orange;
  border-radius: 8px;
  text-align: center;
`;
