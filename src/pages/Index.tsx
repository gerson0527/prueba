import { useContext, useState } from 'react';
import { EncuestaContext } from '../contexts/EncuestaContext';
import EncuestaForm from '../components/EncuestaForm';
import EncuestaTable from '../components/EncuestaTable';

const Index = () => {

  const { 
    encuestas,
    cargando,
    error,
    obtenerEncuestas,
    crearEncuesta,
    editarEncuesta,
    eliminarEncuesta
  } = useContext(EncuestaContext);

  const [editing, setEditing] = useState(false);

  const editRow = (encuesta: Encuesta) => {
    setEditing(true);
    // set formulario con valores de encuesta  
  }

  const updateEncuesta = async (id: string, data: Encuesta) => {
    await editarEncuesta(id, data);
    setEditing(false);
  }

  const handleSubmit = async (data: Encuesta) => {
    if(editing) {
      // actualizar encuesta
      updateEncuesta(editing.id, data);
    } else {
      // crear encuesta  
      await crearEncuesta(data);
    }
    obtenerEncuestas();
  }

  if(cargando) {
    return <Loading />
  }

  if(error) {
    return <Error message={error} />
  }  


  return (
    <>
    <h1>Encuestas</h1>
    
    {editing ? (
      <EncuestaForm  
        onSubmit={handleSubmit}
        encuesta={editing}
      />  
    ) : (
      <EncuestaForm 
        onSubmit={handleSubmit}
      />
    )}

    <EncuestaTable
      encuestas={encuestas}
      onEdit={editRow}
      onDelete={eliminarEncuesta}
    />

  </>
  )

}

export default Index;