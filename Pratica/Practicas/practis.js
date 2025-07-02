// class  celular{
//     constructor(color,peso, rdp, rdc,ram){
//         this.color = color;
//         this.peso = peso;
//         this.rdp = rdp;
//         this.rdc = rdc;
//         this.ram = ram;
//         this.encendido = false
//     }
//     precionarBotonEncnedido(){
//         if (this.encendido == false){
//             alert("celular prendido")
//             this.encendido = true;
//         }else{
//             alert("el celular apagado")
//         }
//     }
//     reiniciar(){
//         if (this.encendido == true){
//             alert("reiniciando celular")
//         }else {
//             alert("celular apagado")
//         }
//     }
// }





const products = {
    1: { id: 1, nombre: "Laptop", price: 1500},
    2: { id: 2, nombre: "Mouse", price: 500},
    3: { id: 3, nombre: "Teclado", price: 250}
}

const mostrar = document.getElementById("mostrar")

mostrar.innerHTML = products 