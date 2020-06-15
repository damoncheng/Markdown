package main

import "fmt"

func sum(nums ...int) int {

    sum := 0

    for i:=0; i < len(nums); i++ {

        sum += nums[i]
    
    }

    return sum

}

func main(){

    /*
    n := make([] string, 3)
    h := [] int {1 ,2 ,3}
    m := map[string]string {"1":"1", "2":"2"}

    k := map[string] string {"1" : "1"}

    type a struct { 
        //Lock k;
    }

    fmt.Println("test")
    fmt.Println(n)
    fmt.Println(m)
    fmt.Println(k)

    for k,v := range m {
    
        fmt.Println(k, "=>", v)

    }

    fmt.Println(sum(h...))
    */

    /*
    c1 := make(chan string, 1)
    fmt.Println("before write msg")
    c1<-"hello"
    fmt.Println("after write msg")
    fmt.Println("before read msg")
    msg := <-c1
    fmt.Println("after read msg : ", msg)
    */

    /*
    messages := make(chan string)
    signals := make(chan bool)

    select {

    }
    */

    m := []string{"1","2"}
    fmt.Println(m)
    //m.Swap(0,1)
    //fmt.Println(m)

}


