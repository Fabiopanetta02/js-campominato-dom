/*
Consegna
Copiamo la griglia fatta ieri nella nuova repo e aggiungiamo la logica del gioco 
(attenzione: non bisogna copiare tutta la cartella dell'esercizio ma solo l'index.html, e le cartelle js/ css/ con i relativi script e fogli di stile, 
per evitare problemi con l'inizializzazione di git).

Il computer deve generare 16 numeri casuali nello stesso range della difficoltà prescelta: le bombe. Attenzione: 
nella stessa cella può essere posizionata al massimo una bomba, perciò nell’array delle bombe non potranno esserci due numeri uguali.

In seguito l'utente clicca su una cella: se il numero è presente nella lista dei numeri generati (delle bombe) 
- abbiamo calpestato una bomba - la cella si colora di rosso e la partita termina. 
Altrimenti la cella cliccata si colora di azzurro e l'utente può continuare a cliccare sulle altre celle.

La partita termina quando il giocatore clicca su una bomba o 
quando raggiunge il numero massimo possibile di numeri consentiti (ovvero quando ha rivelato tutte le celle che non sono bombe).

Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l’utente ha cliccato su una cella che non era una bomba.

//# MILESTONE 1
Prepariamo "qualcosa" per tenere il punteggio dell'utente.
Quando l'utente clicca su una cella, incrementiamo il punteggio.
Se riusciamo, facciamo anche in modo da non poter più cliccare la stessa cella.

//# MILESTONE 2
Facciamo in modo di generare 16 numeri casuali (tutti diversi) compresi tra 1 e il massimo di caselle disponibili.
Generiamoli e stampiamo in console per essere certi che siano corretti

//# MILESTONE 3
Quando l'utente clicca su una cella, verifichiamo se ha calpestato una bomba, controllando se il numero di cella è presente nell'array di bombe. 
Se si, la cella diventa rossa (raccogliamo il punteggio e e scriviamo in console che la partita termina) altrimenti diventa azzurra e 
dobbiamo incrementare il punteggio.

//# MILESTONE 4
Quando l'utente clicca su una cella, e questa non è una bomba, 
dobbiamo controllare se il punteggio incrementato ha raggiunto il punteggio massimo perchè in quel caso la partita termina. 
Raccogliamo quindi il messaggio è scriviamo un messaggio appropriato.
(Ma come stabiliamo quale sia il punteggio massimo?)

# MILESTONE 5
Quando la partita termina dobbiamo capire se è terminata perchè è stata cliccata una bomba o se perchè l'utente ha raggiunto il punteggio massimo. 
Dobbiamo poi stampare in pagina il punteggio raggiunto ed il messaggio adeguato in caso di vittoria o sconfitta.
*/



//*FUNZIONI*//
//CREAZIONE DELLA CELLA 
function createCell(content){
    const cell = document.createElement('div');
    cell.className= 'cell';
    cell.innerText = content;
    return cell;
}

//CREAZIONE NUMERI RANDOM
function createNumber(min, max){
    return Math.floor(Math.random() * (max - 1 + 1) ) + min;
}

// !1- Recupero gli elementi con l'id
const buttonPlay = document.getElementById('play');
const gridNumber = document.getElementById('grid');


// !2- Mi preparo delle condizioni inziali
//Grid
const rows = 10;
const cells = 10;
const totalCells= rows * cells;

//Punteggio
const maxScore = 84;
let scoreNow = 0;

//Numeri Random
let maxNumber = 16;
const min = 1;
const max = 100;
const randomNumber = [];

//Creo 16 numeri random
for(let i = 0; i < maxNumber; i++){
    const random = createNumber(min, max);
    randomNumber.push(random);
 }

 console.log(randomNumber);


// !3-Metto un addEventListener al bottone in modo tale che al click mi genera la griglia 
buttonPlay.addEventListener('click', function(){

    //Creo la logica per cui al click del bottone cambia la scritta da 'Play' a 'Ricomincia'
    buttonPlay.innerText = 'Ricomincia';

    //Svuola la griglia da eventuali contenuti
    gridNumber.innerHTML = '';

    // !Creo le celle per 100 volte e le metto in pagina
    for (let i = 1; i <= totalCells; i++){

        //Creo la cella 
        const newCell = createCell(i);

        /*-Creo la logica per cui quando clicco sulla cella si colora,  
        e mi tiene d'occhio il punteggio*/
        newCell.addEventListener('click', function () {

            //Impedisco di cliccare la stessa cella
            if(newCell.classList.contains('correct-choice' || 'error-choice')){
                return;  
              }
              
            //Controllo se la cella selezionata è un bomba oppure no, e coloro la cella
            const numberCell = parseInt(newCell.innerText);

                if (randomNumber.includes(numberCell)){
                    newCell.classList.add('error-choice');
                    alert(`HAI PERSO, hai totalizzato un punteggio di ${scoreNow} punti`);
                    return;
                }
                else{
                    newCell.classList.add('correct-choice');

                    //Creo la costante che mi tiene d'occhio il punteggio e incrementa ad ogni click
                    scoreNow++;
                    console.log(scoreNow);

                    if(scoreNow == maxScore){
                        alert(`HAI VINTO, hai totalizzato un punteggio di ${scoreNow} punti`)
                        return;
                    }  
                } 
        })

        //Aggancio la cella alla griglia
        gridNumber.append(newCell);
    }
})