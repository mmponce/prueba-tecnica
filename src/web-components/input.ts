import type { GithubUserApi } from '../types/types';

export class FindUser extends HTMLInputElement {
  constructor() {
    super();
    let timer: number;
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
    const response = await fetch(`https://api.github.com/users/${userId}`);
    const detail: GithubUserApi = await response.json();
    this.dispatchEvent(
      new CustomEvent<GithubUserApi>('user-info', {
        detail,
        bubbles: true,
      })
    );
  }
}

customElements.define('find-user', FindUser, { extends: 'input' });
