import React from 'react';
import {BurgerIcon, ListIcon, ProfileIcon, Logo, MenuIcon, CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './app-header.module.css';
import mobilelogo from '../../images/logo-mobile.png';



function HeaderButton(props) {
    return (<button className={props.classes + ' ' + styles.headerButton}>
       {props.children}
    </button>)
};

class MobileHeader extends React.Component<{}, {opened: boolean}> {
    constructor(props) {
        super(props);
        this.state = {opened: false};
        this.changeOpenedStatus = this.changeOpenedStatus.bind(this);
    }

    changeOpenedStatus() {
        this.setState({opened: !this.state.opened})
    }
    render() {
        return(
            <header className={styles.mobileHeader + ' ' + (this.state.opened === true && styles.mobileHeaderFixed)}>
                {(this.state.opened === false) ? 
                (<><img src={mobilelogo} alt="Burger Mobile Logo" /> <MenuIcon type="primary" onClick={this.changeOpenedStatus} /></>) : 
                (<>
                    <span className='text text_type_main-medium'>Меню</span> <CloseIcon type="primary" onClick={this.changeOpenedStatus} />
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
}

class AppHeader extends React.Component {
    render() {
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
}

export default AppHeader;