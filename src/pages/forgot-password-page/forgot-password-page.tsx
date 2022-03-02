import AppHeader from '../../components/app-header/app-header';
import styles from './forgot-password-page.module.css';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { RootStateOrAny, useSelector, useDispatch } from 'react-redux';
import { forgotPassword } from '../../services/actions/restore-password';

const ForgotPassword = () => {
    const dispatch = useDispatch();
    const [emailValue, setEmailValue] = useState('');
    const onSubmitHandler = (e) => {
        e.preventDefault();
        dispatch(forgotPassword(emailValue));
    }

    return(
        <section className={styles.forgotFormWrapper}>
            <p className={`text text_type_main-medium mb-6 ${styles.forgotTitle}`}>Восстановление пароля</p>
            <form className={`${styles.forgotForm} mb-20`} onSubmit={onSubmitHandler}>
                <Input
                    type={'email'}
                    placeholder={'E-Mail'}
                    onChange={e => setEmailValue(e.target.value)}
                    value={emailValue}
                    name={'email'}
                    error={false}
                    errorText={'Ошибка'}
                />
                <Button type="primary" size="medium" >Восстановить</Button>
            </form>
            <p className='text text_type_main-default text_color_inactive'>Вспомнили пароль? <Link to="/login" className={`text text_type_main-default ${styles.formLink}`}>Войти</Link></p>
        </section>
    );
}

const ForgotPasswordPage = () => {
    const isAuth = useSelector((store: RootStateOrAny) => store.auth.isAuth);
    const restorePasswordStep = useSelector((store: RootStateOrAny) => store.restorePassword.restorePasswordStep);
    return (<>
        {!isAuth ? (!restorePasswordStep ? (
        <>
            <AppHeader />
            <section className={styles.forgotWrapper}>
                <ForgotPassword />
            </section>
        </> ) : <Redirect to='/reset-password' />
        ) : <Redirect to='/' /> }
    </>);  
}

export default ForgotPasswordPage;