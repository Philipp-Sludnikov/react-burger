import { ProfileNavigation } from '../profile-page/profile-page'
import styles from './orders-page.module.css';

const OrdersPage= () => {
  return (
    <section className={styles.profileWrapper}>
        <ProfileNavigation />
    </section>
  );  
}

export default OrdersPage;