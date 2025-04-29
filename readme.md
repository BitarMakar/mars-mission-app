## Requirements
1. Install NodeJS from https://nodejs.org/en
2. Open CMD and run the following:
   1. Command 2: `node -v`
   2. Command 2: `npm -v`
3. If you got a message on both you are good to go.

---

## Step-By-Step Instructions
1. Open project in VSCode
2. Open console on that project
3. Run the following command: `npm i`
4. Create a local MySQL database server
5. Create a new `.env` file in the project and enter the correct DATABASE_URL you can see the `.env.example` file of how it should look like.
6. Once done, run the following:
   1. `npx prisma db push`
   2. `npx prisma generate` (only this first time, then no need)
7. Open the `.env` file you just created and create enter the following at the top:
   1. `PORT="3000"`
8. Run `npm start` to start the REST API Server

---

## Available Endpoints:
- **[GET]** /api/products (Get all products)
- **[GET]** /api/products/:id (Get a product by Id)
- **[POST]** /api/products (Create a product)
- **[PATCH]** /api/products/:id (Edit/Update a product by Id)
- **[DELETE]** /api/products/:id (Delete a product by Id)

#### POST Body Schema:
```json
{
  "name": "product name",
  "price": 9.99,
  "quantity": 10
}
```
**All values "name", "price" and "quantity" are required on POST**

---

#### PATCH Body Schema:
```json
{
  "name": "product name",
  "price": 9.99,
  "quantity": 10
}
```
**None to all values can be provided on PATCH**

For example:
```json
{
  "name": "new name",
  // No need for the rest.
}
```