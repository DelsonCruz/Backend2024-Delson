const botonBuscar1 = document.getElementById('BotonBuscar1')
const botonBuscar2 = document.getElementById('BotonBuscar2')

botonBuscar1.addEventListener('click', () => {
    fetch('http://localhost:8000/api/products')
        .then(res => res.json())
        .then((prods) => {
            console.log(prods)
        })
})

botonBuscar2.addEventListener('click', () => {
    fetch('http://localhost:8000/api/products/66aff938990db71c36cc6748')
        .then(res => res.json())
        .then((prod) => {
            console.log(prod)
        })
})

// 66aff938990db71c36cc6748
