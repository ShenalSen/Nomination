import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

import HomeIcon from '@material-ui/icons/Home';
import MoneyIcon from '@material-ui/icons/AttachMoney';
import ProfileIcon from '@material-ui/icons/AccountBox';
import PersonIcon from '@material-ui/icons/PermIdentity';
import PowerSetting from '@material-ui/icons/PowerSettingsNew';

import NominationIcon from '@material-ui/icons/Description';
import ObjectionIcon from '@material-ui/icons/PanTool';
import Button from '@material-ui/core/Button';
import Badge from '@material-ui/core/Badge';
import MailIcon from '@material-ui/icons/Mail';
import InboxIcon from '@material-ui/icons/Inbox';
import { withRouter, Redirect } from 'react-router-dom';
import {
  getNominations,
} from '../../modules/nomination/state/NominationAction';
import {
  getAllElectionsToApprove,
} from '../../modules/election/state/ElectionAction';
import {
  getElectionTemplateData,
} from '../../modules/election-model/state/ElectionAction';
import {connect} from "react-redux";


const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    zIndex: 2000,
    display: 'flex'
  },
  menuButton: {
    marginRight: 20,
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
  },
  logoutBtn: {
    //flex: 1
  },

});

class ResponsiveDrawer extends React.Component {
  state = {
    mobileOpen: false,
    goToLogin: false,
  };

