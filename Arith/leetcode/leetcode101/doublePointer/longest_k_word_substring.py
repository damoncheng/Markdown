class Solution(object):

    def checkStart(self, s ,k, start, end, char_dict):

        if len(char_dict.keys()) < k:

            pass

        else:

            while(start <= end):

                one_char = s[start] 

                char_dict[one_char] -= 1

                start += 1

                if char_dict[one_char] == 0:

                    del char_dict[one_char]

                    break

        return start


    def maxkSubString(self, s, k):

        char_dict = {}
        sub_str_list = []

        start = 0
        end = 0

        subLen = 0

        while(end < len(s)):

            if s[end] not in char_dict:

                start = self.checkStart(s, k, start, end, char_dict)

                char_dict[s[end]] = 0

            now_subLen = end - start + 1

            if now_subLen >= subLen:

                if now_subLen > subLen:

                    sub_str_list = [s[start:(end+1)]]

                else:

                    sub_str_list.append(s[start:(end+1)])

                subLen = now_subLen

            char_dict[s[end]] += 1

            end += 1

        return subLen,sub_str_list

one_solution = Solution()
print(one_solution.maxkSubString("eceba", 3))
print(one_solution.maxkSubString("WORLD", 4))
print(one_solution.maxkSubString("adsfjsldkfjlksdjfl", 4))
