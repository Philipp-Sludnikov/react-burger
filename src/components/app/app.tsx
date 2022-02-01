import PropTypes from 'prop-types';
import styles from './app.module.css';
import AppHeader from '..//app-header/app-header';
import { useEffect, useState, useReducer } from 'react';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import loadingGear from '../../images/Gear.gif';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import OrderDetails from '../order-details/order-details';
import constructorItems from '../../utils/data-constructor.json';
import { ConstructorContext } from '../../services/constructorContext';

  const ingredientAPI = 'https://norma.nomoreparties.space/api/ingredients/';
  const orderAPI = 'https://norma.nomoreparties.space/api/orders';

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

  const checkResponse = (res) => {
    
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка ${res.status}`);

  }

  const initialTotalPrice = 0;
  
  const setTotalPrice = () => {
    let sum = constructorItems.reduce(function (sum, currentValue) {
      return sum + (currentValue.price * (currentValue.type === 'bun' ? 2 : 1));
      }, 0);
    return sum;
  }

  const [totalPrice, calcTotalPrice] = useReducer(setTotalPrice, initialTotalPrice, undefined);

  const getProductData = async () => {
    setState({ ...state, hasError: false, isLoading: true });
    fetch(ingredientAPI)
      .then(checkResponse)
      .then(data => setState({ ...state, data: data.data, isLoading: false}))
      .catch(e => {
        setState({ ...state, error: e.message, hasError: true, isLoading: false });
      });
  };

  useEffect(() => { getProductData() }, []);
  useEffect(() => { calcTotalPrice() }, [constructorItems]);

  const [selectedIngredient, setSelectedIngredient] = useState({});
  const [visibleIngredientModal, setVisibleIngredientModal] = useState(false);

  const [orderInfo, setOrderInfo] = useState({
    error: false,
    textError: '',
    orderBody: {}
  });
  const [visibleOrderModal, setVisibleOrderModal] = useState(false);

  const openModalIngredient = (ingredient) => {
    setSelectedIngredient({...ingredient});
    setVisibleIngredientModal(true);
  }

  const closeModalIngredient = () => {
    setVisibleIngredientModal(false);
  }

  const openModalOrderDetails = () => {
    getOrderData();
    setVisibleOrderModal(true);
  }

  const closeModalOrderDetails = () => {
    setVisibleOrderModal(false);
  }

  const getOrderData = async () => {
    let bunID = '';
    const ingredientsIDs = constructorItems.map(function(el) {
      if(el.type !== 'bun') {
        return el._id;
      } else {
        bunID = el._id;
        return el._id;
      }
    });

    if(bunID !== '') {
      ingredientsIDs.push(bunID);
    }

    const ingredientsReq = {
      'ingredients': ingredientsIDs
    }
    fetch(orderAPI, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(ingredientsReq)
    })
      .then(checkResponse)
      .then(data => setOrderInfo({...orderInfo, error: false, orderBody: data.order}))
      .catch(e => {
        setOrderInfo({error: true, textError: e.message, orderBody: {} });
      });
  };

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

        {visibleOrderModal  &&
          <Modal modalClose={closeModalOrderDetails} >
            <OrderDetails {...orderInfo.orderBody} error={orderInfo.error}/>
          </Modal> 
        }
        <AppHeader />
        <main className={styles.mainWrapper}>
          <h2 className={"text text_type_main-large mb-5 " + styles.mainTitle}>Соберите бургер</h2>
          <section className={styles.wrapperPart}>
            <BurgerIngredients ingredients={state.data} openModal={openModalIngredient}/>
          </section>
          <section className={'pl-4 ' + styles.wrapperPart}>
            <ConstructorContext.Provider value={constructorItems}>
              <BurgerConstructor openModal={openModalOrderDetails} totalPrice={totalPrice}/>
            </ConstructorContext.Provider>
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
