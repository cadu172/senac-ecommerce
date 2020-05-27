import React from 'react';
import { Link } from 'react-router-dom';

function NotFound404() {
    return(
        <>
            <p><img src="404_erro.jpg" alt="Erro 404 Padrão" /></p>
            <p><Link to="/">Voltar para o Menu Principal</Link></p>
        </>
    );
}

export default NotFound404;