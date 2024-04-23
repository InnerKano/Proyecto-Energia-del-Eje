
/****************************************************************************/
// RECONFIGURACIÓN DE LA CUADRÍCULA DE LA PÁGINA

// Se obtiene el grid del main
var grid_main = document.getElementById("grid_main");

// Se definen las áreas de la cuadrícula para cada tamaño de pantalla
var areasDesktop = '"S1 S1 S1 S1" "S1 S1 S1 S1"';
var areasTablet = '"S1 S1" "S1 S1"';
var areasSmartphone = '"S1 S1"';

// Se crean los @media screen queries
var media_screen_Tablet = window.matchMedia("(max-width: 900px) and (min-width: 551px)");
var media_screen_Smartphone = window.matchMedia("(max-width: 550px)");

// Se crea la función para actualizar las áreas de la cuadrícula
function actualizarGridAreas() {
  if (media_screen_Smartphone.matches) {
    // Si la pantalla es de tamaño smartphone
    grid_main.style.gridTemplateAreas = areasSmartphone;
  } else if (media_screen_Tablet.matches) {
    // Si la pantalla es de tamaño tablet
    grid_main.style.gridTemplateAreas = areasTablet;
  } else {
    // Si la pantalla es de tamaño desktop
    grid_main.style.gridTemplateAreas = areasDesktop;
  }
}

// Se actualizan las áreas de la cuadrícula cuando la página se carga
actualizarGridAreas();

// Se actualizan las áreas de la cuadrícula cuando el tamaño de la ventana cambia
window.addEventListener("resize", actualizarGridAreas);


/****************************************************************************/
// EDICIÓN DE TABLAS

var editando = false;

function transformarEnEditable(nodo) { //El nodo recibido es SPAN
    
    if (editando == false) {
        var nodoTd = nodo.parentNode; //Nodo Td: Celda
        var nodoTr = nodoTd.parentNode; //Nodo Tr: Fila
        var nodosEnTr = nodoTr.getElementsByTagName('td');

        // Se guarda el contenido de cada celda de la fila seleccionada
        var alimento = nodosEnTr[0].textContent; 
        var calorias = nodosEnTr[1].textContent;
        var grasas = nodosEnTr[2].textContent; 
        var proteina = nodosEnTr[3].textContent;
        var carbohidratos = nodosEnTr[4].textContent; 
        var editar = nodosEnTr[5].textContent;

        // Creación del input
        var nuevoCodigoHtml = '<td><input type="text" id="alimento" value="' + alimento + '" size="10"></td>' +
        '<td><input type="text" id="calorias" value="' + calorias + '" size="5"></td>' +
        '<td><input type="text" id="grasas" value="' + grasas + '" size="5"></td>' +
        '<td><input type="text" id="proteina" value="' + proteina + '" size="5"></td>' +
        '<td><input type="text" id="carbohidratos" value="' + carbohidratos + '" size="5"></td>' + 
        '<td>En edición</td>'; 

        nodoTr.innerHTML = nuevoCodigoHtml;

        var nodoBotonesForm = document.getElementById('botonesform');

        nodoBotonesForm.innerHTML = 'Pulse Aceptar para guardar los cambios o cancelar para anularlos' +
        '<form id = "form_botones" action="#" method="get" onsubmit="capturarEnvio()" onreset="anular()">' +
        '<input class="boton" type = "submit" value="Aceptar">' + 
        '<input class="boton" type="reset" value="Cancelar"> </form>';
        
        editando = "true";
    }
    else {
        alert ('Solo se puede editar una línea. Recargue la página para poder editar otra');
    }
}

function capturarEnvio() {

    var nodoResultadoEnvio = document.getElementById('resultadoenvio');

    nodoResultadoEnvio.innerHTML = '<br><br><br>' +
    '<h3 id="h31" name="titulo3-1">Ejemplo de Captura y Envío</h3>' +
    '<form id = "form_captura" action="#" method="get" onreset="anular()">' +
    '<p>ALIMENTO:      ' + document.getElementById("alimento").value + '</p>' +
    '<p>CALORÍAS:      ' + document.getElementById("calorias").value + '</p>' +
    '<p>GRASAS:        ' + document.getElementById("grasas").value + '</p>' +
    '<p>PROTEÍNAS:     ' + document.getElementById("proteina").value + '</p>' +
    '<p>CARBOHIDRATOS: ' + document.getElementById("carbohidratos").value + '</p>' +
    '<input class="boton" type="reset" value="CONTINUAR"> </form>';
   
}

