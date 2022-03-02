import PropTypes from 'prop-types';
import styles from './constructor-page.module.css';
import AppHeader from '../../components/app-header/app-header';
import BurgerIngredients from '../../components/burger-ingredients/burger-ingredients';
import BurgerConstructor from '../../components/burger-constructor/burger-constructor';
import loadingGear from '../../images/Gear.gif';
import Modal from '../../components/modal/modal';
import IngredientDetails from '../../components/ingredient-details/ingredient-details';
import OrderDetails from '../../components/order-details/order-details';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { closeModalIngredient, closeModalOrder } from '../../services/actions/index';

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

  const ConstructorPage = () => {

  const { ingredientsRequest, ingredientsFailed, ingredientsError } = useSelector((store: RootStateOrAny) => store.ingredients);
  const { visibleModalOrder, orderInfo, orderInfoFailed, orderInfoRequest } = useSelector((store: RootStateOrAny) => store.modalOrder);


  const dispatch = useDispatch();

  return (
    <div>
      {ingredientsRequest || orderInfoRequest && <Loader />}
      {ingredientsFailed ? <Error error={ingredientsError}>При загрузке данных произошла ошибка, попробуйте перезайти в приложение</Error> :
      <>
        {visibleModalOrder  &&
          <Modal modalClose={() => dispatch(closeModalOrder())} >
            <OrderDetails {...orderInfo} error={orderInfoFailed}/>
          </Modal> 
        }
        <AppHeader />
        <main className={styles.mainWrapper}>
          <h2 className={"text text_type_main-large mb-5 " + styles.mainTitle}>Соберите бургер</h2>
          <DndProvider backend={HTML5Backend}>
            <section className={styles.wrapperPart}>
              <BurgerIngredients />
            </section>
            <section className={'pl-4 ' + styles.wrapperPart}>
                <BurgerConstructor />
            </section>
          </DndProvider>
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

export default ConstructorPage;
