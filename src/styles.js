import styled, { createGlobalStyle } from 'styled-components';

// Incluir css de forma global com o componente styled-components
// substituir o arquivo App.css

export const GlobalStyle = createGlobalStyle`

    @charset 'utf-8';

    * {
        padding: 0;
        margin: 0;
        box-sizing: border-box;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;        
    }

    html, body, #root {
        padding: 0px;
        margin: 0px;
        height: 100%;
        display: block;
    }

    body {
        background-image: url('./imagens/bgloginsac.jpg');
        background-size: cover;
    }
`;

//teste
export const Container = styled.div`
    width: 100%;    
    background-color: none;
    text-align: left;
`;

//menu de navegação lateral com os itens do site
export const MenuEsquerda = styled.div`
    height: 100%;
    width: 200px;
    background-color: #242424;
    float: left; 
`;

//item do menu lateral
export const ItemMenuEsquerda = styled.a`
    display: block;               
    text-align: center;
    padding-top: 15px;
    padding-bottom: 15px;
    color: #f1f1f1;            
    font-size: 18px;
    border-bottom: solid 1px rgba(255,255,255,0.3);
    transition: all 0.5s;
    text-decoration: none;
    cursor: pointer;
    /******evento :hover()*****/
    &:hover {
        background-color: #636363;
    }
`;

// formulário padrão
export const FormPadrao = styled.div`
    background-color: #f5f5f5;
    border-radius: 3px;
    float: left;
    margin-left: 20px;
    padding: 30px;
    border: solid 1px #000;
    margin-bottom: 10px;
    width: 500px;
`;

// padrão para campo edit
export const InputEdit = styled.input`
    border: solid 1px #686868;
    height: 30px;            
    font-size: 15px;            
    width: 100%;
    padding-left: 5px;                                    
    padding-right: 5px;
    border-radius: 5px;
    margin-bottom: 5px;
`;

//label alinhado para esquerda
export const LabelLEFT = styled.label`
    display: inline-block;
    text-align: left;
    color: #00008b; 
`;

//label alinhado para direita
export const LabelRIGHT = styled.label`
    display: inline-block;
    text-align: rigth;
    color: #00008b; 
`;

// botãopadrão
export const InputButton = styled.input`
    height: 40px;
    background-color: #00005d;
    color: #fff;
    font-size: 15px;
    border: 1px solid #000031;
    padding-left: 15px;                        
    padding-right: 15px;
    border-radius: 6px;   
    cursor: pointer;
    width: 100%;

    /** :hover() ***/
    &:hover {
        background-color: rgb(0,0,64);
        transition: all 0.5s;        
    }
`