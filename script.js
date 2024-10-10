
const api_key = "live_zzQJLdXAmTs3OGwBr6djY5LaVHfOhdM167Gs9Q0U6yIJWQbt8aqPFoqyaGfojYnT";  // Reemplaza con tu API key válida
const breedUrl = `https://api.thecatapi.com/v1/breeds`;
const breedSelect = document.getElementById('breedSelect');
const grid = document.getElementById('grid');

// 1. Obtener las razas y llenar el dropdown
fetch(breedUrl, {
    headers: {
        'x-api-key': api_key
    }
})
    .then(response => {
        if (!response.ok) {
            throw new Error("Error al obtener las razas");
        }
        return response.json();
    })
    .then(data => {
        console.log("Razas obtenidas:", data); // Verificar que las razas se están recibiendo
        populateBreedDropdown(data); // Llenar el dropdown con las razas
    })
    .catch(error => {
        console.error("Hubo un problema con la solicitud de razas:", error);
    });

// 2. Función para llenar el dropdown con las razas
function populateBreedDropdown(breeds) {
    breeds.forEach(breed => {
        console.log("Añadiendo raza al dropdown:", breed.name); // Verificar cada raza
        const option = document.createElement('option');
        option.value = breed.id;  // Usar el ID de la raza como valor
        option.textContent = breed.name;  // Mostrar el nombre de la raza
        breedSelect.appendChild(option);  // Añadir la opción al dropdown
    });
}

// 3. Escuchar el cambio de selección en el dropdown y cargar imágenes
breedSelect.addEventListener('change', function () {
    const breedId = this.value;  // Obtener el ID de la raza seleccionada
    if (breedId) {
        loadBreedImages(breedId);  // Cargar imágenes de la raza seleccionada
    } else {
        grid.innerHTML = '';  // Limpiar las imágenes si no hay raza seleccionada
    }
});

// 4. Función para obtener imágenes de la raza seleccionada
function loadBreedImages(breedId) {
    const url = `https://api.thecatapi.com/v1/images/search?limit=12&breed_id=${breedId}`;

    fetch(url, {
        headers: {
            'x-api-key': api_key
        }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("Error al obtener las imágenes");
            }
            return response.json();
        })
        .then(data => {
            console.log("Imágenes obtenidas:", data); // Verificar las imágenes obtenidas
            displayImages(data);  // Mostrar las imágenes en la cuadrícula
        })
        .catch(error => {
            console.error("Hubo un problema al cargar las imágenes:", error);
        });
}

// 5. Función para mostrar las imágenes en la cuadrícula
function displayImages(images) {
    grid.innerHTML = '';  // Limpiar las imágenes anteriores
    images.forEach(imageData => {
        const img = document.createElement('img');
        img.src = imageData.url;  // Usar la URL de la imagen

        const gridCell = document.createElement('div');
        gridCell.classList.add('col');
        gridCell.appendChild(img);  // Añadir la imagen a la celda

        grid.appendChild(gridCell);  // Añadir la celda a la cuadrícula
    });
}

const warningMessage = document.getElementById('warningMessage');

breedSelect.addEventListener('change', function () {
    const breedId = this.value;  // Obtener el ID de la raza seleccionada
    if (breedId) {
        warningMessage.style.display = 'none';  // Ocultar el mensaje de advertencia
        loadBreedImages(breedId);  // Cargar imágenes de la raza seleccionada
    } else {
        warningMessage.style.display = 'block';  // Mostrar el mensaje si no hay raza seleccionada
        grid.innerHTML = '';  // Limpiar las imágenes
    }
});
