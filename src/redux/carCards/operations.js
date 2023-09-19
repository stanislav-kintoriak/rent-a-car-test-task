import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = 'https://650818cb56db83a34d9bbfd9.mockapi.io/';

export const fetchAllCards = createAsyncThunk(
  'carCards/getAllCards',
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get(`cars`);
      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const fetchCards = createAsyncThunk(
  'carCards/getCards',
  async (page, thunkAPI) => {
    try {
      const { data } = await axios.get(`cars?page=${1}&limit=${page * 8}`);

      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
