class Solution(object):

    def checkPossibility(self, nums):
        """
        :type nums: List[int]
        :rtype: bool
        """

        decrease_index = []

        for one_index,one_num in enumerate(nums):

            if one_index == 0:

                continue

            if one_num < nums[one_index - 1]:

                decrease_index.append(one_index)

        print(decrease_index)

        if len(decrease_index) > 1:

            return False

        if len(decrease_index) == 1:

            if decrease_index[0] < (len(nums) - 1):

                change_index = decrease_index[0]

                if nums[change_index - 1] > nums[change_index + 1]:

                    return False

        return True

one_solution = Solution()
print(one_solution.checkPossibility([2,2,1,2,8]))
print(one_solution.checkPossibility([4,2,1]))
