#coding:utf-8

class Solution(object):
    def reconstructQueue(self, people):
        """
        :type people: List[List[int]]
        :rtype: List[List[int]]
        """

        queue = []

        #按身高排序
        for one_people in people:

            if not queue:

                queue.append(one_people)

                continue

            insert_flag = False

            for one_index,one_queue in enumerate(queue):

                if one_queue[0] < one_people[0]: 

                    insert_flag = True

                    queue.insert(one_index,one_people)

                    break

                elif one_queue[0] == one_people[0]:

                    if one_queue[1] > one_people[1]: 

                        insert_flag = True

                        queue.insert(one_index,one_people)

                        break

            if not insert_flag:

                queue.append(one_people)

        print("queue : ", queue)

        for one_index,one_queue in enumerate(queue):

            if one_queue[1] > one_index:

                return one_queue,-1

            one_queue_copy = one_queue.copy()

            for one_right_index in range(one_index, one_queue_copy[1], -1):

                queue[one_right_index] = queue[one_right_index - 1]

            queue[one_queue[1]] = one_queue_copy

        return queue, 0

one_solution = Solution()
print(one_solution.reconstructQueue([[7,0],[4,4],[7,1],[5,0],[6,1],[5,2]]))
print(one_solution.reconstructQueue([[6,0],[5,0],[4,0],[3,2],[2,2],[1,4]]))


