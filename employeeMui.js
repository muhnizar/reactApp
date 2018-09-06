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

// var id = 0;
// function createData(name, calories, fat, carbs, protein) {
//     id += 1;
//     return { id, name, calories, fat, carbs, protein };
//   }

// const rows = [
// createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
// createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
// createData('Eclair', 262, 16.0, 24, 6.0),
// createData('Cupcake', 305, 3.7, 67, 4.3),
// createData('Gingerbread', 356, 16.0, 49, 3.9),
// ];  



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
        const { employees } = this.props;
        const { links } = this.props;
        const { theme } = this.props;
        var pagination = <Pagination links={links} onNavigate={this.props.onNavigate} />
        return (
            <Paper className={classes.root}>
                <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                    <CustomTableCell >First Name</CustomTableCell>
                    <CustomTableCell >Last Name</CustomTableCell>
                    <CustomTableCell >Description</CustomTableCell>                    
                    </TableRow>
                </TableHead>
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
