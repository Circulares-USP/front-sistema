import { render, screen } from '@testing-library/react';
import ResultsPoints from './ResultsPoints';


test('renderiza a seção de resultados corretamente', () => {
  render(<ResultsPoints />);
  const resultElement = screen.getByText(/Resultados/i);
  expect(resultElement).toBeInTheDocument();
});

test('renderiza o título da média por ponto', () => {
  render(<ResultsPoints />);
  const meanByPointElement = screen.getByText(/Média por ponto/i);
  expect(meanByPointElement).toBeInTheDocument();
});
