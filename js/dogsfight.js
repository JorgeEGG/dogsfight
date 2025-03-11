const sectionSeleccionarAtaque = document.getElementById("seleccionar-ataque"); // variables utilizadas en diferentes funciones
const sectionReiniciar = document.getElementById("reiniciar");
const botonMascotaJugador = document.getElementById("boton-mascota");
const botonReiniciar = document.getElementById("boton-reiniciar");

const sectionSeleccionarMascota = document.getElementById(
    "seleccionar-mascota"
);

const spanMascotaJugador = document.getElementById("mascota-jugador");
const spanMascotaJugadorImg = document.getElementById("mascota-jugador-img");
const spanMascotaJugadorAtq = document.getElementById("mascota-jugador-atq");

const spanMascotaEnemigo = document.getElementById("mascota-enemigo");
const spanMascotaEnemigoImg = document.getElementById("mascota-enemigo-img");
const spanMascotaEnemigoAtq = document.getElementById("mascota-enemigo-atq");

// const spanVidasJugador = document.getElementById("vidas-jugador");
// const spanVidasEnemigo = document.getElementById("vidas-enemigo");
const spanVictoriasJugador = document.getElementById("victorias-jugador");
const spanVictoriasEnemigo = document.getElementById("victorias-enemigo");

const sectionMensajes = document.getElementById("resultado");
const ataquesDelJugador = document.getElementById("ataques-del-jugador");
const ataquesDelEnemigo = document.getElementById("ataques-del-enemigo");
const contenedorTarjetas = document.getElementById("contenedorTarjetas");
const contenedorAtaques = document.getElementById("contenedorAtaques");

let dogs = []; // arreglo para guardar diferentes objetos (perros)
let ataqueJugador = [];
let ataqueEnemigo = [];
let opcionDeDogs;
let inputMenta;
let inputMerlot;
let inputPanela;
let mascotaJugador;
let ataquesDog;
let ataquesDogEnemigo;
let botonFuego;
let botonAgua;
let botonTierra;
let botones = [];
let indexAtaqueJugador;
let indexAtaqueEnemigo;
let victoriasJugador = 0;
let victoriasEnemigo = 0;
let vidasJugador = 3;
let vidasEnemigo = 3;

class Dogs {
    // clase
    constructor(nombre, foto, vida) {
        this.nombre = nombre;
        this.foto = foto;
        this.vida = vida;
        this.ataques = [];
    }
}

let menta = new Dogs("Menta", "./assets/menta1.png", 5); // objeto con sus propiedades del constructor
let merlot = new Dogs("Merlot", "./assets/Merlot.webp", 5); // objeto con sus propiedades del constructor
let panela = new Dogs("Panela", "./assets/Panela.png", 5); // objeto con sus propiedades del constructor

menta.ataques.push(
    // método para agregar elementos(objetos-perros) a un arreglo (lista de objetos-lista de perros)
    { nombre: "Agua 💦", id: "boton-agua" },
    { nombre: "Aire 🦅", id: "boton-aire" },
    { nombre: "Fuego 🔥", id: "boton-fuego" },
    { nombre: "Agua 💦", id: "boton-agua" },
    { nombre: "Tierra 🌳", id: "boton-tierra" }
);

merlot.ataques.push(
    // método para agregar elementos(objetos-perros) a un arreglo (lista de objetos-lista de perros)
    { nombre: "Fuego 🔥", id: "boton-fuego" },
    { nombre: "Agua 💦", id: "boton-agua" },
    { nombre: "Aire 🦅", id: "boton-aire" },
    { nombre: "Fuego 🔥", id: "boton-fuego" },
    { nombre: "Tierra 🌳", id: "boton-tierra" }
);

panela.ataques.push(
    // método para agregar elementos(objetos-perros) a un arreglo (lista de objetos-lista de perros)
    { nombre: "Tierra 🌳", id: "boton-tierra" },
    { nombre: "Agua 💦", id: "boton-agua" },
    { nombre: "Fuego 🔥", id: "boton-fuego" },
    { nombre: "Tierra 🌳", id: "boton-tierra" },
    { nombre: "Aire 🦅", id: "boton-aire" }
);

dogs.push(menta, merlot, panela); // método para agregar los objetos(perros) a una clase

function iniciarJuego() {
    sectionSeleccionarAtaque.style.display = "none";
    sectionReiniciar.style.display = "none";

    dogs.forEach((dog) => {
        // la estructura de HTML se guarda en una variable (tarjetas de las mascotas)
        opcionDeDogs = `
    <input type="radio" name="mascota" id=${dog.nombre} />
            <label class="tarjeta-de-dogsfight" for=${dog.nombre}>
                <p>${dog.nombre}</p>
                <img src=${dog.foto} alt=${dog.nombre} style="width: 160px">
            </label>
    `;
        contenedorTarjetas.innerHTML += opcionDeDogs; // sin el signo + solamente muestra una sola tarjeta

        inputMenta = document.getElementById("Menta");
        inputMerlot = document.getElementById("Merlot");
        inputPanela = document.getElementById("Panela");
    });

    botonMascotaJugador.addEventListener("click", seleccionarMascotaJugador);

    botonReiniciar.addEventListener("click", reiniciarJuego);
}

