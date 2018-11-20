import * as React from "react";
import { connect } from "react-redux";
import UserInterface from "../../../interfaces/UserInterface";
import AppState from '../../../interfaces/AppState';
import { userSelector } from '../../../selector/userSelector';
import { Link, withRouter, RouteComponentProps } from "react-router-dom";
import { isHandlingAPISelector, errorsAPISelector } from "../../../selector/accountSelector";
import ErrorMessages from "../../../components/ErrorMessages";
import { login } from "../../../actions/accountActions";

interface Props extends RouteComponentProps<{}>{
  user: UserInterface;
  handleLogin(parmas: any, callback: () => void): void,
  isHandlingAPI: boolean,
  errorsAPI: any,
}

interface State {
  email : string | null,
  password : string | null,
  error : Array<any>,
  submitting: boolean,
}
class SignIn extends React.Component<Props,State>{
  
  constructor(props: Props){
    super(props);
    this.state = {
      email : '',
      password : '',
      error : [],
      submitting: false,
    };
  }

  componentDidMount() {
    const { user } = this.props;
    if(user && user.token){
      this.props.history.push('/');
    }
  }
  

  onChangeInput = (event: any ) => {
    this.setState({ [event.target.name]: event.target.value } as State)
  }

  bindingInputField = (fieldName: string) => {
    return {
      value: this.state[fieldName] == null ? "" : this.state[fieldName],
      onChange: this.onChangeInput,
      name: fieldName
    }
  }

  loginHandler = (event: any) => {
    event.preventDefault();

    const params = {
      email: this.state.email,
      password: this.state.password,
    };
    this.props.handleLogin(params, () => {
      this.props.history.push('/');
    });
  }

  render(){
    const { isHandlingAPI, errorsAPI } = this.props;
    
    return (
      <div className="auth-page">
        <div className="container page">
          <div className="row">
            <div className="col-md-6 offset-md-3 col-xs-12">
              <h1 className="text-xs-center">Sign In</h1>
              <p className="text-xs-center">
                <Link to="/account/signup">Need an account?</Link>
              </p>
              <ErrorMessages errors={errorsAPI}/>
              <form onSubmit={this.loginHandler}>
                <fieldset>
                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      type="email"
                      placeholder="Email"
                      disabled={isHandlingAPI}
                      {...this.bindingInputField('email')}
                    />
                  </fieldset>

                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      type="password"
                      placeholder="Password"
                      disabled={isHandlingAPI}
                      {...this.bindingInputField('password')}
                    />
                  </fieldset>

                  <button
                    className="btn btn-lg btn-primary pull-xs-right"
                    type="submit"
                    disabled={isHandlingAPI}
                  >
                    Sign in
                  </button>
                </fieldset>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state: AppState) => ({
  user: userSelector(state),
  isHandlingAPI: isHandlingAPISelector(state),
  errorsAPI: errorsAPISelector(state),
})

const mapDispatchToProps = (dispatch: any) => ({
  handleLogin: (params: any, callback: () => void) => dispatch(login(params, callback))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SignIn));