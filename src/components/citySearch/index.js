import React from 'react';
import styles from './style.scss';

export default class CitySearch extends React.Component {
  static propTypes = {
    city: React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func.isRequired,
    onClick: React.PropTypes.func.isRequired,
  }

  render() {
    return (
      <div className={styles.main}>
        <h4 className={styles.search}>Type in cities to compare</h4>
        <input className={styles.input} ref="cityInput" type="text" value={this.props.city}
          onChange={ () => {
            const inputValue = this.refs.cityInput.value;
            this.props.onChange(inputValue);
          }}
        />

        <button
          onClick={ () => {
            const inputValue = this.refs.cityInput.value.trim();
            const inputArray = inputValue.split(' ');
            this.props.onClick(inputArray);
          }}
        >
            Search
        </button>
      </div>
    );
  }
}
