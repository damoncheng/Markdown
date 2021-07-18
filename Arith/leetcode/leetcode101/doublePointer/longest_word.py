class Solution(object):

    def findLongestWord(self, s, dictionary):
        """
        :type s: str
        :type dictionary: List[str]
        :rtype: str
        """

        dictionary_index = []

        for one_index in range(len(dictionary)):

            dictionary_index.append(0)

        for one_char in s:

            for one_index,one_str in enumerate(dictionary):

                if dictionary_index[one_index] >= len(one_str):

                    continue

                if one_str[dictionary_index[one_index]] == one_char: 

                    dictionary_index[one_index] += 1

        result = None

        for one_index,one_str in enumerate(dictionary):

            if (dictionary_index[one_index] >= len(one_str)):

                if (not result) or (len(one_str) > len(result)):

                    result = one_str

        return result


    """
    def findLongestWord(self, s, dictionary):

        result = None

        for one_str in dictionary:

            s_index = 0

            shooting_str = True

            for one_char in one_str:

                shooting_char = False

                while(s_index < len(s)):

                    s_index += 1

                    if s[s_index - 1] == one_char:

                        shooting_char = True

                        break

                if not shooting_char:

                    shooting_str = False

                    break

            if shooting_str:

                if (not result) or (len(result) < len(one_str)):

                    result = one_str

        return result
    """

one_solution = Solution()
print(one_solution.findLongestWord("abpcplea", ["ale","apple","monkey","plea"]))
print(one_solution.findLongestWord("abpcplea", ["a","b","c"]))
