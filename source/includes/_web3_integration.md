
# **Quickstart (Web3)**

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

const sqlk = new Squarelink('Your-Dapp-ID')

// Use Promise or callback
sqlk.getProvider((provider, err) => {
  window.web3 = new Web3(provider)

  // Use standard Web3 methods as you normally would
  window.web3.eth.getAccounts().then(console.log)
})
```

### Usage

Initialize the Squarelink Object and set it as your Web3 Provider for your application. **Sweet, you're already finished!**

`const sqlk = new Squarelink(clientId [, network, opts])`

Parameter | Type | Description
--------- | ------- | -----------
`clientId` | **String** | This is the `clientId` associated with your ÐApp.
`network` | **String&#124;Object** | The name of a network supported by Squarelink (see [Available Networks](#available-networks)), or your own custom network configuration (See below). Defaults to `mainnet`.
`opts` | **Object** | Additional options to pass to the Squarelink constructor (see below)

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

> Custom Methods Example

```javascript
...
const sqlk = new Squarelink('<YOUR CLIENT ID>', 'mainnet', {
  scope: ['user:name','user:email']
})
sqlk.getName()
> Satoshi Nakamoto

sqlk.getEmail()
> satoshi@buttcoin.io
...
```

### Options (`opts`)

Parameter | Type | Description
--------- | ------- | -----------
`scope` | `Array` | Request additional scopes to use custom Squarelink functions.
`useSync` | `Boolean` | Set this to `true` to use getProviderSync (see below).

**Available Scopes:**

- `user` - Equivalent to all scopes below
- `user:name` - Access to read user's name
- `user:email` - Access to user's email address
- `user:security` - Access to read user's security settings

### Custom Squarelink Methods

- *Squarelink*.**getName()** - requires the `user` or `user:name` scope

- *Squarelink*.**getEmail()** - requires the `user` or `user:email` scope

- *Squarelink*.**getSecuritySettings()** - requires the `user` or `user:security` scope


> Detecting Squarelink

```javascript
...
web3.currentProvider.isSquarelink
> true
...
```

### Detecting Squarelink

We attach the `isSquarelink` attribute to our provider for you to identify us if you're incorporating multiple providers. See to the right.

> Using getProviderSync()

```javascript
...
const sqlk = new Squarelink('<CLIENT ID>', 'mainnet', { useSync: true })
const web3 = new Web(sqlk.getProviderSync())
...
```

### Intializing Squarelink Syncrhonously

The `getProvider` function fetches a list of our supported networks and their RPC endpoints from our API. This allows us to remotely switch RPC providers to ensure 100% uptime and remove faulty/compromised endpoints.

If you are unable to support callbacks/promises, you can use `getProviderSync` which uses hard-coded RPC endpoints. **NOTE**: *we cannot guarantee 100% uptime with this method.*
