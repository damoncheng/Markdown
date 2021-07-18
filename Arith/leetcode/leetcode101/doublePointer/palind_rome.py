class Solution(object):

    def repeatedPalindrome(self, s, start, end):

        while(start<=end):

            if(s[start] != s[end]):

                return (start,end)

            start += 1
            end -= 1

        return None


    def validPalindrome(self, s):
        """
        :type s: str
        :rtype: bool
        """

        start = 0
        end = len(s) - 1
        rnum = 0

        result = self.repeatedPalindrome(s, start, end)

        if result is None:

            return True

        left_result = self.repeatedPalindrome(s, result[0] + 1, result[1])

        if left_result is None:

            return True

        right_result = self.repeatedPalindrome(s, result[0], result[1] - 1)
        
        if right_result is None:

            return True

        return False


one_solution = Solution()
print(one_solution.validPalindrome("aba"))
print(one_solution.validPalindrome("abca"))
print(one_solution.validPalindrome("abcac"))
