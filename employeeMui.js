import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, withTheme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Pagination from './pagination';


const rows = [
    { id: 'firstName', numeric: false, disablePadding: true, label: 'First Name' },
    { id: 'lastName', numeric: false, disablePadding: false, label: 'Last Name' },
    { id: 'description', numeric: false, disablePadding: false, label: 'Description' },    
  ];

class EnhancedTableHead extends React.Component {
    render() {
        const {order, orderBy, numSelected, rowCount } = this.props;

        return (
            <TableHead>
                <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                    indeterminate={numSelected > 0 && numSelected < rowCount}
                    checked={numSelected === rowCount}
                    // onChange={onSelectAllClick}
                    />
                </TableCell>
                {rows.map(row => {
                    return (
                    <TableCell
                        key={row.id}
                        numeric={row.numeric}
                        padding={row.disablePadding ? 'none' : 'default'}
                        sortDirection={orderBy === row.id ? order : false}
                    >
                        <Tooltip
                        title="Sort"
                        placement={row.numeric ? 'bottom-end' : 'bottom-start'}
                        enterDelay={300}
                        >
                        <TableSortLabel
                            active={orderBy === row.id}
                            direction={order}
                            onClick={this.createSortHandler(row.id)}
                        >
                            {row.label}
                        </TableSortLabel>
                        </Tooltip>
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
    // onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.string.isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
  };


const CustomTableCell = withStyles(theme => ({
head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
},
body: {
    fontSize: 14,
    
},
}))(TableCell);

const styles = theme => ({
    root: {
      width: '70%',
      marginTop: theme.spacing.unit * 3,
      overflowX: 'auto',
    },
    table: {
      minWidth: 500,
    },
    row: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.background.black,
      },
    },
  });

class CustomizedTable extends React.Component {
    constructor(props) {
        super(props);                
    }

    render(){
        const { classes } = this.props;        
        const { theme } = this.props;
        const { employees, links } = this.props;

        
        var pagination = <Pagination links={links} onNavigate={this.props.onNavigate} />
        return (
            <Paper className={classes.root}>
                <Table className={classes.table}>
                {/* <TableHead>
                    <TableRow>
                    <CustomTableCell >First Name</CustomTableCell>
                    <CustomTableCell >Last Name</CustomTableCell>
                    <CustomTableCell >Description</CustomTableCell>                    
                    </TableRow>
                </TableHead> */}

                <EnhancedTableHead
                    // numSelected={selected.length}
                    order={order}
                    orderBy={orderBy}
                    // onSelectAllClick={this.handleSelectAllClick}
                    rowCount={employees.length}
                />
                <TableBody >
                        {employees.map(employee => {
                        return (
                            <TableRow className={classes.row} key={employee._links.self.href}>
                                <CustomTableCell padding="none" component="th" scope="row">{employee.firstName}</CustomTableCell>
                                <CustomTableCell padding="none" component="th" scope="row">{employee.lastName}</CustomTableCell>
                                <CustomTableCell padding="none" component="th" scope="row">{employee.description}</CustomTableCell>
                            </TableRow>
                            );
                        })}
                </TableBody>
                </Table>
                {pagination}
      </Paper>
        )
    }
}

CustomizedTable.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
  };

export default withStyles(styles, { withTheme: true })(CustomizedTable);
