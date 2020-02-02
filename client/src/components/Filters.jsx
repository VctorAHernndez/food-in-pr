import React, { Component } from 'react';
import {
    FormControl,
    InputLabel,
    TextField,
    Select,
    MenuItem,
    Switch,
    FormControlLabel,
    Box,
    Divider,
    Hidden,
    isWidthUp,
    withWidth
} from '@material-ui/core/';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const styles = theme => ({
    root: {
        margin: theme.spacing(1),
        width: 150
    },
    keywords: {
        margin: theme.spacing(1),
        width: "80%"
    }
});

class Filters extends Component {

    constructor(props) {
        super(props);
        this.state = {
            keyword: '',
            category: '',
            area: '',
            environment: '',
            sortField: 'rating',
            descending: true
        };
    }

    static propTypes = {
        classes: PropTypes.object.isRequired
    };

    handleChange(event) {
        if(this.props.firstSearch) this.props.handleFirstSearch();
        const { name, value } = event.target;
        this.setState({ [name]: value }, () => this.props.setRestaurants(this.state));
    }

    render() {

        const { classes, isEnglish } = this.props;

        return (
            <div>
                <Box
                    display="flex"
                    justifyContent="center" 
                    m={1} 
                    p={1} 
                    bgcolor="background.paper" 
                    border={1} 
                    borderColor="grey.300" 
                    borderRadius="borderRadius"
                >
                    <FormControl fullWidth className={classes.keywords}>
                        <TextField
                            name="keyword"
                            value={this.state.keyword}
                            onChange={this.handleChange.bind(this)}
                            label={isEnglish ? "Keyword" : "Palabra Clave"}
                            autoComplete="off"                        
                        />
                    </FormControl>
                </Box>
                <Box
                    display="flex"
                    justifyContent="center"
                    flexDirection={isWidthUp('sm', this.props.width) ? "row" : "column"}
                    m={1}
                    p={1}
                    bgcolor="background.paper"
                    border={1}
                    borderColor="grey.300"
                    borderRadius="borderRadius"
                >

                    <FormControl 
                        style={isWidthUp('sm', this.props.width) ? {} : { width: "calc(100% - 16px)"}}
                        className={classes.root}
                    >
                        <InputLabel>{isEnglish ? "Category" : "Categoría"}</InputLabel>
                        <Select
                            name="category"
                            value={this.state.category}
                            onChange={this.handleChange.bind(this)}
                        >
                            <MenuItem value="">{isEnglish ? "Choose Category" : "Escoja Categoría"}</MenuItem>
                            <Divider />
                            <MenuItem value="Árabe">{isEnglish ? "Arab" : "Árabe"}</MenuItem>
                            <MenuItem value="Argentina">{isEnglish ? "Argentine" : "Argentina"}</MenuItem>
                            <MenuItem value="Asiática">{isEnglish ? "Asian" : "Asiática"}</MenuItem>
                            {/* <MenuItem value="Bebidas">{isEnglish ? "Drinks" : "Bebidas"}</MenuItem> */}
                            <MenuItem value="Café">{isEnglish ? "Coffee" : "Café"}</MenuItem>
                            <MenuItem value="Cervezas">{isEnglish ? "Beer" : "Cervezas"}</MenuItem>
                            <MenuItem value="Vinos">{isEnglish ? "Wine" : "Vinos"}</MenuItem>
                            <MenuItem value="Brunch">Brunch</MenuItem>
                            <MenuItem value="Burgers">{isEnglish ? "Burgers" : "Hamburguesas"}</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl 
                        style={isWidthUp('sm', this.props.width) ? {} : { width: "calc(100% - 16px)"}}
                        className={classes.root}
                    >
                        <InputLabel>{isEnglish ? "Area" : "Área"}</InputLabel>
                        <Select
                            name="area"
                            value={this.state.area}
                            onChange={this.handleChange.bind(this)}
                        >
                            <MenuItem value="">{isEnglish ? "Choose Area" : "Escoja Área"}</MenuItem>
                            <Divider />
                            <MenuItem value="Centro">{isEnglish ? "Central" : "Centro"}</MenuItem>
                            <MenuItem value="Este">{isEnglish ? "East" : "Este"}</MenuItem>
                            <MenuItem value="Metro">Metro</MenuItem>
                            <MenuItem value="Norte">{isEnglish ? "North" : "Norte"}</MenuItem>
                            <MenuItem value="Oeste">{isEnglish ? "West" : "Oeste"}</MenuItem>
                            <MenuItem value="Sur">{isEnglish ? "South" : "Sur"}</MenuItem>
                        </Select>
                    </FormControl>
                    
                    <FormControl 
                        style={isWidthUp('sm', this.props.width) ? {} : { width: "calc(100% - 16px)"}}
                        className={classes.root}
                    >
                        <InputLabel>{isEnglish ? "Environment" : "Ambiente"}</InputLabel>
                        <Select
                            name="environment"
                            value={this.state.environment}
                            onChange={this.handleChange.bind(this)}
                        >
                            <MenuItem value="">{isEnglish ? "Choose Environment" : "Escoja Ambiente"}</MenuItem>
                            <MenuItem value="Bistro">{isEnglish ? "Bistro" : "Bistró"}</MenuItem>
                            <MenuItem value="Casual">Casual</MenuItem>
                            <MenuItem value="Familiar">{isEnglish ? "Family Friendly" : "Familiar"}</MenuItem>
                            <MenuItem value="Fine Dining">{isEnglish ? "Fine Dining" : "Fino"}</MenuItem>
                            <MenuItem value="Fonda">{isEnglish ? "Inn" : "Fonda"}</MenuItem>
                            <MenuItem value="Guagüita">{isEnglish ? "Food Truck" : "Guagüita"}</MenuItem>
                            {/* <MenuItem value="Franquicia">{isEnglish ? "Fast Food" : "Franquicia"}</MenuItem> */}
                            <MenuItem value="Lounge">{isEnglish ? "Lounge" : "Salón"}</MenuItem>
                            <MenuItem value="Mesón Gastronómico">{isEnglish ? "Meson" : "Mesón"}</MenuItem>
                        </Select>
                    </FormControl>
                    
                    <Hidden smDown>
                        <FormControl className={classes.root}>
                            <InputLabel>{isEnglish ? "Sort by" : "Ordenar por"}</InputLabel>
                            <Select
                                name="sortField"
                                value={this.state.sortField}
                                onChange={this.handleChange.bind(this)}
                            >
                                <MenuItem value="rating">{isEnglish ? "Rating" : "Puntuación"}</MenuItem>
                                <MenuItem value="title">{isEnglish ? "Name" : "Nombre"}</MenuItem>
                                <MenuItem value="precio">{isEnglish ? "Price" : "Precio"}</MenuItem>
                            </Select>
                        </FormControl>
                        
                        <FormControlLabel 
                            control={
                                <Switch
                                    onChange={() => this.setState({ descending: !this.state.descending }, () => this.props.setRestaurants(this.state))}
                                    color="primary"
                                />
                            }
                            className="switch-label"
                            label={ isEnglish ? (this.state.descending ? "Descending" : "Ascending") : (this.state.descending ? "Descendente" : "Ascendente") }
                            labelPlacement="top"
                        />
                    </Hidden>      
                            
                </Box>
            </div>
        );
    }
}

export default withWidth()(withStyles(styles)(Filters));