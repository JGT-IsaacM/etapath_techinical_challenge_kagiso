import { render, fireEvent } from '@testing-library/react';

import Login from './Login';

describe('Testing login screen',()=>{
    describe('onClick Add user button',()=>{
        test('should display form with three fields and a Create button', () => {
            const { getByText, getByPlaceholderText } = render(<Login />);
            const linkElement = getByText("Add user");
            fireEvent.click(linkElement);

            const header = getByText('Create new user');
            expect(header.textContent).toBe('Create new user');

            const emailInput = getByPlaceholderText('Enter email');
            const passwordInput = getByPlaceholderText('Enter password');

            fireEvent.change(emailInput, { target: { value: 'johndoe' } });
            fireEvent.change(passwordInput, { target: { value: 'secret' } });

            expect(emailInput.value).toBe('johndoe');
            expect(passwordInput.value).toBe('secret');
        });
    });

    describe('onClick Login button',()=>{
        test('should display form with two fields and a Login button', () => {
            const { getByText, getByPlaceholderText } = render(<Login />);
            const linkElement = getByText("Login");
            fireEvent.click(linkElement);

            const header = getByText('Log into your account');
            expect(header.textContent).toBe('Log into your account');

            const emailInput = getByPlaceholderText('Enter email');
            const passwordInput = getByPlaceholderText('Enter password');

            fireEvent.change(emailInput, { target: { value: 'johndoe' } });
            fireEvent.change(passwordInput, { target: { value: 'secret' } });

            expect(emailInput.value).toBe('johndoe');
            expect(passwordInput.value).toBe('secret');
        });
    });

});


