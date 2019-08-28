//= require ../lib/_jquery

/*
Copyright 2008-2013 Concur Technologies, Inc.

Licensed under the Apache License, Version 2.0 (the "License"); you may
not use this file except in compliance with the License. You may obtain
a copy of the License at

  http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
License for the specific language governing permissions and limitations
under the License.
*/
;(function () {
  'use strict';

  $.get('https://api.squarelink.com/networks-detailed',
    function (data, textStatus, jqXHR) {
      var networks = []
      for (var k in data) {
        if (data[k].hidden) continue
        let name = `<td><strong>${k}</strong></td>`
        let label = `<td>The ${data[k].label} ${!!data[k].testnet ? 'Testnet' : 'Network'}<td>`
        networks.push(`<tr>${name}${label}</tr>`)
      }
      networks.push(`<tr><td><strong>custom</strong></td><td>Any network with a Web3 standard public RPC endpoint.</td></tr>`)
      networks.forEach(el => {
        $('#network-list').append(el)
      })
    }
  )

  var languages = [];

  window.setupLanguages = setupLanguages;
  window.activateLanguage = activateLanguage;
  window.getLanguageFromQueryString = getLanguageFromQueryString;
})();