function seleccionarMascotaJugador() {
    sectionSeleccionarMascota.style.display = "none";
    sectionSeleccionarAtaque.style.display = "flex";

    if (inputMenta.checked) {
        spanMascotaJugadorImg.innerHTML = `<img src=${dogs[0].foto} alt=${dogs[0].nombre}>`; // imágen de la mascota en la publicidad
        spanMascotaJugador.innerHTML = inputMenta.id; // nombre de la mascota en la publicidad (fuente de verdad clase 52)
        spanMascotaJugadorAtq.innerHTML = inputMenta.id; // nombre de la mascota en los ataques
        mascotaJugador = inputMenta.id;
    } else if (inputMerlot.checked) {
        spanMascotaJugadorImg.innerHTML = `<img src=${dogs[1].foto} alt=${dogs[1].nombre}>`;
        spanMascotaJugador.innerHTML = inputMerlot.id;
        spanMascotaJugadorAtq.innerHTML = inputMerlot.id;
        mascotaJugador = inputMerlot.id;
    } else if (inputPanela.checked) {
        spanMascotaJugadorImg.innerHTML = `<img src=${dogs[2].foto} alt=${dogs[2].nombre}>`;
        spanMascotaJugador.innerHTML = inputPanela.id;
        spanMascotaJugadorAtq.innerHTML = inputPanela.id;
        mascotaJugador = inputPanela.id;
    } else {
        alert("Selecciona una mascota");
        reiniciarJuego();
    }
    extraerAtaques(mascotaJugador);
    seleccionarMascotaEnemigo();
}

function extraerAtaques(mascotaJugador) {
    let ataques;
    for (let i = 0; i < dogs.length; i++) {
        if (mascotaJugador == dogs[i].nombre) {
            ataques = dogs[i].ataques;
        }
    }
    mostrarAtaques(ataques);
}

function mostrarAtaques(ataques) {
    ataques.forEach((ataque) => {
        ataquesDog = `
        <button id=${ataque.id} class="boton-de-ataque BAtaque">${ataque.nombre}</button>
        `;
        contenedorAtaques.innerHTML += ataquesDog;
    });
    /* botonFuego = document.getElementById("boton-fuego");
    botonAgua = document.getElementById("boton-agua");
    botonTierra = document.getElementById("boton-tierra"); */
    botones = document.querySelectorAll(".BAtaque");
}

function seleccionarMascotaEnemigo() {
    let mascotaAleatoria = aleatorio(0, dogs.length - 1);

    spanMascotaEnemigoImg.innerHTML = `<img src=${dogs[mascotaAleatoria].foto} alt=${dogs[mascotaAleatoria].nombre}>`;

    // if (mascotaAleatoria == 0){
    //   spanMascotaEnemigoImg.innerHTML = `<img src=${dogs[0].foto} alt=${dogs[0].nombre}>`
    // }else if(mascotaAleatoria == 1){
    //   spanMascotaEnemigoImg.innerHTML = `<img src=${dogs[1].foto} alt=${dogs[1].nombre}>`
    // }else {
    //   spanMascotaEnemigoImg.innerHTML = `<img src=${dogs[2].foto} alt=${dogs[2].nombre}>`
    // }

    //   spanMascotaEnemigoImg.innerHTML = dogs[mascotaAleatoria].foto;
    spanMascotaEnemigo.innerHTML = dogs[mascotaAleatoria].nombre;
    spanMascotaEnemigoAtq.innerHTML = dogs[mascotaAleatoria].nombre;
    ataquesDogEnemigo = dogs[mascotaAleatoria].ataques;

    if (spanMascotaEnemigo.innerHTML == spanMascotaJugador.innerHTML) {
        alert(
            "El enemigo también escogió " +
            spanMascotaEnemigo.innerHTML +
            ". Se reiniciará el juego."
        );
        reiniciarJuego();
    }
    secuenciaAtaque();
}

function secuenciaAtaque() {
    botones.forEach((boton) => {
        boton.addEventListener("click", (e) => {
            if (e.target.textContent == "Fuego 🔥") {
                ataqueJugador.push("FUEGO");
                console.log(ataqueJugador);
                boton.style.background = "#112f58";
                boton.disabled = true;
            } else if (e.target.textContent == "Agua 💦") {
                ataqueJugador.push("AGUA");
                console.log(ataqueJugador);
                boton.style.background = "#112f58";
                boton.disabled = true;
            } else if (e.target.textContent == "Aire 🦅") {
                ataqueJugador.push("AIRE");
                console.log(ataqueJugador);
                boton.style.background = "#112f58";
                boton.disabled = true;
            } else {
                ataqueJugador.push("TIERRA");
                console.log(ataqueJugador);
                boton.style.background = "#112f58";
                boton.disabled = true;
            }
            ataqueAleatorioEnemigo();
        });
    });
}

