import React, { Component } from 'react';
import './styles.scss';

class InputForm extends Component {
    render() {
        const { type, name, inputRef } = this.props;
        return (
            <div className="input-auth">
                <div className="label">{name}</div>
                <input className="auth"
                    type="text"
                    placeholder={name}
                    ref={inputRef}
                />
            </div>
        )
    }
}

export default InputForm
