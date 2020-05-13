import React, { useState } from 'react';


const Form = props => {
    const[form, setForm]=useState({
        id:Date.now(),
        name:"",
        email:"",
        password:"",
        terms: false

    })

    const changeHandler = (event)=>{
        setForm({
            ...form,[event.target.name]:event.target.value
        })
    }

    return (
        <div>
        <form onSubmit={event=>{ 
            event.preventDefault(); 
            console.log(form);
            setForm({name:"", email:"", password:"", terms: false, id:Date.now()})
        }}>
            <label htmlFor="name">Name:</label>
            <input id="name" type="text" name="name" placeholder="Please enter name" value={form.name}
                onChange={changeHandler} />


            <label htmlFor="email">Email:</label>
            <input id="email" type="text" name="email" placeholder="Please enter email" value={form.email}
                onChange={changeHandler} />

            <label htmlFor="password">Password:</label>
            <input id="password" type="text" name="password" placeholder="Please enter password" value={form.password}
                onChange={changeHandler} />


            <label htmlFor="terms">Terms of Service</label>
            <input id="terms" type="checkbox" checked={form.terms} onChange={changeHandler} />

            <button type="submit">Submit</button>
        </form>
       </div>
    )

}
export default Form;

