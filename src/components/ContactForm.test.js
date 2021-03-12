import React from 'react';
import {render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContactForm from './ContactForm';

test('renders without errors', ()=>{
 
        render(<ContactForm />);
   
    
});

test('renders the contact form header', ()=> {
   render(<ContactForm />)

   const header = screen.queryByText(/contact form/i)

   expect(header).toBeInTheDocument()
   expect(header).not.toBeFalsy() 
   expect(header).toHaveTextContent(/contact form/i);
   
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => { 
    render(<ContactForm />);
    const smallName = 'cc';

    const firstNameType = screen.queryByLabelText(/firstName/i)
    userEvent.type(firstName, smallName)

    const firstNameError = screen.queryByText(/Error: firstName must have at least 5 characters./i)
    expect(firstNameError).toBeInTheDocument();
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    render(<ContactForm />);

    const triError = screen.queryByRole(/button/i)
    userEvent.click(triError);

    const firstNameError = screen.queryByText(/Error: firstName must have at least 5 characters./i)
    const lastNameError = screen.queryByText(/Error: lastName is a required field./i)
    const emailError = screen.queryByText(/Error: email must be a valid email address./i)
    expect(firstNameError).toBeInTheDocument() 
    expect(lastNameError).toBeInTheDocument() 
    expect(emailError).toBeInTheDocument();


});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    render(<ContactForm />);

    const fNameGood = screen.queryByLabelText(/firstName/i)
    userEvent.type(firstName, 'Pasqual')
    const lNameGood = screen.queryByLabelText(/lastName/i)
    userEvent.type(lastName, 'Rotella') 
    const unError = screen.queryByRole(/button/i)
    userEvent.click(unError);


    const emailError = screen.queryByText(/Error: email must be a valid email address./i)
    expect(emailError).toBeInTheDocument();
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    render(<ContactForm />)

    const emailErrorType = screen.queryByLabelText(/email/i)
    userEvent.type(email, 'totallylegitemail');
    
    const emailError = screen.queryByText(/Error: email must be a valid email address./i)
    expect(emailError).toBeInTheDocument();
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    render(<ContactForm />)

    const unError = screen.queryByRole(/button/i)
    userEvent.click(unError);

    const lastNameError = screen.queryByText(/Error: lastName is a required field./i)
    expect(lastNameError).toBeInTheDocument();
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    render(<ContactForm />)

    const fNameGood = screen.queryByLabelText(/firstName/i)
    userEvent.type(firstName, 'Pasqual')
    const lNameGood = screen.queryByLabelText(/lastName/i)
    userEvent.type(lastName, 'Rotella') 
    const emailGood = screen.queryByLabelText(/email/i)
    userEvent.type(email, 'InsomniacRecords@1973.com')
    const messageGood = screen.findAllByText(/message/i)
    // userEvent.type(message, 'Bees knees')

    const goodRender = screen.queryByRole(/button/i)
    userEvent.click(goodRender);

    const fNamePost = screen.queryByText(/pasqual/i)
    const lNamePost = screen.queryByText(/Rotella/i)
    const emailPost = screen.queryByText(/InsomniacRecords@1973.com/i)
    // const messagePost = screen.queryByText(/bees knees/i)

    expect(fNamePost).toBeInTheDocument();
    expect(lNamePost).toBeInTheDocument();
    expect(emailPost).toBeInTheDocument();
    // expect(messagePost).toBeInTheDocument();

});

test('renders all fields text when all fields are submitted.', async () => {
    render(<ContactForm />)

    const fNameGood = screen.queryByLabelText(/firstName/i)
    userEvent.type(firstName, 'Pasqual')

    const lNameGood = screen.queryByLabelText(/lastName/i)
    userEvent.type(lastName, 'Rotella') 

    const emailGood = screen.queryByLabelText(/email/i)
    userEvent.type(email, 'InsomniacRecords@1973.com')

    const messageGood = screen.queryAllByText(/message/i)
    userEvent.type(message, 'Keepin you up allllll night')

    console.log(emailGood)
    const goodRender = screen.queryByRole(/button/i)
    userEvent.click(goodRender);

    const fNamePost = screen.queryByText(/pasqual/i)
    const lNamePost = screen.queryByText(/Rotella/i)
    const emailPost = screen.queryByText(/InsomniacRecords@1973.com/i)
    const messagePost = screen.queryAllByText(/keepin you up allllll night/i)

    
    expect(fNamePost).toBeInTheDocument();
    expect(lNamePost).toBeInTheDocument();
    expect(emailPost).toBeInTheDocument();
    expect(messagePost).toHaveLength(2);
    console.log(messagePost)
    //messagePost.toHaveLength
});