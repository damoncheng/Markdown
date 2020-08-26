import argparse


def z_transition(string, row):

    str_len = len(string)

    if str_len <= row:

        return string

    z_row_list = {}

    for index in range(row):

        z_row_list[index] = []

    step = 2 * row - 2

    for index, char in enumerate(string):

        step_index = index % step

        if step_index < row:

            char_row = step_index

        else:

            char_row = step - step_index

        z_row_list[char_row].append(char)

    z_string = ""
    for index in range(row):

        z_string += "".join(z_row_list[index])

        for one_data_index,one_data in enumerate(z_row_list[index]):

            pass


    return z_string

if __name__ == "__main__":

    parser = argparse.ArgumentParser(description='z transition string script')
    parser.add_argument("--row", default=3, type=int, help="z row")
    parser.add_argument("string", help="z string content")

    args = parser.parse_args()

    string = args.string
    row = args.row

    print(z_transition(string, row))


