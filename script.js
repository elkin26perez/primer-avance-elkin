// URL del backend
const apiUrl = 'http://localhost:3000/api/camisetas';

let camisetas = [];

// Función para renderizar camisetas
function renderCamisetas() {
    const camisetasContainer = document.getElementById('camisetas-container');
    camisetasContainer.innerHTML = ''; // Limpiar el contenedor

    camisetas.forEach(camiseta => {
        const camisetaElement = document.createElement('div');
        camisetaElement.classList.add('camiseta');
        
        camisetaElement.innerHTML = `
            <img src="${camiseta.imagen}" alt="Imagen de ${camiseta.nombre}">
            <h3>${camiseta.nombre}</h3>
            <p>Precio: ${camiseta.precio}</p>
            <button>Comprar</button>
        `;
        
        camisetasContainer.appendChild(camisetaElement);
    });
}

// Función para obtener camisetas del backend
async function obtenerCamisetas() {
    try {
        const response = await fetch(apiUrl);
        camisetas = await response.json();
        renderCamisetas();
    } catch (error) {
        console.error("Error al obtener las camisetas:", error);
    }
}

// Manejar el envío del formulario para agregar una nueva camiseta
const agregarCamisetaForm = document.getElementById('agregarCamisetaForm');
agregarCamisetaForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nombre = document.getElementById('nombre').value;
    const precio = document.getElementById('precio').value;
    const imagen = document.getElementById('imagen').value;

    const nuevaCamiseta = { nombre, precio, imagen };

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(nuevaCamiseta)
        });

        const result = await response.json();
        camisetas.push(result);  // Agregar al array local
        renderCamisetas();       // Volver a renderizar las camisetas
    } catch (error) {
        console.error("Error al agregar la camiseta:", error);
    }

    agregarCamisetaForm.reset();
});

// Obtener las camisetas al cargar la página
document.addEventListener('DOMContentLoaded', obtenerCamisetas);
