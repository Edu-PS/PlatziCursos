
var btnCambConf = document.getElementById("botonCambiarConfiguracion");
var seleLapi = document.getElementById("selectorLapiz");
var seleColo = document.getElementById("selectorColor");
console.log(seleColo);
var lienzo = document.getElementById("tapizCanvas");
var papel = lienzo.getContext("2d");

var teclas = {LEFT : 37, UP : 38, RIGHT : 39, DOWN : 40};

var xi, yi, color, lapiz;
xi = lienzo.width / 2;
yi = lienzo.height / 2;

btnCambConf.addEventListener("click",obtenerConfiguracion);

document.addEventListener("click", clickRaton);
document.addEventListener("keydown",dibujarFlecha);//keypress,

// Dibujando los bordes del canvas.
dibujarLinea("black", 1, 1, lienzo.width - 1 , 1, papel); // Superior
dibujarLinea("black", 1, 1, 1, lienzo.height - 1, papel); // Izquierda
dibujarLinea("black", 1, lienzo.width - 1, lienzo.height - 1, lienzo.width - 1, papel); // Inferior
dibujarLinea("black", lienzo.width - 1, 1, lienzo.width - 1 , lienzo.width - 1, papel); // Derecha
// Dibujando el centro.
dibujarLinea("black", (lienzo.width / 2) - 1, (lienzo.height / 2) - 1, (lienzo.width / 2) + 1, (lienzo.height / 2) + 1, papel); // Centro
dibujarLinea("black", (lienzo.width / 2) + 1, (lienzo.height / 2) - 1, (lienzo.width / 2) - 1, (lienzo.height / 2) + 1, papel); // Centro


function obtenerConfiguracion (e)
{

  switch (parseInt(seleColo.value)) {
    case 1:
      color = "green";
    break;

    case 2:
      color = "red";
    break;

    case 3:
      color = "blue";
    break;

    default:

  }

  console.log(seleLapi.value);
  console.log(e);
}


function clickRaton(clcRaton)
{
  console.log(clcRaton);
}


function dibujarLinea(colorL, x1, y1, x2, y2, contexto)
{
  contexto.strokeStyle = colorL;
  contexto.lineWidth = 2;
  contexto.beginPath();
  contexto.moveTo(x1, y1);
  contexto.lineTo(x2, y2);
  contexto.stroke();
  contexto.closePath();
}


function dibujarFlecha(tecla)
{

  var segmento = 2;
  switch (tecla.keyCode) {

        case teclas.LEFT:
          dibujarLinea(color, xi, yi, xi - segmento, yi, papel);
          xi = xi - segmento;
        break;

        case teclas.UP:
          dibujarLinea(color, xi, yi, xi, yi - segmento, papel);
          yi = yi - segmento;
        break;

        case teclas.RIGHT:
          dibujarLinea(color, xi, yi, xi + segmento, yi, papel);
          xi = xi + segmento;
        break;

        case teclas.DOWN:
          dibujarLinea(color, xi, yi, xi, yi + segmento, papel);
          yi = yi + segmento;
        break;

    default:

  }
}
