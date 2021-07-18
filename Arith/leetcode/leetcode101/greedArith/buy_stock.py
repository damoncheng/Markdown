#coding:utf-8

class Solution:

    def maxProfit(self, prices) -> int:

        profit = 0
        buy_price = None

        for one_index,one_price in enumerate(prices):

            if not buy_price:

                if (one_index + 1) < len(prices):

                    if prices[one_index + 1] > one_price:

                        buy_price = one_price

            else:

                if one_index == (len(prices) - 1):

                    profit += (one_price - buy_price)

                elif prices[one_index + 1] < one_price:

                    profit += (one_price - buy_price)
                    buy_price = None

        return profit

one_solution = Solution()
print(one_solution.maxProfit([7,1,5,3,6,4]))
print(one_solution.maxProfit([1,2,3,4,5]))
print(one_solution.maxProfit([7,6,4,3,1]))
                

