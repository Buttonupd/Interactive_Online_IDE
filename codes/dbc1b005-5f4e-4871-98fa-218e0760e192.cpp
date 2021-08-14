def bubble_sort(list):
    for iter_num in range(len(list) -1,0,-1):
        for idx in range(iter_num):
            if list[idx] > list[idx + 1]:
                temp = list[idx]
                list[idx] = list[idx+1]
                list[idx + 1] = temp

list = [10,9,8,7,6,5,4,3,21,0]
bubble_sort(list)
print(list)