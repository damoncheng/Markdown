package main

import "flag"
import "k8s.io/klog"

func main() {

	klog.InitFlags(nil)

	// By default klog writes to stderr. Setting logtostderr to false makes klog
	// write to a log file.
	flag.Set("logtostderr", "false")

	flag.Set("log_file", "myfile.log")
	flag.Parse()

	klog.Info("hello klog")
	klog.Flush()

}
