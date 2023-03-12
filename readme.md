## Mengaji Online Backend API

### Requirements

- node >= v16.x.x
- installed mongodb server locally
- installed nodemon globally

### Steps

- `clone this repo`.
- open in command line.
- install dependencies `npm install`.
- update `.env` or let it be.
- start server `npm run dev`
- check postman documentation for all provided requests.

### Modules

- `/controllers/book.controller.js` defines all bussiness logic
  - [GET] `get`: get paginated book list,
  - [POST] `search`: search book by provided field,
  - [POST] `create`: add new book,
  - [PATCH] `update`: edit existing data,
  - [DELETE] `delete`: delete book.
- `/models/book.model.js` defines the book schema
  - `_id`: auto generated,
  - `title`: stirng, auto generated,
  - `author`: string, auto generated, I assume it single author since it only has one author year of death,
  - `authorYearOfDeath`: number,
  - `tags`: array of string, I assume it has multiple tags for each book,
  - `publishers`: array of string, same as tags.
- `/middlewares/validated.middleware.js` defines the validation middleware to check all required field.
