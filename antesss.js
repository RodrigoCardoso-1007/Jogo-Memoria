mensagem = document.getElementById("mensagem");
/*declarar uma variável sem 'var' antes torna ela global, ou seja, pode ser acessada em qualquer parte do código*/
//tempoLimite=2*60*1000; /*é imortante multiplicar por 1000 pois o tempo é em milissegundos*/
//tempoInicial=0;
const cards = document.querySelectorAll('.memory-card');
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
var pontos = 0;
var todasAsCartas = 6;

var timer = new Timer();


document.getElementById("startButton").addEventListener("click", function() {


    function flipCard() {
        if (lockBoard) return;
        if (this === firstCard) return;
        this.classList.add('flip');
        if (!hasFlippedCard) {
            hasFlippedCard = true;
            firstCard = this;
            return;
        }
        secondCard = this;
        lockBoard = true;

        checkForMatch();
    }

    function checkForMatch() {
        let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
        isMatch ? disableCards() : unflipCards();
    }

    function disableCards() {
        firstCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('click', flipCard);
        pontos = pontos + 1;
        resetBoard();
    }

    function unflipCards() {
        setTimeout(() => {
            firstCard.classList.remove('flip');
            secondCard.classList.remove('flip');

            resetBoard();
        }, 1500);
    }

    function resetBoard() {
        [hasFlippedCard, lockBoard] = [false, false];
        [firstCard, secondCard] = [null, null];
    }

    shuffle();

    cards.forEach(card => card.addEventListener('click', flipCard));




    timer.start({ countdown: true, startValues: { seconds: 60 } });
    document.getElementById("values").innerHTML = timer.getTimeValues().toString();
    timer.addEventListener('secondsUpdated', function(e) {
        document.getElementById("values").innerHTML = timer.getTimeValues().toString();

        if (pontos >= todasAsCartas) {
            ganhou();
        }
    });
    timer.addEventListener('targetAchieved', function(e) {
        document.getElementById("values").innerHTML = "O tempo acabou!!";
    });



});


function shuffle() {
    cards.forEach(card => {
        let ramdomPos = Math.floor(Math.random() * 12);
        card.style.order = ramdomPos;
    });
};


document.getElementById("resetBoard").addEventListener("click", function() {
    location.reload();
    shuffle();
});

document.getElementById("pauseButton").addEventListener("click", function() {
    timer.pause();
});

/*document.getElementById("resetButton").addEventListener("click", function(){
    timer.reset();
});*/
timer.addEventListener('secondsUpdated', function(e) {
    console.log(document.getElementById("values"));
    document.getElementById("values").innerHTML = timer.getTimeValues().toString();
});
timer.addEventListener('started', function(e) {
    document.getElementById("values").innerHTML = timer.getTimeValues().toString();
});
timer.addEventListener('reset', function(e) {
    document.getElementById("values").innerHTML = timer.getTimeValues().toString();
});


var perdeu = function() {
    mensagem.innerHTML = " Você perdeu :(";
    mensagem.style.textAling = "center";
}
var ganhou = function() {
    mensagem.innerHTML = "Parabéns!! Você ganhou \o/!!";
    mensagem.style.textAling = "center";
    window.open("venceu.html");

}