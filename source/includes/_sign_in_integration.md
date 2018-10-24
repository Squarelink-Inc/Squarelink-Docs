
# Sign In Integration

With the Squarelink Sign In button, you can authenticate your users and access info about their Squarelink accounts in minutes.

If you have not done so already, please [register your app or DApp](#getting-started) in the [Squarelink Developer Console](https://dev.squarelink.com)

## Set Up Your App

Once you've registered your application, you can head to your application's home page in the [Developer Console](https://dev.squarelink.com) and click on "Sign In". We'll prompt you to add some application-specific information as follows:

- **App Type:** what kind of application are you building?
- **Redirect URI Whitelist:** a list of URLs that we are allowed to redirect back to after a user authorizes your app. **Leave blank to use any URL**
- **Website:** your applications website

After you've set up your app or DApp for OAuth, you can simply copy and paste the auto-generated button code.

## Sign In Button

> Your button code should look something like this:

```html
<a href="https://app.squarelink.com/authorize?
	client_id={{Your app's client_id}}
	&scope=[{{Comma-separated desired scopes}}]
	&redirect_uri={{One of your whitelisted redirect URIs}}
	&state={{An optional csrf token}}
	&response_type={{'code' or 'token'}}">
    <img src="https://squarelink.com/img/sign-in.svg" width="220"></img>
</a>
```
Once you've set up your app or DApp for OAuth in the Developer Console, you can integrate the Sign In button in a cinch.

The Sign In button should redirect the user to Squarelink's Authorization Page with the following parameters:

Parameter | Required | Description
--------- | ------- | -----------
`client_id` | **true** | This is the `client_id` found on your App's home page in the Developer Console
`scope` | **true** | This is a comma-separated list of permissions you'd like to request from a user. (See available scopes below)
`redirect_uri` | **true** | This is the url you'd like us to send the user back to after the user has authorized your app. **Make sure it is whitelisted in your app's Sign In settings**
`state` | *false* | This can be any valid CSRF token (randomly generated). We'll return it to you as a URL parameter in the redirect to your application.
response_type | **true** | Specifies the OAuth 2.0 grant type. Set to "**code**" to use the **[Authorization Code Grant](https://oauth.net/2/grant-types/authorization-code/)**. Set to "**token**" to use the **[Implicit Grant](https://oauth.net/2/grant-types/implicit/)**. Read [Obtain an Access Token](#obtain-an-access-token) for more info.

Once a user has authorized your app or DApp, we'll redirect the user to the redirect URI specified (if whitelisted) with the following parameters:

Parameter | Description
--------- | -----------
`state` | Returned if you passed it in the request
`access_token` | An access token *if you specified the `token` response_type*
`code` | An authorization code to be used in the second step of the Authorization Code Grant *if you specified the `code` response_type*

A successfully authorized request will redirect back to your redirect URI such as `http://localhost:8080/your-redirect-uri?code=xxxxx&state=xxxxx`

If there is an issue with your request, we'll redirect back to your application with the `error` parameter. For instance, `http://localhost:8080/your-redirect-uri?error=description%20of%20the%20problem`

### Available Scopes
Parameter | Description
--------- | -----------
**`user`** | This allows you to view user info such as email, given_name, and family_name
**`wallets:read`** | This allows you to read info such as transactions and addresses for all of a user's blockchain accounts.
**`wallets:read:eth`** | A reduced-scope version of `wallets:read` limited to Ethereum accounts
**`wallets:read:btc`** | A reduced-scope version of `wallets:read` limited to Bitcoin accounts
**`wallets:read:ltc`** | A reduced-scope version of `wallets:read` limited to Litecoin accounts

## Obtain an Access Token

> Authorization Code Grant Request Example

```shell
GET https://oauth.squarelink.com/token?
  grant_type=authorization_code
  &client_id=xxxxx
  &client_secret=xxxxx
  &code=xxxxx
  &state=xxxxx
```

> Example Response

```shell
{
  "success": true,
  "token_type": 'Bearer',
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

<aside class="success">Now you're ready to use the Squarelink API]. Use the resulting access token in all requests</aside>

### _**Request Endpoint:**_ *[https://oauth.squarelink.com/token]()*

### Request Parameters
Parameter | Required | Description
--------- | ----------- | -----------
**`grant_type`** | **true** | Should be set to `authorization_code`
**`client_id`** | **true** | Your application's `client_id` found in the Developer Console
**`client_secret`** | **true** | Your application's `client_secret` found in the Developer Console
**`code`** | **true** | The authorization code returned to your application in the redirect
**`state`** | *If provided in authorization request* | A reduced-scope version of `wallets:read` limited to Litecoin accounts

### Response Body
Parameter | Type | Description
--------- | ----------- | -----------
**`success`** | **Boolean** | Indicates if your request was successful
**`token_type`** | **String** | "Bearer"
**`expires`** | **Number** | Time from the epoch in seconds, indicates expiry time for access token
**`access_token`** | **String** | A JSON Web Token you can use to access Squarelink's API
**`refresh_token`** | **String** | A token you can use to refresh your access token after expiration [(See Below)](#refreshing-an-access-token)


<aside class="notice">Make sure you replace "client_id" and "client_secret" with the values found on the home page of your
app in the Developer Console</aside>

## Refreshing an Access Token

> Refresh Grant Request Example

```shell
GET https://oauth.squarelink.com/token?
  grant_type=refresh
  &client_id=xxxxx
  &client_secret=xxxxx
  &refresh_token=xxxxx
  &scope=[wallets:read:eth,user]
```

> Example Response

```shell
{
  "success": true,
  "token_type": 'Bearer',
  "expires": 24802104,
  "access_token": "xxx.xxxxxx.xxx",
  "refresh_token": "xxxx"
}
```

If you used the Authorization Code Grant method to get authorization from a user, you can refresh the resulting access token to prevent expiry. To do so, you must store the `refresh_token` received in the original response.

You may specify a new reduced scope as well. This new scope must be limited to scopes authorized in the initial authorization. For instance, if you were initially authorized for only `wallets:read:eth`, you cannot request `wallets:read`.

### _**Request Endpoint:**_ *[https://oauth.squarelink.com/token]()*

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
