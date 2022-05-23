import styled from "styled-components";

export const Input = styled.input`
    border-radius: 50px;
    padding: 10px;
    border: 1px solid #E1E1E1;
    width: 100%;
    transition: 0.3s all ease;
    height: 45px;
    font-size: 16px;
    padding-left: 50px;
    line-height: 110%;

    ::placeholder {
        color: #C1BEBE;
        font-weight: 400;
        line-height: 110%;
    }

    :focus-visible {
        outline-width: 0px;
        border: 1px solid #ababab;
    }
`

export const Container = styled.div`
    position: relative;
    width: 92%;
`

export const EraseIcon = styled.div`
    position: absolute;
    cursor: pointer;
    top: 24px;
    right: 0px;
`