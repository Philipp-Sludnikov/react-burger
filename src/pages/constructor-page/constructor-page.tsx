import styles from './constructor-page.module.css';
import BurgerIngredients from '../../components/burger-ingredients/burger-ingredients';
import BurgerConstructor from '../../components/burger-constructor/burger-constructor';
import loadingGear from '../../images/Gear.gif';
import Modal from '../../components/modal/modal';
import OrderDetails from '../../components/order-details/order-details';
import { FC } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { closeModalOrder } from '../../services/actions/index';
import { TErrorProps } from '../../services/types/pages-types';
import { useAppDispatch, useAppSelector } from '../../services/hooks';

  const Loader: FC = () => {
    return (
        <div className={styles.loader} data-element="loader">
            <img src={loadingGear} alt="Загрузка..." />
        </div>
    )
  }

  const Error: FC<TErrorProps> = ({children, error}) => {
    return (
        <div className={styles.errorMessage}>
            <p>{children + ' (' + error + ')'}</p>
        </div>
    )
  }

  const ConstructorPage: FC = () => {

  const { ingredientsRequest, ingredientsFailed, ingredientsError } = useAppSelector(store => store.ingredients);
  const { visibleModalOrder, orderInfo, orderInfoFailed, orderInfoRequest } = useAppSelector(store => store.modalOrder);


  const dispatch = useAppDispatch();

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

export default ConstructorPage;
