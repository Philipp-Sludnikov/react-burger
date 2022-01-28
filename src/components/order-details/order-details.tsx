import styles from './order-details.module.css';
import DoneIcon from '../../images/done.png';


const OrderDetails = () => {
    return(
      <>
        <p className={"text text_type_digits-large mt-8 mb-8 " + styles.orderNum}>034536</p>
        <p className="text text_type_main-medium mb-15">идентификатор заказа</p>
        <p className="mb-15"><img src={DoneIcon} alt="Заказ подготовлен" /></p>
        <p className="text text_type_main-default mb-2">Ваш заказ начали готовить</p>
        <p className="text text_type_main-default text_color_inactive mb-20">Дождитесь готовности на орбитальной станции</p>
      </>
      );
}

export default OrderDetails;