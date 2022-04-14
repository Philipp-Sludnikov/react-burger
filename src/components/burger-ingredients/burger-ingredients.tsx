import { useState, useMemo, FC, UIEvent, useRef } from 'react';
import {Counter, CurrencyIcon, Tab} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredients.module.css';
import { showModalIngredient } from '../../services/actions/index';
import { useDrag } from "react-dnd";
import { useHistory, useLocation } from 'react-router-dom';
import { TIngredientItemProps, TIngredient, TBurgerIngredientsListProps, TIngredientsTabsProps } from '../../services/types/burger-ingredients-types';
import { useAppDispatch, useAppSelector } from '../../services/hooks';

const IngredientsTabs: FC<TIngredientsTabsProps> = ({currentTab, refBun, refSauce, refMain}) => {

    const onTabClick = (e: string) => {
        if (e === "bun") {refBun.current?.scrollIntoView({ behavior: 'smooth' })};
        if (e === "sauce") {refSauce.current?.scrollIntoView({ behavior: 'smooth' })};
        if (e === "main") {refMain.current?.scrollIntoView({block: "center", behavior: "smooth"})};
    }

    return (
        <div className={'mb-10 ' + styles.ingredientTabs}>
            <Tab value="bun" active={currentTab === 'bun'} onClick={onTabClick}>Булки</Tab>
            <Tab value="sauce" active={currentTab === 'sauce'} onClick={onTabClick}>Соусы</Tab>
            <Tab value="main" active={currentTab === 'main'} onClick={onTabClick}>Начинки</Tab>
        </div>
    )
};

    const IngredientItem: FC<TIngredientItemProps> = ({ingredient}) => {
    const dispatch = useAppDispatch();
    const history = useHistory();
    const location = useLocation();
    const constructorItems = useAppSelector(store => store.constructorIngredients.constructorIngredients);
    const countItem = useMemo(() => constructorItems.filter(element => ingredient._id === element._id).length, [constructorItems]);
    

    const [{canDrag, isIngredeintDrag}, dragIngredientRef] = useDrag({
        type: "ingredient",
        item: {...ingredient},
        canDrag: () => canDragIngredient({...ingredient}),
        collect: monitor => ({
            isIngredeintDrag: monitor.isDragging(),
            canDrag: monitor.canDrag()
        })
    });

    const canDragIngredient = (item: TIngredient) => {
        const itemsCount = constructorItems.length;
        if(itemsCount === 0) {
            if(item.type === 'bun') {
                return true;
            } else {
                return false;
            }
        } else {
            const bunIndex = constructorItems.findIndex(element => element.type === 'bun' && element._id === item._id);
            if(bunIndex === -1) {
                return true;
            } else {
                return false;
            }
        }
 
    }

    const openModal = (ingredient: TIngredient) => {
        dispatch(showModalIngredient(ingredient));
        history.push(`/ingredients/${ingredient._id}`, {background: location});
    }

    return (
        <li className={`mb-8 pl-4 pr-4 ${styles.ingredientListItem} ${isIngredeintDrag && styles.dragIngredientListItem} ${!canDrag && styles.ingredientListItemNotCanDrag}`} onClick={() => openModal(ingredient)} ref={dragIngredientRef} data-id={ingredient._id}>
            {countItem !== 0 && <Counter count={countItem} size="default" />}
            <img src={ingredient.image} alt={ingredient.name} className={'mb-1 ' + styles.ingredientImage} />
            <section className={'text text_type_digits-default mb-1 ' + styles.ingredientItemPrice}><span className='mr-2'>{ingredient.price}</span> <CurrencyIcon type="primary" /></section>
            <section className={styles.ingredientItemTitle}><p className='text text_type_main-default'>{ingredient.name}</p></section>
            <section className={'mt-4 text text_type_main-small ' + styles.addIngredentBtn}>Добавить</section>
        </li>
    )
};

const BurgerIngredientsList: FC<TBurgerIngredientsListProps> = (props) => {
    return (
        <>
            <h3 className={'text text_type_main-medium ' + styles.sectionName} ref={props.refItem}>{props.heading}</h3>
            <ul className={'pt-6 pl-4 pr-2 pb-2 ' + styles.listOfIngredients}>
            {props.ingredients.map(ingredient => ingredient.type === props.type && (
                <IngredientItem ingredient={ingredient} key={ingredient._id} />
            ))}
            </ul>
        </>
    )
};

const BurgerIngredients: FC = () => {

    const ingredients = useAppSelector(store => store.ingredients.ingredients);

    const [currentTab, setCurrentTab] = useState<string>('bun');

    const refBun = useRef<null | HTMLDivElement>(null); 
    const refSauce = useRef<null | HTMLDivElement>(null); 
    const refMain = useRef<null | HTMLDivElement>(null); 

    const handleIngredientsListScroll = (e: UIEvent<HTMLElement>) => { 
        const ingredientsWrapper = e.target as HTMLElement;
        const ingredientsWrapperPos = ingredientsWrapper.getBoundingClientRect().top + 30;
        const elements = ingredientsWrapper.getElementsByTagName('h3');
        
        const elementsArr = Array.from(elements);
        let current_diff = Math.abs(elementsArr[0].getBoundingClientRect().top - ingredientsWrapperPos);
        let currentTabName = elementsArr[0].innerHTML;

        elementsArr.map(function(elem) {
            if(Math.abs((elem.getBoundingClientRect().top - ingredientsWrapperPos)) < current_diff) {
                current_diff = Math.abs(elem.getBoundingClientRect().top - ingredientsWrapperPos);
                currentTabName = elem.innerHTML;
            }
        });

        if(currentTabName === 'Булки') {
            setCurrentTab('bun');
        } else if(currentTabName === 'Соусы') {
            setCurrentTab('sauce');
        } else if(currentTabName === 'Начинки') {
            setCurrentTab('main');
        }
    }

    return(
        <>
            <IngredientsTabs currentTab={currentTab} refBun={refBun} refSauce={refSauce} refMain={refMain}/>
            <section className={styles.ingredientsListWrapper} onScroll={(e) => handleIngredientsListScroll(e)}>
                <BurgerIngredientsList ingredients={ingredients} heading="Булки" type="bun" refItem={refBun}/>
                <BurgerIngredientsList ingredients={ingredients} heading="Соусы" type="sauce" refItem={refSauce}/>
                <BurgerIngredientsList ingredients={ingredients} heading="Начинки" type="main" refItem={refMain}/>
            </section>
        </>
    );
}

export default BurgerIngredients;