import { UserAdapter } from '../adapters/userAdapter';
import type { User } from '../types/types';

export class InfoCard extends HTMLElement {
  user?: User;
  error: string = 'Usuario no encontrado';

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
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
      const errorMessage = `<span class='error'>${this.error}</span>`;
      const info =
        this.user &&
        `<img class='picture' src='${this.user?.avatarUrl}' alt='${this.user?.avatarUrl}' />
        ${this.user?.name ? `<span class='name'>Nombre: ${this.user?.name}</span>` : ''}
        ${this.user?.bio ? `<div class='biography'>Bio: ${this.user?.bio}</div>` : ''}
        ${this.user?.publicRepos ? `<span class='repo-count'>Número de repositorios: ${this.user?.publicRepos}</span>` : ''}
        <a class='link' href='${this.user?.htmlUrl}'>Link de perfil</a>`;
      this.shadowRoot.innerHTML = `
        <style>
          .card {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: .5rem;
            width: var(--card-width, 15rem);
            height: var(--card-height, 12rem);
            background: var(--card-background, white);
            padding: var(--card-padding, 2rem);
            border-radius: 1.5rem;

            .picture {
              max-width: 3.75rem;
              min-height: 3.75rem;
            }

            .repo-count, .link, .biography {
              font-size: 0.875rem;
              color: var(--text-color, #262729);
            }

            .biography {
              text-align: center;
            }
            
            .link {
              color: var(--link-color, #3b9326);
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
    const inputSelector = document.querySelector('input');
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
