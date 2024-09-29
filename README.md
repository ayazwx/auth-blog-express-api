# Authentication and Blog Express API

A simple REST API in Node.js

API Endpoints

| Methods     | Urls                      |Description                |
| ----------- | -----------               | -----------               |
| POST        | api/v1/register           |Create a user              |
| POST        | api/v1/login              |Login with email password  |
| GET         | api/v1/dashboard          |Check if user authenticated|
| POST        | api/v1/blog/add           |Add a blog                 |
| PUT         | api/v1/blog/update/:id    |Update a blog              |
| GET         | api/v1/blog/all           |Get all blogs              |

## Quick Start

Clone the repo.

```bash
https://github.com/ayazwx/auth-blog-express-api.git
```
cd auth-blog-express-api
```
Install the dependencies.

```bash
npm install
```
To start the express server, run the following.

```bash
npm start
```


