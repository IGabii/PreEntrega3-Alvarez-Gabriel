
//Codigo JS

function cargarGastos() {
    const gastosAhorrados = localStorage.getItem('gastos');
    return gastosAhorrados ? JSON.parse(gastosAhorrados) : [];          // Función para cargar los gastos desde localStorage
}

function ahorrarGastos(gastos) {
    localStorage.setItem('gastos', JSON.stringify(gastos));             // Función para guardar los gastos en localStorage
}

function gastosRendidos() {
    const listaDeGastos = document.getElementById('listaDeGastos');     // Función para renderizar los gastos en el DOM
    listaDeGastos.innerHTML = '';

    const gastos = cargarGastos();
    let total = 0;

    gastos.forEach(gastos => {                                          // Construir el elemento del DOM
        listaDeGastos.innerHTML += `<li>${gastos.descripcion}: $${gastos.cantidad}</li>`;
        total += gastos.cantidad;
    });

    document.getElementById('gastosTotales').textContent = total;       // Actualizar el total de gastos
}

document.getElementById('agregarGastosBtn').addEventListener('click', () => {   // Evento para agregar un nuevo gasto
    const entradaDeCantidad = document.getElementById('entradaDeCantidad');
    const entradaDeDescripcion = document.getElementById('entradaDeDescripcion');

    const cantidad = parseFloat(entradaDeCantidad.value);
    const descripcion = entradaDeDescripcion.value.trim();

    if (!isNaN(cantidad) && descripcion !== '') {
        const gastos = cargarGastos();
        gastos.push({ cantidad, descripcion });
        ahorrarGastos(gastos);
        gastosRendidos();
        entradaDeCantidad.value = '';                                     // Limpiar los campos de entrada después de agregar el gasto
        entradaDeDescripcion.value = '';
    }
});

document.getElementById('borrarGastosBtn').addEventListener('click', () => {    // Evento para borrar todos los gastos
    localStorage.removeItem('gastos');
    gastosRendidos();                                                       // Limpiar la lista después de borrar los gastos
});


gastosRendidos();                                                        // Renderizar los gastos al cargar la página










