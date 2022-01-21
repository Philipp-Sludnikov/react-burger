import React from 'react';
import PropTypes from 'prop-types';
import {ConstructorElement, DragIcon, CurrencyIcon, Button} from '@ya.praktikum/react-developer-burger-ui-components';
import bun02 from '../../images/ingredients/bun-02.png';
import sauce03 from '../../images/ingredients/sauce-03.png';
import meat02 from '../../images/ingredients/meat-02.png';
import sp01 from '../../images/ingredients/sp-1.png';
import mineralrings from '../../images/ingredients/mineral-rings.png';
import styles from './burger-constructor.module.css';


const ConstructorTotalPrice = () => {
    return(
        <>
            <section className={'mr-10 ' + styles.totalPrice}>
                <span className='text text_type_digits-medium'>610</span> <CurrencyIcon type="primary" />
            </section>
        </>
    );
}

const ConstructorItem = (props) => {
    return(
        <>
            <section className={(props.locked === true ? 'pl-8 pr-4 ' : 'pr-2 ') + styles.constructorItem}>
                {!props.locked && <section className={styles.draggableIcon}><DragIcon type="primary" /></section>} {props.children}
            </section>
        </>
    );
}

const BurgerConstructor = () => { 
    return(<>
        <section className={'mb-10 ' +styles.burgerConstructorWrapper}>
            <ConstructorItem locked={true}>
                <ConstructorElement
                    type="top"
                    isLocked={true}
                    text="Краторная булка N-200i (верх)"
                    price={20}
                    thumbnail={bun02}
                />
            </ConstructorItem>

            <section className={styles.unlockedWrapper}>
            <ConstructorItem locked={false}>
                <ConstructorElement
                    text="Соус традиционный галактический"
                    price={30}
                    thumbnail={sauce03}
                />
            </ConstructorItem>

            <ConstructorItem locked={false}>
                <ConstructorElement
                    text="Мясо бессмертных моллюсков Protostomia"
                    price={300}
                    thumbnail={meat02}
                />
            </ConstructorItem>

            <ConstructorItem locked={false}>
                <ConstructorElement
                    text="Мясо бессмертных моллюсков Protostomia"
                    price={300}
                    thumbnail={meat02}
                />
            </ConstructorItem>

            <ConstructorItem locked={false}>
                <ConstructorElement
                    text="Плоды Фалленианского дерева"
                    price={80}
                    thumbnail={sp01}
                />
            </ConstructorItem>

            <ConstructorItem locked={false}>
                <ConstructorElement
                    text="Плоды Фалленианского дерева"
                    price={80}
                    thumbnail={sp01}
                />
            </ConstructorItem>
            
            <ConstructorItem locked={false}>
                <ConstructorElement
                    text="Хрустящие минеральные кольца"
                    price={80}
                    thumbnail={mineralrings}
                />
            </ConstructorItem>

            <ConstructorItem locked={false}>
                <ConstructorElement
                    text="Хрустящие минеральные кольца"
                    price={80}
                    thumbnail={mineralrings}
                />
            </ConstructorItem>
            </section>

            <ConstructorItem locked={true}>
                <ConstructorElement
                    type="bottom"
                    isLocked={true}
                    text="Краторная булка N-200i (верх)"
                    price={20}
                    thumbnail={bun02}
                />
            </ConstructorItem>
        </section>

        <section className={'pr-4 ' + styles.constructorTotal}>
            <ConstructorTotalPrice />
            <Button type="primary" size="large">Оформить заказ</Button>
        </section>
        </>
    );
}


ConstructorItem.propTypes = {
    locked: PropTypes.bool,
    children: PropTypes.element
  }; 

export default BurgerConstructor;