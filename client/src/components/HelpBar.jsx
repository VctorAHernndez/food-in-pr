import React, { useState } from 'react';
import {
    BottomNavigationAction,
    BottomNavigation,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button,
    Link,
    Typography,
    Divider,
    Box
} from '@material-ui/core';
import { 
    GitHub,
    Twitter,
    Instagram,
    HelpOutline,
    Translate
} from '@material-ui/icons';

function HelpBar(props) {

    const { isEnglish, changeLanguage } = props;
    const [ value, setValue ] = useState(0);
    const [ open, setOpen ] = useState(false);

    function toggle() {
        setOpen(!open);
    }

    const SALEnglish = (
        <span>
            <Link href="https://www.sal.pr" target="_blank" rel="noopener noreferrer">SAL!</Link> is one of the main local sources of content about gastronomy and entertainment in Puerto Rico. Their database contains over 1,300 restaurants and their platforms receive over 100,000 montly visits. All content provided is owned by <Link href="https://www.sal.pr" target="_blank" rel="noopener noreferrer">SAL!</Link> and their affiliates.
        </span>
    );

    const SALSpanish = (
        <span>
            <Link href="https://www.sal.pr" target="_blank" rel="noopener noreferrer">SAL!</Link> es una de las principales fuentes de contenido sobre gastronomía y entretenimiento en Puerto Rico. Su base de datos contiene más de 1,300 restaurantes y sus plataformas reciben más de 100,000 visitas mensuales. Todo el contenido provisto es propiedad de <Link href="https://www.sal.pr" target="_blank" rel="noopener noreferrer">SAL!</Link> y de sus afiliados.
        </span>
    );

    const theWhatEnglish = "This is a small project I built, which consists of a small API written on Node.js and a simple (yet intuitive) front end built on React.js";

    const theWhatSpanish = "Este es un pequeño proyecto que construí que consiste de una simple API escrita en Node.js junto a una simple (aunque intuitiva) interfaz hecha con React.js";

    const theWhyEnglish = (
        <span>
            <span>
                I was searching for places to eat in Puerto Rico via Yelp. At the time, not even restaurants that I knew of were in their databases, so I decided on using a local website (<Link href="https://www.sal.pr" target="_blank" rel="noopener noreferrer">www.sal.pr</Link>, which was more up-to-date) to build an app that can provide the information I was looking for.
            </span>
            <br/><br/><br/>
            <span>
                <em className="left-ahem"><strong>*ahem*</strong></em> I also didn't like SAL!'s UI very much. <em className="right-ahem"><strong>*ahem*</strong></em>
            </span>
            <br/><br/>
        </span>
    );

    const theWhySpanish = (
        <span>
            <span>
                Estaba buscando lugares de comer en Puerto Rico a través de Yelp. En el momento, ni siquiera encontraba restaurantes de los cuales ya conocía, así que decidí usar una página web (<Link href="https://www.sal.pr" target="_blank" rel="noopener noreferrer">www.sal.pr</Link>, que estaba más al día) para construir una app que pueda proveer la información que estaba buscando.
            </span>
            <br/><br/><br/>
            <span>
                <em className="left-ahem"><strong>*ejem*</strong></em> Tampoco me agradababa tanto la interfaz de SAL! <em className="right-ahem"><strong>*ejem*</strong></em>
            </span>
            <br/><br/>
        </span>
    );

    const theHowEnglish = (
        <span>
            The API basically scrapes information from one of SAL!'s webpages and serves it at a specified endpoint (namely, <code>/api/restaurants</code>) in the form of JSON, which you can play with easily. My approach fetches up to 30 restaurants at a time with the provided specifications (category, area, etc.)
        </span>
    );

    const theHowSpanish = (
        <span>
            La API básicamente "raspa" la información de una de las páginas web de SAL! y las sirve en un "endpoint" (esto es, <code>/api/restaurants</code>) en formato JSON, con la que se puede jugar fácilmente. Mi implementación recoge hasta 30 restaurantes a la vez con las especificaciones dadas (categoría, área, etc.)
        </span>
    );

    return (
        <div>
            <BottomNavigation
                className="bottom-navigation"
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                    if(event.currentTarget.id === "language") {
                        changeLanguage();
                    } else if(event.currentTarget.id === "help") {
                        toggle();
                    }
                }}
                showLabels
            >
                <BottomNavigationAction id="language" label={isEnglish ? "Español" : "English"} icon={<Translate />} />
                <BottomNavigationAction id="help" icon={<HelpOutline />} />
            </BottomNavigation>
            <Dialog
                open={open}
                onClose={toggle}
                maxWidth="lg"
            >
                <DialogTitle><strong>{isEnglish ? "About the App" : "Sobre el App"}</strong></DialogTitle>
                <Divider />
                <DialogContent className="dialog-content">
                    <br/>
                    <Typography variant="h6">
                        {isEnglish ? "Powered by" : "Habilitado por"} 
                        <Link href="https://www.sal.pr" target="_blank" rel="noopener noreferrer">
                            <img className="sal-img" src="https://scontent.fsig3-1.fna.fbcdn.net/v/t1.0-9/20664770_10150821097674982_3650242597050936832_n.png?_nc_cat=104&_nc_ohc=8k-QPqcs6kEAX_Ab7BQ&_nc_ht=scontent.fsig3-1.fna&oh=a9e90cced8358cfe09d0c5b67d529640&oe=5E9506C4" alt="sal pr"/>
                        </Link>
                    </Typography>
                    <br/>
                    <Typography color="textSecondary" variant="body1">
                        {isEnglish ? SALEnglish : SALSpanish}
                    </Typography>
                    <br/>
                    <Typography variant="h6">
                        {isEnglish ? "The What" : "El Qué"}
                    </Typography>
                    <br/>
                    <Typography color="textSecondary" variant="body1">
                        {isEnglish ? theWhatEnglish : theWhatSpanish}
                    </Typography>
                    <br/>
                    <Typography variant="h6">
                        {isEnglish ? "The Why" : "El Porqué"}
                    </Typography>
                    <br/>
                    <Typography color="textSecondary" variant="body1">
                        {isEnglish ? theWhyEnglish : theWhySpanish}
                    </Typography>
                    <br/>
                    <Typography variant="h6">
                        {isEnglish ? "The How" : "El Cómo"}
                    </Typography>
                    <br/>
                    <Typography color="textSecondary" variant="body1">
                        {isEnglish ? theHowEnglish : theHowSpanish}
                    </Typography>
                    <br/>
                    <br/>
                    <br/>
                    <Typography variant="h6">
                        {isEnglish ? "Check me out online!" : "¡Sígueme en línea!"}
                    </Typography>
                    <br/>
                    <Box display="flex" justifyContent="space-around" width="100%">
                        <Link className="social-links" color="textSecondary" href="https://www.github.com/VctorAHernndez" target="_blank" rel="noopener noreferrer"><GitHub /></Link>
                        <Link className="social-links" color="textSecondary" href="https://www.twitter.com/vctorahernndez" target="_blank" rel="noopener noreferrer"><Twitter /></Link>
                        <Link className="social-links" color="textSecondary" href="https://www.instagram.com/vctorahernndez/" target="_blank" rel="noopener noreferrer"><Instagram /></Link>
                    </Box>
                    <br/>
                    <Typography variant="overline">
                        <Link href="http://vhernandez.me" target="_blank" rel="noopener noreferrer">Víctor Hernández</Link>
                    </Typography>
                    <br/>
                    <br/>
                </DialogContent>
                <Divider />
                <DialogActions>
                    <Button onClick={toggle} color="primary">
                        {isEnglish ? "Close" : "Cerrar"}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default HelpBar;