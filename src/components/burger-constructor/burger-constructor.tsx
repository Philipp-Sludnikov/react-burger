import React from 'react';
import PropTypes from 'prop-types';
import {ConstructorElement, DragIcon, CurrencyIcon, Button} from '@ya.praktikum/react-developer-burger-ui-components';
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

const BurgerConstructor = ({openModal}) => { 
    let undefined;
    return(<>
        <section className={'mb-10 ' +styles.burgerConstructorWrapper}>
        <ConstructorItemElement constructorItem={constructorItems[0]} />
            <section className={styles.unlockedWrapper}>
                {constructorItems.map((constructorItem, index) => 
                    (index !== 0 && index !== constructorItems.length-1) &&
                        <ConstructorItemElement constructorItem={constructorItem} key={constructorItem.id} />
                )}
            </section>
        <ConstructorItemElement constructorItem={constructorItems[constructorItems.length-1]} />
        </section>

        <section className={'pr-4 ' + styles.constructorTotal}>
            <ConstructorTotalPrice />
            <Button type="primary" size="large" onClick={() => openModal()}>Оформить заказ</Button>
        </section>
        </>
    );
}


ConstructorItem.propTypes = {
    locked: PropTypes.bool.isRequired,
    children: PropTypes.element.isRequired
}; 

ConstructorItemElement.propTypes = {
    constructorItem: PropTypes.shape({
        isLocked: PropTypes.bool.isRequired,
        type: PropTypes.string,
        text: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        thumbnail: PropTypes.string.isRequired
    }),
}

BurgerConstructor.propTypes = {
    openModal: PropTypes.func.isRequired
}

export default BurgerConstructor;