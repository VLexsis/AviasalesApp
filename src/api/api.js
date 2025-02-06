import { createAsyncThunk } from '@reduxjs/toolkit';

// Асинхронное действие для получения searchId
export const fetchSearchId = createAsyncThunk(
  'search/fetchSearchId',
  async () => {
    const response = await fetch(
      'https://aviasales-test-api.kata.academy/search'
    );
    if (!response.ok) {
      throw new Error('Failed to fetch searchId');
    }
    const data = await response.json();
    return data.searchId;
  }
);

// Асинхронное действие для получения билетов с логикой повторных попыток
export const fetchTickets = createAsyncThunk(
  'tickets/fetchTickets',
  async ({ searchId }, { getState, rejectWithValue }) => {
    const MAX_RETRIES = 5; // Максимальное количество попыток
    let attempt = 0;
    let stop = false;

    while (attempt < MAX_RETRIES && !stop) {
      try {
        const state = getState();

        if (state.search.stop) {
          return { tickets: [], stop: true };
        }

        const response = await fetch(
          `https://aviasales-test-api.kata.academy/tickets?searchId=${searchId}`
        );

        if (!response.ok) {
          console.error(`Error: ${response.status} - ${response.statusText}`);
          throw new Error(`Failed to fetch tickets: ${response.statusText}`);
        }

        const data = await response.json();
        console.log('Fetched data:', data);

        return {
          tickets: data.tickets || [],
          stop: data.stop,
        };
      } catch (error) {
        console.error('Failed to fetch tickets:', error.message);
        attempt += 1;
        if (attempt >= MAX_RETRIES) {
          return rejectWithValue(error.message);
        }
      }
    }
  }
);
