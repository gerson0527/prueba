import axios from 'axios';

const API_URL = 'https://example.com/api/encuestas';

interface Encuesta {
  id: string;
  identificacion: string;
  modelo: string;
}

export const encuestaService = {

  obtener: async () => {
    const response = await axios.get(API_URL);
    return response.data as Encuesta[];
  },

  crear: async (data: Omit<Encuesta, 'id'>) => {
    const response = await axios.post(API_URL, data);
    return response.data as Encuesta;
  },

  actualizar: async (id: string, data: Omit<Encuesta, 'id'>) => {
    const response = await axios.put(`${API_URL}/${id}`, data);
    return response.data as Encuesta;
  },

  eliminar: async (id: string) => {
    await axios.delete(`${API_URL}/${id}`);
  } 

}