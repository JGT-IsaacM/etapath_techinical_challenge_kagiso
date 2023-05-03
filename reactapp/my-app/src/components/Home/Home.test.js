import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import axios from 'axios';

import App from '../../App';

jest.mock('axios');

describe('Testing home screen...',()=>{
    beforeAll(()=>{
        sessionStorage.setItem('token', JSON.stringify({token:'6jsbhhheo93_'}));
    });

    afterAll(()=>{
        sessionStorage.removeItem('token');
    });

    test('should display home screen header with no packages', async () => {
        axios.get.mockImplementationOnce(() => Promise.resolve({ data: [] }));
        render(<App />);
        await waitFor(() => {
            const header = screen.getByText('Packages');
            expect(header.textContent).toBe('Packages');
            const buttonOne = screen.getByText("Create Package");
            expect(buttonOne.textContent).toBe('Create Package');
            const buttonTwo = screen.getByText("Logout");
            expect(buttonTwo.textContent).toBe('Logout');
            expect(axios.get).toHaveBeenCalledTimes(1);
            expect(axios.get).toHaveBeenCalledWith('http://localhost:3000/api/v1/packages', {"headers": {"Authorization": "6jsbhhheo93_"}});

        },{});   
    });

    test('should display packages and allow user to edit package', async () => {
            
        const packageGetResponse =  [{
            created_at:"2023-05-01T11:33:04.297Z",
            date:"2021-06-01",
            destination:"Jack Budha",
            id:1,
            location:"Mamelodi",
            reference_number:"18787382",
            timeslot:"2000-01-01T13:15:00.000Z",
            updated_at:"2023-05-01T11:33:04.297Z",
            user_id:3
        }];

        axios.get.mockImplementationOnce(() => Promise.resolve({ data: packageGetResponse }));
        axios.put.mockImplementationOnce(() => Promise.resolve({ data: packageGetResponse[0] }));
    
        render(<App />);
    
        await waitFor(() => {
            const header = screen.getByText('Packages');
            expect(header.textContent).toBe('Packages');
            const buttonOne = screen.getByText("Create Package");
            expect(buttonOne.textContent).toBe('Create Package');
            const buttonTwo = screen.getByText("Logout");
            expect(buttonTwo.textContent).toBe('Logout');


            const expectedTohaveLabels = [
                "Location Name:    ",
                "Destination Name:    ",
                "Distance:    ",
                "Timeslot:   ",
                "Date:    ",
                "Reference Number:    ",
            ];
            const labels = [
                "Location Name:",
                "Destination Name:",
                "Distance:",
                "Timeslot:",
                "Date:",
                "Reference Number:",
            ];

            for(let i=0; i<expectedTohaveLabels.length;i++){
                expect(screen.getByText(labels[i]).textContent).toBe(expectedTohaveLabels[i]);
            }
            
            const expectedTextDisplayed = [
                "Jack Budha",
                "Mamelodi",
                "18787382",
                "13:15:00",
            ];
            
            for(let a=0;a<expectedTextDisplayed.length;a++){
                expect(screen.getByDisplayValue(expectedTextDisplayed[a])).toBeInTheDocument();
            }


            expect(axios.get).toHaveBeenCalledTimes(1);
            expect(axios.get).toHaveBeenCalledWith('http://localhost:3000/api/v1/packages', {"headers": {"Authorization": "6jsbhhheo93_"}});

        },{});

        const edit = screen.getByText("Edit");
        expect(edit.textContent).toBe("Edit");
        fireEvent.click(edit);

        const temp = screen.getByPlaceholderText("Enter location")
        fireEvent.change(temp, { target: { value: 'Mams' } });
        fireEvent.click(screen.getByText("Save Package"));

        await waitFor(()=>{
            expect(axios.put).toHaveBeenCalledTimes(1);
            expect(axios.put).toHaveBeenCalledWith('http://localhost:3000/api/v1/packages',{
                "date": "2021-06-01",
                "destination": "Jack Budha",
                "distance": "", "id": 1,
                "location": "Mams", 
                "reference_number": "18787382",
                "timeslot": "13:15:00"
            }, 
            {"headers": {"Authorization": "6jsbhhheo93_"}});
        });
    });

    test('should display packages and allow user to delete package',async()=>{
        const packageGetResponse =  [{
            created_at:"2023-05-01T11:33:04.297Z",
            date:"2021-06-01",
            destination:"Jack Budha",
            id:1,
            location:"Mamelodi",
            reference_number:"18787382",
            timeslot:"2000-01-01T13:15:00.000Z",
            updated_at:"2023-05-01T11:33:04.297Z",
            user_id:3
        }];

        axios.get.mockImplementationOnce(() => Promise.resolve({ data: packageGetResponse }));
        axios.delete.mockImplementationOnce(() => Promise.resolve({ data: packageGetResponse[0] }));

        sessionStorage.setItem('token', JSON.stringify({token:'6jsbhhheo93_'}));
    
        render(<App />);

        await waitFor(() => {
            const header = screen.getByText('Packages');
            expect(header.textContent).toBe('Packages');
            const buttonOne = screen.getByText("Create Package");
            expect(buttonOne.textContent).toBe('Create Package');
            const buttonTwo = screen.getByText("Logout");
            expect(buttonTwo.textContent).toBe('Logout');


            const expectedTohaveLabels = [
                "Location Name:    ",
                "Destination Name:    ",
                "Distance:    ",
                "Timeslot:   ",
                "Date:    ",
                "Reference Number:    ",
            ];
            const labels = [
                "Location Name:",
                "Destination Name:",
                "Distance:",
                "Timeslot:",
                "Date:",
                "Reference Number:",
            ];

            for(let i=0; i<expectedTohaveLabels.length;i++){
                expect(screen.getByText(labels[i]).textContent).toBe(expectedTohaveLabels[i]);
            }
            
            const expectedTextDisplayed = [
                "Jack Budha",
                "Mamelodi",
                "18787382",
                "13:15:00",
            ];
            
            for(let a=0;a<expectedTextDisplayed.length;a++){
                expect(screen.getByDisplayValue(expectedTextDisplayed[a])).toBeInTheDocument();
            }


            expect(axios.get).toHaveBeenCalledTimes(1);
            expect(axios.get).toHaveBeenCalledWith('http://localhost:3000/api/v1/packages', {"headers": {"Authorization": "6jsbhhheo93_"}});

        },{});

        const deleteButton = screen.getByText("Delete");
        expect(deleteButton.textContent).toBe("Delete");
        fireEvent.click(deleteButton);

        await waitFor(()=>{
            expect(axios.delete).toHaveBeenCalledTimes(1);
            expect(axios.delete).toHaveBeenCalledWith('http://localhost:3000/api/v1/packages', {
                "data": 
                {
                    "date": "2021-06-01", 
                    "destination_name": "Jack Budha", 
                    "distance": "", 
                    "id": 1, 
                    "location_name": "Mamelodi", 
                    "reference": "18787382", 
                    "timeslot": "13:15:00", 
                    "token": "6jsbhhheo93_"
                }, 
                "headers": {"Authorization": "6jsbhhheo93_"}
            });
        });
    });
})

