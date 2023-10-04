import { render, screen } from '@testing-library/react';
import { EncuestaContext } from '../../../contexts/EncuestaContext';
import Index from '../../../pages/Index';

describe('Index', () => {

  it('debería renderizar el título y los componentes', () => {

    render(
      <EncuestaContext.Provider value={{
        encuestas: []  
      }}>
        <Index />
      </EncuestaContext.Provider>  
    );

    expect(screen.getByRole('heading')).toHaveTextContent('Encuestas');
    expect(screen.getByTestId('encuesta-form')).toBeInTheDocument();
    expect(screen.getByTestId('encuesta-table')).toBeInTheDocument();

  });

  it('debería pasar las encuestas al EncuestaTable', () => {
    
    const encuestas = [
      { id: 1, identificacion: '1234' }, 
      { id: 2, identificacion: '5678' }
    ];

    render(
      <EncuestaContext.Provider value={{
        encuestas  
      }}>
        <Index />
      </EncuestaContext.Provider>
    );

    expect(screen.getByTestId('encuesta-table')).toHaveTextContent('1234');
    expect(screen.getByTestId('encuesta-table')).toHaveTextContent('5678');

  });

});