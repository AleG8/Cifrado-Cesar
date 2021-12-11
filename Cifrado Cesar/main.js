const alfabeto = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "Ñ", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
const inputText = document.querySelector("#text-input"),
    result = document.querySelector("#result"),
    rango = document.querySelector("#rango"),
    form = document.querySelector("#form");

const mostrarCifrado = ()=>{
    //Array de las letras pasadas por input
    const lettersArray = [...inputText.value.toUpperCase()];
    //Llamada de la funcion recursiva
    printChar(0, lettersArray);
}

const printChar = (currentIndex, array)=>{
    //Deneter funcion recursiva cuando...
    if(currentIndex === array.length) return;
    //Span que se inyectara en el contenedor result
    let spanChar = document.createElement("span");
    result.appendChild(spanChar);
    //Le pasamos en spanChar a la Promesa para generar animacion
    animation(spanChar)
    //Luego de que se cumple la promesa
    //Se imprime la palabra ya cifrada
    .then( () => {
        //Restamos una letra al inputText
        inputText.value = inputText.value.substring(1)

        let charSinCodificar = array[currentIndex];
        //Si es una letra codificala, de lo contrario devuelve el caracter sin codificar
        spanChar.textContent = alfabeto.includes(charSinCodificar)
        ? alfabeto[(alfabeto.indexOf(charSinCodificar) + parseInt(rango.value)) % alfabeto.length]
        
        : charSinCodificar;
        //LLamamos a la propia funcion y
        //Aumentamos el indice en 1 para avanzar en la posicion del array
        printChar(currentIndex + 1, array);
    });
}
//Funcion que genera la animacion
const animation = (span) => {
    //Lleva la cuenta de la cantidad de veces que llamara a setInterval
    let cambioDePalabras = 0;

    return new Promise(resolve =>{
        let intervalo = setInterval(()=>{
            span.innerHTML = alfabeto[Math.floor(Math.random() * alfabeto.length)];
            cambioDePalabras++
            if(cambioDePalabras === 3){
                clearInterval(intervalo);
                resolve()
            }
        },60)
    })
}

form.addEventListener("submit", (e)=>{
    e.preventDefault()
    result.innerHTML = '';
    mostrarCifrado()
})


