import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import LastPageIcon from '@material-ui/icons/LastPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';

const paginationStyles = theme => ({
    root: {
        textAlign: 'right',
    },

  });

class CustomizedTablePagination extends React.Component {

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
    
    render() {
        const { classes } = this.props;
        
        var navLinks = [];

        navLinks.push(<IconButton disabled={!("prev" in this.props.links)} onClick={this.handleNavFirst} key="first">  <FirstPageIcon/></IconButton>)
        navLinks.push(<IconButton disabled={!("prev" in this.props.links)} onClick={this.handleNavPrev} key="prev">  <KeyboardArrowLeft /></IconButton>)
        navLinks.push(<IconButton disabled={!("next" in this.props.links)} onClick={this.handleNavNext} key="next"> <KeyboardArrowRight /> </IconButton>)
        navLinks.push(<IconButton disabled={!("next" in this.props.links)} onClick={this.handleNavLast} key="last"> <LastPageIcon /></IconButton>)
        
        return(
            <div className={classes.root}>
                {navLinks}            
            </div>
        )
    }
}

CustomizedTablePagination.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
  };

  export default withStyles(paginationStyles, { withTheme: true } )(CustomizedTablePagination);
