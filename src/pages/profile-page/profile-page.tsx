import styles from './profile-page.module.css';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState, useEffect, FC, MouseEvent, ChangeEvent, SyntheticEvent, FormEvent, FocusEvent } from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import { logoutUser } from '../../services/actions/logout';
import { getUser, updateUser } from '../../services/actions/user';
import { useSelector, useDispatch } from 'react-redux';
import { getCookie } from '../../utils/cookie';
import { TUser, TFormValues } from '../../services/types/pages-types';
import { AppDispatch, AppThunk, RootState } from '../../services/types/types';

export const ProfileNavigation: FC = () => {
    const dispatch = useDispatch<AppDispatch | AppThunk>();
    const token: string | undefined = getCookie('refreshToken');

    const logoutHandler = (e: MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        dispatch(logoutUser(token));
    }

    return(
        <nav className={styles.profileNavWrapper}>
            <ul className='mb-20'>
                <li><NavLink exact to='/profile' className={`text text_type_main-medium text_color_inactive pt-3 pb-3 ${styles.navigationLink}`} activeClassName={styles.activeLink}>Профиль</NavLink></li>
                <li><NavLink exact to='/profile/orders' className={`text text_type_main-medium text_color_inactive pt-3 pb-3 ${styles.navigationLink}`} activeClassName={styles.activeLink}>История заказов</NavLink></li>
                <li><NavLink exact to='/logout' className={`text text_type_main-medium text_color_inactive pt-3 pb-3 ${styles.navigationLink}`} activeClassName={styles.activeLink} onClick={logoutHandler}>Выход</NavLink></li>
            </ul>
            <p className='text text_type_main-default text_color_inactive'>В этом разделе вы можете изменить свои персональные данные</p>
        </nav>
    );
}

const EditProfileForm: FC = () => {
    const dispatch = useDispatch<AppDispatch | AppThunk>();
    const user: TUser = useSelector((store: RootState) => store.user);
    const [formValues, setFormValues] = useState<TFormValues>({name: user.name, email: user.email, password: 'password'});
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [editElements, setEditElements] = useState<object>({});

    

    useEffect(() => {
        if(getCookie('accessToken')) {
            dispatch(getUser());
        }
    }, [user.name, user.email])

    useEffect(() => {
        setFormValues({name: user.name, email: user.email, password: 'password'});
    }, [user.name, user.email])

    const editHandler = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setIsEdit(true);
        setFormValues({...formValues, [e.target.name]: e.target.value});
        setEditElements({...editElements, [e.target.name]:e.target.value});
    }

    const cancelHandler = (e: SyntheticEvent<Element, Event>) => {
        e.preventDefault();
        setFormValues({name: user.name, email: user.email, password: 'password'});
        setEditElements({});
        setIsEdit(false);
    }
    
    const formSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(updateUser(editElements));
        setEditElements({});
        setIsEdit(false);
    }

    const onFocusPassHandler = (e: FocusEvent<HTMLInputElement, Element>) => {
        setFormValues({...formValues, password: ''});
    }

    const onBlurPassHandler = (e: FocusEvent<HTMLInputElement, Element>) => {
        if(formValues.password == '') {
            setFormValues({...formValues, password: 'password'});
        }
    }

    return(
        <section className={styles.profileFormWrapper}>
            <form className={`${styles.profileForm} mb-20`} onSubmit={formSubmitHandler}>
                <Input
                    type={'text'}
                    placeholder={'Имя'}
                    value={formValues.name}
                    icon={'EditIcon'}
                    name={'name'}
                    error={false}
                    errorText={'Ошибка'}
                    onChange={editHandler}
                />
                <Input
                    type={'text'}
                    placeholder={'Логин'}
                    onChange={editHandler}
                    value={formValues.email}
                    icon={'EditIcon'}
                    name={'email'}
                    error={false}
                    errorText={'Ошибка'}
                />
                <Input
                    type={'password'}
                    placeholder={'Пароль'}
                    onChange={editHandler}
                    value={formValues.password}
                    icon={'EditIcon'}
                    name={'password'}
                    error={false}
                    errorText={'Ошибка'}
                    onFocus={onFocusPassHandler}
                    onBlur={onBlurPassHandler}
                />
                {(isEdit || (!user.updateUserRequest && user.updateUserFailed)) &&
                <section className={styles.profileButtons}>
                    <Button type="primary" size="medium" onClick={cancelHandler}>Отмена</Button>
                    <Button type="primary" size="medium">Сохранить</Button>
                </section>
                }
            </form>
        </section>
    );
}



const ProfilePage: FC = () => {
    const isLogoutSuccess: boolean = useSelector((store: RootState) => store.logout.logoutSuccess);
    
    if(isLogoutSuccess && getCookie('refreshToken') === undefined) {
        return (
            <Redirect to='/login' />
        );  
    } else {
        return (
            <section className={styles.profileWrapper}>
                <ProfileNavigation />
                <EditProfileForm />
            </section>
        );  
    }


}

export default ProfilePage;