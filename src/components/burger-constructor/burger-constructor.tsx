import React, { useEffect, useRef, useState, FC } from 'react';
import PropTypes from 'prop-types';
import {ConstructorElement, DragIcon, CurrencyIcon, Button} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-constructor.module.css';
import { useDispatch, useSelector, RootStateOrAny } from 'react-redux';
import { getOrderData, calcTotalPrice, addConstructorIngredient, moveConstructorIngredient, removeConstructorIngredient } from '../../services/actions/index';
import { useDrag, useDrop, ConnectDropTarget } from "react-dnd";
import { TConstructorItem, TConstructorIngredient, TConstructorItemElement } from '../../services/types/burger-constructor-types';
import { getCookie } from '../../utils/cookie';
import { API_URL } from '../../utils/api';
import { useHistory } from 'react-router-dom';
import { motion } from "framer-motion";

const EmptyConstructorElement: FC<{type: string}> = ({children, type}) => {
    return (
        <section className={`${styles.emptyConstructorWrap} ${type !== 'bun' && styles.emptyConstructorWrapMin}`}>
            {children}
        </section>
    );
}

const EmptyConstructor: FC<{ isHover:boolean;dropRef: ConnectDropTarget; }> = ({dropRef, isHover}) => {
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

const ConstructorTotalPrice: FC<{totalPrice: number}> = ({totalPrice}) => {
    return(
            <section className={'mr-10 ' + styles.totalPrice}>
                <span className='text text_type_digits-medium'>{totalPrice}</span> <CurrencyIcon type="primary" />
            </section>
    );
}

const ConstructorItem: FC<TConstructorItem> = (props) => {

    type TConstructorDragItem = {
        id: string
        originalIndex: number;
      }

    const ref = useRef<HTMLInputElement>(null);
    const dispatch = useDispatch();
    const constructorItems: Array<TConstructorIngredient>  = useSelector((store: RootStateOrAny) => store.constructorIngredients.constructorIngredients);

    const findConstructorItem = (id: string) => {
          const item = constructorItems.filter((element: TConstructorIngredient) => `${element.id}` === id)[0];
          return {
            item,
            index: constructorItems.indexOf(item),
          }
    }

    const [, dropSortTarget] = useDrop({
        accept: "sorTConstructorIngredient",
        hover({ id: draggedId }: TConstructorDragItem) {
            if (draggedId !== props.id) {
              const { index } = findConstructorItem(props.id)
              dispatch(moveConstructorIngredient(draggedId, index));
            }
          },
        });
    
    const [{canDrag, isDragging}, dragIngredientSortBtnRef] = useDrag({
        type: "sorTConstructorIngredient",
        item: { id: props.constructorItem.id },
        canDrag: () => canDragIngredient(props),
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
            canDrag: monitor.canDrag()
        })
    });

    const canDragIngredient = (props: TConstructorItem) => {
        if(props.locked || constructorItems.filter((elem: TConstructorIngredient) => elem.type !== 'bun').length <= 1) {
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

const ConstructorItemElement: FC<TConstructorItemElement> = (props) => {
    let bunText = '';
    if(props.type === 'top') {
        bunText = '(верх)';
    } else if(props.type === 'bottom') {
        bunText = '(низ)';
    }

    const dispatch = useDispatch();

    const removeConstructorElement = (id: string) => {
        dispatch(removeConstructorIngredient(id));
    }

    return(<motion.div animate={{ opacity: [0, 1] }} transition={{ type: "spring", stiffness: 100 }}>
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
        </motion.div>
    );
}

const BurgerConstructor: FC = () => { 
    const dispatch = useDispatch();
    const history = useHistory();
    const [draggedItem, setDraggedItem] = useState<string>('');

    const orderAPI: string = `${API_URL}/api/orders`;

    const constructorItems: Array<TConstructorIngredient> = useSelector((store: RootStateOrAny) => store.constructorIngredients.constructorIngredients);
    const totalPrice = useSelector((store: RootStateOrAny) => store.constructorIngredients.totalPrice);

    const [{isHover}, dropTarget] = useDrop({
        accept: "ingredient",
        drop: (item: TConstructorIngredient) => onDropHandler(item),
        hover: (item: TConstructorIngredient) => setTypeDraggedItem(item),
        collect: monitor => ({
            isHover: monitor.isOver()
        })
    });

    const onDropHandler = (item: TConstructorIngredient) => {
        dispatch(addConstructorIngredient(item));
    }

    const setTypeDraggedItem = (item: TConstructorIngredient) => {
        setDraggedItem(item.type);
    }

    useEffect(() => {
        dispatch(calcTotalPrice());
    }, [constructorItems]);
    

    const bunCount = constructorItems.filter(element => element.type === 'bun').length;
    const bunIndex = constructorItems.findIndex(element => element.type === 'bun');

    const openModalOrder = (url: string, items: Array<TConstructorIngredient>) => {
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

export default BurgerConstructor;