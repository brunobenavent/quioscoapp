const formatearDinero = dinero => {
   return dinero.toLocaleString('es-ES', {
        style: 'currency',
        currency: 'EUR'
    })
}

export {
    formatearDinero
}