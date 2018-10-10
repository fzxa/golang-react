# Nebulas Develops
https://developers.nebulas.io

### Prerequisites

| Components | Version | Description |
|----------|-------------|-------------|
|[Golang](https://golang.org) | >= 1.9.2| The Go Programming Language |
|[NodeJS](https://nodejs.org) | >= 8.11.0 | Yarn tools for NodeJS. |


### Develops

#### Backend 
1. Checkout repo.

```bash
cd $GOPATH/src
go get -u -v github.com:nebulasio/develops.nebulas.io.git
```

```bash
git checkout master
go run main.go
```

#### Frontend 
```bash
cd client
yarn install && yarn start
```


### Production
```bash
go build ./main
yarn build
```
