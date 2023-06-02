import React from "react";
import { StyledContainer } from "../../../styles";
import styled from "styled-components";
import Currency from "./Currency";
const StyledFooter = styled.footer`
  background-color: var(--dark-700);
`;

const Footer = () => {
  return (
    <StyledFooter>
      <StyledContainer>
        <Currency />
      </StyledContainer>
    </StyledFooter>
  );
};

export default Footer;
