# Technical Challenge 🚀

Thank you for taking the time to take on the following challenge. 

Most important to us is clarity and communication while working, we would like to treat this challenge like an actual task you will be critiqued on communication skills as much as your technical abilities.

I have created a Github repo with a very basic Rails application where a user can sign in and book packages.

Your task will be to convert this existing Rails application into an API and create a React frontend for a user to log into and schedule packages.

## You will be critiqued on the following:
- Neatness and clarity of code
- How you use version control eg: Naming and how you break down tasks
- Communication eg: Feedback to directors

## You will not be critiqued on: 
- The visual UI of the application, you will however have the opportunity to grow here

## Backend
**The backend consist of the following:**

- Package model with the following fields:

  t.text "location_name”
  t.text "destination_name”
  t.float "distance"
  t.time "timeslot"
  t.date “date”
  t.integer “reference_number”

- Devise setup for user authentication
- A user can have multiple packages
- A package belongs to a user

## Todo API:

- [ ] Setup Token-based authentication
- [ ] Convert the existing controllers to be used as an API, you may also use a querying language like GraphQL

## To Do Front End

- [ ] Create a standalone React application with npx create-react-app
- [ ] Add a basic login screen, with an email field, password field, and a login button. No sign up required*
- [ ] Authenticate user through token
- [ ] Create the main page to show all packages, each package to have edit and delete options.
- [ ] Setup a create package page with the ability to add new packages
- [ ] Setup an edit package page with the ability to edit packages
