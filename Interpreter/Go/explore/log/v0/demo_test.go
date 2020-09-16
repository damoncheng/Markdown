package demo

import "flag"
import "testing"

func TestLog(t *testing.T) {

	flag.Parse()

	glog_level()
	glog_type()

}
