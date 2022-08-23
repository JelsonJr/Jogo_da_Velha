const celulas = document.querySelectorAll(".campo");
const jogadorXis = "X";
const jogadorCirculo = "O";
const combinacoesDeVitoria = [[0,1,2],
[3,4,5],
[6,7,8],
[0,3,6],
[1,4,7],
[2,5,8],
[0,4,8],
[2,4,6]
]

let checarTurno = true;

document.addEventListener("click", (evento) => {
    if(evento.target.matches(".campo"))
        jogar(evento.target.id);
})

function jogar(id) {
    const campo = document.getElementById(id);
    turno = checarTurno ? jogadorXis : jogadorCirculo;
    campo.textContent = turno;
    campo.classList.add(turno);
    checarVencedor(turno);
    console.log(turno);
}

function checarVencedor(turno) {
    const vencedor = combinacoesDeVitoria.some((comb) => {
        return comb.every((index) => { return celulas[index].classList.contains(turno) });
    });

    if(vencedor) {
        encerrarJogo(turno);
    } else if(checarEmpate()) {
        encerrarJogo();
    } else {
        checarTurno = !checarTurno;
    }
}

function checarEmpate() {
    let x = 0;
    let o = 0;
    
    for(index in celulas) {
        if(!isNaN(index)) {
            if(celulas[index].classList.contains(jogadorXis))
                x++;
            
            if(celulas[index].classList.contains(jogadorCirculo))
                o++;
        }
    }
    
    return x + o === 9 ? true : false;
}

function encerrarJogo(vencedor = null) {
    const tela = document.getElementById("tela-final");
    const mensagem = document.createElement("h2");
    const temporizador = document.createElement("h3");
    let contador = 5;
    
    tela.style.visibility = "visible";
    tela.appendChild(mensagem);
    tela.appendChild(temporizador);
    
    if(vencedor) {
        mensagem.innerHTML = `O player ${vencedor} venceu!`;
    } else {
        mensagem.innerHTML = `Empatou!`;
    }
    
    setInterval(() => {
        temporizador.innerHTML =`<br> <br> Reiniciando em ${contador--}`;
    }, 1000);
    setTimeout(() => {location.reload()}, 5000);
}
