import React from 'react';
import {
    Grid,
    Card,
    CardContent,
    Typography,
    withWidth,
    isWidthUp,
} from '@material-ui/core';

function RestaurantCard(props) {

    const {isEnglish, currentRest} = props;

    const regular = (
        <Card id="restaurant-card">
            <CardContent>
                <Grid
                    container
                    direction="row"
                    justify="space-around"
                    alignItems="center"
                >
                    <Grid item>
                        <Typography variant="subtitle1">
                            {currentRest.city ? currentRest.city : "N/A"}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            {currentRest.address ? currentRest.address : "N/A"}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="subtitle1">
                            {(isEnglish ? "Price: " : "Precio: ") + (currentRest.price ? currentRest.price : "?")}
                        </Typography>
                        <Typography variant="subtitle1">
                            {(isEnglish ? "Rating: " : "Puntuación: ") + (currentRest.rating ? currentRest.rating : "?") + " / 5"}
                        </Typography>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );

    const vertical = (
        <Card id="restaurant-card">
            <CardContent>
                <Grid
                    container
                    direction="column"
                    justify="center"
                    alignItems="center"
                >
                    <Grid item>
                        <Typography variant="subtitle1">
                            {currentRest.city ? currentRest.city : "N/A"}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography style={{textAlign: "center"}} variant="body2" color="textSecondary" gutterBottom>
                            {currentRest.address ? currentRest.address : "N/A"}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="subtitle1" gutterBottom>
                            {(isEnglish ? "Price: " : "Precio: ") + (currentRest.price ? currentRest.price : "?")}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="subtitle1">
                            {(isEnglish ? "Rating: " : "Puntuación: ") + (currentRest.rating ? currentRest.rating : "?") + " / 5"}
                        </Typography>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );

    return(
        <div>
            {(isWidthUp('sm', props.width)) ? regular : vertical}
        </div>
    );
}

export default withWidth()(RestaurantCard);
                   
                   
                   
                   
                   
                