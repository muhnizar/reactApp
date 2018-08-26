'use strict';

const React = require('react');
const ReactDOM = require('react-dom')


class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {employees: [], attributes: [], pageSize: 3, links: {}};        
    }

    // tag::follow-2[]
    loadFromServer(pageSize) {
        
        fetch('http://localhost:8080/api/employees')
        .then(response => {
            return fetch('http://localhost:8080/api/profile/employees',
            {
                headers: new Headers({
                'Accept': 'application/schema+json'
              })
            }).then(schema => {
                return Promise.all([response.json(), schema.json()]);
            });

       }).then(responses =>             
            this.setState(
                {
                employees: responses[0]._embedded.employees,
                attributes: Object.keys(responses[1].properties),
                pageSize: pageSize,
                links: responses[0]._links}                      
            )
        );          
    }
 
    componentDidMount() {
        this.loadFromServer(this.state.pageSize);
    }
    
    render() {

    
        return (
            <ul>
            {this.state.employees.map(employee =>
            <li key={employee.firstName}> {employee.firstName} </li>               
            )}
          </ul>
        )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('react')
)