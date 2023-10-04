import { render, screen, fireEvent } from '@testing-library/react';
import EncuestaForm from '../../../components/EncuestaForm';

describe('EncuestaForm', () => {

  it('debería renderizar el formulario', () => {
    // Renderiza el componente EncuestaForm con una función simulada onSubmit.
    render(<EncuestaForm onSubmit={jest.fn()} />);
    
    // Verifica que los elementos de etiqueta 'Identificación' y 'Modelo' estén presentes en el DOM.
    expect(screen.getByLabelText('Identificación')).toBeInTheDocument();
    expect(screen.getByLabelText('Modelo')).toBeInTheDocument();
    // Puedes agregar más expectativas para otros campos si es necesario.
  });

  it('debería llamar onSubmit con los datos al hacer submit', () => {
    // Crea una función simulada onSubmit usando jest.fn().
    const onSubmit = jest.fn();
    
    // Renderiza el componente EncuestaForm con la función simulada onSubmit.
    render(<EncuestaForm onSubmit={onSubmit} />);

    // Simula un cambio en el campo 'Identificación' con un valor de '1234'.
    fireEvent.change(screen.getByLabelText('Identificación'), {
      target: { value: '1234' }
    });

    // Simula el envío del formulario.
    fireEvent.submit(screen.getByRole('button'));

    // Verifica que la función onSubmit fue llamada con los datos correctos.
    expect(onSubmit).toHaveBeenCalledWith({
      identificacion: '1234' 
      // Puedes agregar más campos aquí si es necesario.
    });
  });
  
});
