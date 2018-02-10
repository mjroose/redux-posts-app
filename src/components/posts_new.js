import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {createPost} from './../actions'

class PostsNew extends Component {
  renderField(field) {
    const {meta: {touched, error}} = field;   //pulls touched and error from field.meta (ES6)
                                              //use this syntax to pull of nested properties
    const className = `form-group ${touched && error ? 'has-danger' : ''}`;

    return(
      <div className={className}>
        <label>{field.label}</label>
        <input 
          className="form-control"
          type="text"
          {...field.input} //contains a bunch of stuff like onChange, onSubmit, etc.
        />
        <div className="text-help">
          {touched ? error : ''}
        </div>
      </div>
    )
  }

  onSubmit(values) {
    this.props.createPost(values, () => { //this callback function executes after createPost is finished
      //history.push() function came from react-router-dom, as this component is created by a <Route />
      this.props.history.push('/');  //navigate to a different route
    }); //this creates a new "action"
  }

  render() {
    const {handleSubmit} = this.props; //props created by reduxForm()(PostsNew) call below

    return(            //handleSubmit is built in to redux-form and is "filled in" with user-defined helper functions (here, onSubmit)
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>  
        <Field
          label="Title for Post" //custom variable passed to function called by component
          name="title"
          component={this.renderField}
        />
        <Field
          label="Categories"  //custom variable passed to function called by component
          name="categories"
          component={this.renderField}
        />
        <Field
          label="Post Content"  //custom variable passed to function called by component
          name="content"
          component={this.renderField}
        />
        <button type="submit" className="btn btn-primary">Submit</button>
        <Link to='/' type="" className="btn btn-secondary">Cancel</Link>
      </form>
    );
  }
}

//three states for forms and Fields in redux-form -> pristine, touched, and invalid

const validate = (values) => { //can use "validate" npm package to validate these forms?
  const errors = {};

  if (!values.title) {
    errors.title = "Enter a title";
  }

  if (!values.categories) {
    errors.categories = "Enter some categories";
  }

  if (!values.content) {
    errors.content = "Enter some content"
  }

  //if errors is empty, the form will be submitted
  //but if erros has any properties, redux-form assums form is invalid
  return errors;
}

//the nested connect call is necessary to wire up the action creator to the component
//redux form already maps state connect is necessary to bindActionCreators to dispatch
export default reduxForm({
  validate,  //validate() is a keyword that redux-form will call if present
  form: 'PostsNewForm'
})(
  connect(null, {createPost})(PostsNew)
);