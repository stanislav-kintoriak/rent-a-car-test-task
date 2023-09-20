import { CardsItem } from 'components/pages/Catalog/Cardsitem/CardsItem';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCards } from 'redux/carCards/selectors';
import { fetchCards } from 'redux/carCards/operations';
import { Loader } from 'components/parts/Loader/Loader';
import './Favorites.css';

import { Modal } from 'components/parts/Modal/Modal';
import { DetailedCard } from '../Catalog/DetailedCard/DetailedCard';
import img_empty from '../../images/favorite-empty-picture.jpg';

export const Favorites = () => {
  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => setShowModal(prevShowModal => !prevShowModal);
  let [loading, setLoading] = useState(false);

  const [cardToOpen, setCardToOpen] = useState([]);
  const [favorites, setFavorites] = useState([]);

  // get cars
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      dispatch(fetchCards());
    }, 1000);
  }, [dispatch]);

  useEffect(() => {}, [favorites]);

  // filter favorite list

  let savedFavorites = JSON.parse(localStorage.getItem('favoriteCars'));
  const list = useSelector(getAllCards);
  if (!savedFavorites) {
    savedFavorites = [];
  }
  let cardList = list.filter(card => savedFavorites.includes(card.id));

  const setFavorite = id => {
    setFavorites('id');
  };

  // modal for DetailedCard
  const openModal = card => {
    setCardToOpen(card);
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="Favorites__container">
      {savedFavorites.length > 0 ? (
        <>
          {loading ? (
            <Loader className="Catalog__loader" />
          ) : (
            <ul className="Catalog__list">
              {cardList.map((card, index) => {
                return (
                  <CardsItem
                    key={index}
                    card={card}
                    openModal={openModal}
                    setFavorite={setFavorite}
                  />
                );
              })}
            </ul>
          )}
        </>
      ) : (
        <div className="Favorites__empty">
          <img className="Favorites__placeholder" src={img_empty} alt="empty list" />
          <p className="Favorites__advice">Please return to Catalog and add a car to your Favorites</p>
        </div>
      )}

      {showModal && (
        <Modal onClose={toggleModal}>
          <DetailedCard closeModal={closeModal} card={cardToOpen} />
        </Modal>
      )}
    </div>
  );
};
