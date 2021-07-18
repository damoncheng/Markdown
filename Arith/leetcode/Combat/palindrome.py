#coding:utf-8

str_content = "abcbabdef"

palindrome_start_index = 0
palindrome_end_index = 0
palindrome_len = 1

def is_palindrome(str_content, start_index, end_index):

    while(end_index > start_index):

        if str_content[start_index] != str_content[end_index]:

            return False

        start_index += 1
        end_index -= 1

    return True

def longest_palindrome(str_content):

    last_index = len(str_content) - 1
    global palindrome_start_index
    global palindrome_end_index
    global palindrome_len

    for index, char in enumerate(str_content):

        current_last_index = last_index
        current_len = current_last_index - index

        while(current_len > palindrome_len):

            palindrome_result = is_palindrome(str_content, index, current_last_index)
            #print(str_content[index:current_last_index + 1], " : ", palindrome_result)

            if palindrome_result:

                palindrome_start_index = index
                palindrome_end_index = current_last_index
                palindrome_len = current_len

                break

            current_last_index -= 1
            current_len = current_last_index - index

longest_palindrome(str_content)

print("palindrome_start_index : ", palindrome_start_index)
print("palindrome_end_index : ", palindrome_end_index)
print(str_content[palindrome_start_index:palindrome_end_index + 1])
