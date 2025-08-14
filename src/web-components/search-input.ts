import type { GithubUserApi } from '../types/types';

export class SearchInput extends HTMLInputElement {
  constructor() {
    super();
    let timer: NodeJS.Timeout;
    this.addEventListener('input', (event: Event) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        if (event.target instanceof HTMLInputElement) {
          const userId = event.target.value;
          if (!userId) return;
          this.fetchUser(userId);
        }
      }, 1000);
    });
  }

  async fetchUser(userId: string): Promise<void> {
    this.dispatchEvent(
      new CustomEvent<boolean>('loading', {
        detail: true,
      })
    );
    await fetch(`https://api.github.com/users/${userId}`)
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
}

customElements.define('search-input', SearchInput, { extends: 'input' });
