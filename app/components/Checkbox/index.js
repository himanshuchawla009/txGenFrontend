import React, { Component, PropTypes } from 'react';

class Checkbox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isChecked: false,
    };
  }


  toggleCheckboxChange = () => {
    const { handleCheckboxChange, label } = this.props;

    this.setState(({ isChecked }) => (
      {
        isChecked: !isChecked,
      }
    ));

    handleCheckboxChange(label);
  }

  render() {
    const { label } = this.props;
    const { isChecked } = this.state;

    return (
      <li>
        <div className="checkbox">
          <label htmlFor="togg">
            <input
              name="togg"
              type="checkbox"
              value={label}
              checked={isChecked}
              onChange={this.toggleCheckboxChange}
            />
            {label}
          </label>
        </div>
      </li>
    );
  }
}

Checkbox.propTypes = {
  label: PropTypes.string.isRequired,
  handleCheckboxChange: PropTypes.func.isRequired,
};

export default Checkbox;
