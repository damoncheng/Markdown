package main

import "flag"
import "github.com/damoncheng/Markdown/Interpreter/Go/explore/log/v1/platform"

func main() {

	flag.Parse()

	platform.Gloglevel()
	platform.Glogtype()
}
