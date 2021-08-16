def shell_sort(list):
   gap = len(list) / 2
   while gap > 0:
       for i in range(gap, len(list)):
           temp = list[i]
           j = i
           while j >= gap and list[j - gap] > temp:
              list[j] = list[j - gap]
              j = j - gap
           list[j] = temp
        gap = gap // 2

list= [5,4,3,3,3,]
shell_sort(list)
print(list)