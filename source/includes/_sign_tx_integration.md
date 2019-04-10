
# **Sign Tx** Integration

With **Sign Tx**, you can quickly onboard users to your Web3 ÐApp with a familiar Web2 interface. Simply add your **Sign Tx** button into your ÐApp and you're good to go!

If you have not done so already, please [register your ÐApp](#getting-started) in the [Squarelink Developer Console](https://dev.squarelink.com).

## **Sign Tx** Button

> Sign Tx Button Template

```html
<a href="https://app.squarelink.com/tx?
	client_id=<YOUR CLIENT_ID>
	&to=<RECIPIENT ETHEREUM ADDRESS>
	&amount=<AMOUNT TO BE TRANSFERRED IN WEI>">
    <img src="https://squarelink.com/img/sign-tx.svg" width="220"></img>
</a>
```

The **Sign Tx** button offers all of the functionality included in the Web3 standard with some added features.

When a user clicks the button, they'll simply be instructed to approve a transaction and then redirected back to your ÐApp.

Add, remove, and edit the following button parameters to get the functionality you need!

<a href="#live-examples">
    <img src="https://squarelink.com/img/sign-tx.svg" width="220"></img>
</a>

### Available button parameters:

Parameter | Required | Description
--------- | ------- | -----------
`client_id` | **true** | This is the `client_id` associated with your ÐApp.
`to` | **true** | A valid recipient Ethereum address for the transaction.
`from` | *(Optional)* | A specific sender address owned by the user.
`value` | *(Optional)* | Integer amount of ETH to be transferred (measured in Wei).
`gas` | *(Optional)* | Specify the gas limit for the transaction.
`gasPrice` | *(Optional)* | Specify the gas price for the transaction (measured in Gwei).
`data` | *(Optional)* | Any data required for a smart contract call.
`nonce` | *(Optional)* | Use this to override a pending transaction with the same nonce.
`network` | *(Optional)* | A network from the list of [Available Networks](#available-networks). This defaults to `mainnet`.
`rpc_url` | *(Optional)* | *(If `custom` network)* The endpoint we'll use to connect with your custom network.
`chain_id` | *(Optional)* | *(If `custom` network)* The chain id for your custom network.
`redirect_uri` | *(Optional)* | Where we'll redirect the user after the status of the request changes.
`description` | *(Optional)* | Description shown to the user in the request.
`state` | *(Optional)* | An optional CSRF token to be returned to your `redirect_uri`.

### Redirect Response

After the transaction request status changes (fails or succeeds), we'll send the user back to your `redirect_uri` with the following parameters:

Parameter | Description
--------- | -------
`tx_id` | This is the `client_id` associated with your ÐApp.
`state` | If you provided a `state` in the request, it will be returned in the response.
`error` | A description of any issues with your request or the user's action.

## Available Networks

<aside class="warning">
We will only accept custom networks with secure RPC endpoints (https). Read how to serve localhost RPCs from https 
<a href="https://medium.freecodecamp.org/how-to-get-https-working-on-your-local-development-environment-in-5-minutes-7af615770eec">here.</a>
</aside>

Network | Description
--------- | -------
**mainnet** | The Ethereum Main Network.
**ropsten** | The Ropsten Ethereum Network.
**kovan** | The Kovan Ethereum Network.
**rinkeby** | The Rinkeby Ethereum Network.
**custom** | Any network with a Web3 standard public RPC endpoint.

## Advanced Settings

For additional security, you can specify some of your button parameters in the [Developer Console](https://dev.squarelink.com) to prevent malicious usage of your ÐApp's Sign Tx button. Your request parameters will default to the values specified here.

![Sign Tx Advanced Settings](images/signtx-settings.png)

Setting | Description
--------- | -------
**Whitelisted Deposit Addresses** | A comma-separated list of Ethereum addresses to which your users can send transactions.
**Whitelisted Redirect URIs** | A comma-separated list of URLs.
**Network** | If specified, your users will only be able to send transactions on this network.
**RPC Endpoint** | A Web3 standard public RPC endpoint to connect with `custom` networks. **Must be secure (https)**.
**Chain ID** | The chain ID for your custom network.


## Live Examples

> HTML for Ropsten example

```html
<a href="https://app.squarelink.com/tx?
	client_id=f11116f2b57b4f481d95
	&network=ropsten
	&value=10000000000000000
	&to=0xf40bED2fFEE76B5517Fc992CC798Ece4c55D8F99
	&description=You're about to send 0.01 ETH to Squarelink on the Ropsten Network">
    <img src="https://squarelink.com/img/sign-tx.svg" width="250"></img>
</a>
```
### Request 0.01 ETH on the Ropsten Network

<a href="https://app.squarelink.com/tx?client_id=f11116f2b57b4f481d95&network=ropsten&value=10000000000000000&to=0xf40bED2fFEE76B5517Fc992CC798Ece4c55D8F99&description=You're about to send 0.01 ETH to Squarelink on the Ropsten Network">
    <img src="https://squarelink.com/img/sign-tx.svg" width="250"></img>
</a>

> HTML for OmiseGo example

```html
<a href="https://app.squarelink.com/tx?
	client_id=f11116f2b57b4f481d95
	&to=0xd26114cd6EE289AccF82350c8d8487fedB8A0C07
	&data=0xa9059cbb000000000000000000000000f40bed2ffee76b5517fc992cc798ece4c55d8f990000000000000000000000000000000000000000000000008ac7230489e80000
	&description=You're about to send 10 OMG to Squarelink.">
    <img src="https://squarelink.com/img/sign-tx.svg" width="250"></img>
</a>
```
<br><br><br><br>

### Request 10 OmiseGo (an ERC-20 token) using contract data

<a href="https://app.squarelink.com/tx?client_id=f11116f2b57b4f481d95&to=0xd26114cd6EE289AccF82350c8d8487fedB8A0C07&data=0xa9059cbb000000000000000000000000f40bed2ffee76b5517fc992cc798ece4c55d8f990000000000000000000000000000000000000000000000008ac7230489e80000&description=You're about to send 10 OMG to Squarelink.">
    <img src="https://squarelink.com/img/sign-tx.svg" width="250"></img>
</a>
