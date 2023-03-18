Website Deployed [here](https://htbsrmist.tech)

# APIs

## Events API

The Events API is to display events conducted by HTB SRMIST.

## Get list of Events

### Request
    
 `GET`  `/api/v1/events`


### Response

```javascript
{
   "success": bool,
    "message": string,
    "data": Array[Objects]
}
```
   


## Status Codes

Events returns the following status codes in its API:

| success | Status Code | Description |
| :--- | :--- | :--- |
| true | 200 | `✅ Successfully fetched!` |
| false | 500 | `❌ Database connected but failed to fetch the data!` |

# Environments

Setup the dev environment to contribute

-   Install Node and NPM.
-   Install MongoDB-Server Locally.
-   Run `npm install` after you clone the repo.

# Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.
