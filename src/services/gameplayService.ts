const API_URL = 'http://localhost:8080';

export const gameplayService = {
  async saveResult(score: number, accuracy: number, levelId: number) {
    try {
      const response = await fetch(`${API_URL}/save`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          score,
          accuracy,
          level_id: levelId
        }),
      });
      return response.ok;
    } catch (error) {
      console.error('Failed to save result to sidecar:', error);
      return false;
    }
  },

  async getStats() {
    try {
      const response = await fetch(`${API_URL}/stats`);
      return await response.json();
    } catch (error) {
      console.error('Failed to fetch stats from sidecar:', error);
      return null;
    }
  }
};
