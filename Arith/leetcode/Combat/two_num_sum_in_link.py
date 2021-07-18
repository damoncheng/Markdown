#coding:utf-8

link_num_one = [2, 4, 3]
link_num_two = [5, 6, 4, 6]

#节点
class Node(object):

    def __init__(self, data, next=None):
        self.data = data
        self.next = next

#链表
class Link(object):

    def __init__(self, head):
        self.head = head
        self.tail = head

    def __iter__(self):

        self.node = self.head

        return self

    def __next__(self):

        if self.node:

            node = self.node

            self.node = self.node.next

            return node

        else:

            raise StopIteration

    def append(self, node):

        self.tail.next = node
        self.tail = node

len_link_one = len(link_num_one)
len_link_two = len(link_num_two)

zero_padding = abs(len_link_one - len_link_two)

if len_link_one > len_link_two:

    link_num_two.extend([0] * zero_padding)
    len_link = len_link_one

elif len_link_one < len_link_two:

    link_num_one.extend([0] * zero_padding)
    len_link = len_link_two

link_one = None
link_two = None

#初始化链表
for one_num in link_num_one:

    if not link_one:

        link_one = Link(Node(one_num))

    else:

        link_one.append(Node(one_num))

for one_num in link_num_two:

    if not link_two:

        link_two = Link(Node(one_num))

    else:

        link_two.append(Node(one_num))

link_one_current_node = link_one.head
link_two_current_node = link_two.head
carry = 0

while(link_one_current_node and link_two_current_node):

    one_node_value = link_one_current_node.data
    two_node_value = link_two_current_node.data


    #print(one_node_value, " ", two_node_value)
    node_value = one_node_value + two_node_value + carry
    carry = node_value // 10
    value = node_value % 10
    #link_result_list.append(value)
    link_one_current_node.data = value

    link_one_current_node = link_one_current_node.next
    link_two_current_node = link_two_current_node.next


for one_node in link_one:

    print(one_node.data)
