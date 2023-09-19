import { CardsItem } from 'components/pages/Catalog/Cardsitem/CardsItem';
import React, { useEffect, useState } from 'react';
import './Catalog.css';
import { useDispatch, useSelector } from 'react-redux';
import {
  cardsInList,
  getAllCards,
  getCards,
} from '../../../redux/carCards/selectors';
import { fetchAllCards, fetchCards } from '../../../redux/carCards/operations';
import { Loader } from 'components/parts/Loader/Loader';
import { DetailedCard } from '../Catalog/DetailedCard/DetailedCard';
import { Modal } from '../../parts/Modal/Modal';
import { Filter } from '../../parts/Filter/Filter';

export const Catalog = () => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => setShowModal(prevShowModal => !prevShowModal);
  const [loading, setLoading] = useState(false);
  const [cardToOpen, setCardToOpen] = useState([]);
  const [isButtonVisible, setButtonVisibility] = useState('Catalog__btn--more');
  const [page, setPage] = useState(1);
  const [filterList, setFilterList] = useState([]);

  // get cards
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      dispatch(fetchCards(page));
      dispatch(fetchAllCards());
    }, 1000);
  }, []);

  let cardList = useSelector(getCards);
  const numberOfCards = useSelector(cardsInList);
  const allCardList = useSelector(getAllCards);

  // modal
  const openModal = card => {
    setCardToOpen(card);
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
  };

  // next page
  const getnextPage = e => {
    e.preventDefault();
    const pages = numberOfCards / 8;
    setPage(page + 1);
    dispatch(fetchCards(page + 1));
    if (page + 1 >= pages) {
      setButtonVisibility('Catalog__btn--unvisibil');
    } else {
      setButtonVisibility('Catalog__btn--more');
    }
  };

  // filter
  const filterCards = (Brands, Price, mileageFrom, mileageTo) => {
    let filterList = [];
    if (Brands) {
      filterList = allCardList.filter(item => item.make === Brands);
    } else {
      filterList = cardList;
    }
    if (Price) {
      filterList = filterList.filter(
        item => item.rentalPrice.replace(/\$/g, '') >= Price
      );
    }
    if (mileageFrom) {
      filterList = filterList.filter(
        item => mileageFrom >= item.mileage >= mileageTo
      );
    }
    console.log(filterList);
    setFilterList(filterList);
    setButtonVisibility('Catalog__btn--unvisibil');
  };

  // list of  brands
  const carBrands = [...new Set(cardList.map(car => car.make))];
  // input for prices
  const priceList = [
    ...new Set(cardList.map(car => car.rentalPrice.replace(/\$/g, ''))),
  ];
  const carPrice = priceList.sort((a, b) => {
    return parseInt(a, 10) - parseInt(b, 10);
  });

  const setFavorite = e => {};

  return (
    <div className="Catalog__container">
      <Filter
        carBrands={carBrands}
        carPrice={carPrice}
        filterCards={filterCards}
      />

      {loading ? (
        <Loader className="Catalog__loader" />
      ) : (
        <>
          <ul className="Catalog__list">
            {filterList.length >= 1 ? (
              <>
                {filterList.map((card, index) => {
                  return (
                    <CardsItem
                      key={index}
                      card={card}
                      openModal={openModal}
                      setFavorite={setFavorite}
                    />
                  );
                })}
              </>
            ) : (
              <>
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
              </>
            )}
          </ul>
          <button
            type="button"
            className={isButtonVisible}
            onClick={getnextPage}
          >
            Load more
          </button>
        </>
      )}

      {showModal && (
        <Modal onClose={toggleModal}>
          <DetailedCard closeModal={closeModal} card={cardToOpen} />
        </Modal>
      )}
    </div>
  );
};