function ataqueAleatorioEnemigo() {
    let ataqueAleatorio = aleatorio(0, ataquesDogEnemigo.length - 1);

    if (ataqueAleatorio == 0 || ataqueAleatorio == 1) {
        ataqueEnemigo.push("FUEGO");
    } else if (ataqueAleatorio == 2 || ataqueAleatorio == 3) {
        ataqueEnemigo.push("AGUA");
    } else {
        ataqueEnemigo.push("TIERRA");
    }
    console.log(ataqueEnemigo);
    //   combate(); modificado clase 58
    iniciarPelea();
}

function iniciarPelea() {
    // creado Clase 58
    if (ataqueJugador.length == 5) {
        combate();
    }
}

function combate() {
    for (let index = 0; index < ataqueJugador.length; index++) {
        if (ataqueJugador[index] == ataqueEnemigo[index]) {
            indexAmbosOponentes(index, index);
            crearMensaje("   ¡EMPATAN!😎");
        }

        else if (ataqueJugador[index] == "AGUA" && ataqueEnemigo[index] == "FUEGO") {
            indexAmbosOponentes(index, index);
            crearMensaje("   ¡GANASTE!......AGUA💦 apaga FUEGO🔥");
            victoriasJugador++;
            spanVictoriasJugador.innerHTML = victoriasJugador;
        } 
        else if (ataqueJugador[index] == "AGUA" && ataqueEnemigo[index] == "TIERRA") {
            indexAmbosOponentes(index, index);
            crearMensaje("   !PERDISTE!......TIERRA🌳 absorbe AGUA💦");
            victoriasEnemigo++;
            spanVictoriasEnemigo.innerHTML = victoriasEnemigo;
        }
        else if (ataqueJugador[index] == "AGUA" && ataqueEnemigo[index] == "AIRE") {
            indexAmbosOponentes(index, index);
            crearMensaje("   !PERDISTE!......AIRE🦅 levanta AGUA💦");
            victoriasEnemigo++;
            spanVictoriasEnemigo.innerHTML = victoriasEnemigo;
        }

        else if (ataqueJugador[index] == "AIRE" && ataqueEnemigo[index] == "AGUA") {
            indexAmbosOponentes(index, index);
            crearMensaje("   ¡GANASTE!......AIRE🦅 levanta AGUA💦");
            victoriasJugador++;
            spanVictoriasJugador.innerHTML = victoriasJugador;
        }
        else if (ataqueJugador[index] == "AIRE" && ataqueEnemigo[index] == "TIERRA") {
            indexAmbosOponentes(index, index);
            crearMensaje("   ¡GANASTE!......AIRE🦅 levanta TIERRA🌳");
            victoriasJugador++;
            spanVictoriasJugador.innerHTML = victoriasJugador;
        } 
        else if (ataqueJugador[index] == "AIRE" && ataqueEnemigo[index] == "FUEGO") {
            indexAmbosOponentes(index, index);
            crearMensaje("   ¡GANASTE!......AIRE🦅 apaga FUEGO🔥");
            victoriasJugador++;
            spanVictoriasJugador.innerHTML = victoriasJugador;
        }

        else if (ataqueJugador[index] == "FUEGO" && ataqueEnemigo[index] == "TIERRA") {
            indexAmbosOponentes(index, index);
            crearMensaje("   ¡GANASTE!......FUEGO🔥 quema TIERRA🌳");
            victoriasJugador++;
            spanVictoriasJugador.innerHTML = victoriasJugador;
        }
        else if (ataqueJugador[index] == "FUEGO" && ataqueEnemigo[index] == "AGUA") {
            indexAmbosOponentes(index, index);
            crearMensaje("   ¡PERDISTE!......AGUA💦 apaga FUEGO🔥");
            victoriasEnemigo++;
            spanVictoriasEnemigo.innerHTML = victoriasEnemigo;
        }
        else if (ataqueJugador[index] == "FUEGO" && ataqueEnemigo[index] == "AIRE") {
            indexAmbosOponentes(index, index);
            crearMensaje("   ¡PERDISTE!......AIRE🦅 apaga FUEGO🔥");
            victoriasEnemigo++;
            spanVictoriasEnemigo.innerHTML = victoriasEnemigo;
        } 
        

        else if (ataqueJugador[index] == "TIERRA" && ataqueEnemigo[index] == "AGUA") {
            indexAmbosOponentes(index, index);
            crearMensaje("   ¡GANASTE!......TIERRA🌳 absorbe AGUA💦");
            victoriasJugador++;
            spanVictoriasJugador.innerHTML = victoriasJugador;
        }
        else if (ataqueJugador[index] == "TIERRA" && ataqueEnemigo[index] == "AIRE") {
            indexAmbosOponentes(index, index);
            crearMensaje("   ¡PERDISTE!......AIRE🦅 levanta TIERRA🌳");
            victoriasEnemigo++;
            spanVictoriasEnemigo.innerHTML = victoriasEnemigo;
        } 
        else if (ataqueJugador[index] == "TIERRA" && ataqueEnemigo[index] == "FUEGO") {
            indexAmbosOponentes(index, index);
            crearMensaje("   ¡PERDISTE!......FUEGO🔥 quema TIERRA🦅");
            victoriasEnemigo++;
            spanVictoriasEnemigo.innerHTML = victoriasEnemigo;
        }       

        revisarVictorias();
    }

    // Modificado clase 58

    //   if (ataqueJugador == ataqueEnemigo) {
    //     crearMensaje("   ¡EMPATAN!😎");
    //   } else if (ataqueJugador == "FUEGO" && ataqueEnemigo == "TIERRA") {
    //     crearMensaje("   ¡GANASTE!......FUEGO🔥 quema TIERRA🌎");
    //     vidasEnemigo--;
    //     spanVidasEnemigo.innerHTML = vidasEnemigo;
    //   } else if (ataqueJugador == "AGUA" && ataqueEnemigo == "FUEGO") {
    //     crearMensaje("   ¡GANASTE!......AGUA💦 apaga FUEGO🔥");
    //     vidasEnemigo--;
    //     spanVidasEnemigo.innerHTML = vidasEnemigo;
    //   } else if (ataqueJugador == "TIERRA" && ataqueEnemigo == "AGUA") {
    //     crearMensaje("   ¡GANASTE!......TIERRA🌎 absorbe AGUA💦");
    //     vidasEnemigo--;
    //     spanVidasEnemigo.innerHTML = vidasEnemigo;
    //   } else if (ataqueEnemigo == "FUEGO") {
    //     crearMensaje("   ¡PERDISTE!......FUEGO🔥 quema TIERRA🌎");
    //     vidasJugador--;
    //     spanVidasJugador.innerHTML = vidasJugador;
    //   } else if (ataqueEnemigo == "AGUA") {
    //     crearMensaje("   ¡PERDISTE!......AGUA💦 apaga FUEGO🔥");
    //     vidasJugador--;
    //     spanVidasJugador.innerHTML = vidasJugador;
    //   } else if (ataqueEnemigo == "TIERRA") {
    //     crearMensaje("   !PERDISTE!......TIERRA🌎 absorbe AGUA💦");
    //     vidasJugador--;
    //     spanVidasJugador.innerHTML = vidasJugador;
    //   }
    //   revisarVidas();
}

