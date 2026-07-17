import React from 'react';

function Buscador(props) {
function manejarCambio(evento) {
props.setBusqueda(evento.target.value);
}

return (
<div className="buscador-contenedor">
    <input
    type="text"
    placeholder="Buscar contacto por nombre"
    value={props.busqueda}
    onChange={manejarCambio}
    className="input-buscador"
    />
</div>
);
}

export default Buscador;