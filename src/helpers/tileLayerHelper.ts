interface Data {
    url: string,
    attribution: string,
}

export const data: Data = {
    url: "https://api.maptiler.com/maps/winter-v2/256/{z}/{x}/{y}.png?key=CeX3B6d8Db9FVZpa8e8v",
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
};


export const dataDark: Data = {
    url: "https://api.maptiler.com/maps/backdrop/256/{z}/{x}/{y}.png?key=CeX3B6d8Db9FVZpa8e8v",
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
};