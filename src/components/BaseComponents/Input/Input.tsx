import React from "react";
import styles from './Input.module.css'
import { Variant } from "@/common/Types";

interface InputProps {
    inputRef?: React.RefObject<HTMLInputElement>;
    legendContent: string;
    variant: Variant;
    inputType: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({inputRef, legendContent, variant, inputType, onChange}) => {
    return (
        <fieldset className={`${styles.fieldset}`}>
            <label htmlFor="clientInput" className={styles.legend}>{legendContent}</label>
            <input ref={inputRef} id="clientInput" type={inputType} className={`${styles.input} ${styles[variant]}`} onChange={onChange} />
        </fieldset>
    )
}

export default Input;
export type { InputProps };