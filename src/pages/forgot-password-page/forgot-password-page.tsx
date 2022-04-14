import styles from './forgot-password-page.module.css';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState, FC, FormEvent } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { forgotPassword } from '../../services/actions/restore-password';
import { useAppDispatch, useAppSelector } from '../../services/hooks';

const ForgotPassword: FC = () => {
    const dispatch = useAppDispatch();
    const [emailValue, setEmailValue] = useState<string>('');

    const onSubmitHandler = (e: FormEvent<HTMLFormElement>): void => {
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

const ForgotPasswordPage: FC = () => {
    const isAuth = useAppSelector(store => store.auth.isAuth);
    const restorePasswordStep = useAppSelector(store => store.restorePassword.restorePasswordStep);
    
    return (<>
        {!isAuth ? (!restorePasswordStep ? (
            <section className={styles.forgotWrapper}>
                <ForgotPassword />
            </section>
        ) : <Redirect to='/reset-password' />
        ) : <Redirect to='/' /> }
    </>);  
}

export default ForgotPasswordPage;