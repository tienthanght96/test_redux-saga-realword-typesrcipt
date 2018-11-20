import * as React from "react";
import { connect } from "react-redux";
import UserInterface from "../../../interfaces/UserInterface";
import AppState from '../../../interfaces/AppState';
import { userSelector } from '../../../selector/userSelector';
import { Link } from "react-router-dom";

interface Props {
  user: UserInterface;
}

interface State {
  email : string | null,
  password : string | null,
  username : string | null,
  error : Array<any>,
  submitting: boolean,
}
class SignIn extends React.Component<Props,State>{
  
  constructor(props: Props){
    super(props);
    this.state = {
      email : '',
      password : '',
      username : '',
      error : [],
      submitting: false,
    };
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

  registerHandler = () => {

  }

  renderErrormessage = () => {
    return <div></div>
  }

  render(){
    return (
      <div className="auth-page">
        <div className="container page">
          <div className="row">
            <div className="col-md-6 offset-md-3 col-xs-12">
              <h1 className="text-xs-center">Sign In</h1>
              <p className="text-xs-center">
                <Link to="/account/signin">Have an account?</Link>
              </p>
              {this.renderErrormessage()}
              <form onSubmit={this.registerHandler}>
                <fieldset>
                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      type="text"
                      placeholder="Username"
                      {...this.bindingInputField('username')}
                    />
                  </fieldset>
                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      type="email"
                      placeholder="Email"
                      {...this.bindingInputField('email')}
                    />
                  </fieldset>

                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      type="password"
                      placeholder="Password"
                      {...this.bindingInputField('password')}
                    />
                  </fieldset>

                  <button
                    className="btn btn-lg btn-primary pull-xs-right"
                    type="submit"
                    disabled={this.state.submitting ? true : false}
                  >
                    Sign up
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
  user: userSelector(state)
})

export default connect(mapStateToProps)(SignIn);