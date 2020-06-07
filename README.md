# Postgres Row Level Security example

When developing a multi-tenant app, an important decision is how the data owned by each tenant will be isolated from each other. There are many approaches for this, like:

* Allocating a dedicated database for every client
* Using a single database but separated schemas for each client
* Using a single database, single schema, and adding a `tenant_id` column in every table. 

The last option cost less and it's easier to maintain than the others, but imposes some security challenges, like ensuring that one tenant can't access data from another tenant.

A good way to make this checking less error-prone, e.g., forgetting a `where tenant_id = ?` clause, is by centralizing the isolation policies at the database level, removing the responsibility from the developers. One way to achieve this on Postgres is to use a feature called Row Level Security, which allows to making restrictions on which rows are returned when selecting or affected when inserting, updating, and deleting.

This application is an example of how RLS can be used in an express app, using a middleware for getting the correct connection for each tenant.

## Installation

```bash
git clone https://github.com/franzon/postgres-rls-example.git
cd postgres-rls-example
yarn
```

## Usage

1.  Run a Postgres database (Docker can be used).
2.  Update credentials on `knexfile.js`
3.  Run migrations

```bash
npx knex:migrate latest
```

4.  Run seeds

```bash
npx knex:seed run
```

5. Create an another Postgres and give permissions on database. (RLS will not work if using the same user used on migrations). Make sure to update `knexfile.js`.

6. Run application

```bash
yarn dev
```

7. Access this URL on browser

`http://localhost:3000/users?tenant_id=tenant2`

After acessing the URL, only the data related to `tenant2` will be returned.

## Contributing
Pull requests for code or README improvements are welcome.

## License
[MIT](https://choosealicense.com/licenses/mit/)