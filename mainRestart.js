const musicDeath = new Audio("./sonidos/darkSoulsDeath.m4a");
musicDeath.play();
musicDeath.loop = false;
window.onload = function(){
    document.getElementById("restart").onclick = redirigir;
}


function redirigir(){
    window.location = "index.html";
}