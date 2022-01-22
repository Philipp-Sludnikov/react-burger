import React from 'react';
import PropTypes from 'prop-types';
import {ConstructorElement, DragIcon, CurrencyIcon, Button} from '@ya.praktikum/react-developer-burger-ui-components';
import bun02 from '../../images/ingredients/bun-02.png';
import sauce03 from '../../images/ingredients/sauce-03.png';
import meat02 from '../../images/ingredients/meat-02.png';
import sp01 from '../../images/ingredients/sp-1.png';
import mineralrings from '../../images/ingredients/mineral-rings.png';
import styles from './burger-constructor.module.css';
import constructorItems from '../../utils/data-constructor.json';


const ConstructorTotalPrice = () => {
    return(
            <section className={'mr-10 ' + styles.totalPrice}>
                <span className='text text_type_digits-medium'>610</span> <CurrencyIcon type="primary" />
            </section>
    );
}

const ConstructorItem = (props) => {
    return(
            <section className={(props.locked === true ? 'pl-8 pr-4 ' : 'pr-2 ') + styles.constructorItem}>
                {!props.locked && <section className={styles.draggableIcon}><DragIcon type="primary" /></section>} {props.children}
            </section>
    );
}

const ConstructorItemElement = (props) => {
    return(
        <ConstructorItem locked={props.constructorItem.isLocked}>
        <ConstructorElement
            type={typeof props.constructorItem.type === "undefined" ? undefined : props.constructorItem.type}
            isLocked={props.constructorItem.isLocked}
            text={props.constructorItem.text}
            price={props.constructorItem.price}
            thumbnail={props.constructorItem.thumbnail}
        />
        </ConstructorItem>
    );
}

const BurgerConstructor = () => { 
    let undefined;
    return(<>
        <section className={'mb-10 ' +styles.burgerConstructorWrapper}>
        <ConstructorItemElement constructorItem={constructorItems[0]} />
            <section className={styles.unlockedWrapper}>
                {constructorItems.map((constructorItem, index) => 
                    <ConstructorItemElement constructorItem={constructorItem} key={constructorItem.id} />
                )}
            </section>
        <ConstructorItemElement constructorItem={constructorItems[constructorItems.length-1]} />
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

ConstructorItemElement.propTypes = {
    constructorItem:PropTypes.object
}

export default BurgerConstructor;