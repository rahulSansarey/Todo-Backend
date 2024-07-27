# Todo Application

This Todo application is built using Node.js, Express.js, JavaScript, and MongoDB. It offers a straightforward and efficient way for users to manage their daily tasks.

## Features

1. **User Authentication**
   - Users can register, log in, and log out securely.

2. **Personalized Todo Management**
   - Users can add, view, update, and delete their own todo items.
   - Each user can only see the tasks they have created, ensuring privacy and personalized task management.

3. **Task Details**
   - For each todo item, users can specify:
     - **Title**: The main identifier for the task.
     - **Due Date**: The deadline for completing the task.
     - **Description**: Additional details or notes related to the task.
## Technologies Used

[Nodejs](https://nodejs.org/en)                                  
[Express](https://expressjs.com/)          
[MongoDB](https://www.mongodb.com/try/download/community)



## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`MONGODB_URL`

`JWT_SECRET`

`PORT`

`JWT_EXPIRES= 7d`

`COOKIE_EXPIRES=7``

`FRONTEND_URL= http://localhost:5173`
## Installation

Install Node modules with NPM

```bash
  npm install
```
To Start the server run the below command

```bash
  nodemon server.js
```


## API Reference

#### User Registration

```http
  POST http://localhost:3000/api/v1/user/register
```
#### Required fields to SignUp

```http
{
"name": "Rahul Kumar",
"email": "rahul@gmail.com",
"phone": 1234567890,
"password": "12345678"
}
```

#### User Login

```http
  POST http://localhost:3000/api/v1/user/login
```
#### Required fields to Login

```http 
{
 {
    "email": "rahul@gmail.com",
    "password": "12345678"
}
}
```

#### Get the User details

```http
  GET http://localhost:3000/api/v1/user/getUser
```


#### Logout the User

```http
  GET http://localhost:3000/api/v1/user/logout
```


#### To Save the Todo

```http
  POST http://localhost:3000/api/v1/saveTodo
```

#### Required fields to Save the Todo

```http 
{
  "title": "Amit's Todo no.2 ",
    "description": "This todo is saved by amit todo",
    "duedate": "12/12/2024"
}
```

#### To Save the GET the Todo

```http
  GET http://localhost:3000/api/v1/getTodo
```

#### To DELETE the Todo

```http
  DELETE http://localhost:3000/api/v1/deleteTodo/66969cb0d28caa3cf3b401a9(_after deleteTodo its todo ID)
```

#### To UPDATE the Todo

```http
  PUT http://localhost:3000/api/v1/66969cb0d28caa3cf3b401a9(todo ID)
```

#### Required fields to Update the Todo

```http 
{
   "title": "Updated the classes"
}
```




## Optimizations

What optimizations did you make in your code? E.g. refactors, performance improvements, accessibility


## Feedback

If you have any feedback, please reach out to me at rkkr.work@gmail.com

## What Other features that can be added into this Project

1. Add OTP verification while registration.
2. Add features to Forget the User Password.
3. Add features to Update User profile and You can also use Cloudinary to store user Image.
4. Add Notification functionality
## Authors

- [@rahulSansarey(https://github.com/rahulSansarey)

