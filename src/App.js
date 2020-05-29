import React from 'react';
import {GlobalStyle,MenuEsquerda,ItemMenuEsquerda} from './styles'; // css global
import AppRoutes from './AppRoutes'; // rotas da aplicação

function App() {
  return (
    <React.Fragment>
      {/* INJETAR CSS DE FORMA GLOBAL */}
      <GlobalStyle/>      
      {/* MENU LATERAL ESQUERDO */}
      <MenuEsquerda>
            <ItemMenuEsquerda href="/Produto">Produto</ItemMenuEsquerda>
            <ItemMenuEsquerda href="/Listagem">Listagem</ItemMenuEsquerda>
            <ItemMenuEsquerda href="/Sair">Sair</ItemMenuEsquerda>
      </MenuEsquerda>
      {/* ROTAS DA APLICAÇÃO */}
      <AppRoutes/>
    </React.Fragment>
  );
}

export default App;
