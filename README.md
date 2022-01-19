# NextJS Typescript Boilerplate for BigCommerce POS Channel Apps

A developer-friendly NextJS app meant to accelerate development of POS channels using BigCommerce's Channel Toolkit.

Configured with:

- React Components from [BigDesign](https://developer.bigcommerce.com/big-design/)
- [node-bigcommerce](https://github.com/getconversio/node-bigcommerce) as the BC API client
- [Prisma](https://www.prisma.io/) for DB access
- [Typescript](https://www.typescriptlang.org/)
- Linting with [ESLint](https://eslint.org/)
- Formatting with [Prettier](https://prettier.io/)
- Linting, typechecking and formatting on by default using [`husky`](https://github.com/typicode/husky) for commit hooks
- Testing with [Jest](https://jestjs.io/) and [`react-testing-library`](https://testing-library.com/docs/react-testing-library/intro)

## Deploy your own

Deploy the example using [Vercel](https://vercel.com):

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/import/project?template=https://github.com/bigcommerce-labs/pos-sample-app)

## How to run locally

Install it and run:

```bash
npm install
npm run dev
# or
yarn
yarn dev
```

The app should now be running at: http://localhost:3000

Now, to get the full auth flow working, you'll need to make sure there is a database to persist store and user info. For local dev, Prisma has been configured by default to use a SQLite DB provider, and there is a command that will create one for you with the tables defined in the `/prisma/migrations` folder: `npx prisma migrate up --experimental`

## How to install on a BigCommerce store

This app gets access to the BigCommerce API by being installed on store. You'll need two things to test out the this flow:
1. A BigCommerce store: go to https://www.bigcommerce.com/essentials/ and signup for a free trial if you don't have one
2. A BigCommerce app: go to https://devtools.bigcommerce.com and create a draft app with the following callbacks (in the 3rd, 'Technical' step of app creation):
  - Auth Callback URL: http://localhost:3000/api/auth
  - Load Callback URL: http://localhost:3000/api/load
  - Uninstall Callback URL: http://localhost:3000/api/uninstall

In order for the sample app to function properly, you must request API access for the following OAuth scopes:
  - Channel Settings: MODIFY 

However, you will want additional OAuth scopes, if building a POS channel app to be offered in the BigCommerce app marketplace. See more details on recommended OAuth scopes [here](https://developer.bigcommerce.com/api-docs/channels/building-channel-apps)

After creating the app, click on 'View Client ID' within the Dev Tools app list to get your Client ID and Client Secret that should be used in the local .env file and your preferred hosting environment settings. You also need your app ID, which can be found in the URL when you click on the app in devtools.bigcommerce.com. You can identify it as follows: devtools.bigcommerce.com/my/apps/<app_id>/summary?review=false

## Prisma Database Config

To host publicly, you'll most likely want to switch away from SQLite. To do this you would:
1. Update the `/prisma/schema.prisma` file with a `provider` other `sqlite` (i.e. `mysql`. info on options are here: https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-schema/data-sources/)
2. Update the `DATABASE_URL` var in `/prisma/.env` to match your new DB connection string
3. Run `npx prisma migrate up --experimental` (this creates tables and inserts related data as defined in `/prisma/migrations/*` into the DB)
4. Run `npx prisma generate` (this generates a new client for the app using the new DB provider setting)

After all this, if you run `npx prisma studio --experimental` you'll be able to access this database locally via a visual editor and verify the table have been created.

## Learn More

Looking to help the world's leading brands and the next generation of successful merchants take flight? To learn more about developing on top of the BigCommerce platform, take a look at the following resources:

- [BigCommerce Developer Center](https://developer.bigcommerce.com/) - learn more about BigCommerce platform features, APIs and SDKs
- [BigDesign](https://developer.bigcommerce.com/big-design/) - an interactive site for BigCommerce's React Components with live code editing
- [Building BigCommerce Apps](https://developer.bigcommerce.com/api-docs/getting-started/building-apps-bigcommerce/building-apps) - Learn how to build apps for the BigCommerce marketplace

## Common Errors

### After installing the app in BigCommerce I see only `{ error: {} }` on the screen

You probably don't have your database up and running. If you are running locally, try running this from you command line in the repo's root directory: `npx prisma studio --experimental`

Do you see an error modal in the studio interface? If so, cancel out and run `npx prisma migrate up --experimental`

You should now see the tables being generated! Now the app should install properly.