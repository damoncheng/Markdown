proc get_host_path {{argc} {argv}} {

    if {$argc != 2} {
        set host "116.62.64.205"
        set path "/attack/http_head"
    } else {
        set host [lindex $argv 0]
        set path  [lindex $argv 1]
    }

    puts "#-----------------#"
    puts "host : $host" 
    puts "path : $path"
    puts "#-----------------#"
    puts "\n"

    return [list $host $path]

}
