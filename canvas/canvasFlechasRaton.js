
/*
Documento para realizar el dibujo en canvas con dos teclas pulsadas al mismo tiempo y ratón.

FUNCIONA:
  1) Cuando se pulsan dos teclas.
  2) Se puede seleccionar y cambiar color y "Lapiz" (Raton y Flechas).
  3) Dibujar con el raton.

FALTA:
  1) Cuando se presionan tres teclas no detecta la tercera tecla.
  2) Con dos teclas, cuando se suelta la ultima tecla pulsada no continúa dibujando.
    Si se suelta la primera pulsada si continúa.
  3) Detectar los limites para avisar que se salió del canvas. (Flechas y Ratón)
  4) No se detecta el numero del boton con el que se hace click.(clcRaton.button === 0)
*/

let btnCambConf = document.getElementById("botonCambiarConfiguracion");
let seleLapi = document.getElementById("selectorLapiz");
let seleColo = document.getElementById("selectorColor");
let lapiSele = document.getElementById("lapizActual");
let coloSele = document.getElementById("colorActual");
let lienzo = document.getElementById("tapizCanvas");
let msjAlerta = document.getElementById("mensajeAlerta");
let tipoDibujo = "FLECHAS";
let papel = lienzo.getContext("2d");

let teclas = {LEFT : 37, UP : 38, RIGHT : 39, DOWN : 40};

let xi, yi, color, lapiz, comenzarRaton;
let xSuma, xResta, ySuma, yResta;
const SALTO = 2;
xSuma = 0;
ySuma = 0;
xResta = 0;
yResta = 0;

xi = lienzo.width / 2;
yi = lienzo.height / 2;

btnCambConf.addEventListener("click", cambiarConfiguracion);
document.addEventListener("mousedown", clickRaton);
document.addEventListener("mousemove", dibujarRaton);
document.addEventListener("mouseup",terminarRaton);
document.addEventListener("keyup", teclaSuelta);
document.addEventListener("keydown", teclaPulsada);

// Dibujando los bordes del canvas.
dibujarLinea("black", 1, 1, lienzo.width - 1 , 1, papel); // Superior
dibujarLinea("black", 1, 1, 1, lienzo.height - 1, papel); // Izquierda
dibujarLinea("black", 1, lienzo.width - 1, lienzo.height - 1, lienzo.width - 1, papel); // Inferior
dibujarLinea("black", lienzo.width - 1, 1, lienzo.width - 1 , lienzo.width - 1, papel); // Derecha
// Dibujando el centro.
dibujarLinea("black", (lienzo.width / 2) - 1, (lienzo.height / 2) - 1, (lienzo.width / 2) + 1, (lienzo.height / 2) + 1, papel); // Centro
dibujarLinea("black", (lienzo.width / 2) + 1, (lienzo.height / 2) - 1, (lienzo.width / 2) - 1, (lienzo.height / 2) + 1, papel); // Centro


function cambiarConfiguracion (e)
{
  if (parseInt(seleColo.value) === 1){
    color = "green";
    coloSele.innerHTML = "Verde";
  } else if (parseInt(seleColo.value) === 2) {
    color = "red";
    coloSele.innerHTML = "Rojo";
  } else if (parseInt(seleColo.value) === 3) {
    color = "blue";
    coloSele.innerHTML = "Azul";
  }else {
    color = "black";
    coloSele.innerHTML = "Negro";
  }

  if (parseInt(seleLapi.value) === 2){
    lapiSele.innerHTML = "Raton";
    tipoDibujo = "RATON";
  } else {
    lapiSele.innerHTML = "Flechas";
    tipoDibujo = "FLECHAS";
  }
}


function clickRaton(clcRaton)
{
  console.log(clcRaton);
  if (clcRaton.button === 0){ // No se detecta el click con los botones.
    if (clcRaton.target.id === "selectorLapiz"
    || clcRaton.target.id === "selectorColor"
    || clcRaton.target.id === "botonCambiarConfiguracion"){

    } else {

      if (clcRaton.target.id === "tapizCanvas" && lapiSele.innerHTML === "Raton"){

        xi = clcRaton.offsetX;
        yi = clcRaton.offsetY;
        comenzarRaton = 1;
        document.getElementById("xClick").innerHTML = xi;
        document.getElementById("yClick").innerHTML = yi;

      } else {
        if (lapiSele.innerHTML !== "Raton"){
          msjAlerta.innerHTML = "Debe seleccionar < RATON >";
        } else if (clcRaton.target.id !== "tapizCanvas") {
          msjAlerta.innerHTML = "Debe hacer clic DENTRO del cuadro";
        }
      }
    }
  }
}

/*
function teclaPresionada(tecla)
{
  console.log("teclaPresionada() :");
  console.log(tecla.keyCode);
}
*/

function teclaSuelta(tecla)
{

  console.log("Tecla Suelta : " + tecla.keyCode);

  switch (tecla.keyCode) {
        case teclas.LEFT:
          xResta = 0;
        break;

        case teclas.UP:
          yResta = 0;
        break;

        case teclas.RIGHT:
          xSuma = 0;
        break;

        case teclas.DOWN:
          ySuma = 0;
        break;
    default:
  }
}


function teclaPulsada(tecla)
{

  //console.log("Tecla Pulsada : " + tecla.keyCode);
  //console.log(tecla);
  if (lapiSele.innerHTML === "Flechas"){
    switch (tecla.keyCode) {
        case teclas.LEFT:
          xResta = SALTO;
          dibujarFlecha();
        break;

        case teclas.UP:
          yResta = SALTO;
          dibujarFlecha();
        break;

        case teclas.RIGHT:
          xSuma = SALTO;
          dibujarFlecha();
        break;

        case teclas.DOWN:
          ySuma = SALTO;
          dibujarFlecha();
        break;
    default:
    }
  } else {
    msjAlerta.innerHTML = "Debe seleccionar < FLECHAS >";
  }
}


function dibujarFlecha()
{
  /*
  console.log("xi : " + xi);
  console.log("yi : " + yi);
  console.log("xSuma : " + xSuma);
  console.log("ySuma : " + ySuma);
  console.log("xResta : " + xResta);
  console.log("yResta : " + yResta);
  */

  dibujarLinea(color, xi, yi, xi + xSuma - xResta, yi + ySuma - yResta, papel);
  xi = xi + xSuma - xResta;
  yi = yi + ySuma - yResta;
}


function dibujarRaton(mouse)
{

  if (mouse.button === 0 && mouse.target.id === "tapizCanvas" && comenzarRaton == 1){
    dibujarLinea(color, xi, yi, xi + mouse.movementX, yi + mouse.movementY, papel);
    xi = xi + mouse.movementX;
    yi = yi + mouse.movementY;
  }
}


function terminarRaton(mouse)
{
  comenzarRaton = 0;

}

function dibujarLinea(colorL, x1, y1, x2, y2, contexto)
{
  //console.log("dibujarLinea()");
  msjAlerta.innerHTML = "Dibujando con " + tipoDibujo + "...!";
  contexto.strokeStyle = colorL;
  contexto.lineWidth = 2;
  contexto.beginPath();
  contexto.moveTo(x1, y1);
  contexto.lineTo(x2, y2);
  contexto.stroke();
  contexto.closePath();
}
