import React, { useState } from 'react';
import {
    GridList, 
    GridListTile,
    Button,
    IconButton,
    Dialog,
    GridListTileBar,
    DialogTitle,
    DialogContent,
    DialogActions,
    withWidth,
    isWidthUp,
    Typography,
    Divider,
    Box,
    Link,
    isWidthDown,
} from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info';
import GridLoader from 'react-spinners/GridLoader';
import Doggo from './Doggo';
import RestaurantCard from './RestaurantCard';

function RestaurantList(props) {

    const { restaurants, isLoading, isEnglish, firstSearch } = props;

    const [ state, setState ] = useState({
        open: false,
        currentRest: ''
    });

    function handleOpen(rest) {
        setState({ open: true, currentRest: rest });
    }

    function handleClose() {
        setState({ open: false, currentRest: '' });
    }

    function getGridListCols() {
        if(isWidthUp('xl', props.width)) {
            return 5;
        }
        if(isWidthUp('lg', props.width)) {
            return 4;
        }
        if(isWidthUp('md', props.width) || isWidthUp('sm', props.width)) {
            return 3;
        }
        return 2; // xs
    }

    let grid;
    if(isLoading) {
        grid = (
            <div className="spinner-wrapper">
                <GridLoader 
                    loading={isLoading}
                    color={"#777"}
                    size={30}
                />
            </div>
        );
    } else {
        if(restaurants.length > 0) {
            grid = (
                <GridList cols={getGridListCols()} style={{maxWidth: "100vw"}}>
                    {restaurants.map(rest => (
                        <GridListTile
                            title={rest.name}
                            key={rest.id}
                        >
                            <img src={rest.imageURL} alt={rest.name + " image"} />
                            <GridListTileBar 
                                title={rest.name}
                                subtitle={<span>{rest.city}</span>}
                                actionIcon={
                                    <IconButton aria-label={"info about " + rest.name} onClick={() => { handleOpen(rest) }}>
                                        <InfoIcon className="info-icon" />
                                    </IconButton>
                                }
                            />
                        </GridListTile>
                    ))}
                </GridList>
            );
        } else {
            grid = (
                <div className="doggo-wrapper">
                    <Doggo firstSearch={firstSearch} isEnglish={isEnglish} />
                </div>
            );
        }
    }
        

    return (
        <div className="restaurant-list">
            {grid}
            <Dialog
                open={state.open}
                onClose={handleClose}
                maxWidth="sm"
            >
                <DialogTitle id="restaurant-title"><strong>{state.currentRest.name ? state.currentRest.name : "No Title"}</strong></DialogTitle>
                <Divider />
                <DialogContent>
                    <Box display="flex" justifyContent="center">
                        <a href={state.currentRest.url} target="_blank" rel="noopener noreferrer">
                            <img className="restaurant-img" src={state.currentRest.imageURL} alt={state.currentRest.name + " restaurant image"} />
                        </a>
                    </Box>
                    <br/>
                    <RestaurantCard isEnglish={isEnglish} currentRest={state.currentRest}/>
                    <br/><br/>
                    <Typography id="restaurant-description" variant="body2" color="textSecondary">
                        {state.currentRest.description}
                    </Typography>
                    <br/>
                </DialogContent>
                {isWidthDown('xs', props.width) && <Divider />}
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        {isEnglish ? "Close" : "Cerrar"}
                    </Button>
                    <Button color="primary" autoFocus>
                        <Link id="more-info" href={state.currentRest.url} target="_blank" rel="noopener noreferrer">
                            {isEnglish ? "More Info" : "Más Info"}
                        </Link>
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default withWidth()(RestaurantList);