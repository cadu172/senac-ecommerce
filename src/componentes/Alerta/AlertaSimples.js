import React from 'react';

import './Alerta.css';

function AlertSimples({paramMSG, paramTipo}) {

    return (
        <React.Fragment>
            <div className={paramTipo}>
                {paramMSG}
            </div>
        </React.Fragment>
    );

}

export default AlertSimples;