function anular() {
    window.location.reload(); // Refresca la ventana
} 



/////// BASE DE DATOS /////////

var base_datos = window.indexedDB.open("TD_Form", 1);

base_datos.onerror = function(event) {
    console.log("No se pudo abrir la base de datos", event);
};

base_datos.onupgradeneeded = function(event) {
  var db = event.target.result;

  var objectStore = db.createObjectStore("datos", { keyPath: "indice", autoIncrement : true });

  
  objectStore.createIndex("nombre", "nombre", { unique: false });

};

base_datos.onsuccess = function(event) {
  console.log("Base de datos abierta exitosamente");
};


/////////////

var data;
var resultado=[];
var datos;

/////// agregar datos ///////

function as
var datos = {
  "alimento" : alimento,
  "calorias" : calorias,
  "grasas" : grasas,
  "proteina" : proteina,
  "carbohidratos" : alimento;

}

function agregarDatosEnBD(datos) {
   
  var transaction = db.transaction(["datos"], "readwrite"); //// permite editar la información 'datos' de la db

  
  var objectStore = transaction.objectStore("datos"); ////  

  
  var solicitud = objectStore.add(datos); //// añade datos 

  solicitud.onsuccess = function(event) {
      console.log("Datos guardados exitosamente en la base de datos");
  };

  solicitud.onerror = function(event) {
      console.log("Error al guardar datos en la base de datos", event);
  };
}




///// añadir ///

var contadorFilas = 0;

function agregarNuevaFila() {
  var tbl = document.getElementById('tbl');
  var newRow = tbl.insertRow(tbl.rows.length - 1);

  for (var i = 0; i < 5; i++) {
      var cell = newRow.insertCell(i);
      var input = document.createElement('input');
      input.type = 'text';
      input.id = 'campo_' + contadorFilas + '_' + i; // Asignar un identificador único
      cell.appendChild(input);
  }

  if (editando === false) {
      var nodoBotonesForm = document.getElementById('botonesform');
      nodoBotonesForm.innerHTML = 'Pulse Aceptar para guardar los cambios o cancelar para anularlos' +
          '<form id="form_botones" action="#" method="get" onsubmit="capturarEnvio()" onreset="anular()">' +
          '<input class="boton" type="submit" value="Aceptar">' +
          '<input class="boton" type="reset" value="Cancelar"> </form>';

      var nodoResultadoEnvio = document.getElementById('resultadoenvio');
      editando = true;
  } else {
      alert('Solo se puede editar una línea. Recargue la página para poder editar otra');
  }
};

function capturarEnvio() {
  var nodoResultadoEnvio = document.getElementById('resultadoenvio');
  var valores = [];

  for (var i = 0; i < 5; i++) {
      var inputId = 'campo_' + contadorFilas + '_' + i;
      var valor = document.getElementById(inputId).value;
      valores.push(valor);
  }

  nodoResultadoEnvio.innerHTML = '<br><br><br>' +
      '<h3 id="h31" name="titulo3-1">Ejemplo de Captura y Envío</h3>' +
      '<form id="form_captura" action="#" method="get" onreset="anular()">' +
      '<p>ALIMENTO:      ' + valores[0] + '</p>' +
      '<p>CALORÍAS:      ' + valores[1] + '</p>' +
      '<p>GRASAS:        ' + valores[2] + '</p>' +
      '<p>PROTEÍNAS:     ' + valores[3] + '</p>' +
      '<p>CARBOHIDRATOS: ' + valores[4] + '</p>' +
      '<input class="boton" type="reset" value="CONTINUAR"> </form>';

  // Puedes almacenar los valores en tu base de datos aquí
  var datos = {
      alimento: valores[0],
      calorias: valores[1],
      grasas: valores[2],
      proteina: valores[3],
      carbohidratos: valores[4]
  };

  agregarDatosEnBD(datos);
  
  // Incrementar el contador de filas para generar nuevos identificadores únicos
  contadorFilas++;
}