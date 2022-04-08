import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router';
import { wsConnectionClose, wsConnectionStart } from '../../services/actions/websocket';
import { TFeedOrder, TProfileFeedOrdersProps } from '../../services/types/feed-types';
import { getCookie } from '../../utils/cookie';
import { ProfileNavigation } from '../profile-page/profile-page';
import styles from './orders-page.module.css';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import isToday from 'dayjs/plugin/isToday';
import isYesterday from 'dayjs/plugin/isYesterday';
import 'dayjs/locale/ru';
import { TIngredient } from '../../services/types/burger-ingredients-types';
import { WS_API_URL } from '../../utils/api';
import { AppDispatch, AppThunk, RootState } from '../../services/types/types';
dayjs.extend(relativeTime);
dayjs.extend(isToday);
dayjs.extend(isYesterday);
dayjs.locale('ru');


const ProfileFeedOrder: FC<TProfileFeedOrdersProps> = ({order}) => {
  const history = useHistory();
  const location = useLocation();
  const ingredients: Array<TIngredient> = useSelector((store:RootState) => store.ingredients.ingredients);
  
  const openModal = (id: string) => {
    history.push(`/profile/orders/${id}`, {background: location});
  }

  let calendarTime: string = '';
  let status: string = '';
  let statusStyle = {color: '#fff'};
  if(dayjs(order.createdAt).isToday()) {
    calendarTime = 'Сегодня';
  } else if(dayjs(order.createdAt).isYesterday()) {
    calendarTime = 'Вчера';
  } else {
    calendarTime = dayjs(order.createdAt).fromNow();
  }

  if(order.status === 'created') {
    status = 'Создан';
    statusStyle = {color: '#fff'}
  } else if(order.status === 'pending') {
    status = 'Готовится';
    statusStyle = {color: '#fff'}
  } else if(order.status === 'done') {
    status = 'Выполнен';
    statusStyle = {color: '#00CCCC'}
  }

  let orderIngredients: Array<TIngredient> = [];

  const bunIngredient = ingredients.filter((ingredient: TIngredient) => (order.ingredients.includes(ingredient._id) && ingredient.type === 'bun'))[0];
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
    function(price: number, ingredient: TIngredient) {
      if(ingredient.type === 'bun') {
        return price + ingredient.price * 2;
      } else {
        return price + ingredient.price;
      }
  }, 0);

  return (<li className={`p-6 mb-4 ${styles.profileFeedOrder}`} onClick={() => openModal(order._id)}>
    <p className={`text text_type_digits-default mb-6 ${styles.numberTime}`}>
      <span className={styles.orderNumber}>#{order.number}</span>
      <span className={`text text_type_main-default text_color_inactive ${styles.orderTime}`}>{calendarTime}, {dayjs(order.createdAt).format('HH:mm')} i-GMT+3</span>
    </p>
    <p className={`text text_type_main-medium mb-2`}>{order.name}</p>
    <p className={`text text_type_main-default mb-6`} style={statusStyle}>{status}</p>
    <section className={styles.orderIngredientsWrapper}>
      <ul className={styles.orderIngredients}>
        {orderIngredients.map((ingredient: TIngredient, index: number) => ( index < 5 &&
          <li className={styles.orderIngredient} key={index}><img src={ingredient.image_mobile} alt={ingredient.name} /></li>))
        }
        {orderIngredients.length > 5 && (
          <li className={styles.orderIngredientLast}>
            <img src={orderIngredients[5].image_mobile} alt={orderIngredients[5].name} />
            <p className={`text text_type_main-default ${styles.additionalIngredients}`}>+{orderIngredients.length - 4}</p>
          </li>)}
      </ul>
      <p className={`text text_type_digits-default ${styles.orderTotalPrice}`}><CurrencyIcon type="primary" /> {totalPrice}</p>
    </section>
  </li>);
}

const ProfileFeedOrders: FC = () => {
  
  const dispatch = useDispatch<AppDispatch | AppThunk>();
  let token: string | undefined = getCookie('accessToken');
  if(token?.indexOf('Bearer') !== -1) {
    token = token?.split(' ')[1];
  }

  const feedOrders: Array<TFeedOrder> = useSelector((store: RootState) => store.websocketReducer.feedOrders.reverse());

  useEffect(() => {
      dispatch(wsConnectionStart(`${WS_API_URL}/orders?token=${token}`));
      return () => {
        dispatch(wsConnectionClose());
      }
    },
    [dispatch]
  );

  return(
    <ul className={styles.profileFeedWrapper}>
      {feedOrders.map((order: TFeedOrder) => (<ProfileFeedOrder order={order} key={order._id}/>))}
    </ul>
  );
}

const OrdersPage: FC = () => {
  return (
    <section className={styles.profileWrapper}>
        <ProfileNavigation />
        <ProfileFeedOrders />
    </section>
  );  
}

export default OrdersPage;