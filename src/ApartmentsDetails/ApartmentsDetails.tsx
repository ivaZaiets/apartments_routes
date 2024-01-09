import { useState } from 'react';

import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

import styles from './ApartmentsDetails.module.scss';

import { Apartments } from '../interfaces/apartments';

import { useCustomContext } from '../helpers/customContext';

type Props = {
    item: Apartments | null,
}

export const ApartmentsDetails: React.FC<Props> = ({ item }) => {
    const { setModalReserve } = useCustomContext();

    const [favorites, setFavorites] = useState<number[]>([]);
    const [slide, setSlide] = useState(0);

    const nextSlide = () => {
        setSlide(slide === 2 ? 0 : slide + 1)
    }

    const prevSlide = () => {
        setSlide(slide === 0 ? 2 : slide - 1)
    }

    return (
        <div className={styles.card}>
            <div className={styles.card__top}>
                <div className={styles.card__top_carousel}>
                    <FaArrowLeft
                        className={styles.card__top_carousel_btn_left}
                        onClick={() => nextSlide()}
                    />

                    {item?.img.map(image => (
                        <img
                            onClick={() => setModalReserve(item)}
                            key={image.id}
                            className={
                                slide === image.id ?
                                    styles.card__top_carousel_img :
                                    styles.card__top_carousel_img_hidden
                            }
                            src={image.src}
                            alt={image.alt}
                        />
                    ))}

                    <FaArrowRight
                        className={styles.card__top_carousel_btn_right}
                        onClick={() => prevSlide()}
                    />
                </div>

                <div className={styles.card__top__btn_block}>
                    <button
                        className={styles.card__top__btn_block_favorite_btn}
                        onClick={() => {
                            if (item !== null) {
                                favorites.includes(+item.id) ?
                                    setFavorites(favorites.filter((fav: number) => +item.id !== fav)) :
                                    setFavorites([...favorites, +item.id])
                            }
                        }
                        }
                    >
                        {item && favorites.includes(+item?.id) ? (
                            <img
                                style={{ width: "12px" }}
                                src="../../public/images/favorite_clicked.png"
                                alt="favorite clicked btn"
                            />
                        ) : (
                            <img
                                style={{ width: "12px" }}
                                src="../../public/images/favorite.png"
                                alt="favorite btn"
                            />
                        )}
                    </button>
                </div>
            </div>
            <div className={styles.card__bottom}>
                <h1 className={styles.card__bottom_title}>{item?.title}</h1>
                <p className={styles.card__bottom_adress}>{item?.adress}</p>
                <h2 className={styles.card__bottom_price}>{item?.price}</h2>
                <p className={styles.card__bottom_city}>{item?.city}</p>
            </div>
        </div>
    );
};