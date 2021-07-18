package main

import "fmt"

func main() {
	var s1 []string
	var s2 []string

	s2 = append(s2, "hello")

	fmt.Println(len(s2))

	for i := 0; i < len(s2); i++ {
		s1 = append(s1, s2[i])
	}

	fmt.Println(len(s1))

}
