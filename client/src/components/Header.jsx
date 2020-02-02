import React from 'react';
import Typography from '@material-ui/core/Typography';

function Header(props) {
    
    const { isEnglish } = props;

    const descriptionEnglish = "Simple search tool for places to eat in Puerto Rico.";

    const descriptionSpanish = "Herramienta de búsqueda para restaurantes en Puerto Rico.";

    return (
        <header>
            <Typography id="lead-title" variant="h2">
                <span role="img" aria-label="puerto rico flag">🇵🇷</span> Food in PR!
            </Typography>
            <Typography id="lead-subtitle" variant="body1">
                {isEnglish ? descriptionEnglish : descriptionSpanish}
            </Typography>
        </header>
    )
}

export default Header;