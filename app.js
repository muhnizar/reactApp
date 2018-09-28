'use strict';

const React = require('react');
const ReactDOM = require('react-dom');
const stompClient = require('./websocket-listener');
// import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import EmployeeMui from './employeeMui';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {employees: [], attributes: [], pageSize: 2, links: {}, pageData: {}, selected: [] };        
        this.onNavigate = this.onNavigate.bind(this);
        this.updatePageSize = this.updatePageSize.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.refreshCurrentPage = this.refreshCurrentPage.bind(this);
    }

    refreshCurrentPage(message) {

        this.fetchJSON('http://localhost:8080/api/employees?size=2&page='+this.state.pageData.number).then(employeeCollection => {
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

    handleClick(event, id) {
        // let {selected } = this.props;
        // const {pageData } = this.props;
        
        const {selected } = this.state;
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];
        
        // this.setState({currentPage:  pageData.number});
        
        if (selectedIndex === -1) {
          newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
          newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
          newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
          newSelected = newSelected.concat(
            selected.slice(0, selectedIndex),
            selected.slice(selectedIndex + 1)
          );
        }

        this.setState({ selected: newSelected });
    };

    onDelete(employee) {        
        fetch(employee, {
            method:'DELETE'
        }).then((json) => {            
            this.setState({selected: []});
            this.loadFromServer(this.state.pageSize);
        }).catch(error => {
            console.log(error)
        })
    }

    updatePageSize(pageSize) {
		if (pageSize !== this.state.pageSize) {
			this.loadFromServer(pageSize);
		}
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
                pageData: empResponse.page
            })
        }).catch(error => {
            console.log(error)
        });
    }
 
    componentDidMount() {
        this.loadFromServer(this.state.pageSize);

        stompClient.register([
            {route: '/topic/newEmployee', callback: this.refreshCurrentPage},
            {route: '/topic/updateEmployee', callback: this.refreshCurrentPage},
            {route: '/topic/deleteEmployee', callback: this.refreshCurrentPage}
        ]);
    }
        
    render() {
        return (        
            <div>
                <EmployeeMui 
                employees = {this.state.employees} 
                links = {this.state.links}  
                onNavigate = {this.onNavigate}
                updatePageSize = {this.updatePageSize}
                pageData = {this.state.pageData}
                onDelete = {this.onDelete}
                selected = {this.state.selected}
                onClick = {this.handleClick}                
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
    

        // follow(client, root, [{
        //     rel: 'employees',
        //     params: {
        //         size: this.state.pageSize,
        //         page: this.state.page.number
        //     }
        // }]).then(employeeCollection => {
        //     this.links = employeeCollection.entity._links;
        //     this.page = employeeCollection.entity.page;
    
        //     return employeeCollection.entity._embedded.employees.map(employee => {
        //         return client({
        //             method: 'GET',
        //             path: employee._links.self.href
        //         })
        //     });
        // }).then(employeePromises => {
        //     return when.all(employeePromises);
        // }).then(employees => {
        //     this.setState({
        //         page: this.page,
        //         employees: employees,
        //         attributes: Object.keys(this.schema.properties),
        //         pageSize: this.state.pageSize,
        //         links: this.links
        //     });
        // });

    
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
