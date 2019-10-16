class Count:

    def __init__(self, count):

        self.count = count

    def __iter__(self):

        for index in range(self.count):

            print("__iter__ : ", index)

            yield index


count = Count(10)

print("start for......")

for one_index in count:

    print(one_index)

print("end for......")

