import React, { useState } from 'react';
import * as yup from 'yup';
import axios from 'axios';

const formSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    email: yup.string().email("Must be a valid email address").required("Must include email address"),
    password: yup.string().required("Must include password"),
    terms: yup.boolean().oneOf([true],"Please agree to terms of use")
})


export default function Form (){
    const[formState, setFormState]=useState({
        id:Date.now(),
        name:"",
        email:"",
        password:"",
        terms: false
    });

    const[errorState, setErrorState]=useState({
        id:Date.now(),
        name:"",
        email:"",
        password:"",
        terms: ""
    });

    const validate = e =>{
        let value = e.target.type==="checkbox"? e.target.checked:e.target.value;
        yup.reach(formSchema, e.target.name)
        .validate(value)
        .then(valid=>{
            setErrorState({
                ...errorState, [e.target.name]: ""    
            });
        })
        .catch(err=>{
            setErrorState({
                ...errorState,[e.target.name]:err.errors[0]
            });
        });
        };

    const changeHandler = (e)=>{
        e.persist();
        validate(e);
        let value = e.target.type ==="checkbox"? e.target.checked:e.target.value;
        setFormState({
            ...formState,[e.target.name]:value
        })
    }

    const formSubmit = e =>{
        e.preventDefault();
        console.log("form submitted!");
        axios.post("https://regres.in/api/users", formState)
            .then(response=>console.log(response))
            .catch(err=> console.log(err));
    };

    return (
        <div>
        <form onSubmit={formSubmit}>
            <label htmlFor="name">Name:
            <input id="name" type="text" name="name" placeholder="Please enter name" value={formState.name}
                onChange={changeHandler} />
             </label>

            <label htmlFor="email">Email:
            <input id="email" type="text" name="email" placeholder="Please enter email" value={formState.email} onChange={changeHandler} />
            {errorState.email.length>0?(
                <p className="error">{errorState.email}</p>
            ) :null}
            </label>

            <label htmlFor="password">Password:
            <input id="password" type="text" name="password" placeholder="Please enter password" value={formState.password}
                onChange={changeHandler} />
            </label>

            <label htmlFor="terms">Terms of Service
            <input id="terms" type="checkbox" checked={formState.terms} onChange={changeHandler} />
            </label>
            <button type="submit">Submit</button>
        </form>
       </div>
    )

}

