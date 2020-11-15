package app

import "fmt"

import "github.com/spf13/cobra"
import "k8s.io/klog/v2"

func Hello() {

	fmt.Println("hello")

}

func NewCommand() *cobra.Command {

	var num int

	klog.Info("start new command")

	cmd := &cobra.Command{
		Use:   "demo",
		Short: "demo is a cobra demo command",
		Long:  `demo is a cobra demo command`,
		Run: func(cmd *cobra.Command, args []string) {
			// Do Stuff Here
			klog.Infof("num is %d", num)
		},
	}

	fs := cmd.Flags()
	fs.IntVarP(&num, "name", "n", 1, "help message for flagname")

	return cmd

}
