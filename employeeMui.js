import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles, withTheme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Pagination from './pagination';
import Checkbox from '@material-ui/core/Checkbox';

const rows = [
    { id: 'firstName', numeric: false, disablePadding: true, label: 'First Name' },
    { id: 'lastName', numeric: false, disablePadding: true, label: 'Last Name' },
    { id: 'description', numeric: false, disablePadding: true, label: 'Description' },    
  ];

class EnhancedTableHead extends React.Component {
    
    render() {
        const {isSelectedAll ,onSelectAllClick, order, orderBy, numSelected, rowCount } = this.props;
        return (
            <TableHead>
                <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                    // indeterminate={numSelected > 0 && numSelected < rowCount}
                    checked={isSelectedAll}
                    onChange={onSelectAllClick}
                    />
                </TableCell>
                {rows.map(row => {
                    return (
                    <TableCell component="th" scope="row"
                        key={row.id}
                        numeric={row.numeric}
                        padding={row.disablePadding ? 'none' : 'default'}
                        sortDirection={orderBy === row.id ? order : false}
                    >       
                     {row.label}                 
                    </TableCell>
                    );
                }, this)}
                </TableRow>
            </TableHead>            
        )
    }

}

EnhancedTableHead.propTypes = {
    // numSelected: PropTypes.number.isRequired,
    // onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.string.isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
  };


// const CustomTableCell = withStyles(theme => ({
// head: {
//     backgroundColor: theme.palette.common.black,
//     color: theme.palette.common.white
// },
// body: {
//     fontSize: 14,
    
// },
// }))(TableCell);

// const styles = theme => ({
//     root: {
//       width: '70%',
//       marginTop: theme.spacing.unit * 3,
//       overflowX: 'auto',
//     },
//     table: {
//       minWidth: 500,
//     },
//     row: {
//       '&:nth-of-type(odd)': {
//         backgroundColor: theme.palette.background.black,
//       },
//     },
//   });

  const styles = theme => ({
    root: {
      width: '100%',
      marginTop: theme.spacing.unit * 3,
    },
    table: {
      minWidth: 1020,
    },
    tableWrapper: {
      overflowX: 'auto',
    },    
    row: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.background.black        
      }        
    },
    cell: {
        whiteSpace: "normal",
        width: '30%',                                         
        wordWrap: "break-word"
    }
  });

class CustomizedTable extends React.Component {
    
    constructor(props) {
        super(props);                
        this.handleSelectAllClick = this.handleSelectAllClick.bind(this);
        this.state = {
            order:'asc',
            orderBy:'firstName',
            selected:[],
            isSelectedAll: false
            // employees: this.props.employees            
        }
    }

    handleSelectAllClick(event){
        const { employees } = this.props;
        
        if(event.target.checked){
            this.setState({ selected: employees.map(employee => employee._links.self.href), isSelectedAll: true }
            
        );
                        
            return;
        }
        this.setState({ selected: [], isSelectedAll: false});

    }

    handleClick(event, id) {
        const { selected } = this.state;
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];
    
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

    isSelected = id => this.state.selected.indexOf(id) !== -1;
    // isSelected = function(id){
    //     return this.state.selected.indexOf(id) !== -1;
    // }
    render(){
        const { classes } = this.props;        
        const { theme,selected } = this.props;
        const { employees, links } = this.props;

        var pagination = <Pagination links={links} onNavigate={this.props.onNavigate} />
        return (
            <Paper className={classes.root}>
             <div className={classes.tableWrapper}>
                <Table className={classes.table}>
                <EnhancedTableHead
                    // numSelected={selected.length}
                    order={this.state.order}
                    orderBy={this.state.orderBy}
                    onSelectAllClick={this.handleSelectAllClick}
                    rowCount={employees.length}                    
                    isSelectedAll={this.state.isSelectedAll}
                />
                <TableBody >
                        {employees.map(employee => {
                        const isSelected = this.isSelected(employee._links.self.href) || this.state.isSelectedAll;
                        return (                            
                            <TableRow 
                                    role="checkbox"
                                    hover
                                    key={employee._links.self.href}
                                    onClick={event => this.handleClick(event, employee._links.self.href)}
                                    selected={isSelected}
                                    aria-checked={isSelected}                            >
                                <TableCell padding="checkbox">
                                    <Checkbox  checked={isSelected} />
                                </TableCell>
                                <TableCell className={classes.cell} component="td" scope="row" padding="none">
                                        {employee.firstName}
                                </TableCell>
                                <TableCell className={classes.cell} component="td" scope="row" padding="none" >
                                        {employee.lastName}
                                </TableCell>
                                <TableCell className={classes.cell} component="td" scope="row" padding="none">
                                        {employee.description}
                                </TableCell>
                            </TableRow>
                            );
                        })}
                </TableBody>
                </Table>
                </div>
                {pagination}
      </Paper>
        )
    }
}

CustomizedTable.propTypes = {
    classes: PropTypes.object.isRequired,
    // theme: PropTypes.object.isRequired,
  };

export default withStyles(styles)(CustomizedTable);
