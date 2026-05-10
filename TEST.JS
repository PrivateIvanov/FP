function Funkcia2() {
    console.log("Funkcia2 ok")
}

function Funkcia () {
    return Funkcia2
}


setTimeout(function(){
    console.log("SOSAL");
}, 2000)

setTimeout(Funkcia(), 2000)