#coding:utf-8

str_content = "abcaffbcbb"
str_map = {}

start_index = 0
max_start_index = 0
max_end_index = 0
max_len = 1

for end_index, char in enumerate(str_content):

    while(char in str_map):

        del str_map[str_content[start_index]]

        start_index += 1

    str_map[char] = end_index

    current_len = end_index - start_index + 1

    if current_len > max_len:

        max_start_index = start_index
        max_end_index = end_index + 1
        max_len = current_len


print(max_start_index, " ", max_end_index, " ", max_len)
print(str_content[max_start_index:max_end_index])
