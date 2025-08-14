import './loading-spinner';
import { LoadingSpinner } from './loading-spinner';

describe('LoadingSpinner Web Component', () => {
  test('spinner renderizado', () => {
    const spinner = document.createElement('loading-spinner') as LoadingSpinner;
    expect(spinner.shadowRoot!.innerHTML).toContain('Cargando...');
  });
});
