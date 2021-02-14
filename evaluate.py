s = " 2 + 3 / 4 * 5 * ( ( ( 6 ) ) ) + 1 + ( ( -12 ) ) "
# s = "  -( -2 )  + -3 /  -( -4 * -5 )  *  -(1 + (  -( -6 )  )  )  + -1 - 12"
# s = "-1-1-1-1-1"
# s = "-100-(-20/10)*-(-(-20-10))"
# s = "20e-9 + 30e-5 * 40e-2 / 30e-3 - 60e-2 / 30e-4 * 30e-3 + 80e-3"
# s = '4 / -(1)'
# s = "1 + ((1/1000000000) + (1/10000000000))/(1/100000000) + 1*1e-5*100"

def func(s):

    def simplify(s):
        s = "".join(char for char in s if char != " ")

        # reduce different pairs of "+" and "-" operators to single operator
        while "--" in s:
            for i in range(len(s)):
                if s[i:i+2] == "--":
                    s = s[:i] + "+" + s[i+2:]

        while "+-" in s:
            for i in range(len(s)):
                if s[i:i+2] == "+-":
                    s = s[:i] + "-" + s[i+2:]

        while "-+" in s:
            for i in range(len(s)):
                if s[i:i+2] == "-+":
                    s = s[:i] + "-" + s[i+2:]
        
        while "++" in s:
            for i in range(len(s)):
                if s[i:i+2] == "++":
                    s = s[:i] + "+" + s[i+2:]

        # separate operators and parens with whitespace
        s = list(s)
        for i in range(len(s)):
            if s[i] in ["+", "-", "*", "/", "(", ")"]:
                s[i] = " " + s[i] + " "
        s = "".join(s)
        s = s.split()

        # join "-" to subsequent number, making it negative, if "-" at beginning of expression
        if s[0] == "-" and s[1] != "(":
            s = [str(-float(s[1]))] + s[2:]

        # put numbers with scientific notation back together
        for i in range(len(s)):
            if "e" in s[i]:
                s[i] = s[i] + "-" + s[i+2]
                if i == len(s) - 3:
                    # print("i == len(s) - 3")
                    s = s[:i] + [s[i]] + [" "," "]
                    # print("s = s[:i] + [s[i]]")
                else:
                    s = s[:i] + [s[i]] + [" ", " "] + s[i+3:] 
        
        s = [i for i in s if i != " "]
                
        return s

    def multiply(s):
        if s[s.index('*')+1] == "-":
            s = s[:(s.index('*') - 1)] + [str(float(s[s.index('*') - 1]) * -float(s[s.index('*') + 2]))] + s[(s.index('*') + 3):]
        elif s[s.index('*')+1] == "+":
            s = s[:(s.index('*') - 1)] + [str(float(s[s.index('*') - 1]) * float(s[s.index('*') + 2]))] + s[(s.index('*') + 3):]
        else:
            s = s[:(s.index('*') - 1)] + [str(float(s[s.index('*') - 1]) * float(s[s.index('*') + 1]))] + s[(s.index('*') + 2):]
        return s

    def divide(s):
        if s[s.index('/')+1] == "-":
            s = s[:(s.index('/') - 1)] + [str(float(s[s.index('/') - 1]) / -float(s[s.index('/') + 2]))] + s[(s.index('/') + 3):]
        elif s[s.index('/')+1] == "+":
            s = s[:(s.index('/') - 1)] + [str(float(s[s.index('/') - 1]) / float(s[s.index('/') + 2]))] + s[(s.index('/') + 3):]
        else: 
            s = s[:(s.index('/') - 1)] + [str(float(s[s.index('/') - 1]) / float(s[s.index('/') + 1]))] + s[(s.index('/') + 2):]
        return s

    def mul_div(s):
        while '*' in s or '/' in s:
            if '*' in s and '/' in s:
                if s.index('*') < s.index('/'):
                    s = multiply(s)
                else:
                    s = divide(s)
            elif '*' in s:
                s = multiply(s)
            else:
                s = divide(s)
        print(f's after mul_div: {s}')

        return s

    def sub(s, c="-"):
        while c in s:
            s = s[:(s.index(c) - 1)] + [str(float(s[s.index(c) - 1]) - float(s[s.index(c) + 1]))] + s[(s.index(c) + 2):]
        return s
    
    def add(s, c="+"):
        while c in s:
            if s.index(c) == 0:
                s = s[1:]
            else:
                s = s[:(s.index(c) - 1)] + [str(float(s[s.index(c) - 1]) + float(s[s.index(c) + 1]))] + s[(s.index(c) + 2):]
        return s

    def eval(s):
        s = simplify(s)
        print(f's simplified: {s}')
        
        if "*" in s or "/" in s:
            s = mul_div(s)
            print(f'after mul_div {s}')
        
        s = simplify(s)
        
        if "-" in s:
            s = sub(s)
            print(f'after sub{s}')
        
        if "+" in s:
            s = add(s)
            print(f'after add{s}')
        
        return s

    
    def find_parens(s):
        left, right = 0, 0
        for j in range(len(s)):
            if s[j] == ")":
                right = j
                for i in range(j, -1, -1):
                    if s[i] == "(":
                        left = i       
                        return left, right   

    def eval_parens(s):
        while ")" in "".join(s):
            s = simplify(s)
            print(f'simplified: {s}')
            left, right = find_parens(s)
            
            t = s[(left+1):right]
            print(f't = {t}')
            
            if len(t) == 2:
                t = ["".join(t)]
                s = s[:left] + t + s[(right+1):]
                print(f'evaluated parentheses: {s}')
            else:
                t = eval(t)
                print(f't evaluated: {t}')
                s = s[:left] + t + s[(right+1):]
                print(f'evaluated parentheses: {s}')
        return s

    s = s.split()

    s = eval_parens(s)

    s = eval(s)

    return float(s[0])

