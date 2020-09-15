# rating_app

P2P Rating App 

**ONLY FOR TEST PURPOSES AND ONLY WORKS IN KOVAN**

Install node modules:

```
yarn
```


# Share

This folder contains the deployment address of the contract and the abi nefinition.
The `contracts` workspace update the definition in each deployment, and the `graph` and `app` workspace read the information.

# Graph

The graph definition

## deploy to kovan

This folder needs this .env file to configure the project.

```
KOVAN_GRAPH=damarnez/rate-app
GRAPH_SECRET=xxxxxxx
```
command to exec:

```
yarn deploy:kovan
```

# Contracts

Solidity smart contracts

## deploy to kovan

This folder needs this .env file to configure the project.

```
PRIVATE_ADDRESS=0xXXXXXXXXXXXXXXXXXXXXXXXXXXX 
PRIVATE_KEY=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX 
INFURA_KEY=XXXXXXXXXXXXXXXXXXXXXX
```

command to exec:

```
yarn migration:kovan
```

# App

Front end code in React.

## start

```
yarn start
```
