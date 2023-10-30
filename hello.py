# Create a python program to sum all the items in a list use function sum(list) to sum all the items in a list.

def sum_list(items):
    sum_numbers = 0
    for x in items:
        sum_numbers += x
    return sum_numbers
print(sum_list([1,2,-8]))

# reversing a string without builtin funvtions

def reverse_string(str):
    str1 = ""
    for i in str:
        str1 = i + str1
    return str1
print(reverse_string("1234abcd"))

