
# Mern-Hotel-Booking app

This project is made for a practice app for my `mern stack` skill and it uses following technologies:

`bcryptjs`
    `cloudinary`
    `cookie-parser`
    `cors`
    `cross-env`
    `dotenv`
    `express`
    `express-validator`
    `jsonwebtoken`
    `mongodb`
    `mongoose`
    `multer`
    `stripe`
   `stripe/react-stripe-js`
    `@stripe/stripe-js`
    `autoprefixer`
    `postcss`
    `react`
    `react-datepicker`
    `react-dom`
    `react-hook-form`
    `react-icons`
    `react-query`
    `react-router-dom`
   


## Installation

in cmd:
```bash
 git  clone https://github.com/ProgrammerZain/mern-Hotel-booking-app.git
```
after cloning first install all dependencies:
```bash
  cd backend
  npm i
  cd ..
  cd frontend
  npm i
```
then run both backend and frontend using:
```bash
  cd backend
  npm run dev
  cd ..
  cd frontend
  npm run dev
```

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

- Backend:
`MONGODB_CONNECTION_STRING`
`JWT_SECRET_KEY`
`FRONTEND_URL`


#CLOUDINAR VARIABLES(optional):
`CLOUDINARY_CLOUD_NAME`
`CLOUDINARY_API_KEY`
`CLOUDINARY_API_SECRET`

#Stripe:
`STRIPE_API_KEY`

- Frontend:
`VITE_API_BASE_URL`
`VITE_STRIPE_PUB_KEY`
## Running Tests

To run tests, run the following command

```bash
  cd backend
  npm run e2e
```
I used `Thunder Client` & `Playwright Test for VSCode`
extensions.

