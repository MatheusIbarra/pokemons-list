import React from "react";

import Logo from "assets/images/kotas-logo.png";

import * as S from "./styles";

const Header: React.FC = () => {
  return (
    <S.HeaderContainer>
      <img style={{width: 100, marginLeft: 30}} src={Logo} alt="logo"></img>
    </S.HeaderContainer>
  );
};

export default Header;
