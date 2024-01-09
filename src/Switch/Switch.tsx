import { useEffect } from "react";
import Switcher from "react-switch";
import { useCustomContext } from "../helpers/customContext";

export const Switch = () => {

    const { theme, setTheme } = useCustomContext();

    useEffect(() => {
        localStorage.setItem('theme', theme);
        document.getElementById('theme')?.setAttribute('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prevTheme) => {
            return prevTheme === 'light' ? 'dark' : 'light';
        });
    };

    return (
        <>
            <Switcher
                onChange={toggleTheme}
                checked={theme === 'light'}
                uncheckedIcon={false}
                checkedIcon={false}
                handleDiameter={18}
                activeBoxShadow={'0 0 0 0 #fff'}
                onColor={'#DDDD'}
                height={24}
            />
        </>
    );
};
