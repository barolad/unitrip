import { api } from '@shared/api';

async function getAllEvents() {
  const response = await api.events.$get();
  return response.json();
}

export { getAllEvents };
