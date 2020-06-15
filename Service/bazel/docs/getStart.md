## Introduction to Bazel: Building a C++ Project

介绍基于Bazel实现c++工程编译, 示例仓库：

	git clone https://github.com/bazelbuild/examples/ 
	
### 仓库代码结构

	examples
	└── cpp-tutorial
	    ├──stage1
	    │  ├── main
	    │  │   ├── BUILD
	    │  │   └── hello-world.cc
	    │  └── WORKSPACE
	    ├──stage2
	    │  ├── main
	    │  │   ├── BUILD
	    │  │   ├── hello-world.cc
	    │  │   ├── hello-greet.cc
	    │  │   └── hello-greet.h
	    │  └── WORKSPACE
	    └──stage3
	       ├── main
	       │   ├── BUILD
	       │   ├── hello-world.cc
	       │   ├── hello-greet.cc
	       │   └── hello-greet.h
	       ├── lib
	       │   ├── BUILD
	       │   ├── hello-time.cc
	       │   └── hello-time.h
	       └── WORKSPACE
	       
### 基本概念和操作

#### 概念

- WORKSPACE : The WORKSPACE file, which identifies the directory and its contents as a Bazel workspace and lives at the root of the project’s directory structure.

- BUILD : One or more BUILD files, which tell Bazel how to build different parts of the project. (A directory within the workspace that contains a BUILD file is a package. You will learn about packages later in this tutorial.)

- target : Each instance of a build rule in the BUILD file is called a target and points to a specific set of source files and dependencies.
		
		cc_binary(
		    name = "hello-world",
		    srcs = ["hello-world.cc"],
		)
		
#### Build the project

	bazel build //main:hello-world


Notice the target label - the //main: part is the location of our BUILD file relative to the root of the workspace, and hello-world is what we named that target in the BUILD file. (You will learn about target labels in more detail at the end of this tutorial.)

### 配置规则



	
