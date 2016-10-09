import React from 'react';
import styles from './style.scss';


export default class CityWeatherRow extends React.Component {
    static propTypes = {
        city: React.PropTypes.string.isRequired,
        weather:React.PropTypes.object,
    }

    render() {
        return (
            // let weatherText = this.props.weather.weather
            <div className={styles.main}>
                <div className="weathercard">
                    <span>{this.props.city}</span>
                    <ul>
                        <li>Temp: {this.props.weather.main.temp}</li>
                        <li>MinTemp: {this.props.weather.main.temp_min}</li>
                        <li>MaxTemp: {this.props.weather.main.temp_max}</li>
                        <li>Pressure: {this.props.weather.main.pressure}</li>
                        { this.props.weather.weather.map((text, index) => (
                            <li key={index}>
                                <span> weatherText: {text.main} </span>
                                <span>weatherText: {text.description} </span>
                                <span>weatherIcon: {text.icon} </span>
                            </li>
                        ))}
                       
                    </ul> 
                </div>
            </div>
        );
    }
}