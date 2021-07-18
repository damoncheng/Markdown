#coding:utf-8

class Solution(object):

    def __init__(self, label):

        self.label = label

    def partitionLabels(self):
        """
        :type S: str
        :rtype: List[int]
        """

        start_index = 0
        end_index = 0 

        label_position_dict = {}

        for one_index,one_label in enumerate(self.label):

            if one_label not in label_position_dict:

                label_position_dict[one_label] = []

            label_position_dict[one_label].append(one_index)

        last_index = None
        partition_index_list = []
        partition_len_list = []

        for one_index,one_label in enumerate(self.label):

            if not last_index:

                last_index = label_position_dict[one_label][-1]

            else:

                if label_position_dict[one_label][-1] > last_index:

                    last_index = label_position_dict[one_label][-1]

            if one_index == last_index:

                partition_index_list.append(one_index + 1)
                last_index = None

        start_index = 0

        for one_partition_index in partition_index_list:

            partition_len_list.append(one_partition_index - start_index)

            start_index = one_partition_index

        return partition_len_list

            
one_solution = Solution("asdjoljisowerljlf")
print(one_solution.partitionLabels())
