import { useState, useEffect } from 'react';
import Pagination from './Pagination';

interface Encuesta {
  id: string;
  identificacion: string;
  modelo: string;
}

interface EncuestaTableProps {
  encuestas: Encuesta[];
  onDelete: (id: string) => void;
  onEdit: (id: string) => void; 
}

const EncuestaTable = ({ encuestas, onDelete, onEdit }: EncuestaTableProps) => {

  const [pagina, setPagina] = useState(1);
  const [busqueda, setBusqueda] = useState('');

  const FILAS_POR_PAGINA = 10;
  
  const encuestasFiltradas = encuestas.filter(encuesta => 
    encuesta.identificacion.includes(busqueda)
  );

  const startIndex = (pagina - 1) * FILAS_POR_PAGINA;
  const endIndex = startIndex + FILAS_POR_PAGINA;
  const encuestasPaginadas = encuestasFiltradas.slice(startIndex, endIndex);

  const totalPaginas = Math.ceil(encuestasFiltradas.length / FILAS_POR_PAGINA);

  useEffect(() => {
    setPagina(1);
  }, [encuestas, busqueda]);

  return (
    <>
      <input
        type="text"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)} 
        placeholder="Buscar..." 
      />

      <table>
        <thead>
          <tr>
            <th>Identificación</th>
            <th>Modelo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {encuestasPaginadas.map(encuesta => (
            <tr key={encuesta.id}>
              <td>{encuesta.identificacion}</td>
              <td>{encuesta.modelo}</td>
              <td>
                <button onClick={() => onEdit(encuesta.id)}>
                  Editar
                </button>
                <button onClick={() => onDelete(encuesta.id)}>
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination 
        currentPage={pagina}
        totalPages={totalPaginas}
        onPageChange={setPagina}
      />

    </>
  )

}

export default EncuestaTable;