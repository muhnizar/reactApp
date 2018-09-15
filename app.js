'use strict';

const React = require('react');
const ReactDOM = require('react-dom');

// import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import EmployeeMui from './employeeMui';
import Demo from './demo';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {employees: [], attributes: [], pageSize: 2, links: {}, pageData: {} };        
        this.onNavigate = this.onNavigate.bind(this);
    }

    onNavigate(uri){
        this.fetchJSON(uri).then(employeeCollection => {
            this.setState({
                employees: employeeCollection._embedded.employees,
                 // attributes: this.state.attributes,
                pageSize: this.state.pageSize,
                links: employeeCollection._links,
                pageData: employeeCollection.page                
            });
        }).catch(error => {
            console.log(error)
        });
    }

    fetchJSON(...args) {
        return fetch(...args)
            .then(response => {
                if (!response.ok) {
                    throw new Error('HTTP error ' + response.status);
                }
                return response.json();
            });
    }

    fetchSchema(url) {
        return this.fetchJSON(url, {
            headers: new Headers({
                'Accept': 'application/schema+json'
            })
        });
    }

    loadFromServer(pageSize){
        Promise.all([
            this.fetchJSON('http://localhost:8080/api/employees?size='+pageSize),
            this.fetchSchema('http://localhost:8080/api/profile/employees')]
        ).then(([empResponse, schema]) => {
            this.schema = schema;
            this.setState({
                order: 'asc',
                orderBy: 'firstName',
                employees: empResponse._embedded.employees,
                attributes: Object.keys(schema.properties),
                pageSize: pageSize,
                links: empResponse._links,
                page: 0,
                selected: [],
                pageData: empResponse.page
            })
        }).catch(error => {
            console.log(error)
        });
    }
 
    componentDidMount() {
        this.loadFromServer(this.state.pageSize);
    }
    
    render() {
        return (        
            <div>
                <EmployeeMui 
                employees = {this.state.employees} 
                links = {this.state.links}  
                onNavigate = {this.onNavigate}
                pageData = {this.state.pageData}
                />
        {/* <EmployeeList 
            employees = {this.state.employees}  
            links = {this.state.links}    
            onNavigate = {this.onNavigate}      
        /> */}
        {/* <Button variant="contained" color="primary">
            Hello World
        </Button> */}
        </div>
        
        )        
    }
}


class EmployeeList extends React.Component {
    constructor(props) {
        super(props);        
        this.handleNavFirst = this.handleNavFirst.bind(this);
        this.handleNavPrev = this.handleNavPrev.bind(this);
        this.handleNavNext = this.handleNavNext.bind(this);
        this.handleNavLast = this.handleNavLast.bind(this);
    }

    handleNavFirst(e){
        e.preventDefault();
        this.props.onNavigate(this.props.links.first.href);
    }

    handleNavPrev(e){
        e.preventDefault();
        this.props.onNavigate(this.props.links.prev.href);
    }

    handleNavNext(e){        
        e.preventDefault();
        this.props.onNavigate(this.props.links.next.href);
    }

    handleNavLast(e){
        e.preventDefault();
        this.props.onNavigate(this.props.links.last.href);
    }
    

    
    render(){
        var employees = this.props.employees.map(employee =>
            <Employee key={employee._links.self.href} employee={employee}/>
        );
        const { classes } = props;
        var navLinks = [];
        if ("first" in this.props.links){
            navLinks.push(<button onClick={this.handleNavFirst} key="first">&lt;&lt;</button>)
        }
        if ("prev" in this.props.links){
            navLinks.push(<button onClick={this.handleNavPrev} key="prev">&lt;</button>)
        }
        if ("next" in this.props.links){
            navLinks.push(<button onClick={this.handleNavNext} key="next">&gt;</button>)
        }
        if ("last" in this.props.links){
            navLinks.push(<button onClick={this.handleNavLast} key="last">&gt;&gt;</button>)
        }

        return (
        // <div>
        //     <table>
        //         <tbody>
        //         <tr>
        //             <th>First Name</th>
        //             <th>Last Name</th>
        //             <th>Description</th>        
        //         </tr>
        //         {employees}
        //         </tbody>
        //     </table>            
        //     <div> 
        //         {navLinks}
        //     </div>
        // </div>
        <Paper className={classes.root}> 
            <Table className={classes.table}>
                <TableHead>
                <TableRow>
                    <TableCell>First Name</TableCell>
                    <TableCell >Last Name</TableCell>
                    <TableCell >Description</TableCell>                
                </TableRow>
            </TableHead> 
            <TableBody>
                {employees}
            </TableBody>  
            </Table>                  							
        </Paper> 
        )
    }
}

class Employee extends React.Component {
    constructor(props) {
        super(props);        
    }

    render(){
        return (
            <TableRow>
                  <TableCell>{this.props.employee.firstName}</TableCell>
                  <TableCell>{this.props.employee.lastName}</TableCell>
                  <TableCell>{this.props.employee.description}</TableCell>  
            </TableRow>     
          )

    }
}

ReactDOM.render(
    <App />,
    // <Demo />,
    document.getElementById('react')
)
