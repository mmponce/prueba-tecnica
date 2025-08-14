import '../components/info-card';
import { InfoCard } from '../components/info-card';

describe('InfoCard Web Component', () => {
  let card: InfoCard;

  beforeEach(() => {
    card = document.createElement('info-card') as InfoCard;
    card.user = {
      name: 'Matías Gaete',
      avatarUrl: 'https://avatars.githubusercontent.com/u/195561763?v=4',
      bio: 'Biografia de Matías',
      publicRepos: 1,
      htmlUrl: 'https://example.com/',
    };
    document.body.appendChild(card);
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  test('muestra textos correctamente', () => {
    const nameElement = card.shadowRoot?.querySelector('[data-testid="name"]');
    expect(nameElement && nameElement.textContent).toContain('Matías Gaete');

    const bioElement = card.shadowRoot?.querySelector(
      '[data-testid="biography"]'
    );
    expect(bioElement && bioElement.textContent).toContain(
      'Biografia de Matías'
    );

    const reposElement = card.shadowRoot?.querySelector(
      '[data-testid="repo-count"]'
    );
    expect(reposElement && reposElement.textContent).toContain('1');
  });

  test('renderiza imagen', () => {
    const avatarElement = card.shadowRoot?.querySelector<HTMLImageElement>(
      '[data-testid="picture"]'
    );
    expect(avatarElement).not.toBeNull();
    expect(avatarElement && avatarElement.src).toBe(
      'https://avatars.githubusercontent.com/u/195561763?v=4'
    );
  });

  test('link tiene url asignada', () => {
    const htmlUrlElement = card.shadowRoot?.querySelector<HTMLAnchorElement>(
      '[data-testid="link"]'
    );
    expect(htmlUrlElement).not.toBeNull();
    expect(htmlUrlElement && htmlUrlElement.href).toBe('https://example.com/');
  });

  test('usuario no encontrado', () => {
    card.user = undefined;
    card.render();
    const errorMessageElement = card.shadowRoot?.querySelector(
      '[data-testid="error"]'
    );
    expect(errorMessageElement && errorMessageElement.textContent).toBe(
      'Usuario no encontrado'
    );
  });

  test('cambiando loading a true', () => {
    card.loading = true;
    card.render();
    expect(card.shadowRoot?.innerHTML).toContain('<loading-spinner>');
  });
});
