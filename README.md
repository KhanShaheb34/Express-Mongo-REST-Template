# Express-Mongo-Template

A template for node express-mongo-rest-api backend. It is secured and fast. Global error handler, JWT authorization system, request rate limiter, best security practices for express are already setup in this template.

## Table of Content

- [How to use](#how-to-use)
- [Routes](#routes)
- [Models](#models)
- [Controllers](#controllers)
- [Middlewares](#middlewares)
  - [Error Handler](#error-handler)
  - [Limiter](#limiter)
  - [Protect](#protect)
- [Authorization](#authorization)
- [Contribution](#contribution)

## How to use

There is a `Use Template` button on top of the repository page. You can generate your back-end by simply clicking the button.

Then create a `.env` file. Look at the [`.env.example`](/.env.exapmle) file for help. Then run `npm install` to install the required packages.

Now run `npm start` to start the development server. You must have nodemon globally installed. to install nodemon globally, run `npm i nodemon -g` use `sudo` if you get any permission error.

## Routes

Create a `js` file inside the `routes` folder and import the file in the `routes/index.js`. Then create express route in your `js` file. Have a look at the [`userRoutes.js`](/routes/userRoutes.js) as an example.

## Models

Create your models inside the `models` folder. Go to [Mongoose Documentation](https://mongoosejs.com/docs/guide.html) for more information.

## Controllers

Create your controllers inside the `controllers` folder. If you look at the [`userController.js`](/controllers/userController.js) file, you'll see that I used a function called `cathAsync` in every controller function. This is a helper function to avoid writing `try-catch block` for every async function.

## Middlewares

### Error Handler

The [Error Handler Middleware](/middlewares/errorHandler.js) is used to capture all of the errors from any middleware or controller and send a response according to the error. Just use `next(Error)` from any of the middleware or controller to use it. There are a class called [`AppError`](/utils/appError.js) extended from the `Error` class for better error responses.

So you can use the error handler like this:

```js
// Inside any middleware or controller
const error = new AppError(errorMessage, errorCode);
next(error);
```

### Limiter

If you want to limit the amount of request coming from any IP address you can use the `limiter` middleware. To use this you have to set the environment variables `RATE_LIMIT_RESETS_IN` (minute) and `RATE_LIMIT`. Now add the `limiter` middleware to any route you want.

### Protect

This middleware is used to protect a particular route from unauthorized users. Add thr `protect` middleware to any route you want.

## Authorization

I used JWT to do the authorization process. Send a post request to the `/users/login` route with the email and password and a token will be sent in both cokkies (http-only) and response json. Now, you can use Bearer token or token in your cookie to authorize the user.

## Contribution

Any kind of contribution is welcome. Have a look at the [CONTRIBUTING.md](/CONTRIBUTING.md) file for details.

### Credits

<small><i><a href='http://ecotrust-canada.github.io/markdown-toc/'>Table of contents generated with markdown-toc</a></i></small>
