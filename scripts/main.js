const CALC_COMPONENTS = {
    'zero': '0', 
    'one': '1', 
    'two': '2', 
    'three': '3', 
    'four': '4', 
    'five': '5', 
    'six': '6', 
    'seven': '7', 
    'eight': '8', 
    'nine': '9', 
    'decimal': '10', 
    'add': '+', 
    'subtract': '-', 
    'multiply': '×', 
    'divide': '/', 
    'equals': '=', 
    'clear': 'AC'
};

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            prevVal: '',
            currVal: 0
        };
    }

    render() {
        const COMPONENTS = Object.entries(CALC_COMPONENTS).map((e) => {
            return <button id={e[0]} key={e[0]}>{e[1]}</button>
        });

        return (
            <div id="project-container">
                <div id="display">
                    <p id="prev-input">Previous Input</p>
                    <p id="user-input">1234567890123456789012</p>
                </div>
                {COMPONENTS}
            </div>
        );
    }
}



ReactDOM.render(<App />, document.getElementById('app'));