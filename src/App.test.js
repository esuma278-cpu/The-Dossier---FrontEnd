import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';

test('shows all three dossier profiles and private administrator access', () => {
  render(<App />);

  expect(screen.getByRole('heading', { name: 'Investigator' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Case Creator' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Administrator' })).toBeInTheDocument();
  expect(screen.getByText('Privately provisioned')).toBeInTheDocument();
});

test('prefills the selected profile when creating an account', () => {
  render(<App />);

  fireEvent.click(
    screen.getByRole('button', { name: /create case creator profile/i })
  );

  expect(screen.getByRole('radio', { name: /case creator/i })).toBeChecked();
  expect(screen.getByRole('radio', { name: /investigator/i })).not.toBeChecked();
});
