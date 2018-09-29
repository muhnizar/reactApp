
const ReactDOM = require('react-dom');

import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles, withTheme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
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
import Fade from '@material-ui/core/Fade';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import pagination from './pagination';

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

class EnhancedTableToolbar extends React.Component {
    constructor(props) {
        super(props);                 
        this.handleDelete = this.handleDelete.bind(this);
        this.state = {
                status:'',
                updated:0
            }
    }
    
    handleDelete(event) {
        let {selected, onDelete} = this.props;
        selected.map(employee => {
            onDelete(employee)
        });

        this.setState({ status: 'DELETE', updated:selected.length})

        setTimeout(() => {
            this.setState({
              status: '',
            });
          }, 1000);
    }

    render(){
            const { selected, classes } = this.props;
            const {updated ,status} = this.state;
            let numSelected = selected.length;
            let typography;
            if (status !== '' ||  numSelected > 0){
                typography = <Typography color="inherit" variant="subheading">
                     {status === 'DELETE' ? updated + ' deleted' : numSelected + ' selected' }    
                            </Typography>
            } else {
                typography = 
                <Fade in={true} timeout={300}>
                    <Typography variant="title" id="tableTitle">
                        My Family
                    </Typography>
                </Fade>
            }
                        
            return (
                
                <Toolbar
                className={classNames(classes.root, {
                    [classes.highlight]: numSelected > 0 || status !== '',
                })}
                >                
                <div className={classes.title}>
                    {typography}                
                </div>
                <div className={classes.spacer} />
                <div className={classes.actions}>
                    {numSelected > 0 ? (
                    <Tooltip title="Delete">
                        <IconButton aria-label="Delete">
                        <DeleteIcon onClick={this.handleDelete} />
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
    }     
  };
  
  EnhancedTableToolbar.propTypes = {
    classes: PropTypes.object.isRequired,
    // numSelected: PropTypes.number.isRequired,
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
    // order: PropTypes.string.isRequired,
    // orderBy: PropTypes.string.isRequired,
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
        // this.handleSelectAllClick = this.handleSelectAllClick.bind(this);
        // this.handleInput =  this.handleInput.bind(this);
        this.state = {
            // order:'asc',
            // orderBy:'firstName',
             // selected:[],
            // newSelected:[],
        }
    }

    // handleSelectAllClick(event){
    //     const { employees } = this.props;
    //     const { selected } = this.state;
    //     let newSelected = employees.map(employee => employee._links.self.href);
    //     if(event.target.checked){
    //         // this.setState({ selected: employees.map(employee => employee._links.self.href), isSelectedAll: true }
    //         this.setState({ selected: selected.concat(newSelected)  });                        
    //         return;
    //     }

    //     // employees.map(employee => employee._links.self.href)
    //     this.setState({ selected: []});

    // }

    // handleClick(event, id) {
    //     // let {selected } = this.state;
    //     let {selected } = this.props;
    //     const {pageData } = this.props;
    //     const selectedIndex = selected.indexOf(id);
    //     let newSelected = [];
        
    //     this.setState({currentPage:  pageData.number});
        
    //     if (selectedIndex === -1) {
    //       newSelected = newSelected.concat(selected, id);
    //     } else if (selectedIndex === 0) {
    //       newSelected = newSelected.concat(selected.slice(1));
    //     } else if (selectedIndex === selected.length - 1) {
    //       newSelected = newSelected.concat(selected.slice(0, -1));
    //     } else if (selectedIndex > 0) {
    //       newSelected = newSelected.concat(
    //         selected.slice(0, selectedIndex),
    //         selected.slice(selectedIndex + 1)
    //       );
    //     }

    //     this.setState({ selected: newSelected });
    // };
  
    isSelected = id => this.props.selected.indexOf(id) !== -1;
    // isSelected = function(id){
    //     return this.state.selected.indexOf(id) !== -1;
    // }
    
    render(){
        const {onClick, selected, pageData, employees, links, classes } = this.props;        
        let count = 0;
        let rowsPerPage = 0; 
        let page = 0;
        if (JSON.stringify(pageData) !== "{}"){
            count = pageData.totalElements; 
            rowsPerPage = pageData.size;
            page = pageData.number ;
        }

        // custom pagination
        // let pagination = <Pagination updatePageSize={this.props.updatePageSize} links={links} onNavigate={this.props.onNavigate} />

        return (
            <Paper className={classes.root}>            
            <EnhancedTableToolbar onDelete={this.props.onDelete} selected={selected}/>
             <div className={classes.tableWrapper}>
                <Table className={classes.table}>
                <EnhancedTableHead
                    order={this.state.order}
                    orderBy={this.state.orderBy}
                    rowCount={employees.length}                    
                    pageData={pageData}
                />
                <TableBody >                        
                        {employees.map(employee => {
                        const isSelected = this.isSelected(employee._links.self.href);                        
                        
                        return (                            
                            <TableRow 
                                    role="checkbox"
                                    hover
                                    key={employee._links.self.href}
                                    // onClick={event => handleClick(event, employee._links.self.href)}
                                    onClick={event => onClick(event, employee._links.self.href)}
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
            <TableFooter>
              <TableRow>
                <TablePagination
                    colSpan={3}
                    count={count}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={this.props.onNavigate}
                    onChangeRowsPerPage={this.props.updatePageSize}
                    ActionsComponent={TablePaginationActionsWrapped}
                />
              </TableRow>
            </TableFooter>
                </Table>
                </div>
            {/* {pagination} */}
      </Paper>
        )
    }
}

CustomizedTable.propTypes = {
    classes: PropTypes.object.isRequired,
    // theme: PropTypes.object.isRequired,
  };

export default withStyles(styles)(CustomizedTable);


const actionsStyles = theme => ({
    root: {
      flexShrink: 0,
      color: theme.palette.text.secondary,
      marginLeft: theme.spacing.unit * 2.5,
    },
  });
  
  class TablePaginationActions extends React.Component {

    constructor(props) {
        super(props);        
        this.handleNavFirst = this.handleNavFirst.bind(this);
        this.handleNavPrev = this.handleNavPrev.bind(this);
        this.handleNavNext = this.handleNavNext.bind(this);
        this.handleNavLast = this.handleNavLast.bind(this); 
        this.handleChange =  this.handleChange.bind(this);    
        // this.state = { rowSize: 2};
    }
    
    handleChange = event => {        
        let pageSize = event.target.value;
        if (/^[0-9]+$/.test(pageSize)) {
            this.props.updatePageSize(pageSize);
            this.setState({rowSize: pageSize})
        } else {
            ReactDOM.findDOMNode(this.refs.pageSize).value =
                pageSize.substring(0, pageSize.length - 1);
        }
    };

    handleNavFirst(e){
        e.preventDefault();
        // this.props.onNavigate(this.props.links.first.href);
        this.props.onChangePage('first');
    }

    handleNavPrev(e){
        e.preventDefault();
        // this.props.onNavigate(this.props.links.prev.href);
        this.props.onChangePage('prev');
    }

    handleNavNext(e){        
        e.preventDefault();
        // this.props.onNavigate(this.props.links.next.href);
        this.props.onChangePage('next');
    }

    handleNavLast(e){
        e.preventDefault();
        // this.props.onNavigate(this.props.links.last.href);
        this.props.onChangePage('last');

    }

    // handleFirstPageButtonClick = event => {
    //   this.props.onChangePage(event, 0);
    // };
  
    // handleBackButtonClick = event => {
    //   this.props.onChangePage(event, this.props.page - 1);
    // };
  
    // handleNextButtonClick = event => {
    //   this.props.onChangePage(event, this.props.page + 1);
    // };
  
    // handleLastPageButtonClick = event => {
    //   this.props.onChangePage(
    //     event,
    //     Math.max(0, Math.ceil(this.props.count / this.props.rowsPerPage) - 1),
    //   );
    // };
  
    render() {
      const { classes, count, page, rowsPerPage, theme } = this.props;  
      return (
        <div className={classes.root}>
          <IconButton
            onClick={this.handleNavFirst}
            disabled={page === 0}
            aria-label="First Page"
          >
            {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
          </IconButton>
          <IconButton
            onClick={this.handleNavPrev}
            disabled={page === 0}
            aria-label="Previous Page"
          >
            {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
          </IconButton>
          <IconButton
            onClick={this.handleNavNext}
            disabled={page >= Math.ceil(count / rowsPerPage) - 1}
            aria-label="Next Page"
          >
            {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
          </IconButton>
          <IconButton
            onClick={this.handleNavLast}
            disabled={page >= Math.ceil(count / rowsPerPage) - 1}
            aria-label="Last Page"
          >
            {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
          </IconButton>
        </div>
      );
    }
  }
  
  TablePaginationActions.propTypes = {
    classes: PropTypes.object.isRequired,
    count: PropTypes.number.isRequired,
    onChangePage: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
    theme: PropTypes.object.isRequired
  };
  
  const TablePaginationActionsWrapped = withStyles(actionsStyles, { withTheme: true })(
    TablePaginationActions
  );