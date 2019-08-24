#!/usr/bin/python

def max_node(heap_list, i, len):

    node = heap_list[i]

    left_node_index = 2 * i + 1;
    right_node_index = 2 * i + 2;

    if left_node_index < len:

        left_node = heap_list[left_node_index]

        if left_node > node:

            pre_node = node
            node = heap_list[left_node_index]
            heap_list[i] = node
            heap_list[left_node_index] = pre_node

            if left_node_index <= ((len - 1) / 2):

                max_node(heap_list, left_node_index, len)
            

    if right_node_index < len:

        right_node = heap_list[right_node_index]

        if right_node > node:

            pre_node = node
            node = heap_list[right_node_index]
            heap_list[i] = node
            heap_list[right_node_index] = pre_node

            if right_node_index <= ((len - 1) / 2):

                max_node(heap_list, right_node_index, len)
            

heap_list = [1, 3, 4, 6]

for index in range((len(heap_list) - 1) / 2, -1, -1):

    max_node(heap_list, index, len(heap_list))

for index in range((len(heap_list) - 1) , -1, -1):

    print heap_list[0]

    heap_list[0] = heap_list[index]

    max_node(heap_list, 0, index + 1)

#print heap_list



