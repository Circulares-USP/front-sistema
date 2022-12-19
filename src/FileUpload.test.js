import { render, screen } from '@testing-library/react';
import FileUpload from './FileUpload';

beforeEach(() => {
  const upload = render(<FileUpload />);
});

it('renderiza a label de demanda de alunos', () => {
  const demandLabel = screen.getByText(/Demanda de Alunos/i);
  expect(demandLabel).toBeInTheDocument();
});

it('renderiza a label de saída de ônibus', () => {
  const departuresLabel = screen.getByText(/Saídas de Ônibus/i);
  expect(departuresLabel).toBeInTheDocument();
});
