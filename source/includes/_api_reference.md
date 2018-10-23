
# API Reference

By now, you have registered your app or DApp and integrated the Squarelink Sign In button. If you haven't done so already, [read how](#sign-in-integration).

For any of the following API Routes, we expect that you have [obtained an access token](#obtain-an-access-token) for your user's Squarelink account.

_**API Endpoint:**_ *[https://api.squarelink.com]()*

<aside class="notice">All routes are currently GET requests exclusively for viewing user's account info</aside>

## User Info

### GET /user
> GET /user request example

```shell
GET https://api.squarelink.com/user?access_token=xxx.xxxxx.xxx
```

> Example Response

```shell
{
  success: true,
  id: "uabcdef132345",
  email: "satoshi@squarelink.com",
  family_name: "Nakamoto",
  given_name: "Satoshi",
  created: 114012480
}
```

<aside class="notice">You must be authorized for the `user` scope to access this route</aside>

Read a user's Squarelink Account info such as their email, family name, and given name with this route

### Request Parameters
Parameter | Required | Description
--------- | ----------- | -----------
**`access_token`** | **true** | The access token you received for a Squarelink user

### Response Body
Parameter | Type | Description
--------- | ----------- | -----------
**`success`** | **Boolean** | Indicates if the request was successful
**`id`** | **String** | The user's Squarelink User ID
**`email`** | **String** | The user's email address
**`family_name`** | **String** | The user's last name
**`given_name`** | **String** | The user's first name
**`created`** | **Number** | When the user's account was created *(seconds from the Epoch)*


## Wallets

## Transactions
