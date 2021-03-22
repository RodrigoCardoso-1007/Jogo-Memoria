/*window.onload = function() { //inicio da tarefa ao carregar a página
  window.setInterval(setInterval(funcaoCronometro,1000));
  };/*chama a cada 1 segundo*/
//tempoR=document.getElementById("tempoR");
mensagem = document.getElementById("mensagem");
/*declarar uma variável sem 'var' antes torna ela global, ou seja, pode ser acessada em qualquer parte do código*/
//tempoLimite=2*60*1000; /*é imortante multiplicar por 1000 pois o tempo é em milissegundos*/
//tempoInicial=0;
const cards = document.querySelectorAll('.memory-card');
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
var pontos = 0;
var todasAsCartas = 8;
var timer = new Timer();

function flipCard() {

    if (lockBoard) return;
    if (this === firstCard) return;
    this.classList.add('flip');
    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        tempo();
        return;
    }
    
    secondCard = this;
    lockBoard = true;
    checkForMatch();
    

}

function checkForMatch() {
    let fc = firstCard.dataset.framework;
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


function tempo() {
    timer.start({ countdown: true, startValues: { seconds: 60 } });
}
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

function shuffle() {
    cards.forEach(card => {
        let ramdomPos = Math.floor(Math.random() * 16);
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
    window.location.replace("venceu3.html");

}





/*function Timer(mins, target, cb) {
    this.counter = mins * 60;
    this.target = target;
    this.callback = cb;
  this.isPaused = false;
}

Timer.prototype.pad = function(s) {
    return (s < 10) ? '0' + s : s;
}

Timer.prototype.stop = function(s) {
    //this.count();
  this.isPaused = !this.isPaused;
}


if (!this.isPaused) {
  
  Timer.prototype.start = function(s) {
    this.count();
  }
  
  Timer.prototype.done = function(s) {
    if (this.callback) this.callback();
  }
  
  Timer.prototype.display = function(s) {
    this.target.innerHTML = this.pad(s);  
  }
  
  Timer.prototype.count = function(s) {
    var self = this;
    
    
      self.display.call(self, self.counter);
      self.counter--;
      var clock = setInterval(function() {
        self.display(self.counter);
        
        self.counter--;
        if(pontos>=todasAsCartas)
        {
          ganhou();
          clearInterval(clock);
          //self.done.call(self);
        }
        
        if (self.counter < 0) {
           clearInterval(clock);
           self.done.call(self);
        }
      }, 1000);
    }

}*/


/*var funcaoCronometro= function(){
    var tempoAgora =window.performance.now();
    if(tempoInicial==0)
    {
      tempoInicial=tempoAgora;
      tempoInicial=tempoInicial/1000;/*transformando em segundos*/
//  }
/*  var tempoGasto=tempoAgora-tempoInicial;/*esta em milissegundos*/
/*  tempoGasto=tempoGasto/1000;/*transformando em segundos*/

/*   tempoR= tempoLimite-tempoGasto+"s"

    if(tempoGasto>=tempoLimite && mensagem.innerHTML=="")
    {
      perdeu();
    }else if(pontos>=todasAsCartas)
    {
      ganhou();
    }
}*/
