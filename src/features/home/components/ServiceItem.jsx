import styled from 'styled-components';
import React from 'react';
import { useNavigate } from 'react-router-dom';

function ServiceItem({ children, path, iconSrc, alt, ...props }) {
  const navigate = useNavigate();

  return (
    <Styles onClick={() => navigate(path)}>
      <div>
        <img src={iconSrc} className='' alt={alt} {...props} />
      </div>
      <p>{children}</p>
    </Styles>
  );
}

export default ServiceItem;

const Styles = styled.div`
  display: flex;
  flex: 1 0 30%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 1rem 0;
  width: auto;
  cursor: pointer;
  text-decoration: none;

  div {
    border-radius: 50px;
    width: fit-content;
  }

  p {
    font-size: 0.8rem;
    font-weight: bold;
    margin: 0.5rem 0;
    max-width: 5rem;
    text-align: center;
    color: rgb(54, 54, 54);
  }

  img {
    width: 3.75rem;
    height: 3.75rem;
    border-radius: 30%;
    background-color: #009387;
    padding: 0.8rem;
    box-shadow: 6px 2px 2px 0px rgba(187, 204, 255, 0.75);
    -webkit-box-shadow: 6px 2px 2px 0px rgba(187, 204, 255, 0.75);
    -moz-box-shadow: 6px 2px 2px 0px rgba(187, 204, 255, 0.75);
  }
`;