  componentDidMount() {
    const { getAllElectionsToApprove } = this.props;
    // getNominations();
    getAllElectionsToApprove();
    // getElectionTemplateData()

  }

  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };

  handleLogout = () => {
    window.location = "/signout";
  };

  onNotificationIconClick =(totalNotificationCount, pendingElectionsCount, pendingNominationsCount) => {

    // this.notificationIconClickStatus = true;
    if(totalNotificationCount>0) {
      return <List component="nav" aria-label="main mailbox folders">
        {pendingElectionsCount>0? <ListItem button component={Link} to='/election-process-review'
                                            selected={this.props.location.pathname === "/election-process-review"}>
          <ListItemText primary={`You have ${pendingElectionsCount} elections to approve`} />
        </ListItem>: null}
        {pendingNominationsCount>0? <ListItem button component={Link} to='/admin/nomination-review' selected={this.props.location.pathname === "/admin/nomination-review"}>
          <ListItemText primary={`You have ${pendingNominationsCount} nominations to approve`} />
        </ListItem>: null}
      </List>;
    }else {
      return <List component="nav" aria-label="main mailbox folders">
        <ListItem button>
          <ListItemText primary={`You don't have any notifications`} />
        </ListItem>
      </List>;
    }
  }



  render() {
    const { classes, theme, pendingElections } = this.props;
    if (this.state.goToLogin) return <Redirect to="/login" />;
    var cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)scope\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    var scopes = decodeURIComponent(cookieValue).split(/ +/g)

    var pendingElectionsCount = pendingElections? pendingElections.length: 0;
    var pendingNominationsCount = pendingElections? pendingElections.length: 0;
    // var pendingPaymentsCount = pendingElections? pendingElections.length: 0;


    var totalNotificationCount = pendingElectionsCount+ pendingNominationsCount;

      var user = sessionStorage.getItem('user');
    Array.prototype.move = function(x, y){
      this.splice(y, 0, this.splice(x, 1)[0]);
      return this;
    };

    scopes.move(3,5);
    scopes.move(1,0);
    scopes.move(3,2);
    scopes.move(5,3);

    //  var scopes = ['home','election_edit','nomination_approval','election_approval','objection_approval','payment_approval','template_edit','profile'];
    const list = scopes.map((scope) => {
      switch (scope) {
        case "call_election_edit":
          return <ListItem button key="Call_election" component={Link} to='/admin/call-election' selected={this.props.location.pathname === "/admin/call-election"} >
            <ListItemIcon><NominationIcon /></ListItemIcon>
            <ListItemText primary="Call Election" />
          </ListItem>
        case "election_template_edit":
          return <div><ListItem button key="Create_election" component={Link} to='/admin/create-election-home' selected={this.props.location.pathname === "/admin/create-election-home"}>
            <ListItemIcon><NominationIcon /></ListItemIcon>
            <ListItemText primary="Create Election Template" />
          </ListItem></div>
        case "nomination_approval_edit":
          return <div><ListItem button key="Nomination" component={Link} to='/admin/nomination-review' selected={this.props.location.pathname === "/admin/nomination-review"}>
            <ListItemIcon><NominationIcon /></ListItemIcon>
            <ListItemText primary="Nomination Approval" />
          </ListItem><Divider /></div>
        case "call_election_approve_edit":
          return <ListItem button key="Election_review" component={Link} to='/election-process-review'
            selected={this.props.location.pathname === "/election-process-review"}>
            <ListItemIcon><NominationIcon /></ListItemIcon>
            <ListItemText primary="Election Approval" />
          </ListItem>
        case "objection_approve_edit":
          return <ListItem button key="Objection_review" component={Link} to='/admin/objection-review' selected={this.props.location.pathname === "/admin/objection-review"} >
            <ListItemIcon><ObjectionIcon /></ListItemIcon>
            <ListItemText primary="Objection Approval" />
          </ListItem>
        // case "payment_approve_edit":
        //   return <ListItem button key="Payment_review" component={Link} to='/admin/payment-review'
        //     selected={this.props.location.pathname === "/admin/payment-review"}>
        //     <ListItemIcon><MoneyIcon /></ListItemIcon>
        //     <ListItemText primary="Payment Approval" />
        //   </ListItem>
        case "election_template_approval":
          return <div><ListItem button key="template_review" component={Link} to='/admin/template-review'
              selected={this.props.location.pathname === "/admin/template-review"}>
          <ListItemIcon><MoneyIcon/></ListItemIcon>
          <ListItemText primary="Election Template Approval"/>
          </ListItem><Divider /></div>
        case "payment_edit":
          return <ListItem button key="Payment" component={Link} to='/admin/nomination-payment-list' selected={this.props.location.pathname === "/admin/nomination-payment-list"}>
          <ListItemIcon><MoneyIcon /></ListItemIcon>
          <ListItemText primary="Nomination Security Deposit" />
        </ListItem>
      }
    });

    const drawer = (
      <div>
        <div className={classes.toolbar} />
        <Divider />
        <List>
        <ListItem button key="Home" component={Link} to='/admin/home' selected={this.props.location.pathname === "/admin/home"} >
            <ListItemIcon><HomeIcon /></ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
          {list}
          {/* <ListItem button key="Profile" component={Link} to='/profile' selected={this.props.location.pathname === "/profile"}>
            <ListItemIcon><ProfileIcon /></ListItemIcon>
            <ListItemText primary="Profile" />
          </ListItem> */}
        </List>
      </div>
    );

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerToggle}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" noWrap>
              {this.props.title}
            </Typography>
            <div style={{ flex: 1 }}></div>

            {totalNotificationCount>0 ?
              <Button onClick={this.onNotificationIconClick} color="inherit">
                <Badge badgeContent={totalNotificationCount} color="error">
                    <MailIcon onClick={this.onNotificationIconClick} />
                </Badge>
              </Button>
            :<Button onClick={this.onNotificationIconClick} color="inherit">
              <MailIcon onClick={this.onNotificationIconClick} />
            </Button>}

            {true? this.onNotificationIconClick(totalNotificationCount,pendingElectionsCount, pendingNominationsCount): null}

            <Button color="inherit">
              <PersonIcon style={{ marginRight: 5 }} />
              {user}
            </Button>
            <Button className={classes.logoutBtn} onClick={this.handleLogout} color="inherit">
              <PowerSetting style={{ marginRight: 5 }} />
              Logout
            </Button>

          </Toolbar>
        </AppBar>
        <nav className={classes.drawer}>
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Hidden smUp implementation="css">
            <Drawer
              container={this.props.container}
              variant="permanent"
              anchor={theme.direction === 'rtl' ? 'right' : 'left'}
              open={this.state.mobileOpen}
              onClose={this.handleDrawerToggle}
              classes={{
                // paper: classes.drawerPaper,
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          <Hidden xsDown implementation="css">
            <Drawer
              classes={{
                paper: classes.drawerPaper,
              }}
              variant="permanent"
              open
            >
              {drawer}
            </Drawer>
          </Hidden>
        </nav>
      </div>
    );
  }
}

ResponsiveDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  // Injected by the documentation to work in an iframe.
  // You won't need it on your project.
  container: PropTypes.object,
  theme: PropTypes.object.isRequired,
};

const mapStateToProps = ({ Election }) => {
  debugger;
  // const nominations = Nomination.all_nominations;
  const pendingElections = Election.pendingElections;

  return { pendingElections };
};

const mapActionsToProps = {
  // getNominations,
  getAllElectionsToApprove,
  // getElectionTemplateData
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles, { withTheme: true })(withRouter(ResponsiveDrawer)));
