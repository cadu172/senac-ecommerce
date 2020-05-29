import React, {useState,useCallback,useEffect,useRef} from 'react';
import {Container,
        FormPadrao,
        InputEdit,
        LabelLEFT,
        InputButton} from '../../styles';

import AlertaSimples from '../Alerta/AlertaSimples';

export default function FrmCadastroProduto() {

    const ref = useRef(null);
    
    const produtoVazio = {
        sku: "",
        nome: "",
        descricao: "",
        preco: 0,
        qtd: 0,
        imagem: ""
      };
    
    const msgVazio = {
        tipo: "",
        descricao: ""
    }

    // ultimo erro
    const [msgAlerta, setMessageAlerta] = useState(msgVazio);

    // inicializar
    const [produto, setProduto] = useState(produtoVazio);

    // lista de itens vazia
    const [arrayListProduto, setListaProduto] = useState([]);

    // obtem a lista atual de produtos cadastrados no local storage
    useEffect(()=>{
        // converte em array
        var listaAtual = JSON.parse(localStorage.getItem('@senac-ecommerce'));        
        // setar array
        setListaProduto(listaAtual);            
    },[]);

    // evento de alteração do campo
    const handlerChange = useCallback((objeto)=>{        
        // zerar erro ao voltar digitar
        setMessageAlerta(msgVazio);        
        //
        setProduto({
        ...produto,
        [objeto.target.name]: objeto.target.value
        });    
    },[produto,msgVazio]);

    /**
     * função para localizar um SKU dentro de um ArrayList
     */
    const sku_estaCadastrado = useCallback(()=>{
        //achei em: https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/find
        if ( arrayListProduto.find((o)=>o.sku===produto.sku)===undefined )
        return false;
        return true;
    },[arrayListProduto,produto]);

    // função para adicionar no array atual
    const addItem = useCallback(()=>{        
        
        // incluir item no array que será salvo em localStorage
        if ( isNaN(produto.sku) )
            setMessageAlerta({tipo:"Error", descricao:"SKU Inválido"})        
        
        else if ( produto.nome.trim() === "" )
            setMessageAlerta({tipo:"Error", descricao:"NOME do produto não fornecido"})
        
        else if ( produto.descricao.trim() === "" )
            setMessageAlerta({tipo:"Error", descricao:"Informe a Descrição do Produto"})            
        
        else if ( ( produto.preco <= 0 ) || ( isNaN(produto.preco) ) )            
            setMessageAlerta({tipo:"Error", descricao:"Informe o Preço do Produto"}) 
        
        else if ( ( produto.qtd <= 0 ) || ( isNaN(produto.qtd) ) )
            setMessageAlerta({tipo:"Error", descricao:"Quantidade Inválida"})             
        
        else if ( produto.imagem.trim() === "" )
        {
            setMessageAlerta({tipo:"Error", descricao:"Arquivo de imagem não informado => "+produto.imagem.trim.length.toString})             
        }
        
        else if ( sku_estaCadastrado() )
            setMessageAlerta({tipo:"Error", descricao:"SKU Informado já está cadastrado"}) 
        else
        {
            
            // incluir
            arrayListProduto.push(produto);

            // retorna verdadeiro
            return true;
        }

        // caso não tenha sucesso, retona falso
        return false;

        //dependencias da função
    },[ arrayListProduto,
        produto,
        sku_estaCadastrado]);

    // rotina de gravação
    const gravarLocalStorage = useCallback((p_Form)=>{
        
        p_Form.preventDefault();        

        // gravando no localStorage
        if ( addItem() )
        {
            
            try
            {            
                // gravação na loca storage
                localStorage.setItem('@senac-ecommerce',JSON.stringify(arrayListProduto));
                
                // mensagem de confirmação            
                setMessageAlerta({tipo:"Success", descricao:"Cadastrado com Sucesso"})

            }
            catch (err)
            {
                setMessageAlerta({tipo:"Error", descricao: err.message})
            }
            
        }
        
        

    },[addItem,arrayListProduto]);


    const handlerSKU_OnBlur = useCallback(()=>{
        if (sku_estaCadastrado())
        {
            //console.log(produto);
            //console.log(arrayListProduto);
            setMessageAlerta({tipo:"Error", descricao:"Atenção! Já existe um produto com este SKU"});            
            ref.current.focus();
        }
    },[sku_estaCadastrado,ref]);


    return(
        <Container>
            <form onSubmit={gravarLocalStorage}>            
            <FormPadrao>                
                <h1>Cadastro de Produtos</h1>
                <LabelLEFT>SKU</LabelLEFT>
                <InputEdit 
                    ref={ref}
                    name="sku"
                    value={produto.sku}
                    id="sku"
                    onChange={handlerChange}
                    onBlur={handlerSKU_OnBlur}
                    />                
                
                <LabelLEFT>PRODUTO</LabelLEFT>
                <InputEdit
                    name="nome"
                    value={produto.nome}
                    id="nome"
                    onChange={handlerChange}
                    />
                
                <LabelLEFT>DESCRIÇÃO</LabelLEFT>
                <InputEdit
                    name="descricao"
                    value={produto.descricao}
                    id="descricao"
                    onChange={handlerChange}
                    />                
                
                <LabelLEFT>PREÇO</LabelLEFT>
                <InputEdit
                    name="preco"
                    value={produto.preco}
                    id="preco"
                    onChange={handlerChange}
                    />                
                
                <LabelLEFT>Quantidade Disponível</LabelLEFT>
                <InputEdit
                    name="qtd"
                    value={produto.qtd}
                    id="qtd"
                    onChange={handlerChange}
                    />                
                
                <LabelLEFT >Imagem do Produto</LabelLEFT>
                <InputEdit
                    name="imagem"
                    value={produto.imagem}
                    id="imagem"
                    onChange={handlerChange}
                    />
                
                {/* botãp de gravação */}
                <InputButton
                    type="submit"
                    name="BtnRegistrar"
                    id="BtnRegistrar"
                    value="Registrar Produto" />

                {/* MENSAGEM DE ALERTA SIMPLES */}
                {msgAlerta && <AlertaSimples paramMSG={msgAlerta.descricao} paramTipo={msgAlerta.tipo} />}
            </FormPadrao>
            </form>   
        </Container>
    );
}