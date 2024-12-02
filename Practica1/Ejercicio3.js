/* 3- Crea una función que, dada una cadena de texto, devuelve una nueva cadena cambiando la primera letra de  cada palabra en mayúsculas. (3 puntos) 
 */
function MayusculaPrimeraLetra() {
    let texto = prompt ("Dame una serie de palabras");
    let nuevaCadena = '';

    for (let i = 0; i < texto.length; i++) {
        let char = texto[i];
        
        if(texto[i] == texto[0]){
        nuevaCadena+= texto[i].toUpperCase();
        
        }else if (char == ' ' || char == '.' || char == '. ') {
            nuevaCadena += char ;
            nuevaCadena += texto[i + 1].toUpperCase();
            i++;
        }/* lse if(char == '. '){
            nuevaCadena += char ;
            nuevaCadena += texto[i + 1].toUpperCase();
            i++;
        } */
        else {
            nuevaCadena += char; 
        }   
    }

    return nuevaCadena;
}

let solucion = MayusculaPrimeraLetra();
console.log(solucion);