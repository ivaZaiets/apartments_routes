import { useState } from 'react';
import { useCustomContext } from '../helpers/customContext';

import styles from './ModalAdvertising.module.scss';
import cn from 'classnames';

export const ModalAdvertising = () => {
    const {
        query,
        price,
        adress,
        city,
        setIsClose,
        setQuery,
        setAdress,
        setPrice,
        setCity,
    } = useCustomContext();

    const [hasQueryError, setQueryError] = useState(false);
    const [hasPriceErrorMessage, setPriceErrorMessage] = useState(false);
    const [hasAdressErrorMessage, setAdressErrorMessage] = useState(false);
    const [hasCityErrorMessage, setCityErrorMessage] = useState(false);

    const pricePattern = /^\d+$/;
    const priceMaxLengthPattern = /^\d{1,5}$/;

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        if (!query ||
            !price ||
            !adress ||
            !city ||
            !pricePattern.test(price) ||
            !priceMaxLengthPattern.test(price)
        ) {
            setQueryError(!query);
            setPriceErrorMessage(
                !price ||
                !pricePattern.test(price) ||
                !priceMaxLengthPattern.test(price)
            );
            setAdressErrorMessage(!adress);
            setCityErrorMessage(!city);
            return;
        }

        setIsClose(true);
    }

    const priceErrorMessage = () => {
        if (!price && hasPriceErrorMessage) {
            return <p className={styles.modal__details_wrapper_error_message}>
                Вкажіть, будь ласка, ціну
            </p>
        } else if (!pricePattern.test(price) && hasPriceErrorMessage) {
            return <p className={styles.modal__details_wrapper_error_message}>
                Некоректний формат
            </p>
        } else if (!priceMaxLengthPattern.test(price) && hasPriceErrorMessage) {
            return <p className={styles.modal__details_wrapper_error_message}>
                Максимальна довжина - 5
            </p>
        }
    }

    const isEmptyErrorMessages = (
        value: string,
        stateValue: boolean,
        message: string,
    ) => {
        if (!value && stateValue) {
            return <p className={styles.modal__details_wrapper_error_message}>
                Вкажіть, будь ласка, {message}
            </p>
        }
    }

    return (
        <div className={styles.modal}>
            <form
                className={styles.modal__details_wrapper}
                onSubmit={handleSubmit}
            >

                {isEmptyErrorMessages(query, hasQueryError, 'назву')}

                <input
                    className={cn(styles.modal__details_wrapper_field, {
                        [styles['modal__details_wrapper_field_error']]: hasQueryError
                    })}
                    onChange={(event) => {
                        setQuery(event.target.value);
                        setQueryError(false);
                    }}
                    value={query}
                    placeholder='Введіть назву'
                    type="text"
                />

                {isEmptyErrorMessages(adress, hasAdressErrorMessage, 'адресу')}

                <input
                    className={cn(styles.modal__details_wrapper_field, {
                        [styles['modal__details_wrapper_field_error']]: hasAdressErrorMessage
                    })}
                    onChange={(event) => {
                        setAdress(event.target.value);
                        setAdressErrorMessage(false);
                    }}
                    value={adress}
                    placeholder='Введіть адресу'
                    type="text"
                />

                {priceErrorMessage()}

                <input
                    className={cn(styles.modal__details_wrapper_field, {
                        [styles['modal__details_wrapper_field_error']]: hasPriceErrorMessage
                    })}
                    onChange={(event) => {
                        setPrice(event.target.value);
                        setPriceErrorMessage(false);
                    }}
                    value={price}
                    placeholder='Введіть ціну'
                    type="text"
                />

                {isEmptyErrorMessages(city, hasCityErrorMessage, 'місто')}

                <input
                    className={cn(styles.modal__details_wrapper_field, {
                        [styles['modal__details_wrapper_field_error']]: hasCityErrorMessage
                    })}
                    onChange={(event) => {
                        setCity(event.target.value);
                        setCityErrorMessage(false);
                    }}
                    value={city}
                    placeholder='Введіть місто'
                    type="text"
                />

                <button
                    className={styles.modal__details_wrapper_btn}
                >
                    Здати в оренду
                </button>
            </form>
        </div>
    )
}