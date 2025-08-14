import { UserAdapter } from '../adapters/userAdapter';
import type { User } from '../types/types';
import { SearchInput } from './search-input';

export class InfoCard extends HTMLElement {
  user?: User;
  error: string = 'Usuario no encontrado';

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.render();
    this.addEvents();
  }

  static get observedAttributes(): string[] {
    return ['loading', 'error'];
  }

  get loading(): boolean {
    return this.hasAttribute('loading');
  }

  set loading(value: boolean) {
    if (value) {
      this.setAttribute('loading', '');
    } else {
      this.removeAttribute('loading');
    }
  }

  connectedCallback(): void {
    this.render();
  }

  render(): void {
    if (this.shadowRoot) {
      const errorMessage = `<span data-testid='error' class='error'>${this.error}</span>`;
      const info =
        this.user &&
        `<img data-testid='picture' class='picture' src='${this.user?.avatarUrl}' alt='${this.user?.avatarUrl}' />
        ${this.user?.name ? `<span data-testid='name' class='name'>Nombre: ${this.user?.name}</span>` : ''}
        ${this.user?.bio ? `<div data-testid='biography' class='biography'>Bio: ${this.user?.bio}</div>` : ''}
        ${this.user?.publicRepos ? `<span data-testid='repo-count' class='repo-count'>Número de repositorios: ${this.user?.publicRepos}</span>` : ''}
        <a data-testid='link' class='link' href='${this.user?.htmlUrl}'>Link de perfil</a>`;
      this.shadowRoot.innerHTML = `
        <style>
          .card {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: .5rem;
            width: var(--card-width, 15rem);
            min-height: var(--card-height, 12rem);
            background: var(--card-background, var(--color-white));
            padding: var(--card-padding, 1.5rem);
            border-radius: .75rem;
            box-shadow: 0 .25rem .625rem rgba(0,0,0,0.06);
            text-align: center;

            .picture {
              width: var(--card-image-size, 6.25rem);
              height: var(--card-image-size, 6.25rem);
              border-radius: 50%;
              object-fit: cover;
              box-shadow: 0 .125rem .5rem rgba(0,0,0,0.1);
              margin-bottom: 1rem;
            }

            .repo-count, .link, .biography {
              font-size: 0.875rem;
              color: var(--text-color, var(--color-black));
            }

            .biography {
              text-align: center;
            }
            
            .link {
              background: var(--link-color, var(--color-green-dark));
              color: white;
              padding: 0.5rem 1rem;
              border-radius: .5rem;
              text-decoration: none;
              font-weight: 500;
              transition: background 0.2s ease;
              &:hover {
                background: var(--link-hover-color, var(--color-green));
              }
            }
            @media (max-width: 27rem) {
              padding-top: 1rem;
              padding-bottom: 1rem;
            }
          }
        </style>
        <section class='card'>
          ${this.loading ? `<loading-spinner />` : info ? info : errorMessage}
        </section>`;
    }
  }

  attributeChangedCallback() {
    this.render();
  }

  addEvents(): void {
    const inputSelector = document.querySelector<SearchInput>('#finder');
    if (!inputSelector) return;
    inputSelector.addEventListener('loading', () => {
      this.loading = true;
    });
    inputSelector?.addEventListener('error', (event: Event) => {
      if (event instanceof CustomEvent) {
        const message = event.detail;
        this.user = undefined;
        this.error = message;
        this.loading = false;
      }
    });
    inputSelector?.addEventListener('user-info', (event: Event) => {
      if (event instanceof CustomEvent) {
        if ('status' in event.detail) {
          this.loading = false;
          return;
        }
        this.user = UserAdapter.convert(event.detail);
        this.loading = false;
      }
    });
  }
}

customElements.define('info-card', InfoCard);
