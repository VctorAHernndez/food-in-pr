import React from 'react';
import { 
    Card,
    CardContent
} from '@material-ui/core';

function Doggo(props) {

    const { isEnglish, firstSearch } = props;

    const firstSearchEnglish = "Many settings.\nAm amused.\nPlay around.";

    const otherSearchEngish = "Am scare.\nSo concern.\nNo results.";

    const firstSearchSpanish = "Varias opción.\nMuy impresión.\nPresiónate cosas.";

    const otherSearchSpanish = "Mucho susto.\nVarias preocupación.\nNingún resultado.";

    return (
        <Card variant="outlined" className="card">
            <CardContent>
                <div className="card-content">
                    <pre>{isEnglish ? (firstSearch ? firstSearchEnglish : otherSearchEngish) : (firstSearch ? firstSearchSpanish : otherSearchSpanish)}</pre>
                    <img className="doggo-img" src="https://www.svgrepo.com/show/40092/cat.svg" alt="doggo"/>
                </div>
            </CardContent>
        </Card>
    )
}

export default Doggo;