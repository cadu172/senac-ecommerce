import React from 'react';
import {Container,
        FormPadrao,
        InputEdit,
        LabelLEFT,
        InputButton} from '../../styles';

        //**  VERIFICAR ONDE COLOCAMOS A CUSTOMIZAÇÃO DOS FORMULÁRIOS DE UMA PÁGINA ESPECIFICA AO ONVÉS OD ARQUIVO DE STYLIST         

export default function FrmCadastroProduto() {
    return(
        <Container>
            <FormPadrao>
                <h3>Cadastro de Produtos</h3>
                <LabelLEFT for="sku">SKU</LabelLEFT>
                <InputEdit name="sku" value="" id="sku" />                
                <LabelLEFT for="nome">PRODUTO</LabelLEFT>
                <InputEdit name="nome" value="" id="nome" />
                <LabelLEFT for="descricao">DESCRIÇÃO</LabelLEFT>
                <InputEdit name="descricao" value="" id="descricao" />                
                <LabelLEFT for="preco">PREÇO</LabelLEFT>
                <InputEdit name="preco" value="" id="preco" />                
                <LabelLEFT for="qtd">Quantidade Disponível</LabelLEFT>
                <InputEdit name="qtd" value="" id="qtd" />                
                <LabelLEFT for="imagem">Imagem do Produto</LabelLEFT>
                <InputEdit name="imagem" value="" id="imagem" />
                {/* botãp de gravação */}
                <InputButton
                    type="submit"
                    name="BtnRegistrar"
                    id="BtnRegistrar"
                    value="Registrar Produto" />
            </FormPadrao>   
        </Container>
    );
}