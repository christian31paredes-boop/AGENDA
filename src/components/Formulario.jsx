import { useState, useEffect } from 'react';

function Formulario(props) {
const [nombre, setNombre] = useState('');
const [correo, setCorreo] = useState('');
const [telefono, setTelefono] = useState('');
const [error, setError] = useState('');

useEffect(function() {
    if (props.contactoEdit) {
    setNombre(props.contactoEdit.nombre);
    setCorreo(props.contactoEdit.correo);
    setTelefono(props.contactoEdit.telefono);
    } else {
    limpiarFormulario();
    }
}, [props.contactoEdit]);

function limpiarFormulario() {
    setNombre('');
    setCorreo('');
    setTelefono('');
    setError('');
}

// --- FUNCIÓN SIMPLIFICADA PARA VERIFICAR DUPLICADOS ---
function verificarContactoRepetido() {
    for (let i = 0; i < props.contactos.length; i = i + 1) {
    const contactoExistente = props.contactos[i];

    // Ignoramos el contacto que estamos editando actualmente
    let mismoContacto = false;
    if (props.contactoEdit) {
        if (contactoExistente.id === props.contactoEdit.id) {
        mismoContacto = true;
        }
    }
    if (mismoContacto === false) {
        // Comprobamos si coincide el nombre, el correo o el teléfono en una sola condición
        if (
        contactoExistente.nombre.toLowerCase() === nombre.toLowerCase() ||
        contactoExistente.correo.toLowerCase() === correo.toLowerCase() ||
        contactoExistente.telefono === telefono
        ) {
        return true; // Encontró un duplicado
        }
    }
    }
    return false; // No hay duplicados
}

function enviarDatos(e) {
    e.preventDefault();
    setError('');

    // Validacion: Campos vacios
    if (nombre.trim() === "" || correo.trim() === "" || telefono.trim() === "") {
    setError('Todos los campos son obligatorios.');
    return;
    }
    if (correo.includes('@') === false) {
    setError('Por favor, ingresa un correo electronico valido.');
    return;
    }
    if (isNaN(telefono) === true) {
    setError('El telefono solo debe contener numeros.');
    return;
    }

    const Existe = verificarContactoRepetido();
    if (Existe === true) {
    setError('Contacto ya registrado con estos datos.');
    return; // Detiene el registro/guardado
    }

    // Guardar nuevo o editar
    if (props.contactoEdit) {
    const datosActualizados = {
        id: props.contactoEdit.id,
        nombre: nombre,
        correo: correo,
        telefono: telefono
    };
    props.actualizarContacto(datosActualizados);
    } else {
    const datosNuevos = {
        nombre: nombre,
        correo: correo,
        telefono: telefono
    };
    props.agregarContacto(datosNuevos);
    }

    limpiarFormulario();
}
function cancelarEdicion() {
    props.setContactoEdit(null);
    limpiarFormulario();
}
// --- COMPROBACIONES VISUALES ---
let tituloFormulario = '';
if (props.contactoEdit) {
    tituloFormulario = 'Editar Contacto';
} else {
    tituloFormulario = 'Nuevo Contacto';
}

let textoBotonGuardar = '';
if (props.contactoEdit) {
    textoBotonGuardar = 'Actualizar';
} else {
    textoBotonGuardar = 'Registrar';
}

let mensajeErrorElemento = null;
if (error !== "") {
    mensajeErrorElemento = <p className="error-mensaje">{error}</p>;
}

let botonCancelarElemento = null;
if (props.contactoEdit) {
    botonCancelarElemento = (
    <button type="button" onClick={cancelarEdicion} className="boton-cancelar">
        Cancelar
    </button>
    );
}

return (
    <form onSubmit={enviarDatos} className="formulario-contacto">
    <h2 className="titulo-formulario">
        {tituloFormulario}
    </h2>
    
    {mensajeErrorElemento}

    <input
        type="text"
        placeholder="Nombre completo"
        value={nombre}
        onChange={function(e) { setNombre(e.target.value); }}
        className="input-formulario"
    />
    
    <input
        type="text"
        placeholder="Correo electrónico"
        value={correo}
        onChange={function(e) { setCorreo(e.target.value); }}
        className="input-formulario"
    />
    
    <input
        type="text"
        placeholder="Teléfono"
        value={telefono}
        onChange={function(e) { setTelefono(e.target.value); }}
        className="input-formulario"
    />

    <div className="contenedor-botones">
        <button type="submit" className="boton-guardar">
        {textoBotonGuardar}
        </button>
        {botonCancelarElemento}
    </div>
    </form>
);
}

export default Formulario;