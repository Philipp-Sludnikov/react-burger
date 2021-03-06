import {useState, FC} from 'react';
import {BurgerIcon, ListIcon, ProfileIcon, Logo, MenuIcon, CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './app-header.module.css';
import mobilelogo from '../../images/logo-mobile.png';
import { NavLink } from 'react-router-dom';

type THeaderButton = {
    classes: string
}

const HeaderButton: FC<THeaderButton> = (props) => {
    return (
    <button className={props.classes + ' ' + styles.headerButton}>
       {props.children}
    </button>)
};

const MobileHeader = () => {
    const [opened, setOpened] = useState<boolean>(false);
    return(
        <header className={styles.mobileHeader + ' ' + (opened === true && styles.mobileHeaderFixed)}>
            {(opened === false) ? 
            (<><a href="/"><img src={mobilelogo} alt="Burger Mobile Logo" /> <MenuIcon type="primary" onClick={() => setOpened(!opened)} /></a></>) : 
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
                        <NavLink exact to={{ pathname: '/' }} className={`text_color_inactive ${styles.navigationLink}`} activeClassName={styles.activeNavigationLink}><BurgerIcon type="primary" /> <span className='ml-2'>Конструктор</span></NavLink>
                    </HeaderButton>
                    <HeaderButton classes='p-4'>
                        <NavLink exact to='/feed' className={`text_color_inactive ${styles.navigationLink}`} activeClassName={styles.activeNavigationLink}><ListIcon type="secondary" /> <span className='ml-2'>Лента заказов</span></NavLink>
                    </HeaderButton>
                </section>
                <section className={styles.logoContainer}>
                    <a href="/"><Logo /></a>   
                </section>
                <section className={styles.buttonsContainer + ' ' + styles.rightButtonsContainer}>
                    <HeaderButton classes='pt-4 pl-4 pb-4'>
                        <NavLink to='/profile' className={`text_color_inactive ${styles.navigationLink}`} activeClassName={styles.activeNavigationLink} strict><ProfileIcon type="secondary" /> <span className='ml-2' >Личный кабинет</span></NavLink>
                    </HeaderButton>
                </section>
            </nav>
        </header>
        <MobileHeader />
        </>
    );
}

export default AppHeader;