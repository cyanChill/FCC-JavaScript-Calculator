const CALC_COMPONENTS = {
    'zero': {
        display: '0',
        type: 'num',
    }, 
    'one': {
        display: '1',
        type: 'num',
    }, 
    'two': {
        display: '2',
        type: 'num',
    }, 
    'three': {
        display: '3',
        type: 'num',
    }, 
    'four': {
        display: '4',
        type: 'num',
    }, 
    'five': {
        display: '5',
        type: 'num',
    }, 
    'six': {
        display: '6',
        type: 'num',
    }, 
    'seven': {
        display: '7',
        type: 'num',
    },  
    'eight': {
        display: '8',
        type: 'num',
    },  
    'nine':  {
        display: '9',
        type: 'num',
    }, 
    'decimal': {
        display: '.',
        type: 'decimal',
    }, 
    'add': {
        display: '+',
        type: 'operator',
    },  
    'subtract': {
        display: '-',
        type: 'operator',
    },  
    'multiply': {
        display: '×',
        type: 'operator',
    },
    'divide': {
        display: '/',
        type: 'operator',
    }, 
    'clear': {
        display: 'AC',
        type: 'clear',
    },
};

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            totalVal: '',
            currVal: '0',
            prevComputed: 0,
            prevEntry: '',
            hasDecimal: false,
        };
        this.handleAction = this.handleAction.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    /* 
        - Limit user-input to 22 numbers/operators ✔️
        - Need click events for each button ✔️
        - Make sure we can't repeat decimals (or a check for updating input)
        - If we click an operator after another operator, we use the latest operator (excluding minus symbol because of negatives)
            - We can have (operator) (minus)
            - We can have (minus) (minus)
            - If we do (minus) (minus) (times), this turns to (times) for example [eliminate the minus]
    */

    // Handle the click events
    handleAction(event) {
        const action = event.target.id;

        if (action === 'clear') {
            this.setState({
                totalVal: '',
                currVal: '0',
                prevComputed: 0,
                prevEntry: '',
                hasDecimal: false,
            });
        } else {
            let invalid = false;
            const currIn = CALC_COMPONENTS[action];
            const {totalVal, currVal, prevEntry} = this.state;
            let newTotalVal = totalVal != '0' ? totalVal + currIn.display : currIn.display;
            let newCurrVal = currVal != '0' ? currVal + currIn.display : currIn.display;
                
            // If we follow up on an operator with a number
            if (currIn.type === 'num' && prevEntry.type === 'operator') {
                newCurrVal = currIn.display;
            }

            // If input is an operator
            if (currIn.type === 'operator') {
                let prvIdx = totalVal.length - 1;
                let twoBefore = totalVal[prvIdx - 1];

                // If input is subtraction
                if (currIn.display === '-') {
                    if (prevEntry.display === '-' && (twoBefore === '-' || twoBefore === '+' || twoBefore === '/' || twoBefore === '×')) {
                        newTotalVal = totalVal;
                    }
                    newCurrVal = '-';
                // If input ins't subtraction
                } else if (newTotalVal.length > 1) {
                    // 2 operators in a row
                    if (prevEntry.type === 'operator') {
                        // Special case if we already have 2 operators before our current operator input
                        if (twoBefore === '-' || twoBefore === '+' || twoBefore === '/' || twoBefore === '×') {
                            prvIdx -= 1
                        }
                        newTotalVal = totalVal.substr(0, prvIdx) + currIn.display;
                    }
                    newCurrVal = currIn.display;
                }
                this.setState({ hasDecimal: false });
            }

            // Checks for correct decimal placements
            if (currIn.type === 'decimal') {
                if (this.state.hasDecimal == true) {
                    invalid = true;
                } else {
                    if (prevEntry.type === 'operator' || currVal === '0') {
                        newTotalVal = totalVal === '' ? '0.' : currVal === '0' ? totalVal + '.' : totalVal + '0.';
                        newCurrVal = '0.';
                    }
                    this.setState({ hasDecimal: true });
                }
            }  

            // Check if input length is at most 22 characters long or input is invalid
            if (newCurrVal.length > 22 || invalid) {
                newTotalVal = totalVal;
                newCurrVal = currVal;
            }
            
            this.setState({
                totalVal: newTotalVal,
                currVal: newCurrVal,
                prevEntry: currIn,
            });
        }
    }


    // Handle final calculations
    handleSubmit(event) {
        console.log("Doing calculations");
        
    }



    render() {
        const COMPONENTS = Object.entries(CALC_COMPONENTS).map((e) => {
            return <button id={e[0]} key={e[0]} onClick={this.handleAction}>{e[1].display}</button>
        });

        return (
            <div id="project-container">
                <div id="display">
                    <p id="prev-input">{this.state.totalVal}</p>
                    <p id="user-input">{this.state.currVal}</p>
                </div>
                {COMPONENTS}
                <button id="equals" onClick={this.handleSubmit}>=</button>
            </div>
        );
    }
}



ReactDOM.render(<App />, document.getElementById('app'));