import styles from './app.module.css';
import { useState, useRef } from "react";
import { useForm } from 'react-hook-form';

const sendForm = (data) => {
    console.log(data);
};

export const App = () => {

    return (
        <form className={styles.formContainer}>
            <input type="text" name="email"/>
            {emailError && <div className={styles.errorStyle}>{emailError}</div>}
            <input type="password" name="password"/>
            {passwordError && <div className={styles.errorStyle}>{passwordError}</div>}
            <input type="password" name="passwordRepeat"/>
            {passwordRepeatError && <div className={styles.errorStyle}>{passwordRepeatError}</div>}
            <button className={styles.signButton}>Sign-up</button>
        </form>
    );
};