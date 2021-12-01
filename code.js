let ganaste = document.querySelector(".ganaste");
let perdiste = document.querySelector(".perdiste");
let stopWatch = document.querySelector(".cronometro");
let nuevoJuego = document.querySelector(".nuevo-juego");
nuevoJuego.addEventListener("click",generarTablero);
nuevoJuego.addEventListener("click",start);
nuevoJuego.addEventListener("click",playPop);

let life = document.querySelector(".vidas");
let score = document.querySelector(".score");
let stopInterval;
let inicio = 0;
let iconos = [];
let selecciones = [];
let vidas = 11;
let record = 1;
var sonido = document.querySelector(".sonido");
let count = 0;
function playPop() {
    if (count== 0) {
        sonido.play();
    }else{
        count= 0;
        sonido.pause();
    }
}
start();
generarTablero();

function cargarIconos() {
    iconos = [
        `<i class="fas fa-heart"></i>`,
        `<i class="fas fa-certificate"></i>`,
        `<i class="fas fa-drumstick-bite"></i>`,
        `<i class="fas fa-anchor"></i>`,
        `<i class="fas fa-ambulance"></i>`,
        `<i class="fab fa-android"></i>`,
        `<i class="fab fa-angellist"></i>`,
        `<i class="fab fa-acquisitions-incorporated"></i>`,
        `<i class="fab fa-airbnb"></i>`,
        `<i class="fab fa-adn"></i>`,
        `<i class="fas fa-allergies"></i>`,
        `<i class="fas fa-angry"></i>`,
    ]
}
function generarTablero () {
    cargarIconos()
    selecciones = [];
    let tablero = document.getElementById("tablero");
    let tarjetas = [];
    perdiste.style.visibility = "hidden";
    ganaste.style.visibility = "hidden";
    const x =24;
    for (let i = 0; i < x; i++) {
        tarjetas.push(` 
        <div class="area-tarjeta" onclick="seleccionarTarjeta(${i})">
                    <div class="tarjeta" id="tarjeta${i}">
                        <div class="cara trasera" id="trasera${i}">
                            ${iconos[0]}
                        </div>
                        <div class="cara superior">
                            <i class="far fa-question-circle"></i>
                        </div>
                    </div>
                </div>        `);
        if (i % 2 == 1) {
            iconos.splice(0, 1)
        }
    }
    tarjetas.sort(() => Math.random() - 0.5);
    tablero.innerHTML = tarjetas.join(" ");
}

function seleccionarTarjeta(i) {
    let tarjeta = document.getElementById("tarjeta" + i)
    if (tarjeta.style.transform != "rotateY(180deg)") {
        tarjeta.style.transform = "rotateY(180deg)";
        selecciones.push(i);
    }
    if (selecciones.length == 2) {
        deseleccionar(selecciones);
        selecciones = [];
    }
}
function deseleccionar(selecciones) {
    setTimeout(() => {
        let trasera1 = document.getElementById("trasera" + selecciones[0]);
        let trasera2 = document.getElementById("trasera" + selecciones[1]);
        if (trasera1.innerHTML != trasera2.innerHTML) {
           life.innerHTML= vidas--;
           if (vidas == -1) {
               pausa();
            perdiste.style.visibility = "visible";
           }
            let tarjeta1 = document.getElementById("tarjeta" + selecciones[0]);
            let tarjeta2 = document.getElementById("tarjeta" + selecciones[1]);
            tarjeta1.style.transform = "rotateY(0deg)";
            tarjeta2.style.transform = "rotateY(0deg)";
        } else {
            
            score.innerHTML = record++;
            if (record == 12) {
                ganaste.style.visibility = "visible";
            }
            trasera1.style.background = "plum";
            trasera2.style.background = "plum"
        }
    }, 1000);
}

function  start() {
    let startTime = Date.now() - inicio;
    stopInterval = setInterval( () => {
        runningTime = Date.now() - startTime;
        stopWatch.innerHTML = calculateTime(runningTime);
    },1000)
}

const calculateTime = runningTime => {
    const totalSeconds = Math.floor(runningTime/1000);
    const totalMinutes = Math.floor(totalSeconds/60);

    const displaySeconds = (totalSeconds % 60).toString().padStart(2,"0");
    const displayMinutes = totalMinutes.toString().padStart(2,"0");
    return `${displayMinutes}:${displaySeconds}`
}

const parar = () =>{
 inicio = 0;
 clearInterval(stopInterval);
 stopWatch.textContent = `00:00`;  
 record = 1;
 vidas = 9;
 life.innerHTML = 10;
 score.innerHTML =  0; 
}

const pausa = () => {
    clearInterval(stopInterval);
}
