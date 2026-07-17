import React from 'react';

function TarjetaContacto(props) {
function manejarEditar() {
    props.onEditar(props.contacto);
}

function manejarEliminar() {
    props.onEliminar(props.contacto.id);
}

return (
    <div className="tarjeta-contacto">
    <div className="detalle-contacto">
        <h3 className="nombre-contacto">{props.contacto.nombre}</h3>
        <p className="correo-contacto">Correo: {props.contacto.correo}</p>
        <p className="telefono-contacto">Teléfono: {props.contacto.telefono}</p>
    </div>
    <div className="acciones-tarjeta">
        <button onClick={manejarEditar} className="boton-editar">
        Editar
        </button>
        <button onClick={manejarEliminar} className="boton-eliminar">
        Eliminar
        </button>
    </div>
    </div>
);
}

export default TarjetaContacto;