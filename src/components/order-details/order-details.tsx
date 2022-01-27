import styles from './order-details.module.css';
import DoneIcon from '../../images/done.png';


const OrderDetails = () => {
    return(
      <>
        <section className={"text text_type_digits-large mt-8 mb-8 " + styles.orderNum}>034536</section>
        <section className="text text_type_main-medium mb-15">идентификатор заказа</section>
        <section className="mb-15"><img src={DoneIcon} alt="Заказ подготовлен" /></section>
        <section className="text text_type_main-default mb-2">Ваш заказ начали готовить</section>
        <section className="text text_type_main-default text_color_inactive mb-20">Дождитесь готовности на орбитальной станции</section>
      </>
      );
}

export default OrderDetails;