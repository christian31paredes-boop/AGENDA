import { useState } from 'react';
import Buscador from './components/Buscador';
import Formulario from './components/Formulario';
import TarjetaContacto from './components/TarjetaContacto';

function App() {
  const contactosGuardadosTexto = localStorage.getItem('contactos_agenda');
  let contactosIniciales = [];

  if (contactosGuardadosTexto !== null) {
    contactosIniciales = JSON.parse(contactosGuardadosTexto);
  } else {
    contactosIniciales = [];
    localStorage.setItem('contactos_agenda', JSON.stringify(contactosIniciales));
  }

  const [contactos, setContactos] = useState(contactosIniciales);
  const [busqueda, setBusqueda] = useState('');
  const [contactoEdit, setContactoEdit] = useState(null);
  const [verContactos, setVerContactos] = useState(false);

  function guardarEnBaseDeDatos(nuevaLista) {
    localStorage.setItem('contactos_agenda', JSON.stringify(nuevaLista));
    setContactos(nuevaLista);
  }

  function agregarContacto(nuevo) {
    nuevo.id = Date.now();
    const nuevaLista = [];
    for (let i = 0; i < contactos.length; i = i + 1) {
      nuevaLista.push(contactos[i]);
    }
    nuevaLista.push(nuevo);
    
    // Guardamos permanentemente
    guardarEnBaseDeDatos(nuevaLista);
  }

  function eliminarContacto(id) {
    const confirmar = window.confirm("¿Seguro que deseas eliminar este contacto?");
    if (confirmar) {
      const nuevaLista = [];
      for (let i = 0; i < contactos.length; i = i + 1) {
        if (contactos[i].id !== id) {
          nuevaLista.push(contactos[i]);
        }
      }
      
      // Guardamos permanentemente
      guardarEnBaseDeDatos(nuevaLista);
    }
  }

  function actualizarContacto(contactoActualizado) {
    const nuevaLista = [];
    for (let i = 0; i < contactos.length; i = i + 1) {
      if (contactos[i].id === contactoActualizado.id) {
        nuevaLista.push(contactoActualizado);
      } else {
        nuevaLista.push(contactos[i]);
      }
    }
    
    // Guardamos permanentemente
    guardarEnBaseDeDatos(nuevaLista);
    setContactoEdit(null);
  }

  function alternarVisibilidad() {
    if (verContactos === true) {
      setVerContactos(false);
    } else {
      setVerContactos(true);
    }
  }

  const contactosFiltrados = [];
  const textoBuscar = busqueda.toLowerCase();
  
  for (let i = 0; i < contactos.length; i = i + 1) {
    const nombreContacto = contactos[i].nombre.toLowerCase();
    if (nombreContacto.includes(textoBuscar)) {
      contactosFiltrados.push(contactos[i]);
    }
  }

  const elementosContactos = [];
  for (let i = 0; i < contactosFiltrados.length; i = i + 1) {
    const c = contactosFiltrados[i];
    elementosContactos.push(
      <TarjetaContacto 
        key={c.id} 
        contacto={c} 
        onEditar={setContactoEdit} 
        onEliminar={eliminarContacto} 
      />
    );
  }

  const debeMostrarLista = verContactos === true || busqueda.trim() !== "";

  return (
    <div className="contenedor-app">
      <h1 className="titulo-principal">Agenda de Contactos</h1>
      
      <div className="layout-columnas">
        
        {/* Lado Izquierdo: Formulario */}
        <div className="columna-izquierda">
          <Formulario 
            agregarContacto={agregarContacto} 
            actualizarContacto={actualizarContacto}
            contactoEdit={contactoEdit}
            setContactoEdit={setContactoEdit}
            contactos={contactos}
          />
        </div>

        {/* Lado Derecho: Buscador, Boton y Lista */}
        <div className="columna-derecha">
          <Buscador busqueda={busqueda} setBusqueda={setBusqueda} />
          
          <div className="seccion-acciones-lista">
            <button onClick={alternarVisibilidad} className="boton-mostrar-ocultar">
              {verContactos === true ? 'Ocultar Contactos' : 'Mostrar Contactos'}
            </button>
          </div>

          {debeMostrarLista === true ? (
            <div className="lista-contactos">
              {elementosContactos.length > 0 ? (
                elementosContactos
              ) : (
                <p className="no-resultados">No se encontraron contactos.</p>
              )}
            </div>
          ) : null}
        </div>

      </div>
    </div>
  );
}

export default App;