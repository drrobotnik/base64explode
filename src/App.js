import React, {Fragment} from 'react';
import POWERMODE from 'html-activate-power-mode'
import 'animate.css';
import './App.css';


class BaseEncodeInputs extends React.Component {
    state = {
        decoded: '',
        encoded: '',
        bad: false,
        border: '#ccc'
    };

    componentDidMount() {
        POWERMODE.colorful = true // open particle animation, default open
        POWERMODE.shake = true // open shake, default close
        POWERMODE.shakeSize = 5 // set shake intensity, default 1.5
        document.addEventListener('input', POWERMODE);
    }

    componentWillUnmount() {
        document.removeEventListener('input', POWERMODE);
    }

    updateOutput = (event) => {
        this.setState({
            encoded: window.btoa(event.target.value),
            decoded: event.target.value,
            border: `#${Math.floor(Math.random()*16777215).toString(16)}`,
        });
    };

    hideBad = () => {
        this.setState({
            bad: false,
        });
    }

    updateInput = (event) => {
        
        try {
            this.setState({
                encoded: event.target.value,
                decoded: window.atob(event.target.value),
                border: `#${Math.floor(Math.random()*16777215).toString(16)}`,
            });
        } catch (error) {
            this.setState((prevState) => ({
                bad: prevState.bad !== true,
            }));

            setTimeout(this.hideBad, 250);
        }
    };

    render() {
        return (
            <Fragment>
            {this.state.bad && (<div className="animated-no"><div className="no">No</div></div>)}
            <div className="container">
            
            <div className="inputs">
                <textarea placeholder="ENCODE 💥" style={{borderColor: this.state.border}} className="moose" onChange={(event) => this.updateOutput(event)} value={this.state.decoded} />
                <br />
                <textarea placeholder="DECODE 🤯" className="output" style={{borderColor: this.state.border}} onChange={(event) => this.updateInput(event)} value={this.state.encoded} />
            </div>
            <div className="adSpot" style={{borderColor: this.state.border}}>ad</div>
            </div>
            </Fragment>
        );
    }
}

const ExitInterstitial = (props) => {
    return (
        <div className="exiting">
            <div onClick={() => {window.location.href = 'http://buymeacoffee.com/drrobotnik'}}>
            <h2 className="thirsty">Thirsty</h2>
            <div className="asinbeer"><span role="img">🍺</span></div>
            <a className="bmcBtn" target="_blank" rel="noopener noreferrer" href="http://buymeacoffee.com/drrobotnik"><span className="bmc-btn-text">Buy me a Beer</span></a>
            </div>
            <div className="close" onClick={() => props.handleClose()}>No, Gross</div>
        </div>
    );
}

class App extends React.Component {

    state = {
        exiting: false,
        exited: false,
    }

    closeExiting = () => {
        this.setState({
            exiting: false,
            exited: true,
        });
    }

    handleExiting = (e) => {
        e.preventDefault();
        this.setState({
            exiting: true
        });
    }

    componentDidMount() {
        document.addEventListener('mouseleave', this.handleExiting, false);
    }

    render() {
        return (
            <div className="App">
                <h1><span className="title">Base64</span><span className="explosionContainer"><span className="explosion">explosion</span></span> <span role="img">👊</span></h1>
                <div>
                    <BaseEncodeInputs />
                </div>
                {!this.state.exited && this.state.exiting && (
                    <ExitInterstitial handleClose={this.closeExiting} />
                )}
            </div>
        );
    }
}

export default App;
