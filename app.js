let listaDeNumerosSorteados = [];
let numeroLimite = 10
let numeroSecreto = gerarNumeroAleatorio();
let tentativa = 1;
console.log(numeroSecreto)
exibirMensagemInicial();

//Funções que mudam o título e o parágrafo do site
function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}

function exibirMensagemInicial(){
    exibirTextoNaTela('h1', 'Jogo do número secreto');
    exibirTextoNaTela('p', 'Escolha um número de 1 a 10');
}

//Função que verifica o chute e dá dicas ao jogador
function verificarChute() {
    let palavraTentativa = tentativa > 1 ? 'tentativas' : 'tentativa';
    let chute = document.querySelector('input').value;
    if (chute == numeroSecreto) {
        exibirTextoNaTela('h1', 'ACERTOU!');
        exibirTextoNaTela('p', `Você descobriu o número secreto com ${tentativa} ${palavraTentativa}!`)
        document.getElementById('reiniciar').removeAttribute('disabled');
    }
    else {
        if (chute > numeroSecreto) {
            exibirTextoNaTela('p', 'O número secreto é menor');
        }
        else {
            exibirTextoNaTela('p', 'O número secreto é maior');
        }
        tentativa ++;
        limparCampo();
    }
}

//Função do número aleatório
function gerarNumeroAleatorio() {
    let qtdElementos = listaDeNumerosSorteados.length;
    if (qtdElementos == numeroLimite) {
        listaDeNumerosSorteados = [];
    }
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
    }
    else {
        listaDeNumerosSorteados.push(numeroEscolhido)
        console.log(listaDeNumerosSorteados)
        return numeroEscolhido
    }
}

//Função que limpa o campo de inserir o número caso erre o chute
function limparCampo() {
    chute = document.querySelector('input');
    chute.value = "";
}

//Função que reinicia o jogo
function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativa = 1;
    console.log(numeroSecreto);
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled',true);
}