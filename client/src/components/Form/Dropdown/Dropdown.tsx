import styles from "./Dropdown.module.scss";
import { useState } from "react";

type IconProps = {
    className?: string;
};

function ArrowDown({ className }: IconProps) {
    return (
        <svg
            className={className}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
        >
            <path d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z" />
        </svg>
    );
}

function ArrowUp({ className }: IconProps) {
    return (
        <svg
            className={className}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
        >
            <path d="M240.971 130.524l194.343 194.343c9.373 9.373 9.373 24.569 0 33.941l-22.667 22.667c-9.357 9.357-24.522 9.375-33.901.04L224 227.495 69.255 381.516c-9.379 9.335-24.544 9.317-33.901-.04l-22.667-22.667c-9.373-9.373-9.373-24.569 0-33.941L207.03 130.525c9.372-9.373 24.568-9.373 33.941-.001z" />
        </svg>
    );
}


type Props = {
    placeholder: string;
    arrayValues: Array<string>;
    className?: string;
    classNameInfo?: string;
    onClickHandler?: (value: string) => void;
    customSvg?: any;
    onClickDiv?: () => any;
};

export default function DropDown({
    placeholder,
    arrayValues,
    className,
    onClickHandler,
    customSvg,
    onClickDiv,
    classNameInfo,
}: Props) {
    const [open, setOpen] = useState(false);
    const [firstClick, setFirstClick] = useState(false);
    return (
        <div
            onClick={() => {
                if (onClickDiv) onClickDiv();
                setOpen((prev) => !prev);
            }}
            className={`${styles.drop} ${className} ${firstClick ? styles.first : ""
                }`}
            tabIndex={-1}
            onBlur={() => {
                setOpen(false);
            }}
        >
            <div className={styles.drop_p}>{placeholder}</div>
            {customSvg}
            {!customSvg && !open && <ArrowDown />}
            {!customSvg && open && <ArrowUp />}
            {arrayValues.length > 0 && open && (
                <div className={`${styles.info} ${classNameInfo}`}>
                    {arrayValues.map((value: string, index: number) => (
                        <div
                            onClick={() => {
                                if (onClickHandler) onClickHandler(value);
                                setFirstClick(true);
                            }}
                            key={index}
                        >
                            {value}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
