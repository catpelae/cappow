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
        let cities = this.props.weather.cities;
        console.log(this.props.sortSelection);
        cities = cities.sort((a,b) => {
            console.log(a);
            switch (this.props.sortSelection) {
                case 'name':
                    return a.name > b.name;
                    break;

                case 'temp':
                    return a.main.temp - b.main.temp;
                    break;

                case 'pressure':
                    return a.main.pressure - b.main.pressure;
                    break;

                case 'humidity':
                    return a.main.humidity - b.main.humidity;
                    break;
            }
        });

        return (
            <div className={ styles.main }>
                <div className="header">
                    <h1>Weather App</h1>
                    <h2>A Comparative weather app</h2>
                </div>
                <div className={ styles.searchComponents}>
                    <CitySearch city={this.props.city} onChange={this.props.onChange} onClick={this.props.onClick} />
                    <Selector handleSelect={this.props.handleSorting}  sortSelection={this.props.sortSelection} />
                </div>
                <div className={ styles.weatherComponents} >
                    { cities.map((city) => (
                        <CityWeatherRow key={city.name} city={city.name} weather={city} />
                    ))}
                </div>

            </div>
        );
    }
}