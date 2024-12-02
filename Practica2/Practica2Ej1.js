
function numeroEnlacesa(){
    const numenlaces = document.getElementsByTagName('a').length;
    console.log(numenlaces);
}
numeroEnlacesa();

function numeroEnlacesb(){
    const numenlacesb = document.getElementsByTagName('a');
    console.log(numenlacesb[numenlacesb.length - 1].href);
}
numeroEnlacesb();

function numeroEnlacesc(){
    const parrafoid = document.getElementById('parrafo1');
    const numenlacesc = parrafoid.getElementsByTagName('a');
    console.log(numenlacesc.length);
}
numeroEnlacesc(); 