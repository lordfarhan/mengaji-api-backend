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

### Model Schemas

- Book
  - \_id: auto generated,
  - title: stirng, auto generated,
  - author: string, auto generated, I assume it single author since it only has one author year of death,
  - authorYearOfDeath: number,
  - tags: array of string, I assume it has multiple tags for each book,
  - publisher: array of string, same as tags.
