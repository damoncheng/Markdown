#coding:utf-8

nums = [2, 7, 15, 11]
target = 13

target_map = {}

for one_index, one_num in enumerate(nums):

    target_map[one_num] = one_index


for one_index, one_num in enumerate(nums):

    expect_num = target - one_num

    if expect_num in target_map and one_index != target_map[expect_num]:

        print(one_num, expect_num)

        break
