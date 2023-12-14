# Products Store APIs

APIs to query and get products based on different filters from the mongo database.

---
## Requirements

For development, you will only need Node.js and a node global package, npm, installed in your environment.

### Node

You can install node js and npm easily with apt install, just run the following commands.

```sh
> sudo apt install nodejs
> sudo apt install npm
```

If the installation is successful, you can run the following command.
```sh
> node --version
v16.20.2

> npm --version
8.19.4
```

If you need to update `npm`, you can make it using `npm`! Cool right? After running the following command, open the command line again and be happy.
```sh
> npm install npm -g
```
---

## Installation

```sh
> git clone https://github.com/kaustubh0201/Task-Manager.git
> cd Task-Manager
> npm install
```

## Configure app

Create `.env` then add MongoDB URI in it. You will need to make a cluster on MongoDB Atlas or start the MongoDB server locally.

## Running the project
```sh
> npm start
```

---

## Database

* <b>Product Schema</b>
```sh
{
    name: {
        type: String,
        required: [true, 'Product name must be provided!']
    },

    price: {
        type: Number,
        required: [true, 'Product price must be provided!']
    },

    featured: {
        type: Boolean,
        default: false
    },

    rating: {
        type: Number,
        default: 4.5
    },

    createdAt: {
        type: Date,
        default: Date.now()
    },

    company: {
        type: String,
        enum: {
            values: ['ikea', 'liddy', 'caressa', 'marcos'],
            message: '{VALUE} is not supported.'
        }
    }
}
```

---

## API Queries

---

* <b>Featured</b>
    
    The featured parameter can be either put as true or false. This will query the database with the given featured value.
    ```sh
    http://localhost:3000//api/v1/products?featured=true // for true value
    http://localhost:3000//api/v1/products?featured=false // for false value
    ```

---

* <b>Company</b>
  
  The company parameter can be used to filter the query by company.
    ```sh
    http://localhost:3000//api/v1/products?company=ikea
    ```

---

* <b>Name</b>

  The name parameter can be used to filter the query by product's name. In case, only some letters are provided then
  the query will find the product's name which start with those letters.
    ```sh
    http://localhost:3000//api/v1/products?name=armchair
  
    // to get all product names with starting letter as 'a'
    http://localhost:3000//api/v1/products?name=a 
    ``` 
  
---

* <b>Sort</b>

  The query output can be sorted on the basis of some field values such as name or price. 
  The fields can be put separated by commas(,). If we want in the reverse order then minus(-) can be used in the parameter.
    ```sh
    http://localhost:3000//api/v1/products?sort=price
    http://localhost:3000//api/v1/products?sort=name,price
    http://localhost:3000//api/v1/products?sort=-name
    http://localhost:3000//api/v1/products?sort=-name,-price
    ```

---

* <b>Fields</b>

  It can be specified which fields you want from the query and all the other fields would be ignored. 
  If you want the name, price and company of the product then
  it can be put with this parameter.
    ```sh
    http://localhost:3000//api/v1/products?fields=name,price,company
    ```

---

* <b>Numeric Filters</b>

  The numeric filters can be used to specify if you want the output which is greater than, lesser than etc. of some value.
  Multiple relations can also be specified if required separated by commas(,).
    ```sh
    http://localhost:3000//api/v1/products?numericFilter=price>=45
    http://localhost:3000//api/v1/products?numericFilter=price<=90,rating>4
    ```
  
---

* <b>Specifying multiple queries</b>

  All the queries can be used together and any number of combinations can be made using that. 
  For e.g. all the products of company ikea, name starting with letter 'a', sorted on rating in descending order and 
  with price in ascending order, getting only product priced less than 100 with fields name, price, company and rating.
  ```sh
    http://localhost:3000//api/v1/products?company=ikea&name=a&sort=-rating,price&featured=true&numericFilters=price<100&fields=name,price,company,rating
    ```