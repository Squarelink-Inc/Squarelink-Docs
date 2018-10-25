
# Sign Tx Integration

<aside class="notice">Squarelink measures tokens in their smallest non-divisible amounts. I.e. 10^-8 for Bitcoin and Litecoin and 10^-18 for Ethereum.</aside>

Rather than building your own custodial wallet or requiring your customers use their own wallet to interact with your DApp, you can simply add Squarelink's "Sign Tx" button directly into your DApp.

Squarelink's "Sign Tx" button allows DApps to request Ethereum, Bitcoin, Litecoin, or other Ethereum-based tokens (i.e. ERC-20s) from Squarelink users.

To get started, you'll need to register one of these tokens or smart contracts with your DApp in the [Developer Console](https://dev.squarelink.com).

## Registering Tokens
<aside class="warning">Please register your DApp in the Developer Console if you haven't done so already.</aside>

To register a token, simply navigate to the "Sign Tx" page of your app or DApp in the [Developer Console](https://dev.squarelink.com).

We require the following info about the token you'll be using:

- **Currency:** Ethereum, Bitcoin, Litecoin, or a custom ERC-20 Token (i.e. OmiseGo).

- **Whitelisted Deposit Addresses (Optional):** Valid recipient addresses. _**Leave blank for any**_. For ERC-20 tokens, the deposit address is similarly the recipient of the token, not the contract address.

- **Contract Address**: _**This must currently be an Etherscan-verified smart contract**_. Use it to specify an ERC-20 contract address or a general purpose smart contract on the Ethereum blockchain. ([*Verify your contract on Etherscan*](https://etherscan.io/verifyContract2)).

After you've created the token, you can navigate to the token settings in the Developer Console and use the following optional settings:

### Optional Settings:

- **Confirmation Policy:** How quickly you'd like us to consider a transaction confirmed on the blockchain. Once the transaction is confirmed, we'll send a callback to a URL you've specified. Default is medium. Use slow for high-value transactions.

- **Webhooks Callback URL:** We'll send a POST request with info about a transaction to this address once it's confirmed. [Read More about Callbacks](#using-callbacks).

- **On Failure Redirect:** If there is an error sending the transaction or an issue with your request, we'll redirect the user here with a description of the error. For instance, `http://localhost:8080/failure?error=recipient%20is%20not%20whitelisted`.

- **On Success Redirect:** When the transaction is successful, we'll redirect the user here with the transaction id and a state if provided. For instance, `http://localhost:8080/success?tx_id=abcdef12345&state=xxxxxxx`.

## Sign Tx Button

Once you've registered your token, you can navigate to your registered token's home page in the Developer Console and click on "Integration Code" to see the HTML button for integrating Sign Tx into your DApp.

On the page for the new token created, you'll see a `token_id` - you'll need to pass it as a parameter in any transaction requests. It acts similarly to your `client_id` and allows us to check against any whitelisted addresses you may have.

Depending on the currency and the features you require, there are several optional parameters you can use in your request URL. See Below:

### Ethereum

> This is an example of an Ethereum request

```html
<a href="https://app.squarelink.com/tx?
	token_id={{Your token ID}}
	&to={{An Ethereum address}}
	&amount={{amount of Ethereum}}
	&gas={{optional gas limit for tx (estimated otherwise)}}
	&description={{optional description for request}}
	&state={{optional value such as an order #}}">
    <img src="https://squarelink.com/img/sign-tx.svg" width="220"></img>
</a>
```

Parameter | Required | Description
--------- | ------- | -----------
`token_id` | **true** | This is the `token_id` found on your registered token's home page in the Developer Console.
`to` | **true** | An Ethereum address to receive the transaction. Must be whitelisted if you set up your token with whitelisted addresses.
`amount` | **true** | Integer amount to be transferred. **Smallest divisible amount of ETH**. For instance, "1000" = 10e-15 ETH.
`gas` | *(Optional)* | Optional gas limit for transaction. If omitted, we'll estimate it for you.
`description` | *(Optional)* | Description shown to the user in the request.
`state` | *(Optional)* | An optional CSRF token to be returned to your `on_success` redirect. Will also be returned in a callback if you've set up callbacks.



### Bitcoin & Litecoin
> This is an example of a Bitcoin request

```html
<a href="https://app.squarelink.com/tx?
	token_id={{Your token ID}}
	&to={{A Bitcoin address}}
	&amount={{amount of Bitcoin}}
	&description={{optional description for request}}
	&state={{optional value such as an order #}}">
    <img src="https://squarelink.com/img/sign-tx.svg" width="220"></img>
</a>
```
Parameter | Required | Description
--------- | ------- | -----------
`token_id` | **true** | This is the `token_id` found on your registered token's home page in the Developer Console
`to` | **true** | A Bitcoin or Litecoin address to receive the transaction. Must be whitelisted if you set up your token with whitelisted addresses.
`amount` | **true** | Integer amount to be transferred. **Smallest divisible amount of BTC or LTC**. For instance, "1000" = 10e-5 BTC/LTC
`description` | *(Optional)* | Description shown to the user in the request
`state` | *(Optional)* | An optional CSRF token to be returned to your `on_success` redirect. Will also be returned in a callback if you've set up callbacks.

> This is an example of a smart contract or ERC-20 request

```html
<a href="https://app.squarelink.com/tx?
	token_id={{Your token ID}}
	&data={{optional data field for smart contract}}
	&method={{smart contract method name (if no data)}}
	&params=[{{contract input 1}},{{contract input 2}}]
	&gas={{optional gas limit for tx (estimated otherwise)}}
	&description={{optional description for request}}
	&state={{optional value such as an order #}}">
    <img src="https://squarelink.com/img/sign-tx.svg" width="220"></img>
</a>
```
### Smart Contracts & ERC-20 Tokens

For Ethereum Smart Contracts or ERC-20 Tokens, you can request a transfer directly in contract data *OR* you can specify the method you're calling and the method parameters (in the order they appear in the contract ABI).

<aside class="notice">For ERC-20 Tokens, we currently support the `transfer` and `approve` methods.</aside>

Parameter | Required | Description
--------- | ------- | -----------
`token_id` | **true** | This is the `token_id` found on your registered token's home page in the Developer Console
`method` | *If `data` not used* | This the method you are calling in the contract ABI
`params` | *If `method` is used* | Array of values for the method parameters as they appear in the contract ABI
`data` | *If `method` not used* | If you want to handle encoding your transaction data, you can pass the `data` field instead of `method` and `params`.
`gas` | *(Optional)* | Optional gas limit for transaction. If omitted, we'll estimate it for you.
`description` | *(Optional)* | Description shown to the user in the request
`state` | *(Optional)* | An optional CSRF token to be returned to your `on_success` redirect. Will also be returned in a callback if you've set up callbacks.

**To request 20 EXAMPLE tokens:**

- **`method`:** transfer

- **`params`:** [<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;0xed19abdc33e91c809376b742d48ed1d935d4faee,<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;20000000000000000000<br>
		]

*Where EXAMPLE tokens have 18 decimal places*.


For the protection of Squarelink users, we require that your contract is verified on Etherscan so we can access the ABI directly, but it's a simple process - [*verify your contract here*](https://etherscan.io/verifyContract2). We plan to build support for contract source uploads in the Developer Console so you can verify it directly with Squarelink.



## Using Callbacks

> Example Callback for ERC-20 (OmiseGo) Token

```shell
POST https://your-site.com/callback-url -d
{
  "id": "0x61474003e56d67aba6bf148c5ec361e3a3c1ceea37fe3ace7d87759b399292f9",
  "sub": "u12345abcdef",
  "currency": "ETH",
  "status": "confirmed",
  "from": "0x0a956129b6240784aac01b92a924c14f2e7cf932",
  "to": "0xed19abdc33e91c809376b742d48ed1d935d4faee",
  "value": 0,
  "confirmations": 18,
  "block_number": 124124,
  "block_hash": "fcd88715c95e6082612ab673ae3053d8bbfc51ca0b00aa82974ea4d139010015",
  "action": "sent",
  "decimals": 18,
  "date": 12421524,
  "token_symbol": "OMG",
  "token_decimals": 18,
  "token_name": "OmiseGo",
  "token_value": 200000000000,
  "contract_address": "0xd26114cd6EE289AccF82350c8d8487fedB8A0C07",
  "gas": 84000,
  "gas_price": 200000000000,
  "gas_used": 44840,
  "data": "0xa9059cbb000000000000000000000000ed19abdc33e91c809376b742d48ed1d935d4faef000000000000000000000000000000000000000000000001158e460913d00000",
  "nonce": 1,
  "state": "optionalCSRFToken"
}
```

Callbacks allow us to send you updates about your users' transactions. This requires that you've set the Webhooks Callback URL in your registered token's settings in the Developer Console.

The data returned in the callback complies with our [**Transaction Model**](#transaction-object) as defined in the [API Reference](#api-reference).

Based on the Confirmation Policy you've set, we'll send a POST request to the specified Callback URL with information about a transaction once it's confirmed.

We will make 5 attempted callbacks, each 10 seconds apart, before we discard a callback request.

<aside class="warning">Note: We do not allow any loopback URLs such as `localhost`, `127.0.0.1`, etc.</aside>

## Live Examples

<aside class="notice">All examples are implemented using Squarelink's internally Registered App and Tokens.</aside>

> HTML for Ethereum example

```html
<a href="https://app.squarelink.com/tx?
	token_id=t00d1c3d094e5bf0eba6ca7846ab88c2a
	&amount=10000000000000000
	&to=0xed19abdc33e91c809376b742d48ed1d935d4faef
	&description=You're about to donate 0.01 Ethereum to Squarelink">
    <img src="https://squarelink.com/img/sign-tx.svg" width="250"></img>
</a>
```
### Send 0.01 ETH to Squarelink

<a href="https://app.squarelink.com/tx?token_id=t00d1c3d094e5bf0eba6ca7846ab88c2a&amount=10000000000000000&to=0xed19abdc33e91c809376b742d48ed1d935d4faef&description=You're about to donate 0.01 Ethereum to Squarelink">
    <img src="https://squarelink.com/img/sign-tx.svg" width="250"></img>
</a>

> HTML for OmiseGo example (using method & parameters)

```html
<a href="https://app.squarelink.com/tx?
	token_id=t909cb74a5546fc7961627554ca355b7b
	&method=transfer
	&params=[0xed19abdc33e91c809376b742d48ed1d935d4faef,10000000000000000000]
	&description=You're about to donate 10 OMG to Squarelink.">
    <img src="https://squarelink.com/img/sign-tx.svg" width="250"></img>
</a>
```
<br><br><br><br>

### Send 10 OmiseGo to Squarelink (using method & parameters)

<a href="https://app.squarelink.com/tx?token_id=t909cb74a5546fc7961627554ca355b7b&method=transfer&params=[0xed19abdc33e91c809376b742d48ed1d935d4faef,10000000000000000000]&description=You're about to donate 10 OMG to Squarelink">
    <img src="https://squarelink.com/img/sign-tx.svg" width="250"></img>
</a>

> HTML for OmiseGo example (using contract data)

```html
<a href="https://app.squarelink.com/tx?
	token_id=t909cb74a5546fc7961627554ca355b7b
	&data=0xa9059cbb000000000000000000000000ed19abdc33e91c809376b742d48ed1d935d4faef0000000000000000000000000000000000000000000000008ac7230489e80000
	&description=You're about to donate 10 OMG to Squarelink.">
    <img src="https://squarelink.com/img/sign-tx.svg" width="250"></img>
</a>
```
<br><br><br><br>

### Send 10 OmiseGo to Squarelink (using contract data)

<a href="https://app.squarelink.com/tx?token_id=t909cb74a5546fc7961627554ca355b7b&data=0xa9059cbb000000000000000000000000ed19abdc33e91c809376b742d48ed1d935d4faef0000000000000000000000000000000000000000000000008ac7230489e80000&description=You're about to donate 10 OMG to Squarelink.">
    <img src="https://squarelink.com/img/sign-tx.svg" width="250"></img>
</a>

> HTML for BTC example

```html
<a href="https://app.squarelink.com/tx?
	token_id=t26e6e45d7912d26f46ae9258939e1070
	&amount=1000000
	&to=1dice8EMZmqKvrGE4Qc9bUFf9PX3xaYDp
	&description=You're about to donate 0.01 BTC to Squarelink">
    <img src="https://squarelink.com/img/sign-tx.svg" width="250"></img>
</a>
```
<br><br><br>

### Send 0.1 BTC to Squarelink
<a href="https://app.squarelink.com/tx?token_id=t26e6e45d7912d26f46ae9258939e1070&amount=1000000&to=1dice8EMZmqKvrGE4Qc9bUFf9PX3xaYDp&description=You're about to donate 0.01 BTC to Squarelink">
    <img src="https://squarelink.com/img/sign-tx.svg" width="250"></img>
</a>
