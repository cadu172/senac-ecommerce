import React, {useEffect, useState, useCallback} from 'react';
import { Container } from '../../styles';

function Listagem() {

    // lista com a relação de produtos cadastrados
    const [arrayListProduto, setListProduto] = useState([]);

    // carregar a lista de produtos cadastrados
    useEffect(()=>{        
        setListProduto(JSON.parse(localStorage.getItem('@senac-ecommerce')));        
    },[]);

    // função para ver os detalhes do produto atual
    const handleDetalhes = useCallback((e)=>{
    },[]);

    return(
        <Container>
            <h1>Listagem de Produtos</h1>
            <table>
                <thead>
                    <tr>
                        <th>SKU</th>
                        <th>NAME</th>
                        <th>PRICE</th>
                    </tr>
                </thead>
                <tbody>
                {arrayListProduto.map(
                    (prod)=>(
                            <tr key={prod.sku}>
                                <td>{prod.nome}</td>
                                <td>{prod.preco}</td>
                                <td>
                                    <button
                                        onClick={()=>handleDetalhes(prod)} >
                                        Detalhes
                                    </button>
                                </td>
                            </tr>
                    )
                )}
                </tbody>
            </table>
        </Container>
    );
}

export default Listagem;