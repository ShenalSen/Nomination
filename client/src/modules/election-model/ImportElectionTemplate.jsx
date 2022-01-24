import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';//--
import CardActions from '@material-ui/core/CardActions';//--
import CardContent from '@material-ui/core/CardContent';//--
import Button from '@material-ui/core/Button';//--
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';//--
import {  asyncValidateElectionTemplate, submitElectionNew } from './state/ElectionAction';
import {getElectionModules} from '../election/state/ElectionAction';

import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'

const styles = theme => ({
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 400,
    },
    dense: {
        marginTop: 16,
    },
    menu: {
        width: 200,
    },
    textCallElection: {
        marginLeft: '10px',
    }
});
class CallElection extends React.Component {
    state = {
        electionName: '',
        electionModule: '',
        goToConfig: false,
        errorTextElection: '',
        errorTextModule: '',
        exist: false
    };

    constructor(props) {
        super(props);
    }

    async handleSubmit(e) {
        debugger;

        if (this.state.exist === true) {
            debugger;

            this.setState({ errorTextModule: 'emptyField2' });
            this.props.submitElectionNew(this.state.exist);
        } else if (this.state.ElectionModule === '' || this.state.ElectionModule === '-- Select Template --') {
            debugger;

            this.setState({ errorTextModule: 'emptyField' });
        } else {
            debugger;
            // this.setState({ goToConfig: true });
            this.props.submitElectionNew(this.state.ElectionModule);
        }
        debugger;

        // const { handleChangeElectionData } = this.props;
        const newElectionModule = { ...this.props.CallElectionData };
        newElectionModule["name"] = this.state.electionName;
        newElectionModule["module_id"] = this.state.electionModule;
        // handleChangeElectionData(newElectionModule);
        e.preventDefault();
    };


    handleChange = name => event => {
        if (name === 'electionName') {
            this.setState({ errorTextElection: '' });
        }
        if (name === 'electionModule') {
            this.setState({ errorTextModule: '' });
        }
        if(name==='electionName'){
            this.setState({
                [name]: event.target.value.replace(/[^a-zA-Z0-9 ]/g, ''),
            });
        }else{
            debugger;
            this.setState({
                [name]: event.target.value,
            });
        }
        
    };

    asyncValidation = name => event => {
        debugger;
        if (event.target.value) {
            asyncValidateElectionTemplate(event.target.value).then((data) => {
                if (data.exist === true) {
                    this.setState({ exist: data.exist });
                } else {
                    this.setState({ exist: data.exist });
                }
            })
        } else {
            this.setState({ exist: false });
        }
    }

    render() {
        const { classes, electionModules } = this.props;
        debugger;
        if (this.state.goToConfig) return <Redirect
            to={{
                pathname: '/admin/active-election',
                state: { name: this.state.electionName, moduleId: this.state.electionModule }
            }} />;
        return (
            <form className={classes.container} onSubmit={this.handleSubmit.bind(this)} noValidate autoComplete="off">
                <Card className={classes.card}>
                    <CardContent>
                        <Typography variant="h5" component="h2">
                            Import Election Template
                    </Typography>
                    <Grid container classname={classes.panel_wrapper} spacing={16}>
                    <Grid item xs="6">
                        <TextField
                            id="filled-select-currency-native"
                            select
                            label="Election Template"

                            className={classes.textField}
                            value={this.state.currency}
                            // onChange={this.handleChange('electionModule')}
                            onChange={(evt) => {
                                this.handleChange('ElectionModule')(evt)
                                this.asyncValidation('ElectionModule')(evt)
                            }}
                            error={this.state.errorTextModule === "emptyField2"}
                            helperText={this.state.errorTextModule === "emptyField2" ? 'This election template already exist!' : 'Please select your election template'}
                            SelectProps={{
                                native: true,
                                MenuProps: {
                                    className: classes.menu,
                                },
                            }}

                            margin="normal"
                            variant="filled"
                        >
                            <option >
                                -- Select Template --
                                </option>
                            {electionModules.map(option => (
                                <option key={option.TEMPLATE_ID} value={option.TEMPLATE_ID}>
                                    {option.TEMPLATE_NAME}
                                </option>
                            ))}
                        </TextField>
                        </Grid>
                        {/* <Grid item xs="6">
                        <TextField
                            id="filled-name"
                            label="Election Name "
                            className={classes.textField}
                            value={this.state.electionName}
                            error={this.state.errorTextElection}
                            helperText={this.state.errorTextElection === "emptyField2" ? 'This election name already used!' : 'Please type your Election Name '}
                            onChange={(evt) => {
                                this.handleChange('electionName')(evt)
                                this.asyncValidation('electionName')(evt)
                            }}
                            // onBlur={this.asyncValidation('electionName')}
                            margin="normal"
                            variant="filled"
                        />
                        </Grid> */}
                    </Grid>
                    </CardContent>
                    <CardActions>
                        <Button type='submit' size="small">Import</Button>
                    </CardActions>
                </Card>
            </form>
        );
    }
}

CallElection.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = ({ Election }) => {
    const { getElectionModules } = Election;
    const electionModules = Election.allElectionModules;
    // const { setCallElectionData } = Election;
    const CallElectionData = Election.CallElectionData;
    return { CallElectionData, electionModules, getElectionModules };
};

const mapActionsToProps = {
    getElectionModules,
    submitElectionNew
    // setCallElectionData,
    // handleChangeElectionData
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(CallElection));