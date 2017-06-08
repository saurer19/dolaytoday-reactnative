import React, { Component } from 'react';
import {
    View,
    Text,
} from 'react-native';
import Style from './Style';
import InputButton from './InputButton';
import { Actions } from 'react-native-router-flux';

const inputButtons = [
    [1, 2, 3 ],
    [4, 5, 6 ],
    [7, 8, 9],
    ['',0,''],
    ['-> $', 'ce', '-> Bs'],
];

export default class ReactCalculator extends Component {

    constructor(props) {
        super(props);

        this.initialState = {
            previousInputValue: 0,
            inputValue: 0,
        };

        this.state = this.initialState;
    }

    render() {
        return (
            <View style={Style.rootContainer}>
                <View style={Style.displayContainer}>
                    <Text style={Style.displayText}>{this.state.inputValue}</Text>
                </View>
                <View style={Style.inputContainer}>
                    {this._renderInputButtons()}
                </View>
            </View>
        );
    }

    _renderInputButtons() {

        let views = inputButtons.map((row, idx) => {
            let inputRow = row.map((buttonVal, columnIdx) => {
                return <InputButton
                            value={buttonVal}
                            onPress={this._onInputButtonPressed.bind(this, buttonVal)}
                            key={'butt-' + columnIdx} />;
            });
            return <View style={Style.inputRow} key={'row-' + idx}>{inputRow}</View>;
        });

        return views;
    }

    _onInputButtonPressed(input) {
        switch (typeof input) {
            case 'number':
                return this._handleNumberInput(input);
            default:
                return this._handleStringInput(input);
        }
    }

    _handleNumberInput(num) {
        let inputValue = (this.state.inputValue * 10) + num;

        this.setState({
            inputValue: inputValue
        });
    }
 _handleStringInput(str) {
        switch (str) {
            case '-> $':
                inputValue = this.state.inputValue,
                previousInputValue = this.state.previousInputValue;
                inputValue/=this.props.dolar
                this.setState({
                    previousInputValue: 0,
                    inputValue: inputValue.toFixed(2),
                });
                break;

            case '-> Bs':
                inputValue = this.state.inputValue,
                previousInputValue = this.state.previousInputValue;
                inputValue*=this.props.dolar
                this.setState({
                    previousInputValue: 0,
                    inputValue: inputValue.toFixed(2),
                });
                break;

            case 'ce':
                this.setState(this.initialState);
                break;
            case 'Back':
                Actions.home();
                break;
            


        }
    }
    

}
