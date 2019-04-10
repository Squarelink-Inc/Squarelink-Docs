
# **Sign In** Integration

With the Squarelink OAuth 2.0 **Sign In** button, you can authenticate your users and access info about their Squarelink accounts in minutes.

Want to see it in action? **Check out this [example application <i class="fas fa-external-link-alt"></i>](https://squarelink-inc.github.io/Sign-In-Example)**.

If you have not done so already, please [register your ÐApp](#getting-started) in the [Squarelink Developer Console](https://dev.squarelink.com).

## **Sign In** Button

> Sign In Button Template

```html
<a href="https://app.squarelink.com/authorize?
	client_id=<CLIENT_ID>
	&scope=[user:email,wallets:read]
	&redirect_uri=https://yourdapp.com/redirect
	&response_type=token">
    <img src="https://squarelink.com/img/sign-in.svg" width="220"></img>
</a>
```
Once you've set up your app or ÐApp for OAuth in the Developer Console, you can integrate the Sign In button in a cinch.

When a user clicks the button, they'll be instructed to authorize your ÐApp and then they'll be redirected back to your page.

Add, remove, and edit the following button parameters to get the functionality you need!


### **Sign In** button parameters:

Parameter | Required | Description
--------- | ------- | -----------
`client_id` | **true** | This is the `client_id` associated with your ÐApp.
`scope` | **true** | A comma-separated list of permissions you'd like to request from a user. [(See available scopes below)](#available-scopes).
`redirect_uri` | **true** | The URL you'd like us to send the user back to after the user has authorized your app.
`state` | *false* | Any valid CSRF token. We'll return it to you as a URL parameter in the redirect to your application.
`response_type` | **true** | Specifies the OAuth 2.0 grant type. Set to `code` to use the **[Authorization Code Grant](https://oauth.net/2/grant-types/authorization-code/)**. Set to `token` to use the **[Implicit Grant](https://oauth.net/2/grant-types/implicit/)**. Read [Obtain an Access Token](#obtain-an-access-token) for more info.

Once a user has authorized your app or ÐApp, we'll redirect the user to the redirect URI specified (if whitelisted) with the following parameters:

### Redirect Response

Parameter | Description
--------- | -----------
`state` | Returned if you passed it in the request.
`access_token` | An access token *if you specified the `token` response_type*.
`code` | An authorization code to be used in the second step of the Authorization Code Grant *if you specified the `code` response_type*.
`error` | A description of any issues with your request

A successfully authorized request will redirect back to your redirect URI such as `http://localhost:8080/your-redirect-uri?code=<AUTHORIZATION CODE>&state=<STATE>`.

If there is an issue with your request, we'll redirect back to your application with the `error` parameter. For instance, `http://localhost:8080/your-redirect-uri?error=<DESCRIPTION OF PROBLEM>`.

### Available Scopes
Parameter | Description
--------- | -----------
**`user:name`** | Allows you to read a user's name.
**`user:email`** | Allows you to see a user's email address.
**`user:security`** | Allows you to see a user's security settings.
**`user`** | Equivalent to all `user` scopes.
**`wallets:read`** | Allows you to see a user's wallets and transactions.
**`wallets:edit`** | Allows you to edit some information associated with a user's wallets.
**`wallets:create`** | Allows you to create new wallets for a user.
**`wallets:remove`** | Allows you to delete any wallets your app has created.
**`wallets:admin`** | Equivalent to all `wallet` scopes.

## Obtain an Access Token

> Authorization Code Grant Request Example

```shell
$ curl -X GET -H "Content-type: application/json" https://oauth.squarelink.com/token?
		grant_type=authorization_code
		&client_id=<CLIENT_ID>
		&client_secret=<CLIENT_SECRET>
		&code=<AUTHORIZATION_CODE>
		&state=<STATE>
```

> Example Response

```shell
{
  "success": true,
  "token_type": "Bearer",
  "expires": 24802104,
  "access_token": "xxx.xxxxxx.xxx",
  "refresh_token": "xxxx"
}
```

If you are building a [Single-Page Application](https://en.wikipedia.org/wiki/Single-page_application) or another frontend-only application, you should use `response_type=token` in your authorization request. This is to ensure your application's `client_secret` is never exposed to the public.

In this instance, we will return an access token as a URL parameter called `access_token` in the redirect back to your application. Now you're set to start using the [Squarelink API](#api-reference).

If you've built a standard web application or have a backend that can secure your `client_secret`, you should use `response_type=code` in your authorization request.

We will redirect to your application with a URL parameter called `code` as well as `state` if you provided it in the response.

You can now exchange `code` (and `state` if used) for an access token using Squarelink's OAuth API.

### _**Request Endpoint:**_ *[https://oauth.squarelink.com/token](https://oauth.squarelink.com/token)*

### Request Parameters
Parameter | Required | Description
--------- | ----------- | -----------
**`grant_type`** | **true** | Should be set to `authorization_code`
**`client_id`** | **true** | Your application's `client_id` found in the Developer Console
**`client_secret`** | **true** | Your application's `client_secret` found in the Developer Console
**`code`** | **true** | The authorization code returned to your application in the redirect
**`state`** | *If provided in authorization request* | The CSRF token originally sent in your authorization redirect

### Response Body
Parameter | Type | Description
--------- | ----------- | -----------
**`success`** | **Boolean** | Indicates if your request was successful
**`token_type`** | **String** | "Bearer"
**`expires`** | **Number** | Time from the epoch in seconds, indicates expiry time for access token
**`access_token`** | **String** | A JSON Web Token you can use to access Squarelink's API
**`refresh_token`** | **String** | A token you can use to refresh your access token after expiration [(See Below)](#refreshing-an-access-token)

<aside class="success">Now you're ready to use the Squarelink API. Use the resulting access token in all requests</aside>

## Refreshing an Access Token

> Refresh Grant Request

```shell
$ curl -X GET -H "Content-type: application/json" https://oauth.squarelink.com/token?
	  grant_type=refresh
	  &client_id=<CLIENT_ID>
	  &client_secret=<CLIENT_SECRET>
	  &refresh_token=<REFRESH_TOKEN>
	  &scope=<SCOPE>
```

> Example Response

```shell
{
  "success": true,
  "token_type": "Bearer",
  "expires": 24802104,
  "access_token": "xxx.xxxxxx.xxx",
  "refresh_token": "xxxx"
}
```

If you used the Authorization Code Grant method to get authorization from a user, you can refresh the resulting access token to prevent expiry. To do so, you must store the `refresh_token` received in the original response.

You may specify a new reduced scope as well. This new scope must be limited to scopes authorized in the initial authorization. For instance, if you were initially authorized for only `wallets:read`, you cannot request `wallets:admin`.

### _**Request Endpoint:**_ *[https://oauth.squarelink.com/token](https://oauth.squarelink.com/token)*

### Request Parameters
Parameter | Required | Description
--------- | ----------- | -----------
**`grant_type`** | **true** | Should be set to `refresh`
**`client_id`** | **true** | Your application's `client_id` found in the Developer Console
**`client_secret`** | **true** | Your application's `client_secret` found in the Developer Console
**`refresh_token`** | **true** | The `refresh_token` you received when first obtaining an access token
**`scope`** | *(Optional)* | A new comma-separated list of scopes (must be previously authorized for each)

### Response Body
Parameter | Type | Description
--------- | ----------- | -----------
**`success`** | **Boolean** | Indicates if your request was successful
**`token_type`** | **String** | "Bearer"
**`expires`** | **Number** | Time from the epoch in seconds, indicates expiry time for access token
**`access_token`** | **String** | A JSON Web Token you can use to access Squarelink's API
**`refresh_token`** | **String** | A token you can use to refresh your access token after expiration
