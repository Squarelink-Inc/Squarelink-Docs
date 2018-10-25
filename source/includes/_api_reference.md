
# API Reference

By now, you have registered your app or DApp and integrated the Squarelink Sign In button. If you haven't done so already, [read how](#sign-in-integration).

For any of the following API Routes, we expect that you have [obtained an access token](#obtain-an-access-token) for your user's Squarelink account.

_**API Endpoint:**_ *[https://api.squarelink.com](https://api.squarelink.com)*

<aside class="notice">All routes are currently GET requests exclusively for viewing user's account info.</aside>

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

<aside class="notice">You must be authorized for the <i>user</i> scope to access this route.</aside>

Read a user's Squarelink Account info such as their email, family name, and given name with this route:

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

<aside class="notice">All balances are passed in the smallest non-divisible value the respective currency supports.</aside>

### GET /wallets
<aside class="notice">This route requires the <i>wallets:read</i> OR <i>wallets:read:<DESIRED CURRENCY></i> scope.</aside>

Get a list of a Squarelink user's wallets and public information about those wallets. Optionally, if you're authorized with the `wallets:read` or `wallets:read:eth` scopes, you can request a list of active ERC-20 balances for the user as well.  

### Request Parameters
Parameter | Type | Description
--------- | ----------- | -----------
**`access_token`** | **String** | *(Required)* The access token you received for a Squarelink user
**`currencies`** | **String** | A semi-colon-separated list of currencies for the wallets you'd like to request. Valid currencies are `ETH`, `BTC`, and `LTC`.
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
<aside class="notice">All token amounts are passed in the smallest non-divisible value the respective currency supports.</aside>

### GET /txs
> GET /txs Example Request (txs for ETH, BTC, LTC, and an ERC-20 token)

```shell
GET https://api.squarelink.com/txs?
  access_token=xxx.xxxxx.xxx
  &currencies=ETH;LTC;BTC
  &token_contracts=0xba5f00a28f732f23ba946c594716496ebdc9aef5
  &page=1
  &per_page=4
```
> Response Body

```shell
{
  "success": "true",
  "page_count": 23,
  "per_page": 4,
  "page": 1,
  "txs": [
    {
      "currency": "BTC",
      "id": "5ee585d5f7f7be8b056991042e6bf092e2e2a2324e217591124393c1259f0f59",
      "sub": "u12345abcdef",
      "action": "received",
      "block_number": null,
      "confirmations": 0,
      "date": 1539145879,
      "decimals": 8,
      "from": '36yKKUFiKzCoFh5QrHivpJVSYQwYwG6Hms',
      "status": "pending",
      "to": "1NDyJtNTjmwk5xPNhjgAMu4HDHigtobu1s",
      "value": 10000000000
    },
    {
      "currency": "LTC",
      "id": "71f2e39bf9834c9eee7289d435a4f2fd294dc8576934fb91212f536e5ac7bca4",
      "sub": "u12345abcdef",
      "action": "received",
      "block_number": 1498994,
      "confirmations": 7615,
      "date": 1538002833,
      "decimals": 8,
      "from": "LXphMWB3FwvMKXEzjJhGWXMeLzVZfUEcci",
      "status": "confirmed",
      "to": "LLTpMYh8iFDrCdWvhQTwUa1vLNEq4hGbTv",
      "value": 639798772
    },
    {
      "currency": "ETH",
      "id": "0xb3730f2b2af151a0aac5aca15bebb2b0b1fb242ca67c180045ff707e2f386cd0",
      "sub": "u12345abcdef",
      "action": "sent",
      "block_hash":
       "0xa19cce7bf340f866101aa1fb4a2500f168bb11436934128d32b3553fbb9b7abc",
      "block_number": 4854110,
      "confirmations": 1693271,
      "contract_address": null,
      "data": null,
      "date": 1515090524,
      "decimals": 18,
      "from": "0x223b22347674da1797120327991d315b22dc1030",
      "gas": 21000,
      "gas_price": 31000000000,
      "gas_used": 21000,
      "index": 78,
      "nonce": 22,
      "status": "confirmed",
      "to": "0x5700333a342bc21bf400c66ab0685867c4dde332",
      "value": 100000000000000000
    },
    {
      "currency": "ETH",
      "id": "0x8372289b2b811ca6b66797cd28a51af63b5468d57b505643716b0bb82be4387b",
      "sub": "u12345abcdef",
      "action": "received",
      "block_hash": "0x479ee01736fe8db8662fe48ecec923f00d1403daac5e55c6bfeba76d1e5ba18f",
      "block_number": 5860219,
      "confirmations": 687162,
      "contract_address": "0xba5f00a28f732f23ba946c594716496ebdc9aef5",
      "data": "0xa9059cbb000000000000000000000000223b22347674da1797120327991d315b22dc103000000000000000000000000000000000000000000000006d6639464dd6100000",
      "date": 1530057183,
      "decimals": 18,
      "from": "0x00f9252f87531fdb919a686e3e21d006a6304658",
      "gas": 61000,
      "gas_price": 3300000000,
      "gas_used": 53355,
      "index": 52,
      "nonce": 20709,
      "status": "confirmed",
      "to": "0x223b22347674da1797120327991d315b22dc1030",
      "token_decimals": null,
      "token_name": "OmiseGo",
      "token_symbol": "OMG",
      "token_value": 2.0180611e+21,
      "value": 0
    }
  ]
}
```

<aside class="notice">This route requires the <i>wallets:read</i> OR <i>wallets:read:<DESIRED CURRENCY></i> scope.</aside>

You can use this route to list a Squarelink user's transactions by currency, including specific ERC-20 token transactions or *all* ERC-20 token transactions. *Note:* All transaction requests are paginated.

### Request Parameters
Parameter | Type | Description
--------- | ----------- | -----------
**`access_token`** | **String** | *(Required)* The access token you received for a Squarelink user
**`currencies`** | **String** | A semi-colon-separated list of currencies for the transactions you'd like to request. Valid currencies are `ETH`, `BTC`, and `LTC`.
**`token_contracts`** | **String** | A semi-colon-separated list of contract addresses for ERC-20 tokens that you want to request transactions for. Only available if you're authorized for the `wallets:read` or `wallets:read:eth` scopes.
**`all_erc20`** | **Boolean** | Indicate whether you'd like us to return all ERC-20 transactions for a user. Only available if you're authorized for the `wallets:read` or `wallets:read:eth` scopes.
**`page`** | **Number** | *(Default: 1).* The page number for the paginated request.
**`per_page`** | **Number** | *(Default: 10)* The number of transactions you'd like per page. *Max is 20*

### Response Body
Parameter | Type | Description
--------- | ----------- | -----------
**`success`** | **Boolean** | Indicates if the request was successful
**`txs`** | **Array** | An array of [Transaction Objects](#transaction-object)
**`page_count`** | **Number** | Number of pages available
**`page`** | **Number** | Current page
**`per_page`** | **Number** | Results per page

### Transaction Object

<aside class="warning">The transaction model and routes are currently experimental. If you require additional information about a transaction, we recommend using a dedicated Blockchain explorer API.</aside>

Our transaction object has a large number of parameters which allows us to ubiquitously collect transactions across multiple blockchains. Please note the fields that are specific to certain blockchains and types of transactions.

Parameter | Type | Description
--------- | ----------- | -----------
**`currency`** | **String** | ETH, BTC, or LTC (ETH for ERC-20 txs)
**`id`** | **String** | The transaction hash on the blockchain
**`sub`** | **String** | The sender or recipient's Squarelink account ID
**`from`** | **String** | Sending address of the transaction
**`to`** | **String** | Recipient address of the transaction
**`value`** | **Float** | Token value sent measured in lowest non-divisible units of the token (ETH for ERC-20 tokens)
**`action`** | **String** | "sent" or "received"
**`date`** | **Number** | Datetime the transaction was broadcast. Number of seconds since the epoch.
**`decimals`** | **Number** | Number of decimals for the base currency (i.e. 18 for ETH, 8 for BTC)
**`block_number`** | **Number** | The index of the block on the blockchain
**`confirmations`** | **Number** | Number of times a transaction has been confirmed
**`status`** | **String** | `confirmed`, `pending`, or `failed`
**`block_hash`** | **String** | The hash of the block the transaction is found in (unless it is the most recent block) *(If ETH transaction)*
**`data`** | **String** | Contract data field *(if ETH transaction)*
**`gas`** | **Number** | Gas limit used for the transaction *(if ETH transaction)*
**`gas_price`** | **Number** | Gas price in lowest non-divisible amount of Ether *(if ETH transaction)*
**`gas_used`** | **Number** | Amount of gas used for the transaction *(if ETH transaction)*
**`index`** | **Number** | Index of a transaction in a block *(if ETH transaction)*
**`nonce`** | **Number** | Nonce of a transaction for a user's address *(if ETH transaction)*
**`contract_address`** | **String** | The contract address of an ERC-20 token *(if ERC-20 transaction)*
**`token_decimals`** | **Number** | Decimals specified by the ERC-20 token contract *(if ERC-20 transaction)*
**`token_name`** | **String** | Token name specified by the ERC-20 token contract *(if ERC-20 transaction)*
**`token_symbol`** | **String** | Token symbol specified by the ERC-20 token contract *(if ERC-20 transaction)*
**`token_value`** | **Float** | ERC-20 token value transferred measured in the smallest non-divisible units of the token *(if ERC-20 transaction)*
