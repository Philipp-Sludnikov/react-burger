import {useState} from 'react';
import PropTypes from 'prop-types';
import {BurgerIcon, ListIcon, ProfileIcon, Logo, MenuIcon, CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './app-header.module.css';
import mobilelogo from '../../images/logo-mobile.png';



const HeaderButton = (props) => {
    return (
    <button className={props.classes + ' ' + styles.headerButton}>
       {props.children}
    </button>)
};

const MobileHeader = () => {
    const [opened, setOpened] = useState(false);
    return(
        <header className={styles.mobileHeader + ' ' + (opened === true && styles.mobileHeaderFixed)}>
            {(opened === false) ? 
            (<><img src={mobilelogo} alt="Burger Mobile Logo" /> <MenuIcon type="primary" onClick={() => setOpened(!opened)} /></>) : 
            (<>
                <span className='text text_type_main-medium'>Меню</span> <CloseIcon type="primary" onClick={() => setOpened(!opened)} />
                <ul className={styles.mobileNav}>
                    <li className={styles.mobileNavItem}><a href="#" className={'text text_type_main-small ' + styles.mobileNavRef + ' ' + styles.mobileNavRefActive}><ProfileIcon type="primary" /> <span className={styles.mobileNavRefText}>Личный кабинет</span></a></li>
                    <li className={styles.mobileNavItem}><a href="#" className={'text text_type_main-small ' + styles.mobileNavRef}><BurgerIcon type="secondary" /> <span className={styles.mobileNavRefText}>Конструктор бургеров</span></a></li>
                    <li className={styles.mobileNavItem}><a href="#" className={'text text_type_main-small ' + styles.mobileNavRef}><ListIcon type="secondary" /> <span className={styles.mobileNavRefText}>Лента заказов</span></a></li>
                </ul>
            </>)
            }
        </header>
    )
}

const AppHeader = () => {
    return(<>
        <header className={'p-4' + ' ' + styles.topHeader}>
            <nav className={styles.topNav}>
                <section className={styles.buttonsContainer}>
                    <HeaderButton classes='pt-4 pr-4 pb-4'>
                        <BurgerIcon type="primary" /> <span className={'ml-2' + ' ' +styles.buttonTitle}>Конструктор</span>
                    </HeaderButton>
                    <HeaderButton classes='p-4'>
                        <ListIcon type="secondary" /> <span className={'ml-2 '+ styles.buttonTitle  + ' ' + styles.inactive}>Лента заказов</span>
                    </HeaderButton>
                </section>
                <section className={styles.logoContainer}>
                    <Logo />
                </section>
                <section className={styles.buttonsContainer + ' ' + styles.rightButtonsContainer}>
                    <HeaderButton classes='pt-4 pl-4 pb-4'>
                        <ProfileIcon type="secondary" /> <span className={'ml-2 '+styles.buttonTitle + ' ' + styles.inactive}>Личный кабинет</span>
                    </HeaderButton>
                </section>
            </nav>
        </header>
        <MobileHeader />
        </>
    );
}

HeaderButton.propTypes = {
    classes: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired
}

export default AppHeader;