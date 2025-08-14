import type { GithubUserApi } from '../types/types';

export class SearchInput extends HTMLInputElement {
  constructor() {
    super();
    this.addEvents();
  }

  fetchUser(userId: string): void {
    this.dispatchEvent(
      new CustomEvent<boolean>('loading', {
        detail: true,
      })
    );
    fetch(`https://api.github.com/users/${userId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Usuario no encontrado');
        }
        return response.json();
      })
      .then((detail: GithubUserApi) => {
        this.dispatchEvent(
          new CustomEvent<GithubUserApi>('user-info', {
            detail,
            bubbles: true,
          })
        );
      })
      .catch((error) => {
        this.dispatchEvent(
          new CustomEvent<string>('error', {
            detail: error,
            bubbles: true,
          })
        );
      });
  }

  addEvents(): void {
    let timer: NodeJS.Timeout;
    this.addEventListener('input', (event: Event) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        if (event.target instanceof HTMLInputElement) {
          const userId = event.target.value;
          if (!userId) return;
          this.fetchUser(userId);
        }
      }, 500);
    });
  }
}

customElements.define('search-input', SearchInput, { extends: 'input' });
