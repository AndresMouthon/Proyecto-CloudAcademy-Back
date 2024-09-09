const limpiarDatosSensibles = (response = [], camposAEliminar = []) => {
    return response.map(objeto => limpiarObjeto(objeto, camposAEliminar));
};

const limpiarObjeto = (objeto, camposAEliminar) => {
    const objetoLimpio = { ...objeto.toJSON() };

    camposAEliminar.forEach(campo => {
        delete objetoLimpio[campo];
    });

    return objetoLimpio;
};

module.exports = { limpiarDatosSensibles };