print(func(s))













def calc(s):
    print(s)
    def simplify(s):
        s = "".join(char for char in s if char != " ")

        while "--" in s:
            for i in range(len(s)):
                if s[i:i+2] == "--":
                    s = s[:i] + "+" + s[i+2:]

        while "+-" in s:
            for i in range(len(s)):
                if s[i:i+2] == "+-":
                    s = s[:i] + "-" + s[i+2:]

        while "-+" in s:
            for i in range(len(s)):
                if s[i:i+2] == "-+":
                    s = s[:i] + "-" + s[i+2:]
        
        while "++" in s:
            for i in range(len(s)):
                if s[i:i+2] == "++":
                    s = s[:i] + "+" + s[i+2:]

        ops = ["+", "-", "*", "/", "(", ")"]

        s = list(s)

        for i in range(len(s)):
            if s[i] in ops:
                s[i] = " " + s[i] + " "

        s = "".join(s)
        s = s.split()
        
        if s[0] == "-" and s[1] != "(":
            s = [str(-float(s[1]))] + s[2:]
        
        return s

    def multiply(s):
        if s[s.index('*')+1] == "-":
            s = s[:(s.index('*') - 1)] + [str(float(s[s.index('*') - 1]) * -float(s[s.index('*') + 2]))] + s[(s.index('*') + 3):]
        elif s[s.index('*')+1] == "+":
            s = s[:(s.index('*') - 1)] + [str(float(s[s.index('*') - 1]) * float(s[s.index('*') + 2]))] + s[(s.index('*') + 3):]
        else:
            s = s[:(s.index('*') - 1)] + [str(float(s[s.index('*') - 1]) * float(s[s.index('*') + 1]))] + s[(s.index('*') + 2):]
        return s

    def divide(s):
        if s[s.index('/')+1] == "-":
            s = s[:(s.index('/') - 1)] + [str(float(s[s.index('/') - 1]) / -float(s[s.index('/') + 2]))] + s[(s.index('/') + 3):]
        elif s[s.index('/')+1] == "+":
            s = s[:(s.index('/') - 1)] + [str(float(s[s.index('/') - 1]) / float(s[s.index('/') + 2]))] + s[(s.index('/') + 3):]
        else: 
            s = s[:(s.index('/') - 1)] + [str(float(s[s.index('/') - 1]) / float(s[s.index('/') + 1]))] + s[(s.index('/') + 2):]
        return s

    def mul_div(s):
        while '*' in s or '/' in s:
            if '*' in s and '/' in s:
                if s.index('*') < s.index('/'):
                    s = multiply(s)
                else:
                    s = divide(s)
            elif '*' in s:
                s = multiply(s)
            else:
                s = divide(s)
        s = simplify(s)
        return s
    
    def sub(s, c="-"):
        while c in s:
            s = s[:(s.index(c) - 1)] + [str(float(s[s.index(c) - 1]) - float(s[s.index(c) + 1]))] + s[(s.index(c) + 2):]
        return s
    
    def add(s, c="+"):
        while c in s:
            if s.index(c) == 0:
                s = s[1:]
            else:
                s = s[:(s.index(c) - 1)] + [str(float(s[s.index(c) - 1]) + float(s[s.index(c) + 1]))] + s[(s.index(c) + 2):]
        return s

    def compute(s):
        s = simplify(s)
        if "*" in s or "/" in s:
            s = mul_div(s)
#             print(f'after mul {s}')
        if "-" in s:
            s = sub(s)
#             print(f'after sub{s}')
        if "+" in s:
            s = add(s)
#             print(f'after add{s}')
        return s

    
    def find_parens(s):
        left, right = 0, 0
        for j in range(len(s)):
            if s[j] == ")":
                right = j
                for i in range(j, -1, -1):
                    if s[i] == "(":
                        left = i       
                        return left, right   

    def compute_parens(s):
        s = simplify(s)
        while ")" in s:
            s = simplify(s)
#             print(f'simplified: {s}')
            left, right = find_parens(s)
            
            t = s[(left+1):right]
            if len(t) == 2:
                t = ["".join(t)]
                s = s[:left] + t + s[(right+1):]
#                 print(f'evaluated parentheses: {s}')
            else:
                t = compute(t)
                s = s[:left] + t + s[(right+1):]
