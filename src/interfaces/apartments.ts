export interface Img {
    id: number,
    src: string,
    alt: string,
}

export interface Apartments {
    id: string,
    title: string,
    lat: number,
    lng: number,
    price: string,
    adress: string,
    city: string,
    img: Img[],
    zoomLevel: number[],
}