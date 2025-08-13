import { UserAdapter } from '../adapters/userAdapter';
import type { User } from '../types/types';

export class Card extends HTMLElement {
  user?: User = {
    name: 'Matias',
    avatarUrl: 'https://avatars.githubusercontent.com/u/195561763?v=4',
    publicRepos: 4,
    bio: 'Bio de test',
    htmlUrl: 'https://github.com/mmponce'
  };
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    document.querySelector('input')?.addEventListener('user-info', (event: Event) => {
      if (event instanceof CustomEvent) {
        this.user = UserAdapter.convert(event.detail);
        this.render();
      }
    });
  }

  connectedCallback(): void {
    this.render();
  }

  render(): void {
    if (this.shadowRoot) {
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
          padding: 2rem;
          border-radius: 1.5rem;
          .picture {
            max-width: 3.75rem;
          }
        }
      </style>
      <section class='card'>
        <img class='picture' src='${this.user?.avatarUrl}' alt='${this.user?.avatarUrl}' />
        ${this.user?.name ? `<span class='name'>Nombre: ${this.user?.name}</span>` : ''}
        ${this.user?.bio ? `<div class='biography'>Bio: ${this.user?.bio}</div>` : ''}
        ${this.user?.publicRepos ? `<span class='repo-count'>Número de repos: ${this.user?.publicRepos}</span>` : ''}
        <a class='link' href='${this.user?.htmlUrl}'>Link de perfil</a>
      </section>`;
    }
  }
}

customElements.define('custom-card', Card);
