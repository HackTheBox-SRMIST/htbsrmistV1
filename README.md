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
| false | 405 | `🚫 HTTP Method not Allowed` | 
| false | 500 | `❌ Database connected but failed to fetch the data!` | 






## Teams API

The Teams API is to display Team memebers of all our domain in HTB SRMIST.

## Get list of Members

### Request
    
 `GET`  `/api/v1/teams?current=true`


| Query | Type | Description |
| :--- | :--- | :--- |
| `current` | `boolean` | `True` Members currently in team <br/> `False`  Past members |
### Response

```javascript
{
   "success": bool,
    "message": string,
    "data": Array[Objects]
}
```
   


## Status Codes

Teams returns the following status codes in its API:

| success | Status Code | Description |
| :--- | :--- | :--- |
| true | 200 | `✅ Successfully fetched!` |
| false | 405 | `🚫 HTTP Method not Allowed` | 
| false | 422 | `👉 ValidationError` | 
| false | 500 | `🔌 Internal Server Error.` | 





## HealthCheck API

The Healthcheck API is to display the health of server which host our official website.

## Get Health Status

### Request
    
 `GET`  `/api/v1/healthcheck`


### Response

```javascript
{
	"success": boolean'
	"message": string'
	"timestamp": string'
	"uptime": number'
}
```
   


## Status Codes

HealthCheck returns the following status codes in its API:

| success | Status Code | Description |
| :--- | :--- | :--- |
| true | 200 | `API v1 working!` |
| false | 405 | `🚫 HTTP Method not Allowed` | 







## Contact Us API

The ContactUs API is to display .

## Get list of Members

### Request
    
 `POST`  `/api/v1/contactus`


| Body | Type | Description |
| :--- | :--- | :--- |
| `name` | `string` | **Required**. Your Name|
| `email` | `string` | **Required**. Your Email|
| `ContactNo` | `string` | Your Contact No.|
| `question` | `string` | **Required**. Your Name|
| `countryCode` | `string` | Your Name|



### Response

```javascript
{
   "success": bool,
    "message": string,
}
```
   


## Status Codes

ContactUs returns the following status codes in its API:

| success | Status Code | Description |
| :--- | :--- | :--- |
| true | 200 | `✅ Successfully sent the message!` |
| false | 405 | `🚫 HTTP Method not Allowed` | 
| false | 422 | `question must be at least 30 characters. ` | 
| false | 500 | `🔌 Internal Server Error.` | 


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
