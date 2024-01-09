let listaDeItens = []

const form = document.querySelector('.inserir__produtos')
const inputAdicionar = document.querySelector('#inserir__produtos__input')
const btnAdicionar = document.querySelector('.btnAdicionar')
const listaDeProdutos = document.querySelector('.lista__de__compras')
const listaDeComprados = document.querySelector('.comprados__lista')
const btnDeletar = document.querySelectorAll('#delete')
const btnComprado = document.querySelectorAll('#btnComprado')


form.addEventListener('submit', function(evento){
    evento.preventDefault()
    let itens = inputAdicionar.value
    salvarItem()
    inputAdicionar.value = ''
})



function salvarItem() {
    const comprasItem = inputAdicionar.value
    const checarDuplicado = listaDeItens.some((elemento) => elemento.valor.toUpperCase() === comprasItem.toUpperCase()) 
    
    if(checarDuplicado) {
        alert('Item já existe na lista')
    } else {
        listaDeItens.push({
            valor: inputAdicionar.value
        })
        mostrarItem()
    }
}


function mostrarItem () {
    listaDeProdutos.innerHTML += `
    <li>
    <div class="lista__item">
        <label for="iproduto">${inputAdicionar.value}</label>
        <input type="checkbox" name="iproduto" id="iproduto" class="checkbox__produto">
    </div>

    <div class="lista__item__img">
        <img src="./assets/icons8-caixa-de-seleção-marcada-48.png" alt="Ícone de caixa de seleção para item comprado" width="30px" id="btnComprado">
        <img src="./assets/icons8-remover-48.png" alt="ícone para remover" width="30px" id="delete">
    </div>
    </li>`
    
    
    btnComprado.forEach(botao => {
        botao.addEventListener('click', ()=> {
            listaDeComprados.innerHTML += `
            <div>${inputAdicionar.value}</div>
            <div><img src="./assets/icons8-remover-48.png" alt="ícone para remover" width="30px" id="delete"></div>
            `
        })
    })
}

