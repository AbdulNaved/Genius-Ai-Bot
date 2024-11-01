const MESSAGES_KEY = 'messages';
const HISTORY_KEY = 'history';

const localStorageService = {
  // Check if we're running in a browser environment
  isBrowser() {
    return typeof window !== 'undefined';
  },

  // Get stored messages from localStorage (client-side only)
  getMessages() {
    if (!this.isBrowser()) return [];

    const messages = localStorage.getItem(MESSAGES_KEY);
    
    // Safely parse the JSON only if `messages` is not null or undefined
    try {
      return messages ? JSON.parse(messages) : [];
    } catch (error) {
      console.error('Error parsing messages from localStorage:', error);
      return [];
    }
  },

  // Save messages to localStorage (client-side only)
  saveMessages(messages: Array<any>) {
    if (this.isBrowser()) {
      localStorage.setItem(MESSAGES_KEY, JSON.stringify(messages));
    }
  },

  // Clear messages from localStorage (client-side only)
  clearMessages() {
    if (this.isBrowser()) {
      localStorage.removeItem(MESSAGES_KEY);
    }
  },

  // Get stored history from localStorage (client-side only)
  getHistory() {
    if (!this.isBrowser()) return [];

    const history = localStorage.getItem(HISTORY_KEY);
    
    // Safely parse the JSON only if `history` is not null or undefined
    try {
      return history ? JSON.parse(history) : [];
    } catch (error) {
      console.error('Error parsing history from localStorage:', error);
      return [];
    }
  },

  // Save history to localStorage (client-side only)
  saveHistory(history: Array<string>) {
    if (this.isBrowser()) {
      localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
    }
  },

  // Clear history from localStorage (client-side only)
  clearHistory() {
    if (this.isBrowser()) {
      localStorage.removeItem(HISTORY_KEY);
    }
  }
};

export default localStorageService;

