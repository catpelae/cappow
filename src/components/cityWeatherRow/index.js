import React from 'react';
import styles from './style.scss';

export default class CityWeatherRow extends React.Component {
  static propTypes = {
    city: React.PropTypes.string.isRequired,
    weather: React.PropTypes.object,
  }

  render() {
    return (
      <div className={styles.main}>
        <div className={styles.weathercard}>
          <div className={styles.cityName}>{this.props.city}</div>

          { this.props.weather.weather.map((text, index) => (
            <div key={index}>
              <div className={styles.weatherIconText}>
                <img src={'http://openweathermap.org/img/w/' + text.icon + '.png'} alt="Weather Icon" />
                <span>{text.main}</span>
              </div>
              <div className={styles.cityTemp}>
                <span>{this.props.weather.main.temp}</span>
              </div>
              <div className={styles.weatherDesc}>{text.description} </div>
            </div>
          ))}

          <div className={styles.extras}>
            <span>Press: {this.props.weather.main.pressure}</span>
            <span>Hum: {this.props.weather.main.humidity}</span>
          </div>
        </div>
      </div>
    );
  }
}
