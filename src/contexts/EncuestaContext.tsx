import { createContext, useState, useEffect } from 'react';
import { encuestaService } from '../services/encuestaService';

interface Encuesta {
  id: string;
  identificacion: string;
  modelo: string;
}

interface EncuestaContextType {
  encuestas: Encuesta[];
  cargando: boolean;
  error: any;
  obtenerEncuestas: () => Promise<void>;
  crearEncuesta: (data: Omit<Encuesta, 'id'>) => Promise<Encuesta>;
  editarEncuesta: (id: string, data: Omit<Encuesta, 'id'>) => Promise<Encuesta>;
  eliminarEncuesta: (id: string) => Promise<void>;
}

export const EncuestaContext = createContext<EncuestaContextType>({
  encuestas: [],
  cargando: false,
  error: null,
  obtenerEncuestas: async () => {},
  crearEncuesta: async () => ({ id: '-1' } as Encuesta),
  editarEncuesta: async () => ({ id: '-1' } as Encuesta),
  eliminarEncuesta: async () => {}, 
});

export const EncuestaProvider = ({ children }: {children: ReactNode}) => {

  const [encuestas, setEncuestas] = useState<Encuesta[]>([]);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    obtenerEncuestas();
  }, []);

  const obtenerEncuestas = async () => {
    try {
      setCargando(true);
      const data = await encuestaService.obtener();
      setEncuestas(data);
    } catch (err) {
      setError(err); 
    } finally {
      setCargando(false);
    }
  }

  const crearEncuesta = async (data: Omit<Encuesta, 'id'>) => {
    try {
      setCargando(true);
      const nuevaEncuesta = await encuestaService.crear(data);
      setEncuestas([...encuestas, nuevaEncuesta]);
      return nuevaEncuesta;
    } catch (err) {
      setError(err);
      return { id: '-1' } as Encuesta; 
    } finally {
      setCargando(false); 
    }
  }

  const editarEncuesta = async (id: string, data: Omit<Encuesta, 'id'>) => {
    try {
      setCargando(true);
      const encuestaActualizada = await encuestaService.actualizar(id, data);
      
      setEncuestas(encuestas.map(encuesta => {
        if(encuesta.id === id) {
          return encuestaActualizada;  
        }
        return encuesta;
      }))
  
      return encuestaActualizada;
  
    } catch (error) {
      setError(error);
      return { id: '-1' } as Encuesta;
    } finally {
      setCargando(false);
    }
  } 
  
  const eliminarEncuesta = async (id: string) => {
    try {
      setCargando(true);
      await encuestaService.eliminar(id);
  
      setEncuestas(encuestas.filter(encuesta => encuesta.id !== id));
  
    } catch(error) {
      setError(error);
    } finally {
      setCargando(false);
    }
  }

  return (
    <EncuestaContext.Provider value={{
      encuestas,
      cargando,
      error,
      obtenerEncuestas,
      crearEncuesta,
      editarEncuesta,
      eliminarEncuesta
    }}>
      {children}  
    </EncuestaContext.Provider>
  )

}