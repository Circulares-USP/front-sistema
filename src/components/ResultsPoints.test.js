import { render, screen } from '@testing-library/react';
import ResultsPoints from './ResultsPoints';

beforeEach(() => {
  const resultsPoints = render(<ResultsPoints />);
});

it('renderiza a seção de resultados corretamente', () => {
  const resultElement = screen.getByText(/Resultados/i);
  expect(resultElement).toBeInTheDocument();
});

it('renderiza o título da média por ponto', () => {
  const meanByPointElement = screen.getByText(/Média por ponto/i);
  expect(meanByPointElement).toBeInTheDocument();
});
