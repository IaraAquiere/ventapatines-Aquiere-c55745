let productos = [
    { id: 1, nombre: "Edea Fly + Roll Line Mistral", descripcion: "Bota Edea Fly, Indice de Rigidez 60, Plancha Roll Line Mistral", imagen:"https://tcdn.storeden.com/gallery/643a57a100f220640f70097e", precio: 585.00, categoria: "patines" },
    { id: 2, nombre: "Risport Mercurio + Roll Line Mistral", descripcion: "Bota Risport Mercurio, Indice de Rigidez 65, Plancha Roll Line Mistral", imagen: "https://tcdn.storeden.com/gallery/643a5e4a202628a20529855c", precio: 530.00, categoria: "patines" },
    { id: 3, nombre: "Edea Ritmo + Roll Line Mistral", descripcion: "Bota Edea Ritmo, Indice de Rigidez 50, Plancha Roll Line Mistral", imagen: "https://tcdn.storeden.com/gallery/643a5918be7ea0596463c899", precio: 435.00, categoria: "patines" },
    { id: 4, nombre: "Edea Fly + Roll Line Evo", descripcion: "Bota Edea Fly, Indice de Rigidez 60, Plancha Roll Line Evo", imagen: "https://tcdn.storeden.com/gallery/643a6f592026280b16298562", precio: 866.50, categoria: "patines" },
    { id: 5, nombre: "Edea Flamenco + Dance + Ice", descripcion: "Botas Edea Flamenco, Planchas Roll Line Dance,Ruedas Roll Line ICE", imagen: "https://tcdn.storeden.com/gallery/6179027800f220088a602977", precio: 658.00, categoria: "patines" },
    { id: 6, nombre: "Risport Ambra Elite + Roll Line Evo", descripcion: "Bota Risport Ambra Elite, Indice de Rigidez 60, Plancha Roll Line Evo.", imagen: "https://tcdn.storeden.com/gallery/643a712bbe7ea0770163c898", precio: 745.00, categoria: "patines" },
    { id: 7, nombre: "Edea Rondo + Roll Line Variant M", descripcion: "Bota Edea Rondo, Indice de Rigidez 35, Plancha Roll Line Variant M", imagen: "https://tcdn.storeden.com/gallery/6437d2d92026288b7fcb14fa", precio: 240.00, categoria: "patines" },
    { id: 8, nombre: "Risport Electra + Saturno + Star", imagen: "https://tcdn.storeden.com/gallery/617908455fb8e0aff908db1e", precio: 334.00, categoria: "patines" },
    { id: 9, nombre: "Frenos Roll Line Super Professional", imagen: "https://egress.storeden.net/gallery/5d6ebe2c02e58e713aa22301", precio: 17.0, categoria: "frenos" },
    { id: 10, nombre: "Frenos Roll Line Standard", imagen: "https://tcdn.storeden.com/gallery/5d6ebe2d02e58e713aa2231b", precio: 14.50, categoria: "frenos" },
    { id: 11, nombre: "Ruedas Roll Line Giotto 55 mm", imagen: "https://tcdn.storeden.com/gallery/5d6ebe3102e58e713aa2237f", precio: 38.50, categoria: "ruedas" },
    { id: 12, nombre: "Bolsa Portapatines Edea CUBE", imagen: "https://egress.storeden.net/gallery/6169473b2026282058bc277c", precio: 37.50, categoria: "bolsos" },
    { id: 13, nombre: "Bolsa Portapatines Edea STELLA ", imagen: "https://tcdn.storeden.com/gallery/6156da6800f22069bf62071b", precio: 24.00, categoria: "bolsos" },
    { id: 14, nombre: "Bolsa Portapatines Edea Jaquard", imagen: "https://tcdn.storeden.com/gallery/61377b83202628621985a57e", precio: 19.00, categoria: "bolsos" }
];


const guardarProductosLS = (productos) => {
    localStorage.setItem("productos", JSON.stringify(productos));
}

const cargarProductosLS = () => {
    return JSON.parse(localStorage.getItem("productos")) || [];
}

const renderProductos = () => {
    const productos = cargarProductosLS();
    let contenidoHTML = "";

    productos.forEach(producto => {
        contenidoHTML += `<div class="col-md-3 mb-5 text-center"
        <div class="card">
        <a href="producto.html" onclick="guardarProductoLS(${producto.id})"><img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}"></a>
        <div class="card-body">
          <h5 class="card-title">${producto.nombre}</h5>
          <p class="card-text">$${producto.precio}</p>
          <a href="#" class="btn btn-dark" onclick="agregarProductoCarrito(${producto.id})">Agregar (+)</a>
        </div>
        </div>
        </div>`;
    });

    document.getElementById("contenido").innerHTML = contenidoHTML;
}

