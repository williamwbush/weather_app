
n = 20
for i in range(n):
    print([str(i | j).center(3) for j in list(range(n))])
    

print(set(i for i in range(6)) - set(i for i in range(5)))