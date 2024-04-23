// Valor predeterminado //
let ValorInicial = 100; 


// definir opciones desplegables //
function mostrarOpciones () {
    console.log("Bienvenido a Tus Puntos ");
    console.log("1. Depositar");
    console.log("2. Retirar");
    console.log("3. Consultar Tus Puntos");
    console.log("4. Salir");
  }

var MenuOpciones = "Bienvenido a Tus Puntos \n 1. Depositar \n 2. Retirar \n 3. Consultar Tus Puntos \n 4. Salir";

  // definir cada opción//



//DEPOSITAR //

function depositar() {
  let monto = parseInt(prompt("Ingrese el monto a depositar: "));
  if (isNaN(monto) || monto <= 0) {
    alert("Ingrese un monto válido");
    console.log("Ingrese un monto válido.");
    return;
    
  }
  ValorInicial += monto;
  alert(`Depósito exitoso, Tus Puntos: ${ValorInicial}`);
  console.log(`Depósito exitoso, Tus Puntos: ${ValorInicial}`);
  
}

//RETIRO //
function retirar() {
  let monto = parseInt(prompt("Ingrese el monto a retirar: "));
  if (isNaN(monto) || monto <= 0) {
    alert("Ingrese un monto válido");
    console.log("Ingrese un monto válido.");
    return;
  }
  if (monto > ValorInicial) {
    alert("Fondos insuficientes. No es posible realizar el retiro.");
    console.log("Fondos insuficientes. No es posible realizar el retiro.");
    return;
  }
  ValorInicial -= monto;
  alert(`Retiro exitoso. Nuevo saldo de Tus Puntos: ${ValorInicial}`);
  console.log(`Retiro exitoso. Nuevo saldo de Tus Puntos: ${ValorInicial}`);
}

//  PUNTOS ACTUALES //
function consultarSaldo() {
  alert(`Su saldo actual es: ${ValorInicial}`);
  console.log(`Su saldo actual es: ${ValorInicial}`);
}

// Ciclo principal
do {
  mostrarOpciones();
  let opcion = parseInt(prompt(MenuOpciones));

  switch (opcion) {
    case 1:
      depositar();
      break;
    case 2:
      retirar();
      break;
    case 3:
      consultarSaldo();
      break;
    case 4:
      alert("Saliendo del cajero automático. ¡Hasta luego!");
      console.log("Saliendo del cajero automático. ¡Hasta luego!");
      break;
    default:
      alert("Opción no válida. Por favor, ingrese un número del 1 al 4.");
      console.log("Opción no válida. Por favor, ingrese un número del 1 al 4.");
  }

  if (opcion !== 4) {
    let continuar = prompt("¿Desea realizar otra operación? (si/no): ");
    if (continuar.toLowerCase() !== "si") {
      alert("Saliendo del cajero automático. Chaito");
      console.log("Saliendo del cajero automático. Chaito");
      break;
    }
  }
} while (true);
