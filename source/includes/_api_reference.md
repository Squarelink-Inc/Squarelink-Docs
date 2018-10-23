
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
  "success": true,
  "id": "uabcdef132345",
  "email": "satoshi@squarelink.com",
  "family_name": "Nakamoto",
  "given_name": "Satoshi",
  "created": 114012480
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
> GET /wallets request all currencies & ERC-20s

```shell
GET https://api.squarelink.com/wallets?
  access_token=xxx.xxxxx.xxx
  &currencies=ETH;BTC;LTC
  &erc20=true
```

> Example Response

```shell
{
  "success": true,
  "wallets": [
    {
      "balance": 2130542438999998500,
      "owner": "u12345wabcdef"
      "currency": "ETH",
      "decimals": 18,
      "name": "Ethereum",
      "address": "0x223b22347674da1797120327991d315b22dc1030",
      "created_on": 1539049741
    },
    {
      "owner": "u12345wabcdef",
      "currency": "LTC",
      "decimals": 8,
      "name": "Litecoin",
      "address": "LLTpMYh8iFDrCdWvhQTwUa1vLNEq4hGbTv",
      "testnet": "mmnwrGcPTvfeF4BeX9eZuoZYs4FMVPqNFH",
      "created_on": 1539049741,
      "balance": 39020091001
    },
    {
      "balance": 2079775461857,
      "owner": "u12345wabcdef",
      "currency": "BTC",
      "decimals": 8,
      "name": "Bitcoin",
      "address": "1NDyJtNTjmwk5xPNhjgAMu4HDHigtobu1s",
      "testnet": "mvzD7yesRStzoSEagBAS1C1Cd38xwgDZ1Z",
      "created_on": 1539049741,
     }
  ],
  "erc20": [
    {
      "balance": 124800000,
      "decimals": 18,
      "contract_address": "0x595832f8fc6bf59c85c527fec3740a1b7a361269",
      "symbol": "POWR",
      "name": "PowerLedger"
    },
    {
      "balance": 7.900590853137982e+21,
      "decimals": 18,
      "contract_address": "0xd26114cd6ee289accf82350c8d8487fedb8a0c07",
      "symbol": "OMG",
      "name": "OmiseGo"
    }
  ]  
}
```

<aside class="notice">All balances are passed in the smallest non-divisible value the respective currency supports</aside>



## Transactions
