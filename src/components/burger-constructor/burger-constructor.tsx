import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import {ConstructorElement, DragIcon, CurrencyIcon, Button} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-constructor.module.css';
import { useDispatch, useSelector, RootStateOrAny } from 'react-redux';
import { getOrderData } from '../../services/actions/index';
import { useDrag, useDrop } from "react-dnd";
import {IngredientPropTypes} from '../../utils/types';
import { flattenDiagnosticMessageText } from 'typescript';

const ConstructorTotalPrice = ({totalPrice}) => {
    return(
            <section className={'mr-10 ' + styles.totalPrice}>
                <span className='text text_type_digits-medium'>{totalPrice}</span> <CurrencyIcon type="primary" />
            </section>
    );
}

const ConstructorItem = (props) => {
    const ref = useRef<HTMLInputElement>(null);
    const dispatch = useDispatch();
    const constructorItems = useSelector((store: RootStateOrAny) => store.constructorIngredients.constructorIngredients);

    const [, dropSortTarget] = useDrop({
        accept: "sortIngredient",
        hover(item:Object, monitor) {
            if (!ref.current) {
                return;
              }

            const dragIndex = item['index'];
            const hoverIndex = props.index;

            if (dragIndex === hoverIndex || hoverIndex === undefined) {
                return
            }

            const hoverBoundingRect = ref?.current?.getBoundingClientRect();
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

            const clientOffset = monitor.getClientOffset();

            if(clientOffset == null) {
                return;
            }

            const hoverClientY = clientOffset.y - hoverBoundingRect.top;

            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return
            }

            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return
            }

            
            dispatch({type: 'MOVE_CONSTRUCTOR_INGREDIENT', dragIndex: dragIndex, hoverIndex: hoverIndex});

            item['index'] = hoverIndex;
        }
    });
    
    const [{canDrag, isDragging}, dragIngredientSortBtnRef] = useDrag({
        type: "sortIngredient",
        item: { index: props.index, id: props.constructorItem.id },
        canDrag: () => canDragIngredient(props),
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
            canDrag: monitor.canDrag()
          }),
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
        dispatch({type: 'REMOVE_CONSTRUCTOR_ITEM', id: id});
    }

    return(
        <ConstructorItem locked={props.isLocked} constructorItem={props.constructorItem} index={props.index}>
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


    const orderAPI = 'https://norma.nomoreparties.space/api/orders';

    const constructorItems = useSelector((store: RootStateOrAny) => store.constructorIngredients.constructorIngredients);
    const totalPrice = useSelector((store: RootStateOrAny) => store.constructorIngredients.totalPrice);

    const [{isHover}, dropTarget] = useDrop({
        accept: "ingredient",
        drop: (item) => onDropHandler(item),
        collect: monitor => ({
            isHover: monitor.isOver()
        })
    });

    const onDropHandler = (item) => {
        if(item.type === 'bun') {
            dispatch({
                type: 'ADD_BUN_CONSTRUCTOR_INGREDIENT',
                bun: item
            })
        } else {
            dispatch({
                type: 'ADD_CONSTRUCTOR_INGREDIENT',
                item: item
            })
        }
    }

    useEffect(() => {
        dispatch({
            type: 'CALC_CONSTRUCTOR_TOTAL_PRICE'
        })
    }, [constructorItems]);
    

    const bunCount = constructorItems.filter(element => element.type === 'bun').length;
    const bunIndex = constructorItems.findIndex(element => element.type === 'bun');

    const openModalOrder = (url, items) => {
        dispatch(getOrderData(url, items))
    }

    const wrapperClassName=`mb-10 ${styles.burgerConstructorWrapper} ${constructorItems.length === 0 && styles.emptyBurgerConstructorWrapper}`;
    
    return(<>
        <section className={wrapperClassName} ref={dropTarget}>
            {bunCount !== 0 && <ConstructorItemElement constructorItem={constructorItems[bunIndex]} isLocked={true} type="top" /> }
                <section className={styles.unlockedWrapper} >
                    {constructorItems.map((constructorItem, index) => 
                        (index !== bunIndex) &&
                            <ConstructorItemElement constructorItem={constructorItem} key={constructorItem.id} index={index}/>
                    )}
                </section>
            {bunCount !== 0 && <ConstructorItemElement constructorItem={constructorItems[bunIndex]} isLocked={true} type="bottom" /> }
        </section>

        <section className={'pr-4 ' + styles.constructorTotal}>
            <ConstructorTotalPrice totalPrice={totalPrice}/>
            <Button type="primary" size="large" onClick={() => openModalOrder(orderAPI,constructorItems)}>Оформить заказ</Button>
        </section>
        </>
    );
}


ConstructorItem.propTypes = {
    locked: PropTypes.bool,
    children: PropTypes.element.isRequired,
    constructorItem: PropTypes.shape(IngredientPropTypes).isRequired,
    index: PropTypes.number
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

export default BurgerConstructor;