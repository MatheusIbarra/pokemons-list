import React from "react";

import * as S from "./styles";

type SearchProps = {
  placeHolder: string;
  value: string | number | readonly string[];
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  resetSearch: () => void;
};

const SearchInput: React.FC<SearchProps> = ({ placeHolder, value, onChange, resetSearch }) => {
  return (
    <S.Container>
      <S.Input value={value} placeholder={placeHolder} onChange={(event) => onChange(event)}></S.Input>
      <S.EraseIcon onClick={resetSearch}>X</S.EraseIcon>
    </S.Container>
  );
};

export default SearchInput;
