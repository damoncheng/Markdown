#coding:utf-8
import sys
class RotatedArray:

    def check_target_exist(self, rotated_array, target):

        left = 0
        right = len(rotated_array) - 1

        while(left <= right):

            mid = (left + right) // 2

            if rotated_array[mid] == target:

                return mid

            if rotated_array[left] == rotated_array[mid]:

                left += 1

            elif rotated_array[left] < rotated_array[mid]:

                if target >= rotated_array[left] and target < rotated_array[mid]:

                    right = mid - 1

                else:

                    left = mid + 1

            else:

                if target > rotated_array[mid] and target <= rotated_array[right]:

                    left = mid + 1

                else:

                    right = mid - 1

        return None

if __name__ == "__main__":
    """
        [0,0,1,2,2,5,6] => [0,1,2,2,5,6,0]
        [0,0,1,2,2,5,6] => [6,0,0,1,2,2,5]
        [0,0,1,2,2,5,6] => [2,2,5,6,0,0,1]
        [0,0,1,2,2,5,6] => [2,5,6,0,0,1,2]
    """

    exist = RotatedArray().check_target_exist([2,5,6,0,0,1,2], 6)
    #exist = RotatedArray().check_target_exist([6,0,0,1,2,2,5], 6)
    print(exist)


