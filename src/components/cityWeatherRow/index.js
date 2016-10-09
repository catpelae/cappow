import React from 'react';
import styles from './style.scss';


export default class CityWeatherRow extends React.Component {
    static propTypes = {
        city: React.PropTypes.string.isRequired,
        weather:React.PropTypes.object,
    }

    render() {
        console.log(styles);
        return (
            // let weatherText = this.props.weather.weather
            <div className={styles.main}>
                <div className={styles.weathercard}>
                    <span>{this.props.city}</span>
                    <ul>
                        <li>Temp: {this.props.weather.main.temp}</li>
                        <li>Pressure: {this.props.weather.main.pressure}</li>
                        <li>Humidity: {this.props.weather.main.humidity}</li>
                                                
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