import React from 'react';
import {
    Link,
    Typography
} from '@material-ui/core';

function Footer(props) {

    const { isEnglish } = props;

    return (
        <footer>
            <Typography id="copyright" variant="overline">
                {isEnglish ? "Copyright": "Derechos de Autor"} &copy; <Link href="https://www.github.com/VctorAHernndez" target="_blank" rel="noopener noreferrer">Víctor Hernández</Link> { new Date().getFullYear() }
            </Typography>
        </footer>
    )
}

export default Footer;