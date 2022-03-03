import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import {ConstructorElement, DragIcon, CurrencyIcon, Button} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-constructor.module.css';
import { useDispatch, useSelector, RootStateOrAny } from 'react-redux';
import { getOrderData, calcTotalPrice, addConstructorIngredient, moveConstructorIngredient, removeConstructorIngredient } from '../../services/actions/index';
import { useDrag, useDrop } from "react-dnd";
import {IngredientPropTypes} from '../../utils/types';
import { getCookie } from '../../utils/cookie';
import { useHistory } from 'react-router-dom';

const EmptyConstructorElement = ({children, type}) => {
    return (
        <section className={`${styles.emptyConstructorWrap} ${type !== 'bun' && styles.emptyConstructorWrapMin}`}>
            {children}
        </section>
    );
}

const EmptyConstructor = ({dropRef, isHover}) => {
    return (
        <section className={styles.emptyConstructorContainer} ref={dropRef}>
            <section className={`${styles.emptyConstructorTop} ${isHover && styles.emptyConstructorHovered}`}></section>
            <EmptyConstructorElement type="bun">
                <p className="text text_type_main-default text_color_inactive">Выберите булку</p>
            </EmptyConstructorElement>
            <section className={`${styles.emptyConstructorBottom} ${isHover && styles.emptyConstructorHovered}`}></section>
        </section>
    );
}

const ConstructorTotalPrice = ({totalPrice}) => {
    return(
            <section className={'mr-10 ' + styles.totalPrice}>
                <span className='text text_type_digits-medium'>{totalPrice}</span> <CurrencyIcon type="primary" />
            </section>
    );
}

const ConstructorItem = (props) => {

    interface ConstructorItem {
        id: string
        originalIndex: number
      }

    const ref = useRef<HTMLInputElement>(null);
    const dispatch = useDispatch();
    const constructorItems = useSelector((store: RootStateOrAny) => store.constructorIngredients.constructorIngredients);

    const findConstructorItem = (id) => {
          const item = constructorItems.filter((element) => `${element.id}` === id)[0];
          return {
            item,
            index: constructorItems.indexOf(item),
          }
    }

    const [, dropSortTarget] = useDrop({
        accept: "sortIngredient",
        hover({ id: draggedId }: ConstructorItem) {
            if (draggedId !== props.id) {
              const { index } = findConstructorItem(props.id)
              dispatch(moveConstructorIngredient(draggedId, index));
            }
          },
        });
    
    const [{canDrag, isDragging}, dragIngredientSortBtnRef] = useDrag({
        type: "sortIngredient",
        item: { id: props.constructorItem.id },
        canDrag: () => canDragIngredient(props),
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
            canDrag: monitor.canDrag()
        })
    });

    const canDragIngredient = (props) => {
        if(props.locked || constructorItems.filter(elem => elem.type !== 'bun').length <= 1) {
            return false;
        } else {
            return true;
        }
    }


    dragIngredientSortBtnRef(dropSortTarget(ref));

    return(
            <section className={`${props.locked === true ? 'pl-8 pr-4' : ('pr-2 ' + styles.constructorItemDragged)} ${styles.constructorItem} ${isDragging && styles.constructorItemHidden} ${!canDrag && styles.constructorItemNotCanDrag}`} ref={ref}>
                {!props.locked && <section><DragIcon type="primary" /></section>} {props.children}
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

    const dispatch = useDispatch();

    const removeConstructorElement = (id) => {
        dispatch(removeConstructorIngredient(id));
    }

    return(
        <ConstructorItem locked={props.isLocked} constructorItem={props.constructorItem} index={props.index} id={props.constructorItem.id}>
            <ConstructorElement
                type={props.type}
                isLocked={props.isLocked}
                text={`${props.constructorItem.name} ${bunText}`}
                price={props.constructorItem.price}
                thumbnail={props.constructorItem.image}
                handleClose={() => removeConstructorElement(props.constructorItem.id)}
            />
        </ConstructorItem>
    );
}

const BurgerConstructor = () => { 
    const dispatch = useDispatch();
    const history = useHistory();
    const [draggedItem, setDraggedItem] = useState('');

    const orderAPI = 'https://norma.nomoreparties.space/api/orders';

    const constructorItems = useSelector((store: RootStateOrAny) => store.constructorIngredients.constructorIngredients);
    const totalPrice = useSelector((store: RootStateOrAny) => store.constructorIngredients.totalPrice);

    const [{isHover}, dropTarget] = useDrop({
        accept: "ingredient",
        drop: (item) => onDropHandler(item),
        hover: (item) => setTypeDraggedItem(item),
        collect: monitor => ({
            isHover: monitor.isOver()
        })
    });

    const onDropHandler = (item) => {
        dispatch(addConstructorIngredient(item));
    }

    const setTypeDraggedItem = (item) => {
        setDraggedItem(item.type);
    }

    useEffect(() => {
        dispatch(calcTotalPrice());
    }, [constructorItems]);
    

    const bunCount = constructorItems.filter(element => element.type === 'bun').length;
    const bunIndex = constructorItems.findIndex(element => element.type === 'bun');

    const openModalOrder = (url, items) => {
        if(getCookie('refreshToken')) {
            dispatch(getOrderData(url, items));
        } else {
            history.push({pathname: '/login'});
        }
    }

    const wrapperClassName=`mb-10 ${styles.burgerConstructorWrapper} ${constructorItems.length === 0 && styles.emptyBurgerConstructorWrapper}`;
    
    return(<>
        {bunCount !== 0 ? (
        <>
            <section className={wrapperClassName} ref={dropTarget}>
                <ConstructorItemElement constructorItem={constructorItems[bunIndex]} isLocked={true} type="top" />
                    <section className={styles.unlockedWrapper} >
                        {constructorItems.map((constructorItem, index) => 
                            (index !== bunIndex &&
                                <ConstructorItemElement constructorItem={constructorItem} key={constructorItem.id} index={index}/>
                            )
                        )}
                    {isHover && draggedItem !== 'bun' && <EmptyConstructorElement type="notbun" />}
                    </section>
                <ConstructorItemElement constructorItem={constructorItems[bunIndex]} isLocked={true} type="bottom" />
            </section>

            <section className={'pr-4 ' + styles.constructorTotal} >
                <ConstructorTotalPrice totalPrice={totalPrice}/>
                <Button type="primary" size="large" onClick={() => openModalOrder(orderAPI,constructorItems)}>Оформить заказ</Button>
            </section>
        </>
        ) : <EmptyConstructor dropRef={dropTarget} isHover={isHover}/>}
        </>
    );
}


ConstructorItem.propTypes = {
    locked: PropTypes.bool,
    children: PropTypes.element.isRequired,
    constructorItem: PropTypes.shape(IngredientPropTypes).isRequired,
    index: PropTypes.number,
    id:PropTypes.string.isRequired
}; 

ConstructorItemElement.propTypes = {
    constructorItem: PropTypes.shape({
        id: PropTypes.string,
        type: PropTypes.string,
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        image: PropTypes.string.isRequired
    }),
    isLocked: PropTypes.bool,
    type: PropTypes.string,
    onClick: PropTypes.any,
    index: PropTypes.number
}

ConstructorTotalPrice.propTypes = {
    totalPrice: PropTypes.number.isRequired
}; 

EmptyConstructor.propTypes = {
    dropRef: PropTypes.func.isRequired,
    isHover: PropTypes.bool.isRequired
}; 

EmptyConstructorElement.propTypes = {
    children: PropTypes.object,
    type: PropTypes.string.isRequired
}; 

export default BurgerConstructor;