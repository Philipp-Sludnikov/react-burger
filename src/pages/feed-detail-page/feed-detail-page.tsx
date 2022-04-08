import styles from './feed-detail-page.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { FC, useEffect } from 'react';
import { useParams } from 'react-router';
import { IngredientListProps, TFeedOrder } from '../../services/types/feed-types';
import { useDispatch, useSelector } from 'react-redux';
import { wsConnectionStart, wsConnectionClose } from '../../services/actions/websocket';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import isToday from 'dayjs/plugin/isToday';
import isYesterday from 'dayjs/plugin/isYesterday';
import 'dayjs/locale/ru';
import { TIngredient } from '../../services/types/burger-ingredients-types';
import { AppDispatch, AppThunk, RootState } from '../../services/types/types';
import { WS_API_URL } from '../../utils/api';
dayjs.extend(relativeTime);
dayjs.extend(isToday);
dayjs.extend(isYesterday);
dayjs.locale('ru');

const IngredientList: FC<IngredientListProps> = ({ingredients}) => {

  const ingrNotDuplicate: Array<TIngredient> = ingredients.filter((item, index) => ingredients.indexOf(item) === index);

  const getCountIngredient = (ingredientID: string): number => {
    let count = 0;
    ingredients.map(function(ingredient) {
      if(ingredient.type === 'bun') {
        if(ingredient._id === ingredientID) {
          count = 2;
        }
      } else {
        if(ingredient._id === ingredientID) {
          count++;
        }
      }
    });
    return count;
  }

  return(
    <ul className={`mb-10 ${styles.ingredientList}`}>
    {ingrNotDuplicate.map((ingredient, index) => (
     <li className={`mb-4 ${styles.ingredientListItem}`} key={index}>
        <section className={`mr-4 ${styles.ingredientListImage}`}><img src={ingredient.image_mobile} alt={ingredient.name} /></section>
        <p className={`text text_type_main-default pt-4 pb-4 mr-4 ${styles.ingredientListTitle}`}>{ingredient.name}</p>
        <section className={styles.ingredientListPrice}><span className='text text_type_digits-default'>{getCountIngredient(ingredient._id)} x {ingredient.price}</span> <CurrencyIcon type="primary" /></section>
      </li>)
      )}
    </ul>
  );
}

export const FeedDetails: FC = () => {

  const { id } = useParams<{id: string}>();
  const feedOrders: Array<TFeedOrder> = useSelector((store: RootState) => store.websocketReducer.feedOrders);
  const ingredients: Array<TIngredient> = useSelector((store:RootState) => store.ingredients.ingredients);
 
  const currentOrder = feedOrders.filter((order) => order._id === id)[0];
  
  let status: string = '';
  let calendarTime: string = '';
  let orderIngredients: Array<TIngredient> = [];
  let totalPrice:number = 0;

  if(currentOrder) {
    if(currentOrder.status === 'created') {
      status = 'Создан';
    } else if(currentOrder.status === 'pending') {
      status = 'В работе';
    } else if(currentOrder.status === 'done') {
      status = 'Выполнен';
    }

    if(dayjs(currentOrder.createdAt).isToday()) {
      calendarTime = 'Сегодня';
    } else if(dayjs(currentOrder.createdAt).isYesterday()) {
      calendarTime = 'Вчера';
    } else {
      calendarTime = dayjs(currentOrder.createdAt).fromNow();
    }

    const bunIngredient = ingredients.filter((ingredient: TIngredient) => (currentOrder.ingredients.includes(ingredient._id) && ingredient.type === 'bun'))[0];
    if(bunIngredient) {
      orderIngredients.push(bunIngredient);
    }
  
    currentOrder.ingredients.forEach(function(ordIngredient) {
      const findIngredient = ingredients.filter((ingr) => (ingr._id === ordIngredient && ingr.type != 'bun'))[0];
      if(findIngredient) {
        orderIngredients.push(findIngredient);
      }
    });

    totalPrice = orderIngredients.reduce(
      function(price: number, ingredient: TIngredient) {
        if(ingredient.type === 'bun') {
          return price + ingredient.price * 2;
        } else {
          return price + ingredient.price;
        }
    }, 0);
  }

  return (
    <section className={styles.detailOrderInfo}>
    <p className={`text text_type_digits-default mb-10 ${styles.orderNumber}`}>#{currentOrder?.number}</p>
    <p className="text text_type_main-medium mb-3">{currentOrder?.name}</p>
    <p className={`text text_type_main-default mb-15 ${styles.orderStatus}`}>{status}</p>
    <p className="text text_type_main-medium mb-6">Состав:</p>
    <IngredientList ingredients={orderIngredients} />
    <section className={styles.feedDetailTimePrice}>
      <p className="text text_type_main-default text_color_inactive">{calendarTime}, {dayjs(currentOrder?.createdAt).format('HH:mm')} i-GMT+3</p>
      <p className={styles.feedDetailTotalPrice}><span className='text text_type_digits-default'>{totalPrice}</span> <CurrencyIcon type="primary" /></p>
    </section>
  </section>
  );
}

const FeedDetailPage: FC = () => {
  const dispatch = useDispatch<AppDispatch | AppThunk>();
  
  useEffect(() => {
    dispatch(wsConnectionStart(`${WS_API_URL}/orders/all`));
    return () => {
      dispatch(wsConnectionClose());
    }
  },
  [dispatch]
);

  return (
    <main className={styles.feedDetailWrapper}>
      <FeedDetails />
    </main>
  );  
}

export default FeedDetailPage;