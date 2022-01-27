import PropTypes from 'prop-types';
import styles from './app.module.css';
import AppHeader from '..//app-header/app-header';
import { useEffect, useState } from 'react';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import loadingGear from '../../images/Gear.gif';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import OrderDetails from '../order-details/order-details';

  const API = 'https://norma.nomoreparties.space/api/ingredients/';

  const Loader = () => {
    return (
        <div className={styles.loader}>
            <img src={loadingGear} alt="Загрузка..." />
        </div>
    )
  }

  const Error = ({children, error}) => {
    return (
        <div className={styles.errorMessage}>
            <p>{children + ' (' + error + ')'}</p>
        </div>
    )
  }

  const App = () => {
    const [state, setState] = useState({
      isLoading: false,
      hasError: false,
      data: [],
      error: ''
    });

  const getProductData = async () => {
    setState({ ...state, hasError: false, isLoading: true });
    fetch(API)
      .then(res => res.json())
      .then(data => setState({ ...state, data: data.data, isLoading: false}))
      .catch(e => {
        setState({ ...state, error: e.message, hasError: true, isLoading: false });
      });
  };

  useEffect(() => { getProductData() }, []);

  const [selectedIngredient, setSelectedIngredient] = useState({});
  const [visibleIngredientModal, setVisibleIngredientModal] = useState(false);

  const [visibleOrderModal, setVisibleOrderModal] = useState(false);

  const openModalIngredient = (ingredient) => {
    setSelectedIngredient({...ingredient});
    setVisibleIngredientModal(true);
  }

  const closeModalIngredient = () => {
    setVisibleIngredientModal(false);
  }

  const openModalOrderDetails = () => {
    setVisibleOrderModal(true);
  }

  const closeModalOrderDetails = () => {
    setVisibleOrderModal(false);
  }

  return (
    <div>
      {state.isLoading && <Loader />}
      {state.hasError && <Error error={state.error}>При загрузке данных произошла ошибка, попробуйте перезайти в приложение</Error>}
      {!state.isLoading && !state.hasError &&
      <>
        {visibleIngredientModal &&
        <Modal header="Детали ингредиента" modalClose={closeModalIngredient}>
          <IngredientDetails {...selectedIngredient} />
        </Modal> 
        }

        {visibleOrderModal &&
        <Modal modalClose={closeModalOrderDetails}>
          <OrderDetails />
        </Modal> 
        }
        <AppHeader />
        <main className={styles.mainWrapper}>
          <h2 className={"text text_type_main-large mb-5 " + styles.mainTitle}>Соберите бургер</h2>
          <section className={styles.wrapperPart}>
            <BurgerIngredients ingredients={state.data} openModal={openModalIngredient}/>
          </section>
          <section className={'pl-4 ' + styles.wrapperPart}>
            <BurgerConstructor openModal={openModalOrderDetails} />
          </section>
        </main>
      </>
    }
    </div>
  );
}

Error.propTypes = {
  children: PropTypes.string.isRequired,
  error: PropTypes.string
};

export default App;
