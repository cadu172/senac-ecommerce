import React from 'react';
import { Link } from 'react-router-dom';

function NotFound404() {
    return(
        <>
            <p><img src="/imagens/404_erro.jpg" alt="Erro 404 Padrão" /></p>
            <p><Link to="/">Página Incial</Link></p>
        </>
    );
}

export default NotFound404;