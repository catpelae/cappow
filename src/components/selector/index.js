import React from 'react';
import styles from './style.scss';

export default class Selector extends React.Component {
  static propTypes = {
    sortSelection: React.PropTypes.string.isRequired,
    handleSelect: React.PropTypes.func.isRequired,
  }

  render() {
    return (
      <div className={styles.main}>
        <label for="selector"> Sort by:</label>
        <select id="selector" ref="selected" value={this.props.sortSelection}
          onChange={ () => {
            const selected = this.refs.selected.value;
            this.props.handleSelect(selected);
            }}>
            <option value="name">City</option>
            <option value="temp">Temperature</option>
            <option value="pressure">Pressure</option>
            <option value="humidity">Humidity</option>
        </select>
      </div>
    );
  }
}
