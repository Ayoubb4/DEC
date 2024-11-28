/* 2- La sucesión de Padovan es la secuencia de enteros P(n) definida por los siguientes valores iniciales
P(0)=P(1)=P(2)=1
y la siguiente relación de recurrencia
P(n)=P(n-2)+P(n-3)
Los primeros valores de P(n) son
1,1,1,2,2,3,4,5,7
Crea un script que muestre a la consola los primeros 100 números de la sucesión de Padovan. (2 puntos) */

function secuencia(n) {
    let p = [1, 1, 1];

    for (let i = 3; i <= n; i++) {
        p[i] = p[i - 2] + p[i - 3];
    }

    return p;
}

 console.log(secuencia(100));
