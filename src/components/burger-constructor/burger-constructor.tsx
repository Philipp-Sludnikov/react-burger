import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import {ConstructorElement, DragIcon, CurrencyIcon, Button} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-constructor.module.css';
import { ConstructorContext } from '../../services/constructorContext';

const ConstructorTotalPrice = ({totalPrice}) => {
    return(
            <section className={'mr-10 ' + styles.totalPrice}>
                <span className='text text_type_digits-medium'>{totalPrice}</span> <CurrencyIcon type="primary" />
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
    let bunText = '';
    if(props.type === 'top') {
        bunText = '(верх)';
    } else if(props.type === 'bottom') {
        bunText = '(низ)';
    }

    return(
        <ConstructorItem locked={props.isLocked}>
            <ConstructorElement
                type={props.type}
                isLocked={props.isLocked}
                text={`${props.constructorItem.name} ${bunText}`}
                price={props.constructorItem.price}
                thumbnail={props.constructorItem.image}
            />
        </ConstructorItem>
    );
}

const BurgerConstructor = ({openModal, totalPrice}) => { 
    const constructorItems = useContext(ConstructorContext);
    const bunCount = constructorItems.filter(element => element.type === 'bun').length;
    const bunIndex = constructorItems.findIndex(element => element.type === 'bun');

    return(<>
        {bunCount < 2 ? (<>
        <section className={'mb-10 ' +styles.burgerConstructorWrapper}>
            {bunCount !== 0 && <ConstructorItemElement constructorItem={constructorItems[bunIndex]} isLocked={true} type="top" /> }
                <section className={styles.unlockedWrapper}>
                    {constructorItems.map((constructorItem, index) => 
                        (index !== bunIndex) &&
                            <ConstructorItemElement constructorItem={constructorItem} key={constructorItem._id} />
                    )}
                </section>
            {bunCount !== 0 && <ConstructorItemElement constructorItem={constructorItems[bunIndex]} isLocked={true} type="bottom" /> }
        </section>

        <section className={'pr-4 ' + styles.constructorTotal}>
            <ConstructorTotalPrice totalPrice={totalPrice}/>
            <Button type="primary" size="large" onClick={() => openModal()}>Оформить заказ</Button>
        </section> </>) : 'Ошибка! В заказе может быть только две булки одного типа (сверху и снизу)'}
        </>
    );
}


ConstructorItem.propTypes = {
    locked: PropTypes.bool,
    children: PropTypes.element.isRequired
}; 

ConstructorItemElement.propTypes = {
    constructorItem: PropTypes.shape({
        type: PropTypes.string,
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        image: PropTypes.string.isRequired
    }),
    isLocked: PropTypes.bool,
    type: PropTypes.string
}

BurgerConstructor.propTypes = {
    openModal: PropTypes.func.isRequired,
    totalPrice: PropTypes.number.isRequired
}

ConstructorTotalPrice.propTypes = {
    totalPrice: PropTypes.number.isRequired
}; 

export default BurgerConstructor;