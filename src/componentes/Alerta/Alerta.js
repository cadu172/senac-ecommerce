import React from 'react';

import './Alerta.css';

export default function Alerta({param_Tipo, param_Texto}) {
    return(
        <React.Fragment>
          <div id="messageBOX">                         
               <div id="messageBOXDialog">
                    <header>Senac E-Commerce</header>
                    <section>                                        
                         <img src="imagens/icones/erro.png" alt="Icone da mensagem de confirmação" />                    
                         <div id="areaTexto">
                         {param_Texto}
                         </div>
                    </section>
                    <footer>
                         <input type="button"
                              name="BtnCloseModal"
                              id="BtnCloseModal"
                              value="OK"  

                              //--- colocar um parametros de callback neste componente
                              //--- criar uma funcao callback pra zerar a mensagem e fechar a janela                       
                              />
                    </footer>
               </div>
          </div>            
        </React.Fragment>
    );
}