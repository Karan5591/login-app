import React, { useState , useEffect, useReducer, useContext} from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import authContext from '../store/AuthContext';
import { AuthContextProvider } from '../store/AuthContext';
import Input from '../UI/input/input';

const emailReducer= (state, action)=>{
  if(action.type==='USER_INPUT')
    {
      return {value:action.val, isValid: action.val.includes('@')}
    }
      if(action.type==='INPUT_BLUR')
      {
        return{value: state.value , isValid: state.value.includes('@')}
      }
    
  return {value:'', isValid: false}
}

const passwordReducer= (state, action)=>{
  if(action.type==='USER_INPUT')
    {
      return {value:action.val, isValid: action.val.trim().length>6}
    }
      if(action.type==='INPUT_BLUR')
      {
        return{value: state.value , isValid:state.value.trim().length>6}
      }
    
  return {value:'', isValid: false}
}



const Login = (props) => {
  const [enteredEmail, setEnteredEmail] = useState('');
  const [emailIsValid, setEmailIsValid] = useState();
  const [enteredPassword, setEnteredPassword] = useState('');
  const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const[emailstate, dispatchEmail]= useReducer(emailReducer, {value: '', isValid: null})
  const[passwordstate, dispatchPassword]= useReducer(passwordReducer, {value: '', isValid: null})
  
  const authctx= useContext(authContext)
  
  useEffect(()=>{
    const identifier=setTimeout(()=>{
      setFormIsValid(
        enteredEmail.includes('@')&& enteredPassword.trim().length>6 
      )
    }, 500)
    return ()=>{
      clearTimeout(identifier)
    };
  }, [enteredEmail, enteredPassword ])
  
  const emailChangeHandler = (event) => {
    dispatchEmail({type: 'USER_INPUT', val:event.target.value});

    setFormIsValid(event.target.value.includes('@')&& passwordstate.isValid)
  }
  const passwordChangeHandler = (event) => {
    dispatchPassword({type: 'USER_INPUT', val:event.target.value});
 setFormIsValid(emailstate.isValid && event.target.value.trim().length>6)
  }
  

  const validateEmailHandler = () => {
dispatchEmail({type: 'INPUT_BLUR'})  };

  const validatePasswordHandler = () => {
    dispatchPassword({type: 'INPUT_BLUR'}) 

  };

 

  const submitHandler = (event) => {
    event.preventDefault();
    authctx.onLogin(emailstate.value, passwordstate.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        
        <Input id='email' label='E-mail' type='text' isValid={emailIsValid} value={emailstate.value} onChange={emailChangeHandler} onBlur={validateEmailHandler} />
        <Input id="password" label="Password" type="password" isValid={passwordIsValid} value={passwordstate.value} onChange={passwordChangeHandler} onBlur={validatePasswordHandler}/>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
