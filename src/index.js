import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import "../node_modules/materialize-css/dist/css/materialize.min.css";
import "../node_modules/materialize-css/dist/js/materialize.min.js";
import "react-materialize";

class Calculator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            weight: -1,
            height: -1,
            bmi: -1,
            age: -1,
        };
    }

    setBMI() {
        const weight = this.state.weight;
        const height = this.state.height / 100;
        const age = this.state.age;
        if (weight >= 1 && height >= 0.01 && age >= 1) {
            let calcBmi = (weight / Math.pow(height, 2));
            let roundBmi = Math.round(calcBmi * 100) / 100;
            this.setState({
                bmi: roundBmi,
            });
        } else {
            this.setState({
                bmi: -1,
            });
        }
    }

    setHeight(event) {
        const heightValue = event.target.value;
        this.setState ({
            height: heightValue,
        }, () => {
            this.setBMI();
        });
    }

    setWeight(event) {
        const weightValue = event.target.value;
        this.setState ({
            weight: weightValue,
        }, () => {
            this.setBMI();
        });
    }

    setAge(event) {
        const ageValue = event.target.value;
        this.setState({
            age: ageValue,
        }, () => {
            this.setBMI();
        });
    }

    getCat(bmi) {
        if (bmi <= 16) {
            return "Dangerously underweight";
        } else if (bmi <= 18.5) {
            return "Underweight";
        } else if (bmi <= 25) {
            return "Normal weight";
        } else if (bmi <= 30) {
            return "Overweight";
        } else if (bmi <= 35) {
            return "Obese";
        } else if (bmi <= 40) {
            return "Strongly obese";
        } else if (bmi >= 40.1) {
            return "Dangerously obese";
        }
    }

    render() {
        const category = this.getCat(this.state.bmi);

        const height = 
            <div className="input-field col s6">
                <input id="Height" type="number" className="validate white-text" onChange={this.setHeight.bind(this)}></input>
                <label htmlFor="Height">Height (cm)</label>
                <span className="helper-text" data-error="Enter a number!"></span>
            </div>
        
        const weight = 
            <div className="input-field col s6">
                <input id="Weight" type="number" className="validate white-text" onChange={this.setWeight.bind(this)}></input>
                <label htmlFor="Weight">Weight (kg)</label>
                <span className="helper-text" data-error="Enter a number!"></span>
            </div>

        const age = 
            <div className="input-field col s6 offset-s3">
                <input id="Age" type="number" className="validate white-text" onChange={this.setAge.bind(this)}></input>
                <label htmlFor="Age">Age</label>
                <span className="helper-text" data-error="Enter a number!"></span>
            </div>

        var result = <div className="row"></div>;

        if (this.state.bmi === -1) {
            result = <div className="row"></div>
        } else if (this.state.age > 60 || this.state.age < 20) {
            result =
            <div className="row">
                <div className="result-warning center-align">Age too low or high. Results will be inaccurate.</div>
            </div>
        } else {
            result =
                <div className="row">
                    <div className="result-label center-align">Your BMI</div>
                    <div className="result-number center-align">{this.state.bmi}</div>
                    <div className="result-label center-align">{category}</div>
                </div>
        }


        return (
            <div className="wrapper">
                <div className="row">
                    <div className="col s8 offset-s2">
                        <div className="card cardGray">
                            <div className="card-content white-text">
                                <span className="card-title center-align center">BMI Calculator</span>
                                <div className="row">
                                    {age}
                                </div>
                                <div className="row">
                                    {height}
                                    {weight}
                                </div>
                                {result}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

ReactDOM.render(<Calculator />, document.getElementById('root'));