function indexAmbosOponentes(jugador, enemigo) {
    indexAtaqueJugador = ataqueJugador[jugador];
    indexAtaqueEnemigo = ataqueEnemigo[enemigo];
}

// function revisarVidas() {
//   if (vidasEnemigo == 0) {
//     crearMensajeFinal("¡FELICITACIONES, GANASTE! 🏆");
//   } else if (vidasJugador == 0) {
//     crearMensajeFinal("Lo siento, ¡Perdiste!🥈");
//   }
// }

function revisarVictorias() {
    if (victoriasJugador == victoriasEnemigo) {
        crearMensajeFinal("¡WOW, EMPATE!");
    } else if (victoriasJugador > victoriasEnemigo) {
        crearMensajeFinal("¡FELICITACIONES, GANASTE! 🏆");
    } else {
        crearMensajeFinal("Lo siento, ¡Perdiste!🥈");
    }
}

function crearMensaje(resultado) {
    let nuevoAtaqueDelJugador = document.createElement("p");
    let nuevoAtaqueDelEnemigo = document.createElement("p");

    sectionMensajes.innerHTML = resultado;
    nuevoAtaqueDelJugador.innerHTML = indexAtaqueJugador;
    nuevoAtaqueDelEnemigo.innerHTML = indexAtaqueEnemigo;

    ataquesDelJugador.appendChild(nuevoAtaqueDelJugador);
    ataquesDelEnemigo.appendChild(nuevoAtaqueDelEnemigo);
}

function crearMensajeFinal(resultadoFinal) {
    sectionMensajes.setAttribute("style", "color: #F27457; font-size: 25px");
    sectionMensajes.innerHTML = resultadoFinal;

    sectionReiniciar.style.display = "flex";
}

function reiniciarJuego() {
    location.reload();
}

function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

window.addEventListener("load", iniciarJuego);
