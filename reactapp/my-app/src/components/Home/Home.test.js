import { render, fireEvent } from '@testing-library/react';

import App from '../../App';


describe('Testing home screen header section',()=>{

    beforeAll(()=>{
        sessionStorage.setItem('token', JSON.stringify({token:'abc123'}));
    });

    afterAll(()=>{
        sessionStorage.removeItem('token');
    })

    test('should display header and two buttons with no list', () => {
        const { getByText } = render(<App />);
        const header = getByText('Packages');
        expect(header.textContent).toBe('Packages');
        const buttonOne = getByText("Create Package");
        expect(buttonOne.textContent).toBe('Create Package');
        const buttonTwo = getByText("Logout");
        expect(buttonTwo.textContent).toBe('Logout');
    });

    describe('onClick Create Packages button',()=>{
        test('should display form used to capture details for scheduling', () => {
            const { getByText, getByPlaceholderText } = render(<App />);
            const dashBoardHeader = getByText('Packages');
            expect(dashBoardHeader.textContent).toBe('Packages');

            const linkElement = getByText("Create Package");
            fireEvent.click(linkElement);

            const header = getByText('Create Package');
            expect(header.textContent).toBe('Create Package');

            const locationLabel = getByText('Location Name');
            expect(locationLabel.textContent).toBe('Location Name');
            const locationInput = getByPlaceholderText('Enter location');
            expect(locationInput.textContent).toBe('');

            const destinationLabel = getByText('Destination Name');
            expect(destinationLabel.textContent).toBe('Destination Name');
            const destinationInput = getByPlaceholderText('Enter destination');
            expect(destinationInput.textContent).toBe('');

            const distanceLabel = getByText('Distance');
            expect(distanceLabel.textContent).toBe('Distance');
            const distanceInput = getByPlaceholderText('Enter distance');
            expect(distanceInput.textContent).toBe('');

            const timeslotLabel = getByText('Timeslot');
            expect(timeslotLabel.textContent).toBe('Timeslot');

            const dateLabel = getByText('Date');
            expect(dateLabel.textContent).toBe('Date');
            const dateInput = getByPlaceholderText('Enter date');
            expect(dateInput.textContent).toBe('');

            const referenceLabel = getByText('Reference Number');
            expect(referenceLabel.textContent).toBe('Reference Number');
            const referenceInput = getByPlaceholderText('Enter Reference');
            expect(referenceInput.textContent).toBe('');

            const cancelButton = getByText('Cancel');
            expect(cancelButton.textContent).toBe('Cancel');
            fireEvent.click(cancelButton);
        });
    });

    describe('onClick Logout button',()=>{    
        test('should reset token and take user to login page', () => {
            const { getByText } = render(<App />);
            const header = getByText('Packages');
            expect(header.textContent).toBe('Packages');

            const buttonOne = getByText("Create Package");
            expect(buttonOne.textContent).toBe('Create Package');

            const buttonTwo = getByText("Logout");
            expect(buttonTwo.textContent).toBe('Logout');
            fireEvent.click(buttonTwo);

            const loginButton = getByText("Login");
            expect(loginButton.textContent).toBe('Login');

            const addUserButton = getByText("Add user");
            expect(addUserButton.textContent).toBe('Add user');

        });
    });
});