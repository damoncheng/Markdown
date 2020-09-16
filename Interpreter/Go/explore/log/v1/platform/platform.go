package platform

import "github.com/golang/glog"

func Gloglevel() {

	glog.V(3).Info("LEVEL 3 message") // 使用日志级别 3
	glog.V(4).Info("LEVEL 4 message") // 使用日志级别 4
	glog.V(5).Info("LEVEL 5 message") // 使用日志级别 5
	glog.V(8).Info("LEVEL 8 message") // 使用日志级别 8

}

func Glogtype() {

	glog.Info("This is info message")
	glog.Infof("This is info message: %v", 12345)
	glog.InfoDepth(1, "This is info message", 12345)

	glog.Warning("This is warning message")
	glog.Warningf("This is warning message: %v", 12345)
	glog.WarningDepth(1, "This is warning message", 12345)

	glog.Error("This is error message")
	glog.Errorf("This is error message: %v", 12345)
	glog.ErrorDepth(1, "This is error message", 12345)

	glog.Fatal("This is fatal message")
	glog.Fatalf("This is fatal message: %v", 12345)
	glog.FatalDepth(1, "This is fatal message", 12345)

}
