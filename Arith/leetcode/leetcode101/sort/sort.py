class Sort:

    def merge_sort(self, nums):

        pass

    def quick_sort(self, nums, left, right):

        if not (left < right):

            return


        start_left = left
        start_right = right

        pivot = nums[left]

        while(left < right):

            print(nums)

            while(left < right):

                if nums[left] > nums[right]:

                    nums[left] = nums[right]
                    nums[right] = pivot

                    left += 1

                    break

                right -=1 

            while(left < right):

                if nums[right] < nums[left]:

                    nums[right] = nums[left]
                    nums[left] = pivot

                    right -= 1

                    break

                left += 1

        pivot_index = left = right
        nums[pivot_index] = pivot

        self.quick_sort(nums, start_left, pivot_index - 1)
        self.quick_sort(nums, pivot_index + 1, start_right)


if __name__ == "__main__":

    nums = [3,2,5,1]

    Sort().quick_sort(nums, 0, len(nums) - 1)

    print("result :", nums)


