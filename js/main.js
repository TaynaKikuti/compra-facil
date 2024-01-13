let listaDeItens = []

const form = document.querySelector('.inserir__produtos')
const inputAdicionar = document.querySelector('#inserir__produtos__input')
const btnAdicionar = document.querySelector('.btnAdicionar')
const listaDeProdutos = document.querySelector('.lista__de__compras')
const listaDeComprados = document.querySelector('.comprados__lista')
const listaLocalStorage = localStorage.getItem('lista')
const mensagemErro = document.querySelector('.mensagem__erro')


form.addEventListener('submit', function (evento) {
    evento.preventDefault()
    mensagemErro.innerHTML = ''
    let itens = inputAdicionar.value
    salvarItem()
    inputAdicionar.value = ''

})



function atualizaLista() {
    localStorage.setItem('lista', JSON.stringify(listaDeItens))
}

if(listaLocalStorage) {
    listaDeItens = JSON.parse(listaLocalStorage)
    mostrarItem()
} else {
    listaDeItens = []
}



function salvarItem() {
    const comprasItem = inputAdicionar.value
    const checarDuplicado = (listaDeItens.some((elemento) => elemento.valor.toUpperCase() === comprasItem.toUpperCase())) 
    
    if(checarDuplicado) {
        mensagemErro.innerHTML = `Item já se encontra na lista`
    } else {
        listaDeItens.push({
            valor: comprasItem,
            checar: false
        })
        mostrarItem()
    }
}



function mostrarItem () {
    listaDeProdutos.innerHTML = ''
    listaDeComprados.innerHTML = ''
    listaDeItens.forEach((elemento, index) => {
        if(elemento.checar) {
            listaDeComprados.innerHTML += `
            <li data-value="${index}">
                <div class="lista__item">
                    <label for="iproduto">${elemento.valor}</label>
                    <input type="checkbox" name="iproduto" id="iproduto" class="checkbox__produto">
                </div>
        
                <div class="lista__item__img">
                    <img src="./assets/icons8-remover-48.png" alt="ícone para remover" width="30px" id="delete">
                </div>
            </li>
            `
        } else {
            listaDeProdutos.innerHTML += `
            <li data-value="${index}">
                <div class="lista__item">
                    <label for="iproduto">${elemento.valor}</label>
                    <input type="checkbox" name="iproduto" id="iproduto" class="checkbox__produto">
                </div>
        
                <div class="lista__item__img">
                    <img src="./assets/icons8-caixa-de-seleção-marcada-48.png" alt="Ícone de caixa de seleção para item comprado" width="30px" id="btnComprado">
                    <img src="./assets/icons8-remover-48.png" alt="ícone para remover" width="30px" id="delete">
                </div>
            </li>
            `
        }
    })    


    const btnDeletar = document.querySelectorAll('#delete')
    btnDeletar.forEach(botao => {
        botao.addEventListener('click', (evento) => {
            const valorDoElemento = evento.target.parentElement.parentElement.getAttribute('data-value')
            console.log(valorDoElemento)

            listaDeItens.splice(valorDoElemento,1)
            mostrarItem()
        })
    })



    const btnComprado = document.querySelectorAll('#btnComprado')
    btnComprado.forEach(botao => {
        botao.addEventListener('click', (evento)=> {
            const valorDoElemento = evento.target.parentElement.parentElement.getAttribute('data-value')
            listaDeItens[valorDoElemento].checar = 'true'
            mostrarItem()
        })
    })

    atualizaLista()
}
