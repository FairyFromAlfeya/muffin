export default {
  compiler: { path: '/usr/local/bin/solc-ton' },
  linker: { path: '/usr/local/bin/tvm-linker' },
  networks: {
    local: {
      ton_client: {
        network: {
          server_address: 'http://localhost:80/',
        },
      },
      giver: {
        address: '0:841288ed3b55d9cdafa806807f02a0ae0c169aa5edfe88a789a6482429756a94',
        abi: {
          "ABI version": 1,
          "functions": [
            { "name": "constructor", "inputs": [], "outputs": [] },
            { "name": "sendGrams", "inputs": [ {"name":"dest","type":"address"}, {"name":"amount","type":"uint64"} ], "outputs": [] }
          ],
          "events": [],
          "data": []
        },
        key: '',
      },
      keys: {
        phrase: 'illegal object novel cattle drink replace oblige online curtain radio blossom legend',
        amount: 20,
      }
    },
  },
}
