import React, { Component, Fragment } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

class PrivateRoute extends Component {
    render() {
        const { component: Component, currentUser, ...rest } = this.props;
        return (
            <Route
                {...rest}
                render={props =>
                    currentUser ? (
                        <Component {...props} />
                    ) : (
                            <Redirect
                                to={{
                                    pathname: '/login',
                                    state: { from: props.location }
                                }}
                            />
                        )
                }
            />
        );
    }
}

const mapStateToProps = state => ({
    currentUser: state.currentUser
});

export default connect(mapStateToProps)(PrivateRoute);
