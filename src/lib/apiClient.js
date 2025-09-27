const API_BASE_URL = '/api';

async function request(endpoint, options = {}) {
  const { method, body } = options;
  const url = `${API_BASE_URL}/${endpoint}`;

  const headers = {
    'Content-Type': 'application/json',
  };

  const config = {
    method,
    headers,
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(url, config);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Something went wrong');
    }

    // For DELETE requests, there might not be a body to parse
    if (method === 'DELETE') {
      return;
    }

    return response.json();
  } catch (error) {
    console.error('API request error:', error);
    throw error;
  }
}

// --- Club API Functions ---

export const getClubs = () => {
  return request('club/clubApi', { method: 'GET' });
};

export const getClubById = (id) => {
  return request(`club/clubApi?id=${id}`, { method: 'GET' });
};

export const createClub = (clubData) => {
  return request('club/clubApi', { method: 'POST', body: clubData });
};

export const updateClub = (id, clubData) => {
  return request(`club/clubApi?id=${id}`, { method: 'PUT', body: clubData });
};

export const deleteClub = (id) => {
  return request(`club/clubApi?id=${id}`, { method: 'DELETE' });
};