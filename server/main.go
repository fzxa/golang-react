package main

import (
	"develops.nebulas.io/server/routers"
)

func main() {
	r := routers.InitRouter()
	r.Run()
}
