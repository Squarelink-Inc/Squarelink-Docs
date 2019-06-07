
# **Quickstart**

Already have a ÐApp using web3.js? Plug in Squarelink in minutes!

If you have not done so already, please [register your ÐApp](#getting-started) in the [Squarelink Developer Console](https://dev.squarelink.com).

> Install the Squarelink bundle from a CDN

```html
<script src="https://squarelink.com/js/squarelink.min.js"></script>
```

> ...Or install Squarelink from NPM

```shell
$ npm install squarelink
```

### Installation

First, install Squarelink's Web3 Provider from your preferred source. (See on the right)


> Basic Usage of Squarelink

```javascript
import Squarelink from 'squarelink'
import Web3 from 'web3'

const sqlk = new Squarelink('<YOUR CLIENT ID>')
window.web3 = new Web3(sqlk.getProvider())

// Use standard Web3 methods as you normally would
window.web3.eth.getAccounts().then(console.log)
```

### Usage

Initialize the Squarelink Object and set it as your Web3 Provider for your application. **Sweet, you're already finished!**

`const sqlk = new Squarelink(clientId [, network])`

Parameter | Type | Description
--------- | ------- | -----------
`clientId` | **String** | This is the `clientId` associated with your ÐApp.
`network` | **String&#124;Object** | The name of a network supported by Squarelink, or your own custom network configuration (See below). Defaults to `mainnet`.

### Supported Networks:

- **Ethereum Mainnet** - `mainnet`
- **Ropsten Network** - `ropsten`
- **Kovan Network** - `kovan`
- **Rinkeby Network** - `rinkeby`
- **Private Networks** - see below

> Custom network example

```javascript
...
const sqlk = new Squarelink('<YOUR CLIENT ID>', {
  url: 'https://localhost:8545',
  chainId: 420
})
...
```

### Custom Network Configuration:

Parameter | Type | Description
--------- | ------- | -----------
`url` | **String** | The JSON_RPC endpoint Squarelink will connect to.
`chainId` | **Number** | *(optional)* Chain ID for your network
