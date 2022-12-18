import { render, fireEvent, screen } from '@testing-library/react';
import Home from './Home';

beforeEach(() => {
  const upload = render(<Home />);
});

it('renderiza o título principal da aplicação', () => {
  const mainTitle = screen.getByText(/Simulador de Demanda/i);
  expect(mainTitle).toBeInTheDocument();
});

it('renderiza o envio de arquivos como tela inicial', () => {
  const departuresLabel = screen.getByText(/Confirmar arquivos/i, { selector: 'button' });
  expect(departuresLabel).toBeInTheDocument();
});

it('transiciona para a tela de seleção de rotas', () => {
  const departuresLabel = screen.getByText(/Confirmar arquivos/i, { selector: 'button' });
  expect(departuresLabel).toBeInTheDocument();
  fireEvent.click(departuresLabel);
  const routesLabel = screen.getByText(/Selecione a rota da linha/i);
  expect(routesLabel).toBeInTheDocument();
});
