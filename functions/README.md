# Functions directory

## Services 

- codegen
- serverless

## Overview

Functions directory deploys AWS lambdas. Currently configured for two stages: dev and prod. Codegen is being used to generate types for graphql operations that are used in lambdas. 

# Worflows

## Codegen type generations

```yarn run codegen```

Will generate typings for graphql operations in /graphql folder with near-operations-file preset (will output typings for each operation file). Will also output latest schemat types to root types folder.

## Deploying with serverless

```yarn run dev```

Will update/deploy handlers with stage dev configured. Env vars for lambda will need to be configured in the lambda console.





