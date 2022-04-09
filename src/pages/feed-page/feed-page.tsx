import styles from './feed-page.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useHistory, useLocation } from 'react-router-dom';
import { FC, useEffect } from 'react';
import { wsConnectionStart, wsConnectionClose } from '../../services/actions/websocket';
import { TFeedOrderProps, TOrderListProps, TOrderTotalsProps } from '../../services/types/feed-types';
import { TIngredient } from '../../services/types/burger-ingredients-types';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import isToday from 'dayjs/plugin/isToday';
import isYesterday from 'dayjs/plugin/isYesterday';
import 'dayjs/locale/ru';
import { WS_API_URL } from '../../utils/api';
import { useAppDispatch, useAppSelector } from '../../services/hooks';
dayjs.extend(relativeTime);
dayjs.extend(isToday);
dayjs.extend(isYesterday);
dayjs.locale('ru');

const FeedOrder: FC<TFeedOrderProps> = ({order}) => {

  const history = useHistory();
  const location = useLocation();

  const ingredients = useAppSelector(store => store.ingredients.ingredients);

  let orderIngredients: Array<TIngredient> = [];

  const bunIngredient = ingredients.filter(ingredient => (order.ingredients.includes(ingredient._id) && ingredient.type === 'bun'))[0];
  if(bunIngredient) {
    orderIngredients.push(bunIngredient);
  }

  order.ingredients.forEach(function(ordIngredient) {
    const findIngredient = ingredients.filter((ingr) => (ingr._id === ordIngredient && ingr.type != 'bun'))[0];
    if(findIngredient) {
      orderIngredients.push(findIngredient);
    }
  });

  const totalPrice:number = orderIngredients.reduce(
    function(price, ingredient) {
      if(ingredient.type === 'bun') {
        return price + ingredient.price * 2;
      } else {
        return price + ingredient.price;
      }
  }, 0);

  let calendarTime: string = '';
  if(dayjs(order.createdAt).isToday()) {
    calendarTime = 'Сегодня';
  } else if(dayjs(order.createdAt).isYesterday()) {
    calendarTime = 'Вчера';
  } else {
    calendarTime = dayjs(order.createdAt).fromNow();
  }


  const openModal = (id: string) => {
    history.push(`/feed/${id}`, {background: location});
  }

  return (<li className={`p-6 mb-4 ${styles.feedOrder}`} onClick={() => openModal(order._id)}>
    <p className={`text text_type_digits-default mb-6 ${styles.numberTime}`}>
      <span className={styles.orderNumber}>#{order.number}</span>
      <span className={`text text_type_main-default text_color_inactive ${styles.orderTime}`}>
        {calendarTime}, {dayjs(order.createdAt).format('HH:mm')} i-GMT+3
        </span>
    </p>
    <p className={`text text_type_main-medium mb-6`}>{order.name}</p>
    <section className={styles.orderIngredientsWrapper}>
      <ul className={styles.orderIngredients}>
        {orderIngredients.map((ingredient, index) => ( index < 5 &&
          <li className={styles.orderIngredient} key={index}><img src={ingredient.image_mobile} alt={ingredient.name} /></li>))
        }
        {orderIngredients.length > 5 && (
          <li className={styles.orderIngredientLast}>
            <img src={orderIngredients[5].image_mobile} alt={orderIngredients[5].name} />
            <p className={`text text_type_main-default ${styles.additionalIngredients}`}>+{orderIngredients.length - 4}</p>
          </li>)}
      </ul>
      <p className={`text text_type_digits-default ${styles.orderTotalPrice}`}><CurrencyIcon type="primary" />{totalPrice}</p>
    </section>
  </li>);
}

const OrderList: FC<TOrderListProps> = ({orders}) => {

  return (
    <section className={styles.orderListWrapper}>
      <ul className={styles.listOfOrders}>
        {orders.map(order => (<FeedOrder order={order} key={order._id}/>))}
        
      </ul>
  </section>
  );
}
const OrderTotals: FC<TOrderTotalsProps> = ({orders}) => {
  const total = useAppSelector(store => store.websocketReducer.total);
  const totalToday = useAppSelector(store => store.websocketReducer.totalToday);

  return (<>
    <section className={`mb-6 ${styles.orderStatuses}`}>
      <section className={styles.orderStatusDone}>
        <p className="text text_type_main-medium mb-6">Готовы:</p>
        <ul className={styles.statusList}>
          {orders.map((order, index) => order.status === 'done' && (
            <li key={index}><p className={`text text_type_digits-default mb-2 ${styles.doneStatusItem}`}>{order.number}</p></li>
          ))}
        </ul>
      </section>
      <section className={styles.orderStatusInWork}>
        <p className="text text_type_main-medium mb-6">В работе:</p>
        <ul className={styles.statusList}>
        {orders.map((order, index) => order.status === 'pending' && (
            <li key={index}><p className={`text text_type_digits-default mb-2 ${styles.inWorkStatusItem}`}>{order.number}</p></li>
        ))}
        </ul>
      </section>
    </section>

    <section className='mb-6'>
      <p className="text text_type_main-medium">Выполнено за все время:</p>
      <p className={`text text_type_digits-large ${styles.totalDigits}`}>{total}</p>
    </section>

    <section>
      <p className="text text_type_main-medium">Выполнено за сегодня:</p>
      <p className={`text text_type_digits-large ${styles.totalDigits}`}>{totalToday}</p>
    </section>
  </>);
}

const FeedPage: FC = () => {
  const dispatch = useAppDispatch();
  const feedOrders = useAppSelector(store => store.websocketReducer.feedOrders);

  useEffect(() => {
      dispatch(wsConnectionStart(`${WS_API_URL}/orders/all`));
      return () => {
        dispatch(wsConnectionClose());
      }
    },
    [dispatch]
  );
  
  return (
    <main className={styles.feedWrapper}>
      <h2 className={`text text_type_main-large ${styles.heading}`}>Лента заказов</h2>
      <section className={styles.orderList}>
        <OrderList orders={feedOrders} />
      </section>
      <section className={styles.orderTotals}>
        <OrderTotals orders={feedOrders} />
      </section>
    </main>
  );  
}

export default FeedPage;

