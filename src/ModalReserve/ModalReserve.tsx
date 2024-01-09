import { useState } from "react";
import { ApartmentsDetails } from "../ApartmentsDetails/ApartmentsDetails";

import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { useCustomContext } from "../helpers/customContext";

import styles from './ModalReserve.module.scss';

export const ModalReserve = () => {
    const { modalReserve, setModalReserve } = useCustomContext();
    const [guestsCount, setGuestsCount] = useState(0);

    const minusGuestsCount = () => {
        setGuestsCount(guestsCount === 0 ? 0 : guestsCount - 1)
    }

    const plusGuestsCount = () => {
        setGuestsCount(guestsCount + 1)
    }

    return (
        <div className={styles.modal}>
            <div className={styles.modal__details_wrapper}>
                <button
                    className={styles.modal__details_wrapper_close_btn}
                    onClick={() => setModalReserve(null)}
                >
                    <img
                        style={{ width: "12px" }}
                        src="../../public/images/close_btn.png"
                        alt="close btn"
                    />
                </button>

                <div className={styles.modal__details_wrapper_card}>
                    <ApartmentsDetails item={modalReserve} />
                </div>

                <div className={styles.modal__details_wrapper_guests}>
                    <img
                        className={styles.modal__details_wrapper_guests_icon}
                        src="../../public/images/bed_icon.png"
                        alt="bed icon"
                    />

                    <IoIosArrowBack
                        className={styles.modal__details_wrapper_guests_btn}
                        onClick={minusGuestsCount}
                    />

                    <div
                        className={styles.modal__details_wrapper_guests_count}
                    >
                        {guestsCount}
                    </div>

                    <IoIosArrowForward
                        className={styles.modal__details_wrapper_guests_btn}
                        onClick={plusGuestsCount}
                    />
                </div>

                <button
                    className={styles.modal__details_wrapper_btn}
                    onClick={() => setModalReserve(null)}
                >
                    Забронювати
                </button>
            </div>
        </div>
    )
}