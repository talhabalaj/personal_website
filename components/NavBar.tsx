import React, { useState, useEffect } from 'react';
import Link from 'next/link';

import styles from './NavBar.module.scss';


const HandburgerButton = ({ open }: { open: boolean }): JSX.Element => (
    <div className={`${styles.handbugerbutton} ${open ? styles.open : ''}`}>
        <div>&nbsp;</div>
        <div>&nbsp;</div>
        <div>&nbsp;</div>
    </div>
)

export default function NavBar() {
    const [displaying, setDisplay] = useState(false);
    const [scrolled, setScroll] = useState(false);

    const links = {
        '#about': 'About',
        '#skills': 'Skills',
        '#work': 'Work',
        '#projects': 'Projects',
        '#contact': 'Contact',
    }

    const [active, setActive] = useState('#about');

    useEffect(() => {
        const currentPage = window.location.hash;
        if (currentPage != '')
            setActive(`${currentPage}`);

        window.onscroll = (event) => {
            const scrollPos = window.pageYOffset;
            if (scrollPos > 100) {
                setScroll(true);
            } else {
                setScroll(false);
            }
            Object.keys(links).forEach(link => {
                const element: HTMLElement = document.querySelector(link);
                if (element != null && scrollPos >= element.offsetTop && element.offsetTop + element.clientHeight > scrollPos) {
                    setActive(link);
                }
            });
        }
        return () => window.onscroll = null;
    }, []);

    return (
        <>
            <input
                type="checkbox"
                name="handburger"
                id="menubutton"
                className={styles.handburgerCheckbox}
                checked={displaying}
                onChange={(e) => setDisplay(e.target.checked)}
                hidden
            />
            <div className={`${styles.handburgerMenuButton} ${scrolled ? styles.scrolling : ''}`}>
                <label htmlFor="menubutton" >
                    <HandburgerButton open={displaying} />
                </label>
            </div>
            <nav className={styles.navbar}>
                <ul>
                    {Object.keys(links).map(
                        (key) => (
                            <li key={key}>
                                <Link href={key}>
                                    <a className={key == active ? styles.active : ''} onClick={() => setDisplay(false)} >{links[key]}</a>
                                </Link>
                            </li>
                        )
                    )}
                </ul>
            </nav>
        </>
    );
}