// React Hot Reload does not support stateless function components as of now
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { connect } from 'react-redux';

import CitySearch from '../../components/citySearch';
import { updateCity } from '../../redux/citySearch';

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
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onChange: (cityName) => {
      dispatch(updateCity(cityName));
    },
    onClick: (cityNames) => {
      dispatch(requestMultipleCities(cityNames));
    },
    handleSorting: (sortSelection) => {
      dispatch(updateSort(sortSelection));
    },
  };
}

@connect(mapStateToProps, mapDispatchToProps)
export default class Start extends Component {
  static propTypes = {
    city: React.PropTypes.string.isRequired,
    weather: React.PropTypes.object.isRequired,
    sortSelection: React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func.isRequired,
    onClick: React.PropTypes.func.isRequired,
    handleSorting: React.PropTypes.func.isRequired,
  }

  render() {
    let cities = this.props.weather.cities;

    cities = cities.sort((a, b) => {
      switch (this.props.sortSelection) {
        case 'name':
          return a.name > b.name;

        case 'temp':
          return a.main.temp - b.main.temp;

        case 'pressure':
          return a.main.pressure - b.main.pressure;

        case 'humidity':
          return a.main.humidity - b.main.humidity;

        default:
          break;
      }

      return 0;
    });

    return (
      <div className={ styles.main }>
        <div className="header">
          <h1>CappaW</h1>
          <h2>A Comparative weather app</h2>
        </div>
        
        <div className={ styles.searchComponents}>
          <CitySearch city={this.props.city} onChange={this.props.onChange} onClick={this.props.onClick} />
          <Selector handleSelect={this.props.handleSorting} sortSelection={this.props.sortSelection} />
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
