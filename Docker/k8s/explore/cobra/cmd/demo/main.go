package main

import (
	"github.com/damoncheng/Markdown/Docker/k8s/explore/cobra/cmd/demo/app"
	"os"
)

func main() {
	//app.Hello()

	command := app.NewCommand()

	if err := command.Execute(); err != nil {
		os.Exit(1)
	}
}
