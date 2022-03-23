import { ProfileNavigation } from '../profile-page/profile-page'
import styles from './orders-page.module.css';
import { FC } from 'react';

const OrdersPage: FC = () => {
  return (
    <section className={styles.profileWrapper}>
        <ProfileNavigation />
    </section>
  );  
}

export default OrdersPage;