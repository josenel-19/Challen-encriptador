
let textoEncriptado = "";
let textoDesencriptado = "";
const letraNormal = ["a","e","i","o","u"]; // caracteres a encriptar nota: solo debe ser 1 caracter.
const letraEncrip = ["ai","enter","imes","ober","ufat"]; // caracteres a desencriptar nota: cada encriptado dede tener su pareja(letraNormal)

//capturo elementos html
let cajaTexto1 = document.querySelector("#text1"); 
let CajaTextoResult = document.querySelector("#areaCopia");
let botEncrip = document.querySelector("#botEncrip");
let botDesencrip = document.querySelector("#botDesencrip");
let botCopy = document.querySelector("#botCopiar");
let textoInfo = document.querySelector("#textoInicial");

//reglas de caracteres permitidos
const letrasOk = new RegExp("^[a-z]+$");
const espacio = new RegExp(/ /, "g");

//limpia textarea o los input
function limpiarTexto (cajaTexto){
    cajaTexto.value = "";
}

function encriptador (){
    limpiarTexto(CajaTextoResult);
    ocultarElementos("muneco");
    mostrarElementos("botCopiar");
    mostrarElementos("areaCopia");
    ocultarElementos("letra1");
    ocultarElementos("letra2");
    let contador = 1;
    let caracterEncriptado = "";
    let frase = cajaTexto1.value;         
    let largoFrase = frase.length;
    let caracter = "";
    textoEncriptado ="";

    //compara cada caracter o letra y se va alimentando "textoEncriptado", dependiendo de la condicion if
    while( contador <= largoFrase ){
        caracter = frase.charAt(contador -1);
        let igual = true;
        for (let posicion = 0; posicion < letraNormal.length; posicion++){
            if(caracter == letraNormal[posicion]){
                caracterEncriptado = letraEncrip[posicion];
                igual = true;
                break;
            }else{
                igual = false;
            }
        }
        if (igual == false){
            caracterEncriptado = caracter;
        }
        textoEncriptado = textoEncriptado + caracterEncriptado;
        CajaTextoResult.value = textoEncriptado;
        contador++;
    }
}


function desencriptador(){
    //funciones visuales
    limpiarTexto(CajaTextoResult);
    ocultarElementos("muneco");
    mostrarElementos("botCopiar");
    mostrarElementos("areaCopia");
    ocultarElementos("letra1");
    ocultarElementos("letra2");

    //compara toda la frase en busqueda de los caracteres encriptados, y lo reemplaza con la letra correspondiente (vocal)
    let contador = 0;
    let frase = cajaTexto1.value;         
    while( contador < letraEncrip.length ){ 
        textoDesencriptado = frase.replace(new RegExp(letraEncrip[contador], "g"), letraNormal[contador]);
        frase = textoDesencriptado;
        CajaTextoResult.value = textoDesencriptado;
        contador++;  
    }           
}

// evita que se ingresen catacteres fuera de las 2 reglas declaradas
function validarTexto (evento){
    if ((!espacio.test(evento.key)) && (!letrasOk.test(evento.key))){
        evento.preventDefault();
    }
}

// toma elemento html y copia el texto que contiene
function copiarTexto(){
    let content = document.getElementById("areaCopia");
    content.select();
    document.execCommand("copy");
    limpiarTexto(cajaTexto1);
    document.getElementById("text1").focus(); 
}

function ocultarElementos(idElemento){
    document.getElementById(idElemento).style.visibility = "hidden";
}

function mostrarElementos(idElemento){
    document.getElementById(idElemento).style.visibility = "visible";
}

//oculta texto al hacer click
function ocultarConClick(){
    document.getElementById("textoInicial").style.visibility = "hidden";
    document.getElementById("text1").focus();
}

//parametros iniciales al cargar pagina
ocultarElementos("areaCopia");
ocultarElementos("botCopiar");
textoInfo.onclick = ocultarConClick;
cajaTexto1.onkeypress = validarTexto;
botDesencrip.onclick = desencriptador;
botEncrip.onclick = encriptador;
botCopy.onclick = copiarTexto;
         

