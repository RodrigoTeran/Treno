import React, { useState, Dispatch, SetStateAction, useEffect } from 'react';
import styles from "./Input.module.scss";

interface Props {
    text: string;
    inputValue: string;
    setInputValue: Dispatch<SetStateAction<string>>;
    id: string;
    isRequired?: boolean;
    typeInput: "text" | "email" | "password";
    refElement?: any;
}

const InputText: React.FunctionComponent<Props> = ({
    text,
    inputValue,
    setInputValue,
    id,
    typeInput,
    refElement,
    isRequired
}: Props) => {
    const [isLabelOpened, setIsLabelOpened] = useState<boolean>(false);
    const [isInputCompleted, setIsInputCompleted] = useState<boolean>(false);

    useEffect(() => {
        var dummyEl = document.getElementById(id);
        var isFocused = (document.activeElement === dummyEl);

        if (inputValue !== "") {
            setIsLabelOpened(true);
        } else if (!isFocused) {
            setIsLabelOpened(false);
            setIsInputCompleted(false);
        }
        // eslint-disable-next-line
    }, [inputValue]);

    return (
        <div className={styles.input}>
            <label
                className={`${isLabelOpened ? styles.input_label_open : styles.input_label
                    }`}
                htmlFor={id}
            >
                {text}
            </label>
            <input
                ref={refElement}
                value={inputValue}
                className={`${isInputCompleted ? styles.input_form_completed : styles.input_form
                    }`}
                onFocus={() => {
                    setIsLabelOpened(true);
                }}
                required={isRequired}
                onBlur={() => {
                    if (inputValue === "") {
                        setIsLabelOpened(false);
                        setIsInputCompleted(false);
                    } else {
                        setIsInputCompleted(true);
                    }
                }}
                onChange={(e) => {
                    setInputValue(e.target.value);
                }}
                id={id}
                type={typeInput}
            />
        </div>
    );
};
export default InputText;