const renderCarrito = () => {
    const productos = cargarCarritoLS();
    let contenidoHTML;

    if (cantProductosCarrito() > 0) {
        contenidoHTML = `<table class="table">
        <tr>
        <td colspan="7" class="text-end"><button class="btn btn-dark" onclick="vaciarCarrito()" title="Vaciar Carrito">Vaciar Carrito</button></td>
        </tr>`;

        productos.forEach(producto => {
            contenidoHTML += `<tr>
            <td><img src="${producto.imagen}" alt="${producto.nombre}" width="100"></td>
            <td class="align-middle">${producto.nombre}</td>
            <td class="align-middle">$${producto.precio}</td>
            <td class="align-middle"><button class="btn btn-dark rounded-circle" onclick="decrementarCantidadProducto(${producto.id})">-</button> ${producto.cantidad} <button class="btn btn-dark rounded-circle" onclick="incrementarCantidadProducto(${producto.id})">+</button></td>
            <td class="align-middle">$${producto.precio * producto.cantidad}</td>
            <td class="align-middle text-end"><img src="images/trash.svg" alt="Eliminar" width="24" onclick="eliminarProductoCarrito(${producto.id})"></td>
            </tr>`;
        });

        contenidoHTML += `<tr>
        <td>&nbsp;</td>
        <td>Total</td>
        <td><b>$${sumaProductosCarrito()}</b></td>
        <td>&nbsp;</td>
        </tr>
        </table>`;
    } else {
        contenidoHTML = `<div class="alert alert-warning my-5 text-center" role="alert">No se encontaron Productos en el Carrito!</div>`;
    }
    
    document.getElementById("contenido").innerHTML = contenidoHTML;
}

const guardarCarritoLS = (carrito) => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

const cargarCarritoLS = () => {
    return JSON.parse(localStorage.getItem("carrito")) || [];
}

const guardarProductoLS = (id) => {
    localStorage.setItem("producto", JSON.stringify(id));
}

const cargarProductoLS = () => {
    return JSON.parse(localStorage.getItem("producto")) || [];
}

const vaciarCarrito = () => {
    localStorage.removeItem("carrito");
    renderCarrito();
    renderBotonCarrito();
}

const agregarProductoCarrito = (id) => {
    const carrito = cargarCarritoLS();

    if (estaEnElCarrito(id)) {
        const producto = carrito.find(item => item.id === id);
        producto.cantidad += 1;
    } else {
        const producto = buscarProducto(id);
        producto.cantidad = 1;
        carrito.push(producto);
    }

    guardarCarritoLS(carrito);
    renderBotonCarrito();
}

const eliminarProductoCarrito = (id) => {
    const carrito = cargarCarritoLS();
    const nuevoCarrito = carrito.filter(item => item.id !== id);
    guardarCarritoLS(nuevoCarrito);
    renderCarrito();
    renderBotonCarrito();
}

const incrementarCantidadProducto = (id) => {
    const carrito = cargarCarritoLS();
    const producto = carrito.find(item => item.id === id);
    producto.cantidad += 1;
    guardarCarritoLS(carrito);
    renderCarrito();
    renderBotonCarrito();
}

const decrementarCantidadProducto = (id) => {
    const carrito = cargarCarritoLS();
    const producto = carrito.find(item => item.id === id);

    if (producto.cantidad > 1) {
        producto.cantidad -= 1;
        guardarCarritoLS(carrito);
        renderCarrito();
        renderBotonCarrito();
    } else {
        eliminarProductoCarrito(id);
    }
}

const buscarProducto = (id) => {
    const productos = cargarProductosLS();
    let producto = productos.find(item => item.id === id);

    return producto;
}

const estaEnElCarrito = (id) => {
    const productos = cargarCarritoLS();

    return productos.some(item => item.id === id);
}

const cantProductosCarrito = () => {
    const carrito = cargarCarritoLS();

    return carrito.reduce((acumulador, item) => acumulador += item.cantidad, 0);
}

const sumaProductosCarrito = () => {
    const carrito = cargarCarritoLS();

    return carrito.reduce((acumulador, item) => acumulador += item.precio * item.cantidad, 0);
}

const renderBotonCarrito = () => {
    let totalCarrito = document.getElementById("totalCarrito");
    totalCarrito.innerHTML = cantProductosCarrito();
}

const renderProducto = () => {
    const idProducto = cargarProductoLS();
    const producto = buscarProducto(idProducto);

    document.getElementById("imagenProducto").src = producto.imagen;
    document.getElementById("tituloProducto").innerHTML = producto.nombre;
    document.getElementById("descripcionProducto").innerHTML = producto.descripcion;
    document.getElementById("precioProducto").innerHTML = "$" + producto.precio;
    document.getElementById("botonAgregar").innerHTML= `<a href="#" class="btn btn-warning" onclick="agregarProductoCarrito(${producto.id})">Agregar (+)</a>`;
}