#                 print(f'evaluated parentheses: {s}')
        return s

    s = s.split() 

    s = compute_parens(s)

    s = compute(s)

    return float(s[0])





















# -----------SUCCESSFUL CODEWARS SOLUTION ----------------





def calc(s):
    print(s)
    def simplify(s):
        s = "".join(char for char in s if char != " ")

        while "--" in s:
            for i in range(len(s)):
                if s[i:i+2] == "--":
                    s = s[:i] + "+" + s[i+2:]

        while "+-" in s:
            for i in range(len(s)):
                if s[i:i+2] == "+-":
                    s = s[:i] + "-" + s[i+2:]

        while "-+" in s:
            for i in range(len(s)):
                if s[i:i+2] == "-+":
                    s = s[:i] + "-" + s[i+2:]
        
        while "++" in s:
            for i in range(len(s)):
                if s[i:i+2] == "++":
                    s = s[:i] + "+" + s[i+2:]

        ops = ["+", "-", "*", "/", "(", ")"]

        s = list(s)

        for i in range(len(s)):
            if s[i] in ops:
                s[i] = " " + s[i] + " "

        s = "".join(s)
        s = s.split()
        
        
        
        if s[0] == "-" and s[1] != "(":
            s = [str(-float(s[1]))] + s[2:]
            
        # put numbers with scientific notation back together
        for i in range(len(s)):
            if "e" in s[i]:
                s[i] = s[i] + "-" + s[i+2]
                if i == len(s) - 3:
                    # print("i == len(s) - 3")
                    s = s[:i] + [s[i]] + [" "," "]
                    # print("s = s[:i] + [s[i]]")
                else:
                    s = s[:i] + [s[i]] + [" ", " "] + s[i+3:] 
        
        s = [i for i in s if i != " "]
        
        return s

    def multiply(s):
        if s[s.index('*')+1] == "-":
            s = s[:(s.index('*') - 1)] + [str(float(s[s.index('*') - 1]) * -float(s[s.index('*') + 2]))] + s[(s.index('*') + 3):]
        elif s[s.index('*')+1] == "+":
            s = s[:(s.index('*') - 1)] + [str(float(s[s.index('*') - 1]) * float(s[s.index('*') + 2]))] + s[(s.index('*') + 3):]
        else:
            s = s[:(s.index('*') - 1)] + [str(float(s[s.index('*') - 1]) * float(s[s.index('*') + 1]))] + s[(s.index('*') + 2):]
        return s

    def divide(s):
        if s[s.index('/')+1] == "-":
            s = s[:(s.index('/') - 1)] + [str(float(s[s.index('/') - 1]) / -float(s[s.index('/') + 2]))] + s[(s.index('/') + 3):]
        elif s[s.index('/')+1] == "+":
            s = s[:(s.index('/') - 1)] + [str(float(s[s.index('/') - 1]) / float(s[s.index('/') + 2]))] + s[(s.index('/') + 3):]
        else: 
            s = s[:(s.index('/') - 1)] + [str(float(s[s.index('/') - 1]) / float(s[s.index('/') + 1]))] + s[(s.index('/') + 2):]
        return s

    def mul_div(s):
        while '*' in s or '/' in s:
            if '*' in s and '/' in s:
                if s.index('*') < s.index('/'):
                    s = multiply(s)
                else:
                    s = divide(s)
            elif '*' in s:
                s = multiply(s)
            else:
                s = divide(s)
        s = simplify(s)
        return s
    
    def sub(s, c="-"):
        while c in s:
            s = s[:(s.index(c) - 1)] + [str(float(s[s.index(c) - 1]) - float(s[s.index(c) + 1]))] + s[(s.index(c) + 2):]
        return s
    
    def add(s, c="+"):
        while c in s:
            if s.index(c) == 0:
                s = s[1:]
            else:
                s = s[:(s.index(c) - 1)] + [str(float(s[s.index(c) - 1]) + float(s[s.index(c) + 1]))] + s[(s.index(c) + 2):]
        return s

    def compute(s):
        s = simplify(s)
        if "*" in s or "/" in s:
            s = mul_div(s)
#             print(f'after mul {s}')
        if "-" in s:
            s = sub(s)
#             print(f'after sub{s}')
        if "+" in s:
            s = add(s)
#             print(f'after add{s}')
        return s

    
    def find_parens(s):
        left, right = 0, 0
        for j in range(len(s)):
            if s[j] == ")":
                right = j
                for i in range(j, -1, -1):
                    if s[i] == "(":
                        left = i       
                        return left, right   

    def compute_parens(s):
        s = simplify(s)
        while ")" in s:
            s = simplify(s)
#             print(f'simplified: {s}')
            left, right = find_parens(s)
            
            t = s[(left+1):right]
            if len(t) == 2:
                t = ["".join(t)]
                s = s[:left] + t + s[(right+1):]
#                 print(f'evaluated parentheses: {s}')
            else:
                t = compute(t)
                s = s[:left] + t + s[(right+1):]
#                 print(f'evaluated parentheses: {s}')
        return s

    s = s.split() 
    
    

    s = compute_parens(s)

    s = compute(s)

    return float(s[0])