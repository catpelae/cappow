// React Hot Reload does not support stateless function components as of now
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { connect } from 'react-redux';
// import _ from 'lodash';

import CitySearch from '../../components/citySearch';
import {updateCity} from '../../redux/citySearch';

import { requestMultipleCities } from '../../redux/cityWeather';
import CityWeatherRow from '../../components/cityWeatherRow';

import Selector from '../../components/selector';
import { updateSort } from '../../redux/citySorting';

import styles from './style.scss';

function mapStateToProps(state) {
    return { 
        city: state.citySearch.cityName,
        weather: state.cityWeather,
        sortSelection: state.citySorting.sorting,
        // requested: state.requested
    };
}

function mapDispatchToProps(dispatch) {
    return {
        onChange: (cityName) => {
            dispatch(updateCity(cityName))
        },
        onClick: (cityNames) => {
            dispatch(requestMultipleCities(cityNames))
        },
        handleSorting: (sortSelection) => {
            dispatch(updateSort(sortSelection))
        }
    };
}

@connect(mapStateToProps, mapDispatchToProps)
export default class Start extends Component {
    render() {
        // console.log(this.props.weather.length > 0);    
        // console.log(!this.props.weather && "string");
        return (
            <div className={ styles.main }>
                <div className="header">
                    <h1>Weather App</h1>
                    <h2>A Comparative weather app</h2>
                </div>
                <CitySearch city={this.props.city} onChange={this.props.onChange} onClick={this.props.onClick} />
                <Selector handleSelect={this.props.handleSorting}  sortSelection={this.props.sortSelection} />

                { this.props.weather.cities.map((city) => (
                    <CityWeatherRow city={city.name} weather={city} />
                ))}

            </div>
        );
    }
}