import React, { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import App from '../App';
import { Login } from '../pages/Login';
import { Error } from '../pages/Error';
import { persistColorSchema, persistComponentTheme, persistTheme, readColorSchema, readComponentTheme, readTheme } from '../service/LocalStorageService'

const AppWrapper = (props: any) => {
    const defaultColorSchema = readColorSchema() ?? 'dark'
    const defaultTheme = readTheme() ?? 'blue'
    const defaultComponentTheme = readComponentTheme() ?? 'blue'


    const [colorScheme, setColorScheme] = useState<string>(() => defaultColorSchema);
    const [theme, setTheme] = useState(() => defaultTheme);
    const [componentTheme, setComponentTheme] = useState(() => defaultComponentTheme);

    let location = useLocation();




    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);

    const onColorSchemeChange = (scheme: string) => {
        changeStyleSheetUrl('layout-css', 'layout-' + scheme + '.css', 1);
        changeStyleSheetUrl('theme-css', 'theme-' + scheme + '.css', 1);
        setColorScheme(scheme);
        persistColorSchema(scheme);
    };

    const changeStyleSheetUrl = (id: any, value: any, from: any) => {
        const element = document.getElementById(id) as HTMLInputElement;
        const urlTokens = (element.getAttribute('href') as String).split('/');

        if (from === 1) {
            // which function invoked this function - change scheme
            urlTokens[urlTokens.length - 1] = value;
        } else if (from === 2) {
            // which function invoked this function - change color
            urlTokens[urlTokens.length - 2] = value;
        }

        const newURL = urlTokens.join('/');

        replaceLink(element, newURL);
    };

    const onMenuThemeChange = (theme: string) => {
        const layoutLink = document.getElementById('layout-css');
        const href = '/assets/layout/css/' + theme + '/layout-' + colorScheme + '.css';

        replaceLink(layoutLink, href);
        setTheme(theme);
        persistTheme(theme)
    };

    const onComponentThemeChange = (theme: string) => {
        const themeLink = document.getElementById('theme-css');
        const href = '/assets/theme/' + theme + '/theme-' + colorScheme + '.css';

        replaceLink(themeLink, href);
        setComponentTheme(theme);
        persistComponentTheme(theme)
    };

    const replaceLink = (linkElement: any, href: string, callback?: any) => {
        const id = linkElement.getAttribute('id');
        const cloneLinkElement = linkElement.cloneNode(true);

        cloneLinkElement.setAttribute('href', href);
        cloneLinkElement.setAttribute('id', id + '-clone');

        linkElement.parentNode.insertBefore(cloneLinkElement, linkElement.nextSibling);

        cloneLinkElement.addEventListener('load', () => {
            linkElement.remove();
            const _linkElement = document.getElementById(id);
            _linkElement && _linkElement.remove();
            cloneLinkElement.setAttribute('id', id);

            if (callback) {
                callback();
            }
        });
    };

    useEffect(() => {
        // color schema
        changeStyleSheetUrl('layout-css', 'layout-' + defaultColorSchema + '.css', 1);
        changeStyleSheetUrl('theme-css', 'theme-' + defaultColorSchema + '.css', 1);

        // theme
        const layoutLink = document.getElementById('layout-css');
        const themeHref = '/assets/layout/css/' + defaultTheme + '/layout-' + defaultColorSchema + '.css';

        replaceLink(layoutLink, themeHref);

        // component theme
        const themeLink = document.getElementById('theme-css');
        const compThemeHref = '/assets/theme/' + defaultComponentTheme + '/theme-' + defaultColorSchema + '.css';

        replaceLink(themeLink, compThemeHref);
        // eslint-disable-next-line
    }, [])
    return (
        <>
            <Routes>
                <Route path="/error" element={<Error colorScheme={colorScheme} />} />
                <Route path="/login" element={<Login colorScheme={colorScheme} />} />
                <Route path="*" element={<App colorScheme={colorScheme} onColorSchemeChange={onColorSchemeChange} componentTheme={componentTheme} onComponentThemeChange={onComponentThemeChange} theme={theme} onMenuThemeChange={onMenuThemeChange} />} />
            </Routes>
        </>
    );
};

export default AppWrapper;
