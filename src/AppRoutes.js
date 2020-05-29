import React from 'react';
//import Main from './Main';
import FrmCadastroProduto from './componentes/FrmCadastroProduto/FrmCadastroProduto';
import NotFound404 from './componentes/Error/NotFound404';
import { BrowserRouter,
         Switch,
         Route } from 'react-router-dom';
import Listagem from './componentes/Listagem/Listagem';

export default function AppRoutes() {
    return(
        <BrowserRouter>
        <Switch>            
            <Route path="/Produto" exact={true} component={FrmCadastroProduto} />
            <Route path="/Listagem" exact={true} component={Listagem} />
            <Route path="*" component={NotFound404} />
        </Switch>
        </BrowserRouter>        
    );
}