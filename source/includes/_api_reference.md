
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

<aside class="notice">You must be authorized for the <i>user</i> scope to access this route</aside>

Read a user's Squarelink Account info such as their email, family name, and given name with this route

### Request Parameters
Parameter | Type | Description
--------- | ----------- | -----------
**`access_token`** | **String** | *(Required)* The access token you received for a Squarelink user

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

### GET /wallets
<aside class="notice">This route requires the <i>wallets:read</i> OR <i>wallets:read:<DESIRED CURRNECY></i> scope</aside>

Get a list of a Squarelink user's wallets and public information about those wallets. Optionally, if you're authorized with the `wallets:read` or `wallets:read:eth` scopes, you can request a list of active ERC-20 balances for the user as well.  

### Request Parameters
Parameter | Type | Description
--------- | ----------- | -----------
**`access_token`** | **String** | *(Required)* The access token you received for a Squarelink user
**`currencies`** | **String** | *(Required)* A semi-colon-separated list of currencies for the wallets you'd like to request. Valid currencies are `ETH`, `BTC`, and `LTC`.
**`erc20`** | **Boolean** | Indicate whether you'd like us to return all valid ERC-20 balances. Only available if you're authorized for the `wallets:read` or `wallets:read:eth` scopes.

### Response Body
Parameter | Type | Description
--------- | ----------- | -----------
**`success`** | **Boolean** | Indicates if the request was successful
**`wallets`** | **Array** | A list of [Wallet Objects](#wallet-object)
**`erc20`** | **Array** | A list of [ERC-20 Objects](#erc-20-object) (if you specified `erc20 = true`)

### Wallet Object

Parameter | Type | Description
--------- | ----------- | -----------
**`owner`** | **String** | The ID of the Squarelink user owning the wallet
**`currency`** | **String** | The currency of the wallet
**`balance`** | **Float** | Whole number balance of the wallet, measured in the lowest non-divisible amount of its currency
**`decimals`** | **Integer** | Number of decimal places the currency uses (i.e. 18 for ETH) for its lowest non-divisible amounts
**`name`** | **String** | The name of the currency (i.e. "Bitcoin")
**`address`** | **String** | The public address of the wallet
**`testnet`** | **String** | The testnet address of the wallet (if BTC or LTC)
**`created_on`** | **Integer** | Date created on Squarelink (number of seconds since the Epoch)

### ERC-20 Object

Parameter | Type | Description
--------- | ----------- | -----------
**`balance`** | **Float** | Whole number amount of ERC-20 tokens held by the user's account (lowest non-divisible amount)
**`decimals`** | **Integer** | Number of decimal places specified in the currency's contract
**`contract_address`** | **String** | The contract address of the ERC-20 token
**`symbol`** | **String** | The token symbol for the ERC-20 token (i.e. POWR for PowerLedger)
**`name`** | **String** | The ERC-20's name (i.e. PowerLedger)
**`address`** | **String** | The Squarelink user's Ethereum address holding these tokens

## Transactions
