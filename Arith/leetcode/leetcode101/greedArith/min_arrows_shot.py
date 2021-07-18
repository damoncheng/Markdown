#coding:utf-8

class Solution(object):

    def __init__(self, balloon_list):

        self.balloon_list = balloon_list

    def shotNextBalloon(self):

        shot_balloon = self.balloon_list[0]

        for one_balloon in self.balloon_list:

            if one_balloon[1] < shot_balloon[1]:

                shot_balloon = one_balloon

        print("shot_balloon : ", shot_balloon)

        for index in range(len(self.balloon_list) - 1, -1, -1):

            one_balloon = self.balloon_list[index]

            if one_balloon[0] <= shot_balloon[1]:

                del self.balloon_list[index]

        print(self.balloon_list)

    def findMinArrowShots(self):
        """
        :type points: List[List[int]]
        :rtype: int
        """

        num = 0

        while(self.balloon_list):

            self.shotNextBalloon()

            num += 1

        return num

one_solution = Solution([[10,16],[2,8],[1,6],[7,12]])
print(one_solution.findMinArrowShots())
one_solution = Solution([[1,2],[2,3],[3,4],[4,5]])
print(one_solution.findMinArrowShots())
one_solution = Solution([[1,2],[3,4],[5,6],[7,8]])
print(one_solution.findMinArrowShots())
