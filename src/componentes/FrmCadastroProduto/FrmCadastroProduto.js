import React, {useState,useCallback,useEffect,useRef} from 'react';
import {Container,
        FormPadrao,
        InputEdit,
        LabelLEFT,
        InputButton} from '../../styles';

import AlertaSimples from '../Alerta/AlertaSimples';

import api from '../Services/ApiSenac';

export default function FrmCadastroProduto() {

    const ref = useRef(null);
    
    const produtoVazio = {
        //sku: "",
        id: "",        
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
        /*var listaAtual = JSON.parse(localStorage.getItem('@senac-ecommerce'));        
        // setar array
        if( Array.isArray(listaAtual) ){
            setListaProduto(listaAtual);
        }
        else {
            setListaProduto([]);
        }*/
        // $$$$ BUSCA PELO LOCALSTORAGE DESATIVADA MOMENTANEAMENTE
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
        //if ( arrayListProduto.find((o)=>o.sku===produto.sku)===undefined )

        /*if ( Array.isArray(arrayListProduto) )
        {
            if ( arrayListProduto.find((o)=>o.sku===produto.sku)===undefined )
            return false;
        }
        else
        return false;        
        return true;*/

        const getProduto = async () => {
            try
            {
                return await api.get('senac/' + produto.id);
            }
            catch (ex)
            {
                console.log(ex);
            }
        }

        var resultado = getProduto();

        if ( resultado.status === 200 )
            return true
        else
        return false;

        /////// mudar a verificação da gravação depois, retirar do evento on_blur
        

    },[produto]);
    //},[arrayListProduto,produto]);

    const gravarNaAPI = useCallback(()=>{

        // aqui zera as mensagens de erro
        setMessageAlerta(null);        

        // envia requisição para API
        api.post('senac',produto)
        .then(resposta => {
            setMessageAlerta({tipo:"Success", descricao:"Produto Registrado com Sucesso"});
            //history.push("/Listagem");
            console.log(resposta.data); // imprimie o retorno no console
        })
        .catch(erro => {
            console.log(erro); // imprimie o retorno no console
            setMessageAlerta({tipo:"Error", descricao: erro.response.status + ' - ' + erro.response.statusText});            
        })        

    },[produto]);    

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
            
            /*if (Array.isArray(arrayListProduto)){
                // incluir
                arrayListProduto.push(produto); //**** aqui grava na localStorage
            }
            else
            {   
                setListaProduto([]);
                arrayListProduto.push(produto);
            }*/

            // alterado para gravar na API
            gravarNaAPI();

            // retorna verdadeiro
            return true;
        }

        // caso não tenha sucesso, retona falso
        return false;

        //dependencias da função
    //},[produto,gravarNaAPI,sku_estaCadastrado,arrayListProduto]);

    },[produto,
        sku_estaCadastrado,gravarNaAPI]);

    // rotina de gravação
    const gravarLocalStorage = useCallback((p_Form)=>{
        
        p_Form.preventDefault();        

        addItem(); // alterado para gravar na API

        // gravando no localStorage
        /*if ( addItem() )
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
            
        }  */      
        

    //},[addItem,arrayListProduto]);
    },[addItem]);


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
                    name="id"
                    value={produto.id}
                    id="id"
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