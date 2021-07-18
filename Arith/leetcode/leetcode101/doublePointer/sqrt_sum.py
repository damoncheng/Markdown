class Solution(object):
    def judgeSquareSum(self, c):
        """
        :type c: int
        :rtype: bool
        """

        i = 0
        j = c
        success = c

        #print("#", c)

        while(i <= j):

            sum = i*i + j*j
            #print("##i=",i,",j=",j,",sum=",sum,",success=",success)

            if sum < success:

                i += 1

                continue
            
            elif sum > success:

                j -= 1

                continue

            return True

        return False

one_solution = Solution()
print(one_solution.judgeSquareSum(5))
print(one_solution.judgeSquareSum(3))
print(one_solution.judgeSquareSum(4))
print(one_solution.judgeSquareSum(2))
print(one_solution.judgeSquareSum(1))
