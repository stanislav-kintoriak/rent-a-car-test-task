import { useEffect } from 'react';
import { AppRoutes } from '../routes/Routes';
import './App.css';

import { Header } from '../components/parts/Header/Header';
import { fetchAllCards } from '../redux/carCards/operations';

import { useDispatch } from 'react-redux';

export const App = () => {
  const dispatch = useDispatch();

  // get cards
  useEffect(() => {
    setTimeout(() => {
      dispatch(fetchAllCards());
    }, 1000);
  }, []);

  return (
    <div className="App__container">
      <Header />
      <AppRoutes />
    </div>
  );
};
