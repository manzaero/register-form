import styles from './app.module.css';
import {useForm} from 'react-hook-form';
import * as yup from 'yup';
import {yupResolver} from "@hookform/resolvers/yup";

const formSchema = yup.object().shape({
    email: yup.string()
        .matches(/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/, 'Введите корректный e-mail')
        .required('Обязательно к заполнению'),

    password: yup.string()
        .required('Обязательно к заполнению')
        .matches(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]{8,})$/, 'Не менее 8 символов, заглавная, строчная, цифры'),
    confirmPassword: yup.string()
        .required('Обязательно повторите пароль')
        .oneOf([yup.ref('password')], "Повторите пароль")
})

export const App = () => {

    const {
        register,
        handleSubmit,
        formState: {errors},
        reset
    } = useForm({
        resolver: yupResolver(formSchema),
    });

    const emailError = errors.email?.message;
    const passwordError = errors.password?.message;
    const confirmPasswordError = errors.confirmPassword?.message;

    const onSubmit = (formData) => {
        console.log({formData})
        reset()
    }

    return (
        <form className={styles.formContainer} onSubmit={handleSubmit(onSubmit)}>
            <input
                type="text" name="email" {...register("email")} required className={styles.inputStyle} placeholder="Введите эмаил"
                   />
            {emailError && <div className={styles.errorStyle}>{emailError}</div>}
            <input
                type="password" name="password" {...register("password")} required className={styles.inputStyle} placeholder="Cоздать пароль"
                   />
            {passwordError && <div className={styles.errorStyle}>{passwordError}</div>}
            <input
                type="password" name="passwordRepeat" {...register("confirmPassword")} required className={styles.inputStyle} placeholder="Повторить пароль"
                   />
            {confirmPasswordError && <div className={styles.errorStyle}>{confirmPasswordError}</div>}
            <button type="submit" className={styles.signButton}>Sign-up</button>
        </form>
    );
};