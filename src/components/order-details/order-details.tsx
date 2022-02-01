import styles from './order-details.module.css';
import DoneIcon from '../../images/done.png';
import PropTypes from 'prop-types';

const OrderDetails = (props) => {
    return(
      <>
        {!props.error ? 
        <>
        <p className={"text text_type_digits-large mt-8 mb-8 " + styles.orderNum}>{props.number}</p>
        <p className="text text_type_main-medium mb-15">идентификатор заказа</p>
        <p className="mb-15"><img src={DoneIcon} alt="Заказ подготовлен" /></p>
        <p className="text text_type_main-default mb-2">Ваш заказ начали готовить</p>
        <p className="text text_type_main-default text_color_inactive mb-20">Дождитесь готовности на орбитальной станции</p>
        </> : 
        <p className="text text_type_main-medium mb-15">Оформление заказа завершилось ошибкой!</p>
      }
      </>
      );
}

OrderDetails.propTypes = {
    number: PropTypes.number,
    error: PropTypes.bool.isRequired
}; 

export default OrderDetails;