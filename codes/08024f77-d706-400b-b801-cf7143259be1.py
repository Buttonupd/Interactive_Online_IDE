def bubble_sort(list):
	for iter_num in range(len(list) -1, 0, -1):
		for idx in range(iter_num):		
			if list[idx] > list[idx + 1]:

				temp = list[idx]
				list[idx] = list[idx + 1]
				list[idx + 1] = temp

list = [10,9,8,7,6,5,4,3,2,1]
bubble_sort(list)
print(list)

def shell_sort(list):
	gap = len(list) // 2

	while gap > 0:
		for i in range(gap, len(list)):
			temp = list[i]
			j = i
			while j >= gap and list[j-gap] > temp:
				list[j] = list[j-gap]
				j = j - gap

			list[j] = temp
		gap = gap // 2

list = [10,9,8,7,6,5,4,3,2,1]
shell_sort(list)
print(list)
			

	