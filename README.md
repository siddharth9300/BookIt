# Book It

Book It is an online platform for booking halls for various events. This app allows users to view a list of available halls, book a hall for a specific date and time, and submit their booking requests for approval. Admin users can manage hall listings, approve or reject booking requests, and view booking details.

## Screenshot


https://raw.githubusercontent.com/siddharth9300/BookIt/main/BookIt.png?token=GHSAT0AAAAAACEQVMWP5ZX3BHX4JM3BD5KMZHTDDXQ

![alt text](https://github.com/siddharth9300//blob/main/BookIt.jpg?raw=true)

## Features

- Search and filter available halls by location, capacity
- Book a hall for a specific date and time
- Submit booking requests to admin for approval
- Admin dashboard for managing hall listings and booking requests
## Technologies Used

- React: A popular JavaScript library for building user interfaces
- Node.js: A server-side JavaScript runtime environment
- Express: A web application framework for Node.js
- MongoDB: A NoSQL database for storing data
- Mongoose: An Object Data Modeling (ODM) library for MongoDB
- Axios: A promise-based HTTP client for making API requests
- react-router-dom: A routing library for handling navigation in a React app
- Tailwind CSS: A utility-first CSS framework for styling the app

## Usage

### Users
- Search for available halls by entering the location and date of the event.
- View the list of available halls and their details, including hall name, location, capacity.
- Book a hall by selecting the desired hall and filling out the booking form.
- View the status of their booking request and receive notifications when the request is approved or rejected.
### Admin
- Approve or reject booking requests from users by logging in to the admin dashboard.
- View the list of pending booking requests and their details, including the user's name, email, and booking details.
- Create new halls by entering the hall name, location, capacity.

## Environment Variables

### Client Side
- `REACT_APP_ADMIN_SIGN_UP` = `true `
    - ##### To Enable Admin Sign Up `true` for `On` and `false` for `Off`
- `REACT_APP_HOD_FEATURE` = `false`
    - ##### To Enable HOD Feature `true` for `On` and `false` for
- `REACT_APP_SERVER_URL` = `<localhost server url here>`
    - ##### Enter Server Url

### Server Side
- `DATABASE` = <MongoDB Url Here>
    - ##### Enter MongoDB Url
- `PORT`= `9002`
  - ##### Server PORT
- `SECRET_KEY`= `<Secret Key>`
  - ##### MongoDB Key
- `ADMIN_KEY`= `<Admin Key>`
  - ##### Key for Admin Signup
- `SENDER_EMAIL`= `<Sender Email>`  
  - ##### Email from which verificaion and forgot link will be sent
- `ADMIN_EMAIL`= `<Admin Email>`
  - ##### Email of Admin
- `SENDER_PASSWORD`= `<Sender Email Password>`
  - ##### Password of Email from which verificaion and forgot link will be sent
- `CLIENT_URL`= `localhost client url here`
    - ##### Enter Server Url
- `REACT_APP_HOD_FEATURE` = `false`
    - ##### To Enable HOD Feature `true` for `On` and `false` for

## Contributing

Contributions are welcome! If you would like to contribute to this project, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes and commit them.
4. Push your changes to your forked repository.
5. Submit a pull request with a detailed description of your changes.


## Authors

- [@siddharth9300](https://www.github.com/siddharth9300)

