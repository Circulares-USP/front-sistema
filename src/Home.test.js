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
  const confirmFiles = screen.getByText(/Confirmar arquivos/i, { selector: 'button' });
  expect(confirmFiles).toBeInTheDocument();
});

it('não transiciona para a seleção de rotas sem os arquivos', () => {
  let confirmFiles = screen.getByText(/Confirmar arquivos/i, { selector: 'button' });
  expect(confirmFiles).toBeInTheDocument();
  expect(confirmFiles).toBeDisabled();
  fireEvent.click(confirmFiles);
  confirmFiles = screen.getByText(/Confirmar arquivos/i, { selector: 'button' });
  expect(confirmFiles).toBeDisabled();
  expect(confirmFiles).toBeInTheDocument();
});
