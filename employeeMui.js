
const ReactDOM = require('react-dom');

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
import { lighten } from '@material-ui/core/styles/colorManipulator';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';

const toolbarStyles = theme => ({
    root: {
      paddingRight: theme.spacing.unit,
    },
    highlight:
      theme.palette.type === 'light'
        ? {
            color: theme.palette.secondary.main,
            backgroundColor: lighten(theme.palette.secondary.light, 0.85),
          }
        : {
            color: theme.palette.text.primary,
            backgroundColor: theme.palette.secondary.dark,
          },
    spacer: {
      flex: '1 1 100%',
    },
    actions: {
      color: theme.palette.text.secondary,
    },
    title: {
      flex: '0 0 auto',
    },
  });

let EnhancedTableToolbar = props => {
    const { numSelected, classes } = props;
  
    return (
      <Toolbar
        className={classNames(classes.root, {
          [classes.highlight]: numSelected > 0,
        })}
      >
        <div className={classes.title}>
          {numSelected > 0 ? (
            <Typography color="inherit" variant="subheading">
              {numSelected} selected
            </Typography>
          ) : (
            <Typography variant="title" id="tableTitle">
              Family
            </Typography>
          )}
        </div>
        <div className={classes.spacer} />
        <div className={classes.actions}>
          {numSelected > 0 ? (
            <Tooltip title="Delete">
              <IconButton aria-label="Delete">
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          ) : (
            <Tooltip title="Filter list">
              <IconButton aria-label="Filter list">
                {/* <FilterListIcon /> */}
              </IconButton>
            </Tooltip>
          )}
        </div>
      </Toolbar>
    );
  };
  
  EnhancedTableToolbar.propTypes = {
    classes: PropTypes.object.isRequired,
    numSelected: PropTypes.number.isRequired,
  };

EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar);

const rows = [
    { id: 'firstName', numeric: false, disablePadding: true, label: 'First Name' },
    { id: 'lastName', numeric: false, disablePadding: true, label: 'Last Name' },
    { id: 'description', numeric: false, disablePadding: true, label: 'Description' },    
  ];

class EnhancedTableHead extends React.Component {
    
    render() {
        // const {pageData, onSelectAllClick, numSelected, rowCount, order, orderBy } = this.props;
        const {order, orderBy } = this.props;
        return (
            <TableHead>
                <TableRow>
                <TableCell padding="checkbox">
                    {/* <Checkbox
                    // indeterminate={numSelected > 0 && numSelected < rowCount}
                    checked={
                        // numSelected === rowCount ||
                        (
                            pageData.size === rowCount
                            // (pageData.size === rowCount) ||
                            // (pageData.totalElements === numSelected)
                        )
                    }
                    onChange={onSelectAllClick}
                    /> */}
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
    // onRequestSort: PropTypes.func.isRequired,
    // numSelected: PropTypes.number.isRequired,
    // onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.string.isRequired,
    orderBy: PropTypes.string.isRequired,
    // rowCount: PropTypes.number.isRequired,
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
        // this.handleInput =  this.handleInput.bind(this);
        this.state = {
            order:'asc',
            orderBy:'firstName',
            selected:[],
            newSelected:[],                        

        }
    }

    handleSelectAllClick(event){
        const { employees } = this.props;
        const { selected } = this.state;
        let newSelected = employees.map(employee => employee._links.self.href);
        if(event.target.checked){
            // this.setState({ selected: employees.map(employee => employee._links.self.href), isSelectedAll: true }
            this.setState({ selected: selected.concat(newSelected)  });                        
            return;
        }

        // employees.map(employee => employee._links.self.href)
        this.setState({ selected: []});

    }

    handleClick(event, id) {
        let {selected } = this.state;
        const {pageData } = this.props;
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];
        
        this.setState({currentPage:  pageData.number});
        
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
        const {pageData, employees, links, classes } = this.props;        
        const { theme } = this.props;
        const { selected } = this.state

        var pagination = <Pagination updatePageSize={this.props.updatePageSize} links={links} onNavigate={this.props.onNavigate} />
        return (
            <Paper className={classes.root}>            
            <EnhancedTableToolbar numSelected={selected.length} />
             <div className={classes.tableWrapper}>
                <Table className={classes.table}>
                <EnhancedTableHead
                    numSelected={selected.length}
                    order={this.state.order}
                    orderBy={this.state.orderBy}
                    onSelectAllClick={this.handleSelectAllClick}
                    rowCount={employees.length}                    
                    pageData={pageData}
                   // isSelectedAll={this.state.isSelectedAll}
                />
                <TableBody >                        
                        {employees.map(employee => {
                        const isSelected = this.isSelected(employee._links.self.href);                        
                        
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
