import React from 'react';
import styles from './style.scss';

export default class Selector extends React.Component {
    static propTypes = {
        selection: React.PropTypes.string.isRequired,
        handleSelect: React.PropTypes.func.isRequired,
    }

    render() {
        return (
            // let weatherText = this.props.weather.weather
            <div className={styles.main}>
                <select ref="selected" value={this.props.selection} 
                    onChange={ (e) => {
                        console.log("sorting selected");
                        const selected = this.refs.selected.value;
                        this.props.handleSelect(selected);
                    }}>
                    <option value="name">City</option>
                    <option value="temp">Temperature</option>
                    <option value="minTemp">MinTemp</option>
                    <option value="maxTemp">MaxTemp</option>
                </select>
            </div>
        );
    }
}