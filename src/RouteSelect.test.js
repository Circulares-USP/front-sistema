import { render, screen } from '@testing-library/react';
import RouteSelect from './RouteSelect';
import BusStops from './BusStops';

beforeEach(() => {
  const select8012 = render(<RouteSelect stops={[]} line={8012} />);
  const select8022 = render(<RouteSelect stops={[]} line={8022} />);
  const select8032 = render(<RouteSelect stops={[]} line={8032} />);
});

it('renderiza corretamente o título de seleção de pontos', () => {
  const select_title1 = screen.getByText(/Selecione a rota da linha 8012/i);
  const select_title2 = screen.getByText(/Selecione a rota da linha 8022/i);
  const select_title3 = screen.getByText(/Selecione a rota da linha 8032/i);
  expect(select_title1).toBeInTheDocument();
  expect(select_title2).toBeInTheDocument();
  expect(select_title3).toBeInTheDocument();
});

it('renderiza corretamente todas as paradas de ônibus', () => {
  for (let i = 0; i < BusStops.length; i++) {
  	const select_option = screen.getAllByText(BusStops[i])[0];
	expect(select_option).toBeInTheDocument();
  }
});
