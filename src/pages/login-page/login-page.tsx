import styles from './login-page.module.css';
import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState, useEffect, FC, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { loginUser, unsetLogout } from '../../services/actions/login';
import { Redirect, useLocation } from 'react-router-dom';
import { Location } from "history";
import { useAppDispatch, useAppSelector } from '../../services/hooks';

const LoginForm: FC = () => {
    const [emailValue, setEmailValue] = useState<string>('');
    const [passwordValue, setPasswordValue] = useState<string>('');
    const dispatch = useAppDispatch();

    const loginHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(loginUser(emailValue, passwordValue));
    }
    

    return(
        
        <section className={styles.loginFormWrapper}>
            <p className={`text text_type_main-medium mb-6 ${styles.signInTitle}`}>Вход</p>
            <form className={`${styles.loginForm} mb-20`} onSubmit={loginHandler} data-element="loginForm">
                <Input
                    type={'email'}
                    placeholder={'E-Mail'}
                    onChange={e => setEmailValue(e.target.value)}
                    value={emailValue}
                    name={'email'}
                    error={false}
                    errorText={'Ошибка'}
                />
                <PasswordInput onChange={e => setPasswordValue(e.target.value)} value={passwordValue} name={'password'} />
                <Button type="primary" size="medium" >Войти</Button>
            </form>

            <p className='mb-4 text text_type_main-default text_color_inactive'>Вы — новый пользователь? <Link to="/register" className={`text text_type_main-default ${styles.formLink}`}>Зарегистрироваться</Link></p>
            <p className='text text_type_main-default text_color_inactive'>Забыли пароль? <Link to="/forgot-password" className={`text text_type_main-default ${styles.formLink}`}>Восстановить пароль</Link></p>
        </section> 
    );
}

const LoginPage: FC = () => {
    const isAuth = useAppSelector(store => store.auth.isAuth);
    const { state } = useLocation<{from?: Location<{} | null | undefined>}>();
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(unsetLogout());
    });

    if(!isAuth) {
        return (
            <section className={styles.loginWrapper}>
                <LoginForm />
            </section>
        )
    } else {
        return(
            <Redirect to={state?.from || '/'} />
        )
    }
}

export default LoginPage;