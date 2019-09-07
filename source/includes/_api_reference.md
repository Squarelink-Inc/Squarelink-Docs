
# API Reference

By now, you have registered your app or ÐApp and integrated the Squarelink Sign In button. If you haven't done so already, [read how](#sign-in-integration).

For any of the following API Routes, we expect that you have [obtained an access token](#obtain-an-access-token) for your user's Squarelink account.

_**API Endpoint:**_ *[https://api.squarelink.com](https://api.squarelink.com)*

<hr>
## GET /user
> GET /user request example

```shell
$ curl -X GET -H "Content-type: application/json" https://api.squarelink.com/user?access_token=<ACCESS_TOKEN>
```

> Example Response

```shell
{
  "success": true,
  "id": "uabcdef132345",
  "email": "satoshi@squarelink.com",
  "family_name": "Nakamoto",
  "given_name": "Satoshi",
  "email_verified": true,
  "has_2fa": true,
  "has_recovery": true,
  "created": 114012480
}
```
Read a user's Squarelink Account info such as their email, name, and security settings with this route.

### Required Scopes: `user`, `user:name`, `user:email`, or `user:security`

### Request Parameters
Parameter | Type | Description
--------- | ----------- | -----------
**`access_token`** | **String** | *(Required)* The access token you received for a Squarelink user.

### Response Body
Parameter | Type | Required Scope | Description
--------- | ----------- | --------- | -----------
**`success`** | **Boolean** | Any | Indicates if the request was successful
**`id`** | **String** | Any | The user's Squarelink User ID.
**`email`** | **String** | `user:email` | The user's email address.
**`family_name`** | **String** | `user:name` | The user's last name.
**`given_name`** | **String** | `user:name` | The user's first name.
**`email_verified`** | **Boolean** | `user:security` | Indicates if the user has verified their email.
**`has_2fa`** | **Boolean** | `user:security` | Indicates if the user has enabled 2-factor authentication.
**`has_recovery`** | **Boolean** | `user:security` | Indicates if the user has enabled account recovery.
**`created`** | **Number** | Any |  When the user's account was created *(seconds from the Epoch)*.


<hr>

## GET /wallets
> GET /wallets Example Request

```shell
$ curl -X GET -H "Content-type: application/json" https://api.squarelink.com/wallets?access_token=<ACCESS_TOKEN>
```

> Example Response

```shell
{
  "success": true,
  "wallets": [
    {
      "id": "w54131fbcdea01"
      "owner": "u12345dabcdef"
      "name": "Satoshi's ETH Account",
      "address": "0x223b22347674da1797120327991d315b22dc1030",
      "created_on": 1539049741
    },
    {
      "id": "w10abedcf13145"
      "owner": "u12345dabcdef"
      "name": "ETH Account 2",
      "address": "0xf40bED2fFEE76B5517Fc992CC798Ece4c55D8F99",
      "created_on": 1539048241,
      "creator": "Your-dapp-id"
    },
  ],
}
```
Get a list of a user's Ethereum accounts and their addresses.

### Required Scopes: `wallets:admin` or `wallets:read`

### Request Parameters
Parameter | Type | Description
--------- | ----------- | -----------
**`access_token`** | **String** | *(Required)* The access token you received for a Squarelink user.

### Response Body
Parameter | Type | Description
--------- | ----------- | -----------
**`success`** | **Boolean** | Indicates if the request was successful.
**`wallets`** | **Array** | A list of [Wallet Objects](#wallet-object).

<hr>

## GET /wallet
> GET /wallet Example Request

```shell
$ curl -X GET -H "Content-type: application/json" https://api.squarelink.com/wallet?
    access_token=<ACCESS_TOKEN>
    wallet_id=<WALLET_ID>
```

> Example Response

```shell
{
  "success": true,
  "wallet": {
    "id": "w54131fbcdea01"
    "owner": "u12345dabcdef"
    "name": "Satoshi's ETH Account",
    "address": "0x223b22347674da1797120327991d315b22dc1030",
    "created_on": 1539049741
  }
}
```
Get information for a specific wallet owned by a user.

### Required Scopes: `wallets:admin` or `wallets:read`

### Request Parameters
Parameter | Type | Description
--------- | ----------- | -----------
**`access_token`** | **String** | *(Required)* The access token you received for a Squarelink user.
**`wallet_id`** | **String** | *(Required)* The ID for the wallet you want to view.

### Response Body
Parameter | Type | Description
--------- | ----------- | -----------
**`success`** | **Boolean** | Indicates if the request was successful.
**`wallet`** | **Object** | A [Wallet Object](#wallet-object).

<hr>

## PATCH /wallet
> PATCH /wallet Example Request

```shell
$ curl -X PATCH -H "Content-type: application/json" https://api.squarelink.com/wallet
  -d '{
    "access_token": "<ACCESS_TOKEN>",
    "wallet_id": "w54131fbcdea01",
    "name": "New Wallet Name"
    "make_default": true
  }'
```

> Example Response

```shell
{
  "success": true,
  "wallet": {
    "id": "w54131fbcdea01"
    "owner": "u12345dabcdef"
    "name": "New Wallet Name",
    "address": "0x223b22347674da1797120327991d315b22dc1030",
    "created_on": 1539049741
  }
}
```
Edit information for a specific wallet owned by a user.

### Required Scopes: `wallets:admin` or `wallets:edit`

### Request Parameters
Parameter | Type | Description
--------- | ----------- | -----------
**`access_token`** | **String** | *(Required)* The access token you received for a Squarelink user.
**`wallet_id`** | **String** | *(Required)* The ID for the wallet you want to view.
**`name`** | **String** | Name you want to set for the wallet.
**`make_default`** | **Boolean** | `true` if you want to set this as the user's default wallet.

### Response Body
Parameter | Type | Description
--------- | ----------- | -----------
**`success`** | **Boolean** | Indicates if the request was successful.
**`wallet`** | **Object** | A [Wallet Object](#wallet-object).


<hr>

## DELETE /wallet
> DELETE /wallet Example Request

```shell
$ curl -X DELETE -H "Content-type: application/json" https://api.squarelink.com/wallet?
    access_token=<ACCESS_TOKEN>
    wallet_id=<WALLET_ID>
```

> Example Response

```shell
{
  "success": true,
  "message": "Wallet deleted successfully"
}
```
Delete a wallet owned by a user that was created by your app

### Required Scopes: `wallets:admin` or `wallets:remove`

### Request Parameters
Parameter | Type | Description
--------- | ----------- | -----------
**`access_token`** | **String** | *(Required)* The access token you received for a Squarelink user.
**`wallet_id`** | **String** | *(Required)* The ID for the wallet you want to view.

### Response Body
Parameter | Type | Description
--------- | ----------- | -----------
**`success`** | **Boolean** | Indicates if the request was successful.
**`message`** | **String** | A message about the request.



<hr>
## POST /wallet
> POST /wallet Example Request

```shell
$ curl -X POST -H "Content-type: application/json" https://api.squarelink.com/wallet
  -d '{
    "access_token": "<ACCESS_TOKEN>",
    "name": "New Wallet"
  }'
```

> Example Response

```shell
{
  "success": true,
  "wallet": {
    "id": "w54131fbcdea01"
    "owner": "u12345dabcdef"
    "name": "New Wallet",
    "address": "0xd26114cd6EE289AccF82350c8d8487fedB8A0C07",
    "created_on": 1539049741
  }
}
```
Edit information for a specific wallet owned by a user.

### Required Scopes: `wallets:admin` or `wallets:edit`

### Request Parameters
Parameter | Type | Description
--------- | ----------- | -----------
**`access_token`** | **String** | *(Required)* The access token you received for a Squarelink user.
**`name`** | **String** | Name you want to set for the wallet.

### Response Body
Parameter | Type | Description
--------- | ----------- | -----------
**`success`** | **Boolean** | Indicates if the request was successful.
**`wallet`** | **Object** | A [Wallet Object](#wallet-object).


<hr>
## GET /txs
> GET /txs Example Request

```shell
$ curl -X GET -H "Content-type: application/json" https://api.squarelink.com/txs?
    access_token=<ACCESS_TOKEN>
    &network=custom
    &network_config=%7B%22url%22:%22http:%2F%2Flocalhost:8545%22,%22chain_id%22:24214%7D
    &page=1
    &per_page=10
```
> Response Body

```shell
{
  "success": "true",
  "page_count": 23,
  "per_page": 10,
  "page": 1,
  "txs": [
    {
      "id": "0x8372289b2b811ca6b66797cd28a51af63b5468d57b505643716b0bb82be4387b",
      "sub": "u12345abcdef",
      "network": "custom",
      "network_config": {
        "url": "https://localhost:8545",
        "chain_id": 24214
      },
      "wallet_id": "w96cae4bf1122",
      "from": "0x00f9252f87531fdb919a686e3e21d006a6304658",
      "to": "0x223b22347674da1797120327991d315b22dc1030",
      "gas": "61000",
      "gasPrice": "3300000000",
      "value": "0",
      "nonce": "29",
      "hex": "0xf86a141482520894948b48c6ef7564254bfb74e90a3856b70e8374e9890d108bff209524000080820a96a0aaf11ea3a5dabcaa095b54921fa46e8ed70481d7fc7252503bd5968fae0e1477a03fd4f1cd1b5e1444e54321168c7464cf98fa95bca1efbff9d0c160d3a03713ff",
      "signature": {
        "v": 2710,
        "r": "0xaaf11ea3a5dabcaa095b54921fa46e8ed70481d7fc7252503bd5968fae0e1477",
        "s": "0x3fd4f1cd1b5e1444e54321168c7464cf98fa95bca1efbff9d0c160d3a03713ff",
      },
      "date": 1538002833
    }
    ...
  ]
}
```
You can use this route to list a Squarelink user's transactions for a specific network.

### Required Scopes: `wallets:admin` or `wallets:read`

### Request Parameters
Parameter | Type | Description
--------- | ----------- | -----------
**`access_token`** | **String** | *(Required)* The access token you received for a Squarelink user.
**`network`** | **String** | *(Required)* The desired network from which to list transactions. See [Available Networks](#available-networks)
**`network_config`** | **Object** | *(Required if network is `custom`)* URL Query-encoded object with following properties:
**`network_config.url`** | **String** | *(Required if network is `custom`)* RPC Endpoint for your custom network.
**`network_config.chain_id`** | **Integer** | *(Optional)* Chain ID for your custom network.
**`wallet_id`** | **String** | *(Optional)* Specific target wallet owned by the user.
**`client_id`** | **String** | *(Optional)* Filter transactions with the `client_id` of an app you own.
**`page`** | **Number** | *(Default: 1).* The page number for the paginated request.
**`per_page`** | **Number** | *(Default: 10)* The number of transactions you'd like per page. *Max is 20*.

### Response Body
Parameter | Type | Description
--------- | ----------- | -----------
**`success`** | **Boolean** | Indicates if the request was successful.
**`txs`** | **Array** | An array of [Transaction Objects](#transaction-object).
**`page_count`** | **Number** | Number of pages available.
**`page`** | **Number** | Current page.
**`per_page`** | **Number** | Results per page.


<hr>
## GET /tx
> GET /tx Example Request

```shell
$ curl -X GET -H "Content-type: application/json" https://api.squarelink.com/tx?
    access_token=<ACCESS_TOKEN>
    &network=kovan
    &page=1
    &per_page=10
```
> Response Body

```shell
{
  "success": "true",
  "tx": {
    "id": "0x8372289b2b811ca6b66797cd28a51af63b5468d57b505643716b0bb82be4387b",
    "sub": "u12345abcdef",
    "network": "kovan",
    "wallet_id": "w96cae4bf1122",
    "from": "0x00f9252f87531fdb919a686e3e21d006a6304658",
    "to": "0x223b22347674da1797120327991d315b22dc1030",
    "gas": "61000",
    "gasPrice": "3300000000",
    "value": "0",
    "nonce": "29",
    "hex": "0xf86a141482520894948b48c6ef7564254bfb74e90a3856b70e8374e9890d108bff209524000080820a96a0aaf11ea3a5dabcaa095b54921fa46e8ed70481d7fc7252503bd5968fae0e1477a03fd4f1cd1b5e1444e54321168c7464cf98fa95bca1efbff9d0c160d3a03713ff",
    "signature": {
      "v": 2710,
      "r": "0xaaf11ea3a5dabcaa095b54921fa46e8ed70481d7fc7252503bd5968fae0e1477",
      "s": "0x3fd4f1cd1b5e1444e54321168c7464cf98fa95bca1efbff9d0c160d3a03713ff",
    },
    "date": 1538002833,
    "state": "be3jem87wnsmu6",
    "client_id": "f42146f2b57b4f481d95"
  }
}
```
You can use this route to view information about a specific transaction sent by a user.

### Required Scopes: `wallets:admin` or `wallets:read`

### Request Parameters
Parameter | Type | Description
--------- | ----------- | -----------
**`access_token`** | **String** | *(Required)* The access token you received for a Squarelink user.
**`id`** | **String** | *(Required)* Hash of the transaction on the blockchain.
**`network`** | **String** | *(Required)* The network on which the transaction was broadcast. See [Available Networks](#available-networks)
**`network_config`** | **Object** | *(Required if network is `custom`)* URL Query-encoded object with following properties:
**`network_config.url`** | **String** | *(Required if network is `custom`)* RPC Endpoint for your custom network.
**`network_config.chain_id`** | **Integer** | *(Optional)* Chain ID for your custom network.

### Response Body
Parameter | Type | Description
--------- | ----------- | -----------
**`success`** | **Boolean** | Indicates if the request was successful.
**`tx`** | **Array** | A [Transaction Object](#transaction-object).


## Object Models


### Wallet Object

Parameter | Type | Description
--------- | ----------- | -----------
**`id`** | **String** | Squarelink's identifier for the wallet.
**`owner`** | **String** | The ID of the Squarelink user owning the wallet.
**`name`** | **String** | The user's name for that wallet.
**`address`** | **String** | The public address of the wallet.
**`created_on`** | **Integer** | Date created on Squarelink (number of seconds since the Epoch).
**`creator`** | **String** | Your DApp ID (only returned if your dapp created the wallet)



### Transaction Object

Parameter | Type | Description
--------- | ----------- | -----------
**`id`** | **String** | The transaction hash on the blockchain.
**`sub`** | **String** | The sender's Squarelink account ID.
**`network`** | **String** | Network on which the transaction was sent. See [Available Networks](#available-networks).
**`network_config`** | **Object** | *(If network is `custom`)* Object with following properties:
**`network_config.url`** | **String** | *(If network is `custom`)* RPC Endpoint for the custom network.
**`network_config.chain_id`** | **Integer** | Chain ID for the custom network.
**`wallet_id`** | Squarelink identifier for sender's wallet.
**`from`** | **String** | Sender's address for the transaction.
**`to`** | **String** | Recipient address of the transaction.
**`value`** | **String** | Value sent in Wei.
**`data`** | **String** | Data for contract function calls.
**`gas`** | **String** | Gas used for the transaction.
**`gasPrice`** | **String** | Gas price in Gwei.
**`nonce`** | **String** | Nonce of a transaction for a user's address.
**`raw`** | **String** | Original raw hex data broadcast to the blockchain.
**`client_id`** | **String** | Client ID of the app associated with the transaction (if owned by you).
**`state`** | **String** | State associated with the transaction request (if requested by you).
**`date`** | **Number** | Datetime the transaction was broadcast. Number of seconds since the epoch.
