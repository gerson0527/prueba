import { FormEvent, useState } from 'react';

interface Encuesta {
  clienteId: string;
  identificacion: string;
  modelo: string;
  factores: string[];
  calificacionPrueba: number;
  calificacionSatisfaccion: number;
}

interface EncuestaFormProps {
  onSubmit: (data: Encuesta) => void;
}

const EncuestaForm = ({ onSubmit }: EncuestaFormProps) => {

  const [encuesta, setEncuesta] = useState<Encuesta>({
    clienteId: '',
    identificacion: '',
    modelo: '',
    factores: [],
    calificacionPrueba: 0,
    calificacionSatisfaccion: 0
  });

  const [error, setError] = useState('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(!encuesta.identificacion) {
      setError('Identificación es requerida');
      return;
    }
    onSubmit(encuesta);
  }

  return (
    <form onSubmit={handleSubmit}>
      {error && <p>{error}</p>}

      <input
        name="identificacion"
        value={encuesta.identificacion}
        onChange={(e) => setEncuesta({ ...encuesta, identificacion: e.target.value })}
        placeholder="Identificación" 
      />

      <select 
        name="factores"
        value={encuesta.factores}
        onChange={(e) => setEncuesta({ ...encuesta, factores: [e.target.value] })}  
      >
        <option value="">Selecciona un factor</option>
        <option value="reputacion">Reputación de la marca</option>
        <option value="financiamiento">Opciones de financiamiento</option>
        <option value="desempeno">Desempeño al manejarlo</option>
        <option value="recomendaciones">Recomendaciones de amigos o familiares</option>
        <option value="otros">Otros</option>
      </select>

      <input 
        name="calificacionPrueba"
        type="number"
        min={1}
        max={5}
        value={encuesta.calificacionPrueba}
        onChange={(e) => setEncuesta({ ...encuesta, calificacionPrueba: parseInt(e.target.value) })}
      />

      <button type="submit">Enviar</button>

    </form>
  );
}

export default EncuestaForm;