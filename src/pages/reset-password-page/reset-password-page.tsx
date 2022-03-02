import AppHeader from '../../components/app-header/app-header';
import styles from './reset-password-page.module.css';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { RootStateOrAny, useSelector, useDispatch } from 'react-redux';
import { resetPassword } from '../../services/actions/restore-password';


const ResetPassword = () => {
    const dispatch = useDispatch();
    const [passwordValue, setPasswordValue] = useState('');
    const [tokenValue, setTokenValue] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const onSubmitHandler = (e) => {
        e.preventDefault();
        dispatch(resetPassword(passwordValue, tokenValue));
    }

    return(
        <section className={styles.resetPasswordFormWrapper}>
            <p className={`text text_type_main-medium mb-6 ${styles.resetPasswordTitle}`}>Восстановление пароля</p>
            <form className={`${styles.resetPasswordForm} mb-20`} onSubmit={onSubmitHandler}>
                <Input
                    type={!showPassword ? 'password' : 'text'}
                    placeholder='Введите новый пароль'
                    name='password'
                    value={passwordValue || ''}
                    icon={showPassword ? 'HideIcon' : 'ShowIcon'}
                    onChange={e => setPasswordValue(e.target.value)}
                    onIconClick={() => setShowPassword(!showPassword)}
                />
                <Input
                    type={'text'}
                    placeholder={'Введите код из письма'}
                    onChange={e => setTokenValue(e.target.value)}
                    value={tokenValue}
                    name={'token'}
                    error={false}
                    errorText={'Ошибка'}
                />

                
                <Button type="primary" size="medium" >Сохранить</Button>
            </form>
            <p className='text text_type_main-default text_color_inactive'>Вспомнили пароль? <Link to="/login" className={`text text_type_main-default ${styles.formLink}`}>Войти</Link></p>
        </section>
    );
}

const ResetPasswordPage = () => {
    const restorePasswordStep = useSelector((store: RootStateOrAny) => store.restorePassword.restorePasswordStep);
    const isAuth = useSelector((store: RootStateOrAny) => store.auth.isAuth);
    return (
        <>
            {(isAuth || !restorePasswordStep) ? (
                    <Redirect to="/" />
                ) : (
                <>
                    <AppHeader />
                    <section className={styles.resetPasswordWrapper}>
                        <ResetPassword />
                    </section>
                </>
                )
            }
        </>
    );  
}

export default ResetPasswordPage;