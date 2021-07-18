import time
import random

class Sort:

    def __init__(self, number_length):

        self.number_length = number_length
        self.number_sequence = []
        self.generate_number_sequence()

    def generate_number_sequence(self):

        for i in range(self.number_length):

            self.number_sequence.append(
                    random.randint(0,self.number_length))

    def list(self):

        print(self.number_sequence)

    def insert_sort(self):

        insert_number_sequence = self.number_sequence.copy()

        start = time.time()

        for i,num in enumerate(insert_number_sequence):

            if i == 0:

                continue

            for j in range(i - 1, -1, -1):

                if insert_number_sequence[j] <= num: 

                    break

                insert_number_sequence[j+1] = insert_number_sequence[j]
                insert_number_sequence[j] = num


        end = time.time()

        print(insert_number_sequence)
        print("insert sort time : ", end - start)


    def merge_sort(self):

        merge_number_sequence = self.number_sequence.copy()

        def merge(number_range_tuple, merge_number_sequence):

            if number_range_tuple[0] == number_range_tuple[1]:

                return

            start = number_range_tuple[0]
            position = (number_range_tuple[1] + number_range_tuple[0]) // 2
            stop = number_range_tuple[1]

            #排序left_tuple和right_tuple
            merge((number_range_tuple[0], position), merge_number_sequence)
            merge((position + 1, number_range_tuple[1]), merge_number_sequence)

            #复制排序序列
            left_sequence = merge_number_sequence[number_range_tuple[0]:(position + 1)]
            right_sequence = merge_number_sequence[(position + 1):(number_range_tuple[1] + 1)]

            #合并排序两个数列
            left_index = 0
            right_index = 0
            arr_index = start

            while(left_index < len(left_sequence) and right_index < len(right_sequence)):

                if left_sequence[left_index] < right_sequence[right_index]:

                    merge_number_sequence[arr_index] = left_sequence[left_index]
                    left_index += 1

                else:

                    merge_number_sequence[arr_index] = right_sequence[right_index]
                    right_index += 1

                arr_index += 1

            while(left_index < len(left_sequence)):

                merge_number_sequence[arr_index] = left_sequence[left_index]

                left_index += 1
                arr_index += 1

            while(right_index < len(right_sequence)):

                merge_number_sequence[arr_index] = right_sequence[right_index]

                right_index += 1
                arr_index += 1

            #print(number_range_tuple)
            #print(merge_number_sequence[number_range_tuple[0]:(number_range_tuple[1] + 1)])
            #print(merge_number_sequence)


        start = time.time()

        merge((0, len(merge_number_sequence) - 1), merge_number_sequence)

        end = time.time()

        print(merge_number_sequence)
        print("merge sort time : ", end - start)


sort_instance = Sort(10000)

sort_instance.list()
#sort_instance.insert_sort()
sort_instance.merge_sort()


