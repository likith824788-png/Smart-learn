import { TopicQuiz } from './types';

export const PYTHON_EXTRA_QUIZZES: Record<string, TopicQuiz[]> = {

    'py-0': [
        {
            id: 'intermediate', title: '📙 Intermediate Challenge', questions: [
                { id: 1, text: "What happens if you mix tabs and spaces for indentation in Python 3?", options: ["It works fine", "IndentationError", "SyntaxWarning", "It auto-corrects"], correctAnswer: 1 },
                { id: 2, text: "Which of the following is NOT a valid Python identifier?", options: ["_value", "__init__", "my-var", "myVar2"], correctAnswer: 2 },
                { id: 3, text: "What does the 'None' keyword represent in Python?", options: ["Zero", "Empty string", "Absence of a value", "False"], correctAnswer: 2 },
                { id: 4, text: "Which operator performs floor division in Python?", options: ["/", "//", "%", "**"], correctAnswer: 1 },
                { id: 5, text: "What is the result of: type(True)?", options: ["<class 'int'>", "<class 'bool'>", "<class 'str'>", "<class 'NoneType'>"], correctAnswer: 1 },
                { id: 6, text: "How do you continue a long statement to the next line?", options: ["Using &", "Using \\", "Using ;", "Not possible"], correctAnswer: 1 },
                { id: 7, text: "Which statement about Python strings is correct?", options: ["Strings are mutable", "Single and double quotes are different types", "Triple quotes allow multi-line strings", "Strings cannot contain numbers"], correctAnswer: 2 },
                { id: 8, text: "What is the scope of a variable defined inside an if block?", options: ["Only inside the if block", "The entire function", "Global scope", "It causes an error"], correctAnswer: 1 },
                { id: 9, text: "Which is the correct way to check Python version from code?", options: ["import sys; sys.version", "python --version", "import os; os.version", "import platform; platform.python()"], correctAnswer: 0 },
                { id: 10, text: "What does the expression 'not not True' evaluate to?", options: ["True", "False", "None", "Error"], correctAnswer: 0 },
            ]
        },
        {
            id: 'coding', title: '💻 Coding Quiz', questions: [
                { id: 1, text: "What is the output?\n\nprint('Hello, World!')", options: ["Hello, World!", "hello, world!", "'Hello, World!'", "Error"], correctAnswer: 0 },
                { id: 2, text: "What is the output?\n\nx = 10\nprint(x)", options: ["10", "x", "'10'", "Error"], correctAnswer: 0 },
                { id: 3, text: "What is the output?\n\nprint(3 + 4)", options: ["34", "7", "3 + 4", "Error"], correctAnswer: 1 },
                { id: 4, text: "What is the output?\n\nprint('Hello' + ' ' + 'World')", options: ["Hello World", "HelloWorld", "Hello + World", "Error"], correctAnswer: 0 },
                { id: 5, text: "What is the output?\n\nx = 'Python'\nprint(len(x))", options: ["5", "6", "Python", "Error"], correctAnswer: 1 },
                { id: 6, text: "What is the output?\n\nprint(10 // 3)", options: ["3.33", "3", "4", "3.0"], correctAnswer: 1 },
                { id: 7, text: "What is the output?\n\nprint(2 ** 4)", options: ["8", "16", "6", "24"], correctAnswer: 1 },
                { id: 8, text: "What is the output?\n\na = 5\nb = 2\nprint(a % b)", options: ["2.5", "2", "1", "0"], correctAnswer: 2 },
                { id: 9, text: "What is the output?\n\nx = 'Hello'\nprint(x[1:4])", options: ["Hel", "ell", "ello", "Hell"], correctAnswer: 1 },
                { id: 10, text: "What is the output?\n\nx = 10\ny = '20'\nprint(x + int(y))", options: ["1020", "30", "Error", "'1020'"], correctAnswer: 1 },
            ]
        },
    ],

    'py-1': [
        {
            id: 'intermediate', title: '📙 Intermediate Challenge', questions: [
                { id: 1, text: "What is the result of type(1 + 2.0)?", options: ["<class 'int'>", "<class 'float'>", "<class 'str'>", "Error"], correctAnswer: 1 },
                { id: 2, text: "Which data type is immutable?", options: ["List", "Dictionary", "Set", "Tuple"], correctAnswer: 3 },
                { id: 3, text: "What does int('10', 2) return?", options: ["10", "2", "binary error", "2 (binary 10)"], correctAnswer: 3 },
                { id: 4, text: "What is the difference between '==' and 'is'?", options: ["No difference", "== checks value, is checks identity", "== checks type, is checks value", "is is not valid"], correctAnswer: 1 },
                { id: 5, text: "Which is NOT a valid way to create an empty dictionary?", options: ["{}", "dict()", "dict{}", "dict.fromkeys([])"], correctAnswer: 2 },
                { id: 6, text: "What type does range() return?", options: ["list", "tuple", "range", "generator"], correctAnswer: 2 },
                { id: 7, text: "What happens when you do: x = 5; x = 'hello'?", options: ["Error: type mismatch", "x becomes 'hello'", "x stays 5", "Both values stored"], correctAnswer: 1 },
                { id: 8, text: "What is a frozenset?", options: ["A frozen list", "An immutable set", "A cold variable", "A locked dictionary"], correctAnswer: 1 },
                { id: 9, text: "Which converts a list to a tuple?", options: ["list()", "set()", "tuple()", "dict()"], correctAnswer: 2 },
                { id: 10, text: "What is the maximum value of a Python integer?", options: ["2^31", "2^64", "Unlimited (arbitrary precision)", "Depends on OS"], correctAnswer: 2 },
            ]
        },
        {
            id: 'coding', title: '💻 Coding Quiz', questions: [
                { id: 1, text: "What is the output?\n\nx = 42\nprint(type(x))", options: ["<class 'int'>", "int", "42", "integer"], correctAnswer: 0 },
                { id: 2, text: "What is the output?\n\nx = 3.14\nprint(type(x))", options: ["<class 'float'>", "float", "3.14", "decimal"], correctAnswer: 0 },
                { id: 3, text: "What is the output?\n\nx = True\ny = False\nprint(x and y)", options: ["True", "False", "1", "0"], correctAnswer: 1 },
                { id: 4, text: "What is the output?\n\nx = [1, 2, 3]\nprint(type(x))", options: ["<class 'list'>", "<class 'array'>", "list", "Error"], correctAnswer: 0 },
                { id: 5, text: "What is the output?\n\nx = 10\ny = float(x)\nprint(y)", options: ["10", "10.0", "Error", "float"], correctAnswer: 1 },
                { id: 6, text: "What is the output?\n\nx = '123'\ny = int(x)\nprint(y + 1)", options: ["1231", "124", "Error", "'124'"], correctAnswer: 1 },
                { id: 7, text: "What is the output?\n\nx = {1, 2, 2, 3, 3, 3}\nprint(len(x))", options: ["6", "3", "1", "Error"], correctAnswer: 1 },
                { id: 8, text: "What is the output?\n\na = [1, 2]\nb = a\nb.append(3)\nprint(a)", options: ["[1, 2]", "[1, 2, 3]", "[3]", "Error"], correctAnswer: 1 },
                { id: 9, text: "What is the output?\n\nx = (1, 2, 3)\nx[0] = 10\nprint(x)", options: ["(10, 2, 3)", "(1, 2, 3)", "Error: tuples are immutable", "[10, 2, 3]"], correctAnswer: 2 },
                { id: 10, text: "What is the output?\n\nx = {'a': 1, 'b': 2}\ny = list(x.values())\nprint(sum(y))", options: ["3", "['a', 'b']", "Error", "ab"], correctAnswer: 0 },
            ]
        },
    ],

    'py-2': [
        {
            id: 'intermediate', title: '📙 Intermediate Challenge', questions: [
                { id: 1, text: "What is the output of range(2, 10, 3)?", options: ["[2, 5, 8]", "[2, 3, 4]", "[2, 5, 8, 11]", "[3, 6, 9]"], correctAnswer: 0 },
                { id: 2, text: "What is the difference between 'break' and 'continue'?", options: ["No difference", "break exits loop, continue skips iteration", "continue exits loop, break skips", "Both exit loop"], correctAnswer: 1 },
                { id: 3, text: "When does the 'else' clause of a for loop execute?", options: ["When break is called", "When loop completes without break", "Always", "Never"], correctAnswer: 1 },
                { id: 4, text: "What does enumerate() do?", options: ["Counts items", "Returns index-value pairs", "Sorts items", "Filters items"], correctAnswer: 1 },
                { id: 5, text: "What is the time complexity of iterating through a list?", options: ["O(1)", "O(n)", "O(n²)", "O(log n)"], correctAnswer: 1 },
                { id: 6, text: "Which creates an infinite loop?", options: ["for i in range(0):", "while True:", "for i in []:", "while False:"], correctAnswer: 1 },
                { id: 7, text: "What does zip() do with two lists?", options: ["Compresses them", "Pairs elements together", "Merges into one", "Sorts both"], correctAnswer: 1 },
                { id: 8, text: "What is a generator expression?", options: ["Same as list comprehension", "Lazy evaluation with ()", "A function", "A class"], correctAnswer: 1 },
                { id: 9, text: "How to iterate over a dict's key-value pairs?", options: ["for k, v in dict:", "for k, v in dict.items():", "for k, v in dict.pairs():", "for k, v in dict.all():"], correctAnswer: 1 },
                { id: 10, text: "What happens with: for i in range(5, 0)?", options: ["Counts 5 to 0", "Loop doesn't execute", "Error", "Infinite loop"], correctAnswer: 1 },
            ]
        },
        {
            id: 'coding', title: '💻 Coding Quiz', questions: [
                { id: 1, text: "What is the output?\n\nfor i in range(3):\n    print(i, end=' ')", options: ["1 2 3", "0 1 2", "0 1 2 3", "1 2"], correctAnswer: 1 },
                { id: 2, text: "What is the output?\n\nx = 0\nwhile x < 3:\n    x += 1\nprint(x)", options: ["2", "3", "4", "0"], correctAnswer: 1 },
                { id: 3, text: "What is the output?\n\nfor i in range(1, 6, 2):\n    print(i, end=' ')", options: ["1 2 3 4 5", "1 3 5", "2 4 6", "1 3 5 7"], correctAnswer: 1 },
                { id: 4, text: "What is the output?\n\nfor i in range(5):\n    if i == 3:\n        break\n    print(i, end=' ')", options: ["0 1 2 3", "0 1 2", "0 1 2 3 4", "3"], correctAnswer: 1 },
                { id: 5, text: "What is the output?\n\nfor i in range(5):\n    if i == 2:\n        continue\n    print(i, end=' ')", options: ["0 1 3 4", "0 1 2 3 4", "2", "0 1"], correctAnswer: 0 },
                { id: 6, text: "What is the output?\n\nresult = 0\nfor i in range(1, 6):\n    result += i\nprint(result)", options: ["10", "15", "20", "6"], correctAnswer: 1 },
                { id: 7, text: "What is the output?\n\nfor i in range(3):\n    for j in range(2):\n        pass\nprint(i, j)", options: ["3 2", "2 1", "2 0", "Error"], correctAnswer: 1 },
                { id: 8, text: "What is the output?\n\nx = 10\nwhile x > 0:\n    x -= 3\nprint(x)", options: ["-2", "0", "1", "-1"], correctAnswer: 0 },
                { id: 9, text: "What is the output?\n\nnums = [1,2,3,4,5]\nresult = [x**2 for x in nums if x%2 != 0]\nprint(result)", options: ["[1, 4, 9, 16, 25]", "[4, 16]", "[1, 9, 25]", "[2, 4]"], correctAnswer: 2 },
                { id: 10, text: "What is the output?\n\nmatrix = [[1,2],[3,4],[5,6]]\nflat = [x for row in matrix for x in row]\nprint(flat)", options: ["[[1,2],[3,4],[5,6]]", "[1, 2, 3, 4, 5, 6]", "[1, 3, 5]", "Error"], correctAnswer: 1 },
            ]
        },
    ],

    'py-3': [
        {
            id: 'intermediate', title: '📙 Intermediate Challenge', questions: [
                { id: 1, text: "What is the difference between *args and **kwargs?", options: ["No difference", "*args for positional, **kwargs for keyword", "*args for keyword, **kwargs for positional", "Both for keyword"], correctAnswer: 1 },
                { id: 2, text: "What happens if a function has no return statement?", options: ["Error", "Returns 0", "Returns None", "Returns empty string"], correctAnswer: 2 },
                { id: 3, text: "What is a closure in Python?", options: ["A closed function", "A function that captures variables from enclosing scope", "A deleted function", "A private function"], correctAnswer: 1 },
                { id: 4, text: "What is the LEGB rule?", options: ["A coding style", "Variable scope resolution order", "A design pattern", "An error handling method"], correctAnswer: 1 },
                { id: 5, text: "Can a function return multiple values?", options: ["No", "Yes, as a tuple", "Only two values", "Only with special syntax"], correctAnswer: 1 },
                { id: 6, text: "What is a decorator in Python?", options: ["A comment", "A function that modifies another function", "A variable type", "An import statement"], correctAnswer: 1 },
                { id: 7, text: "What does 'nonlocal' keyword do?", options: ["Makes variable global", "References variable in enclosing scope", "Deletes variable", "Creates constant"], correctAnswer: 1 },
                { id: 8, text: "What is memoization?", options: ["Memory allocation", "Caching function results", "Variable storage", "Code optimization"], correctAnswer: 1 },
                { id: 9, text: "Which is true about default mutable arguments?", options: ["They reset each call", "They are shared across calls (dangerous)", "They cause errors", "They are copied"], correctAnswer: 1 },
                { id: 10, text: "What is a higher-order function?", options: ["A complex function", "A function that takes/returns functions", "A recursive function", "A class method"], correctAnswer: 1 },
            ]
        },
        {
            id: 'coding', title: '💻 Coding Quiz', questions: [
                { id: 1, text: "What is the output?\n\ndef greet():\n    return 'Hello'\nprint(greet())", options: ["Hello", "greet()", "None", "Error"], correctAnswer: 0 },
                { id: 2, text: "What is the output?\n\ndef add(a, b):\n    return a + b\nprint(add(3, 5))", options: ["35", "8", "Error", "None"], correctAnswer: 1 },
                { id: 3, text: "What is the output?\n\ndef greet(name='World'):\n    return f'Hello, {name}!'\nprint(greet())", options: ["Hello, World!", "Hello, name!", "Error", "Hello, !"], correctAnswer: 0 },
                { id: 4, text: "What is the output?\n\ndef no_return():\n    x = 5\nprint(no_return())", options: ["5", "None", "Error", "0"], correctAnswer: 1 },
                { id: 5, text: "What is the output?\n\ndef swap(a, b):\n    return b, a\nx, y = swap(1, 2)\nprint(x, y)", options: ["1 2", "2 1", "(2, 1)", "Error"], correctAnswer: 1 },
                { id: 6, text: "What is the output?\n\ndef power(base, exp=2):\n    return base ** exp\nprint(power(3), power(3, 3))", options: ["6 27", "9 27", "9 9", "Error"], correctAnswer: 1 },
                { id: 7, text: "What is the output?\n\ndef total(*args):\n    return sum(args)\nprint(total(1, 2, 3, 4))", options: ["[1,2,3,4]", "10", "4", "Error"], correctAnswer: 1 },
                { id: 8, text: "What is the output?\n\ndef outer():\n    x = 10\n    def inner():\n        return x\n    return inner()\nprint(outer())", options: ["10", "Error", "None", "inner"], correctAnswer: 0 },
                { id: 9, text: "What is the output?\n\ndef factorial(n):\n    if n <= 1:\n        return 1\n    return n * factorial(n-1)\nprint(factorial(5))", options: ["5", "25", "120", "24"], correctAnswer: 2 },
                { id: 10, text: "What is the output?\n\ndef make_counter():\n    count = [0]\n    def increment():\n        count[0] += 1\n        return count[0]\n    return increment\nc = make_counter()\nprint(c(), c(), c())", options: ["1 1 1", "0 1 2", "1 2 3", "Error"], correctAnswer: 2 },
            ]
        },
    ],

    'py-4': [
        {
            id: 'intermediate', title: '📙 Intermediate Challenge', questions: [
                { id: 1, text: "What is the difference between append() and extend()?", options: ["No difference", "append adds one item, extend adds iterable items", "extend adds one item", "Both add iterables"], correctAnswer: 1 },
                { id: 2, text: "What does list.sort() return?", options: ["Sorted list", "None (sorts in-place)", "New list", "True/False"], correctAnswer: 1 },
                { id: 3, text: "What is the difference between sort() and sorted()?", options: ["None", "sort() modifies in-place, sorted() returns new list", "sorted() modifies in-place", "Both return new lists"], correctAnswer: 1 },
                { id: 4, text: "What is list unpacking?", options: ["Deleting a list", "Assigning list elements to variables", "Zipping lists", "Reversing a list"], correctAnswer: 1 },
                { id: 5, text: "What does the * operator do with lists?", options: ["Multiplies values", "Repeats the list", "Unpacks the list", "Both B and C depending on context"], correctAnswer: 3 },
                { id: 6, text: "What is a shallow copy vs deep copy?", options: ["Same thing", "Shallow copies references, deep copies objects recursively", "Deep copies references", "Neither copies anything"], correctAnswer: 1 },
                { id: 7, text: "What is the time complexity of list.append()?", options: ["O(n)", "O(1) amortized", "O(log n)", "O(n²)"], correctAnswer: 1 },
                { id: 8, text: "Which creates a list comprehension with condition?", options: ["[x for x in lst where x>0]", "[x for x in lst if x>0]", "[x if x>0 for x in lst]", "[x from lst if x>0]"], correctAnswer: 1 },
                { id: 9, text: "What does list[::-1] do?", options: ["Returns empty list", "Returns reversed copy", "Deletes the list", "Returns last element"], correctAnswer: 1 },
                { id: 10, text: "What is the result of [1,2] + [3,4]?", options: ["[4, 6]", "[1, 2, 3, 4]", "[[1,2],[3,4]]", "Error"], correctAnswer: 1 },
            ]
        },
        {
            id: 'coding', title: '💻 Coding Quiz', questions: [
                { id: 1, text: "What is the output?\n\nx = [1, 2, 3]\nx.append(4)\nprint(x)", options: ["[1, 2, 3]", "[1, 2, 3, 4]", "[4, 1, 2, 3]", "Error"], correctAnswer: 1 },
                { id: 2, text: "What is the output?\n\nx = [3, 1, 2]\nx.sort()\nprint(x)", options: ["[3, 1, 2]", "[1, 2, 3]", "[3, 2, 1]", "None"], correctAnswer: 1 },
                { id: 3, text: "What is the output?\n\nx = [1, 2, 3, 4, 5]\nprint(x[1:4])", options: ["[1, 2, 3, 4]", "[2, 3, 4]", "[2, 3, 4, 5]", "[1, 2, 3]"], correctAnswer: 1 },
                { id: 4, text: "What is the output?\n\nx = [1, 2, 3]\ny = x.pop()\nprint(x, y)", options: ["[1, 2] 3", "[2, 3] 1", "[1, 2, 3] 3", "Error"], correctAnswer: 0 },
                { id: 5, text: "What is the output?\n\nx = [1, 2, 3]\nx.insert(1, 10)\nprint(x)", options: ["[1, 2, 10, 3]", "[10, 1, 2, 3]", "[1, 10, 2, 3]", "[1, 2, 3, 10]"], correctAnswer: 2 },
                { id: 6, text: "What is the output?\n\nx = [1, 2, 3]\ny = [4, 5]\nx.extend(y)\nprint(len(x))", options: ["3", "5", "2", "Error"], correctAnswer: 1 },
                { id: 7, text: "What is the output?\n\nresult = [x**2 for x in range(5)]\nprint(result)", options: ["[1, 4, 9, 16, 25]", "[0, 1, 4, 9, 16]", "[0, 2, 4, 6, 8]", "Error"], correctAnswer: 1 },
                { id: 8, text: "What is the output?\n\nx = [1, 2, 3, 4, 5]\nprint(x[::-1])", options: ["[1, 2, 3, 4, 5]", "[5, 4, 3, 2, 1]", "[5]", "Error"], correctAnswer: 1 },
                { id: 9, text: "What is the output?\n\nx = [[1,2], [3,4]]\ny = x[0]\ny.append(5)\nprint(x)", options: ["[[1,2], [3,4]]", "[[1,2,5], [3,4]]", "[[1,2], [3,4,5]]", "Error"], correctAnswer: 1 },
                { id: 10, text: "What is the output?\n\nx = [1, 2, 3, 4, 5]\ny = [i for i in x if i%2==0]\nz = list(map(lambda i: i*3, y))\nprint(z)", options: ["[2, 4]", "[3, 6, 9, 12, 15]", "[6, 12]", "[3, 9, 15]"], correctAnswer: 2 },
            ]
        },
    ],

    'py-5': [
        {
            id: 'intermediate', title: '📙 Intermediate Challenge', questions: [
                { id: 1, text: "Which types can be dictionary keys?", options: ["Any type", "Only strings", "Only immutable types", "Only integers"], correctAnswer: 2 },
                { id: 2, text: "What happens if you access a missing key with dict[key]?", options: ["Returns None", "Returns 0", "KeyError", "Returns empty string"], correctAnswer: 2 },
                { id: 3, text: "What is a defaultdict?", options: ["Regular dict", "Dict with default values for missing keys", "Dict that can't be changed", "Dict with only string keys"], correctAnswer: 1 },
                { id: 4, text: "What does dict.setdefault() do?", options: ["Sets all values to default", "Returns value if key exists, else sets and returns default", "Deletes default values", "Resets the dictionary"], correctAnswer: 1 },
                { id: 5, text: "Can a list be a dictionary key?", options: ["Yes", "No, lists are mutable", "Only if empty", "Only with numbers"], correctAnswer: 1 },
                { id: 6, text: "What is dictionary comprehension?", options: ["{k:v for k,v in items}", "dict.create()", "dict()", "dict.comprehend()"], correctAnswer: 0 },
                { id: 7, text: "How to merge two dicts in Python 3.9+?", options: ["dict1 + dict2", "dict1 | dict2", "dict1 & dict2", "merge(dict1, dict2)"], correctAnswer: 1 },
                { id: 8, text: "What does dict.update() do?", options: ["Validates the dict", "Merges another dict into it", "Refreshes values", "Sorts the dict"], correctAnswer: 1 },
                { id: 9, text: "Are dictionaries ordered in Python 3.7+?", options: ["No", "Yes, by insertion order", "Only by key", "Random order"], correctAnswer: 1 },
                { id: 10, text: "What is the time complexity of dict lookup?", options: ["O(n)", "O(1) average", "O(log n)", "O(n²)"], correctAnswer: 1 },
            ]
        },
        {
            id: 'coding', title: '💻 Coding Quiz', questions: [
                { id: 1, text: "What is the output?\n\nd = {'a': 1, 'b': 2}\nprint(d['a'])", options: ["1", "'a'", "a: 1", "Error"], correctAnswer: 0 },
                { id: 2, text: "What is the output?\n\nd = {'x': 10}\nd['y'] = 20\nprint(len(d))", options: ["1", "2", "3", "Error"], correctAnswer: 1 },
                { id: 3, text: "What is the output?\n\nd = {'a': 1, 'b': 2, 'c': 3}\nprint(list(d.keys()))", options: ["[1, 2, 3]", "['a', 'b', 'c']", "[('a',1), ('b',2)]", "Error"], correctAnswer: 1 },
                { id: 4, text: "What is the output?\n\nd = {'a': 1, 'b': 2}\nprint(d.get('c', 0))", options: ["None", "Error", "0", "'c'"], correctAnswer: 2 },
                { id: 5, text: "What is the output?\n\nd = {'a': 1, 'b': 2}\nd.pop('a')\nprint(d)", options: ["{'a': 1, 'b': 2}", "{'b': 2}", "{'a': 1}", "Error"], correctAnswer: 1 },
                { id: 6, text: "What is the output?\n\nd = {'a': 1, 'b': 2, 'c': 3}\nprint(sum(d.values()))", options: ["'abc'", "3", "6", "Error"], correctAnswer: 2 },
                { id: 7, text: "What is the output?\n\nd1 = {'a': 1}\nd2 = {'b': 2}\nd1.update(d2)\nprint(d1)", options: ["{'a': 1}", "{'b': 2}", "{'a': 1, 'b': 2}", "Error"], correctAnswer: 2 },
                { id: 8, text: "What is the output?\n\nd = {x: x**2 for x in range(4)}\nprint(d)", options: ["{0:0, 1:1, 2:4, 3:9}", "{1:1, 2:4, 3:9}", "[0, 1, 4, 9]", "Error"], correctAnswer: 0 },
                { id: 9, text: "What is the output?\n\nd = {'a': [1,2], 'b': [3,4]}\nfor k, v in d.items():\n    v.append(0)\nprint(d['a'])", options: ["[1, 2]", "[1, 2, 0]", "[0]", "Error"], correctAnswer: 1 },
                { id: 10, text: "What is the output?\n\nwords = ['apple','banana','apple','cherry','banana','apple']\ncount = {}\nfor w in words:\n    count[w] = count.get(w, 0) + 1\nprint(count['apple'])", options: ["1", "2", "3", "Error"], correctAnswer: 2 },
            ]
        },
    ],

    'py-6': [
        {
            id: 'intermediate', title: '📙 Intermediate Challenge', questions: [
                { id: 1, text: "What mode opens a file for both reading and writing?", options: ["'rw'", "'r+'", "'wr'", "'both'"], correctAnswer: 1 },
                { id: 2, text: "What is the difference between 'w' and 'a' mode?", options: ["No difference", "'w' overwrites, 'a' appends", "'a' overwrites, 'w' appends", "Both append"], correctAnswer: 1 },
                { id: 3, text: "What does the 'b' in 'rb' mode mean?", options: ["Boolean", "Binary", "Buffer", "Backup"], correctAnswer: 1 },
                { id: 4, text: "Why is 'with' statement preferred for file handling?", options: ["It's faster", "It auto-closes the file even if an error occurs", "It uses less memory", "It's required"], correctAnswer: 1 },
                { id: 5, text: "What does file.seek(0) do?", options: ["Deletes file content", "Moves cursor to beginning", "Closes the file", "Reads first byte"], correctAnswer: 1 },
                { id: 6, text: "What does file.tell() return?", options: ["File size", "Current cursor position", "Line number", "File name"], correctAnswer: 1 },
                { id: 7, text: "What happens if you open a non-existent file with 'r' mode?", options: ["Creates new file", "FileNotFoundError", "Returns None", "Creates empty file"], correctAnswer: 1 },
                { id: 8, text: "What is the 'x' mode used for?", options: ["Execute file", "Create file, fail if exists", "Exclusive read", "Delete file"], correctAnswer: 1 },
                { id: 9, text: "How to read a file line by line efficiently?", options: ["readlines()", "read().split()", "Iterate over file object", "readline() in while loop"], correctAnswer: 2 },
                { id: 10, text: "What module helps with file paths cross-platform?", options: ["os.path / pathlib", "sys", "io", "file"], correctAnswer: 0 },
            ]
        },
        {
            id: 'coding', title: '💻 Coding Quiz', questions: [
                { id: 1, text: "Which code correctly opens and reads a file?\n\nA) open('file.txt').read()\nB) file.read('file.txt')\nC) read('file.txt')\nD) load('file.txt')", options: ["A", "B", "C", "D"], correctAnswer: 0 },
                { id: 2, text: "Which code writes 'Hello' to a file?\n\nA) with open('f.txt','w') as f: f.write('Hello')\nB) with open('f.txt','r') as f: f.write('Hello')\nC) write('f.txt', 'Hello')\nD) save('f.txt', 'Hello')", options: ["A", "B", "C", "D"], correctAnswer: 0 },
                { id: 3, text: "What does this code do?\n\nwith open('data.txt', 'r') as f:\n    lines = f.readlines()", options: ["Reads all lines into a list", "Reads one line", "Writes lines to file", "Deletes file"], correctAnswer: 0 },
                { id: 4, text: "What is the output?\n\nimport os\nprint(os.path.exists('nonexistent.txt'))", options: ["True", "False", "Error", "None"], correctAnswer: 1 },
                { id: 5, text: "What does this code do?\n\nwith open('log.txt', 'a') as f:\n    f.write('New entry\\n')", options: ["Overwrites file with 'New entry'", "Appends 'New entry' to end of file", "Reads the file", "Deletes and recreates file"], correctAnswer: 1 },
                { id: 6, text: "What is the output?\n\nwith open('test.txt', 'w') as f:\n    f.write('Hello')\nwith open('test.txt', 'r') as f:\n    print(len(f.read()))", options: ["0", "4", "5", "Error"], correctAnswer: 2 },
                { id: 7, text: "What does this code produce?\n\nwith open('nums.txt', 'w') as f:\n    for i in range(3):\n        f.write(str(i) + '\\n')", options: ["File with: 0 1 2 on one line", "File with: 0, 1, 2 on separate lines", "Error", "Empty file"], correctAnswer: 1 },
                { id: 8, text: "What is the issue with this code?\n\nf = open('data.txt', 'r')\ndata = f.read()\n# missing f.close()", options: ["No issue", "File won't close if error occurs", "Data won't be read", "SyntaxError"], correctAnswer: 1 },
                { id: 9, text: "What does this code do?\n\nimport json\ndata = {'name': 'Alice', 'age': 30}\nwith open('data.json', 'w') as f:\n    json.dump(data, f)", options: ["Reads JSON file", "Writes dict as JSON to file", "Converts JSON to dict", "Error"], correctAnswer: 1 },
                { id: 10, text: "What does this code print?\n\nimport csv\nwith open('data.csv', 'w', newline='') as f:\n    w = csv.writer(f)\n    w.writerow(['Name','Age'])\n    w.writerow(['Bob','25'])\nprint('Done')", options: ["Prints CSV content", "Done", "Error: csv not found", "Nothing"], correctAnswer: 1 },
            ]
        },
    ],

    'py-7': [
        {
            id: 'intermediate', title: '📙 Intermediate Challenge', questions: [
                { id: 1, text: "What is the purpose of __init__.py?", options: ["Initialize variables", "Mark directory as a package", "Main entry point", "Configuration file"], correctAnswer: 1 },
                { id: 2, text: "What does 'from module import *' do?", options: ["Imports only classes", "Imports all public names", "Imports private names too", "Causes error"], correctAnswer: 1 },
                { id: 3, text: "What is __name__ == '__main__' used for?", options: ["Checking module name", "Running code only when file is executed directly", "Importing modules", "Debugging"], correctAnswer: 1 },
                { id: 4, text: "What is a virtual environment?", options: ["A VM", "Isolated Python environment for dependencies", "A container", "A code editor"], correctAnswer: 1 },
                { id: 5, text: "What does pip freeze do?", options: ["Stops pip", "Lists installed packages with versions", "Freezes Python", "Caches packages"], correctAnswer: 1 },
                { id: 6, text: "What is a namespace in Python?", options: ["A file name", "A mapping of names to objects", "A folder", "A variable type"], correctAnswer: 1 },
                { id: 7, text: "What is the difference between import module and from module import func?", options: ["No difference", "First imports entire module, second imports specific items", "First is faster", "Second imports all"], correctAnswer: 1 },
                { id: 8, text: "Where does pip install packages by default?", options: ["Current directory", "site-packages directory", "Desktop", "Home directory"], correctAnswer: 1 },
                { id: 9, text: "What is a relative import?", options: ["Importing from parent/sibling package using dots", "Importing by full path", "Importing from internet", "Random import"], correctAnswer: 0 },
                { id: 10, text: "What happens if two modules import each other?", options: ["Always errors", "Circular import (may cause issues)", "Works perfectly", "Python prevents it"], correctAnswer: 1 },
            ]
        },
        {
            id: 'coding', title: '💻 Coding Quiz', questions: [
                { id: 1, text: "What is the output?\n\nimport math\nprint(math.sqrt(16))", options: ["4", "4.0", "16", "Error"], correctAnswer: 1 },
                { id: 2, text: "What is the output?\n\nfrom math import pi\nprint(round(pi, 2))", options: ["3.14", "3.1415", "3", "Error"], correctAnswer: 0 },
                { id: 3, text: "What is the output?\n\nimport math as m\nprint(m.floor(3.7))", options: ["4", "3", "3.7", "Error"], correctAnswer: 1 },
                { id: 4, text: "What is the output?\n\nimport random\nrandom.seed(42)\nprint(type(random.randint(1, 10)))", options: ["<class 'float'>", "<class 'int'>", "<class 'str'>", "Error"], correctAnswer: 1 },
                { id: 5, text: "What is the output?\n\nimport os\nprint(type(os.getcwd()))", options: ["<class 'str'>", "<class 'path'>", "<class 'list'>", "Error"], correctAnswer: 0 },
                { id: 6, text: "What is the output?\n\nimport datetime\nd = datetime.date(2024, 1, 15)\nprint(d.month)", options: ["January", "1", "15", "2024"], correctAnswer: 1 },
                { id: 7, text: "What is the output?\n\nfrom collections import Counter\nc = Counter('banana')\nprint(c['a'])", options: ["1", "2", "3", "Error"], correctAnswer: 2 },
                { id: 8, text: "What is the output?\n\nimport json\ndata = '{\"name\": \"Alice\"}'\nobj = json.loads(data)\nprint(type(obj))", options: ["<class 'str'>", "<class 'dict'>", "<class 'json'>", "Error"], correctAnswer: 1 },
                { id: 9, text: "What is the output?\n\nimport sys\nprint(type(sys.path))", options: ["<class 'str'>", "<class 'tuple'>", "<class 'list'>", "Error"], correctAnswer: 2 },
                { id: 10, text: "What is the output?\n\nfrom itertools import chain\na = [1, 2]\nb = [3, 4]\nresult = list(chain(a, b))\nprint(result)", options: ["[[1,2],[3,4]]", "[1, 2, 3, 4]", "[(1,3),(2,4)]", "Error"], correctAnswer: 1 },
            ]
        },
    ],

    'py-8': [
        {
            id: 'intermediate', title: '📙 Intermediate Challenge', questions: [
                { id: 1, text: "What is the difference between class and instance variables?", options: ["No difference", "Class vars shared by all instances, instance vars unique to each", "Instance vars are shared", "Class vars are private"], correctAnswer: 1 },
                { id: 2, text: "What is method overriding?", options: ["Deleting a method", "Child class redefining parent method", "Calling multiple methods", "Private methods"], correctAnswer: 1 },
                { id: 3, text: "What is multiple inheritance?", options: ["Having many objects", "Class inheriting from multiple parent classes", "Creating many instances", "Using many modules"], correctAnswer: 1 },
                { id: 4, text: "What is the MRO (Method Resolution Order)?", options: ["Method naming convention", "Order Python searches for methods in inheritance", "A design pattern", "Error handling order"], correctAnswer: 1 },
                { id: 5, text: "What is an abstract class?", options: ["A simple class", "A class that can't be instantiated directly", "A deleted class", "A class with no methods"], correctAnswer: 1 },
                { id: 6, text: "What is the @property decorator used for?", options: ["Making methods behave like attributes", "Making class private", "Deleting attributes", "Creating static methods"], correctAnswer: 0 },
                { id: 7, text: "What is the difference between @staticmethod and @classmethod?", options: ["No difference", "staticmethod has no cls/self, classmethod receives cls", "Both receive self", "classmethod is faster"], correctAnswer: 1 },
                { id: 8, text: "What are magic/dunder methods?", options: ["Encrypted methods", "Methods with double underscores that Python calls implicitly", "Private methods", "External methods"], correctAnswer: 1 },
                { id: 9, text: "What does __str__ vs __repr__ do?", options: ["Same thing", "__str__ for user display, __repr__ for developer/debug", "__repr__ for display", "Neither is standard"], correctAnswer: 1 },
                { id: 10, text: "What is composition vs inheritance?", options: ["Same concept", "Composition uses has-a, inheritance uses is-a relationship", "Inheritance uses has-a", "Neither is valid in Python"], correctAnswer: 1 },
            ]
        },
        {
            id: 'coding', title: '💻 Coding Quiz', questions: [
                { id: 1, text: "What is the output?\n\nclass Dog:\n    def speak(self):\n        return 'Woof'\nd = Dog()\nprint(d.speak())", options: ["Woof", "Dog", "Error", "None"], correctAnswer: 0 },
                { id: 2, text: "What is the output?\n\nclass Person:\n    def __init__(self, name):\n        self.name = name\np = Person('Alice')\nprint(p.name)", options: ["Person", "Alice", "name", "Error"], correctAnswer: 1 },
                { id: 3, text: "What is the output?\n\nclass Counter:\n    count = 0\n    def __init__(self):\n        Counter.count += 1\na = Counter()\nb = Counter()\nprint(Counter.count)", options: ["0", "1", "2", "Error"], correctAnswer: 2 },
                { id: 4, text: "What is the output?\n\nclass Animal:\n    def speak(self):\n        return 'Generic'\nclass Cat(Animal):\n    def speak(self):\n        return 'Meow'\nc = Cat()\nprint(c.speak())", options: ["Generic", "Meow", "Error", "None"], correctAnswer: 1 },
                { id: 5, text: "What is the output?\n\nclass A:\n    x = 1\nclass B(A):\n    pass\nprint(B.x)", options: ["Error", "None", "1", "0"], correctAnswer: 2 },
                { id: 6, text: "What is the output?\n\nclass Rect:\n    def __init__(self, w, h):\n        self.w = w\n        self.h = h\n    def area(self):\n        return self.w * self.h\nr = Rect(3, 4)\nprint(r.area())", options: ["7", "12", "34", "Error"], correctAnswer: 1 },
                { id: 7, text: "What is the output?\n\nclass MyList:\n    def __init__(self):\n        self.data = []\n    def add(self, val):\n        self.data.append(val)\n        return self\nm = MyList()\nm.add(1).add(2).add(3)\nprint(len(m.data))", options: ["1", "2", "3", "Error"], correctAnswer: 2 },
                { id: 8, text: "What is the output?\n\nclass Base:\n    def __init__(self):\n        self.value = 'base'\nclass Child(Base):\n    def __init__(self):\n        super().__init__()\n        self.extra = 'child'\nc = Child()\nprint(c.value, c.extra)", options: ["Error", "base child", "child base", "None None"], correctAnswer: 1 },
                { id: 9, text: "What is the output?\n\nclass Vector:\n    def __init__(self, x, y):\n        self.x = x\n        self.y = y\n    def __add__(self, other):\n        return Vector(self.x+other.x, self.y+other.y)\nv = Vector(1,2) + Vector(3,4)\nprint(v.x, v.y)", options: ["1 2", "3 4", "4 6", "Error"], correctAnswer: 2 },
                { id: 10, text: "What is the output?\n\nclass Singleton:\n    _instance = None\n    def __new__(cls):\n        if cls._instance is None:\n            cls._instance = super().__new__(cls)\n        return cls._instance\na = Singleton()\nb = Singleton()\nprint(a is b)", options: ["True", "False", "Error", "None"], correctAnswer: 0 },
            ]
        },
    ],

    'py-9': [
        {
            id: 'intermediate', title: '📙 Intermediate Challenge', questions: [
                { id: 1, text: "What is the hierarchy of built-in exceptions?", options: ["All inherit from Error", "All inherit from BaseException", "No hierarchy", "Random structure"], correctAnswer: 1 },
                { id: 2, text: "What is the difference between Exception and BaseException?", options: ["Same thing", "Exception is for regular errors, BaseException includes SystemExit etc.", "BaseException is simpler", "Exception is deprecated"], correctAnswer: 1 },
                { id: 3, text: "Can you have multiple except blocks?", options: ["No", "Yes, to catch different exception types", "Only two", "Only with finally"], correctAnswer: 1 },
                { id: 4, text: "What is exception chaining (raise ... from ...)?", options: ["Linking two errors", "Showing the original cause of a re-raised exception", "Creating error chains", "Ignoring errors"], correctAnswer: 1 },
                { id: 5, text: "When should you use 'except Exception' vs bare 'except'?", options: ["No difference", "'except Exception' doesn't catch SystemExit/KeyboardInterrupt", "Bare except is safer", "'except Exception' catches everything"], correctAnswer: 1 },
                { id: 6, text: "What is the purpose of the 'else' block in try/except?", options: ["Runs if exception occurs", "Runs if no exception occurs", "Runs always", "Replaces finally"], correctAnswer: 1 },
                { id: 7, text: "What is EAFP vs LBYL?", options: ["Error types", "Coding styles: try/except vs checking conditions first", "Testing methods", "Import styles"], correctAnswer: 1 },
                { id: 8, text: "Can you capture the exception object?", options: ["No", "Yes, with 'except Error as e'", "Only in finally", "Only with print"], correctAnswer: 1 },
                { id: 9, text: "What happens if an exception is not caught?", options: ["Program continues", "Program crashes with traceback", "Exception disappears", "Python auto-fixes it"], correctAnswer: 1 },
                { id: 10, text: "What does traceback.format_exc() do?", options: ["Formats the file", "Returns exception traceback as string", "Creates new exception", "Clears the error"], correctAnswer: 1 },
            ]
        },
        {
            id: 'coding', title: '💻 Coding Quiz', questions: [
                { id: 1, text: "What is the output?\n\ntry:\n    x = 10\nexcept:\n    print('Error')\nelse:\n    print('Success')", options: ["Error", "Success", "Nothing", "Error then Success"], correctAnswer: 1 },
                { id: 2, text: "What is the output?\n\ntry:\n    print(10 / 0)\nexcept ZeroDivisionError:\n    print('Cannot divide by zero')", options: ["0", "Error", "Cannot divide by zero", "Infinity"], correctAnswer: 2 },
                { id: 3, text: "What is the output?\n\ntry:\n    x = int('hello')\nexcept ValueError:\n    print('Bad value')\nexcept TypeError:\n    print('Bad type')", options: ["Bad value", "Bad type", "hello", "Error"], correctAnswer: 0 },
                { id: 4, text: "What is the output?\n\ntry:\n    x = 1 / 0\nexcept:\n    print('A')\nfinally:\n    print('B')", options: ["A", "B", "A then B", "B then A"], correctAnswer: 2 },
                { id: 5, text: "What is the output?\n\ndef safe_div(a, b):\n    try:\n        return a / b\n    except ZeroDivisionError:\n        return 'Error'\nprint(safe_div(10, 0))", options: ["0", "Error", "None", "Crash"], correctAnswer: 1 },
                { id: 6, text: "What is the output?\n\ntry:\n    nums = [1, 2, 3]\n    print(nums[5])\nexcept IndexError as e:\n    print(type(e).__name__)", options: ["Error", "IndexError", "5", "None"], correctAnswer: 1 },
                { id: 7, text: "What is the output?\n\nclass AgeError(Exception):\n    pass\ntry:\n    raise AgeError('Too young')\nexcept AgeError as e:\n    print(e)", options: ["AgeError", "Too young", "Error", "None"], correctAnswer: 1 },
                { id: 8, text: "What is the output?\n\ndef get_val(d, key):\n    try:\n        return d[key]\n    except KeyError:\n        return 'Not found'\nprint(get_val({'a': 1}, 'b'))", options: ["None", "Error", "Not found", "KeyError"], correctAnswer: 2 },
                { id: 9, text: "What is the output?\n\nresult = []\nfor i in range(5):\n    try:\n        if i == 3:\n            raise ValueError\n        result.append(i)\n    except ValueError:\n        result.append('X')\nprint(result)", options: ["[0,1,2,3,4]", "[0,1,2,'X',4]", "[0,1,2]", "Error"], correctAnswer: 1 },
                { id: 10, text: "What is the output?\n\ndef process(data):\n    try:\n        val = int(data)\n        result = 100 / val\n        return round(result, 2)\n    except ValueError:\n        return 'Not a number'\n    except ZeroDivisionError:\n        return 'Cannot be zero'\nprint(process('0'), process('abc'))", options: ["0 abc", "Cannot be zero Not a number", "Error Error", "None None"], correctAnswer: 1 },
            ]
        },
    ],

    'py-10': [
        {
            id: 'intermediate', title: '📙 Intermediate Challenge', questions: [
                { id: 1, text: "Can a lambda have multiple expressions?", options: ["Yes", "No, only a single expression", "Up to 3", "Unlimited"], correctAnswer: 1 },
                { id: 2, text: "What does reduce() do?", options: ["Reduces list size", "Applies function cumulatively to items", "Removes duplicates", "Filters items"], correctAnswer: 1 },
                { id: 3, text: "What is the difference between map() and list comprehension?", options: ["No difference", "map returns iterator, comprehension returns list", "Comprehension is slower", "map is deprecated"], correctAnswer: 1 },
                { id: 4, text: "What is a partial function?", options: ["Incomplete function", "Function with some arguments pre-filled", "Half a lambda", "Broken function"], correctAnswer: 1 },
                { id: 5, text: "What module contains reduce()?", options: ["builtins", "functools", "itertools", "operator"], correctAnswer: 1 },
                { id: 6, text: "What does any() do?", options: ["Always returns True", "Returns True if any element is truthy", "Counts elements", "Returns all elements"], correctAnswer: 1 },
                { id: 7, text: "What does all() do?", options: ["Returns all items", "Returns True if all elements are truthy", "Counts True values", "Filters truthy values"], correctAnswer: 1 },
                { id: 8, text: "Can you nest lambda functions?", options: ["No", "Yes", "Only 2 levels", "Only with map"], correctAnswer: 1 },
                { id: 9, text: "What is function composition?", options: ["Combining two lists", "Passing output of one function as input to another", "Creating classes", "Importing functions"], correctAnswer: 1 },
                { id: 10, text: "What is the key difference between filter() and list comprehension with if?", options: ["No difference in result", "filter returns iterator, comprehension returns list", "comprehension is always faster", "filter modifies original"], correctAnswer: 1 },
            ]
        },
        {
            id: 'coding', title: '💻 Coding Quiz', questions: [
                { id: 1, text: "What is the output?\n\nsquare = lambda x: x ** 2\nprint(square(5))", options: ["10", "25", "5", "Error"], correctAnswer: 1 },
                { id: 2, text: "What is the output?\n\nadd = lambda a, b: a + b\nprint(add(3, 7))", options: ["37", "10", "Error", "None"], correctAnswer: 1 },
                { id: 3, text: "What is the output?\n\nnums = [1, 2, 3, 4]\nresult = list(map(lambda x: x * 2, nums))\nprint(result)", options: ["[1,2,3,4]", "[2,4,6,8]", "[1,4,9,16]", "Error"], correctAnswer: 1 },
                { id: 4, text: "What is the output?\n\nnums = [1,2,3,4,5,6]\nevens = list(filter(lambda x: x%2==0, nums))\nprint(evens)", options: ["[1,3,5]", "[2,4,6]", "[1,2,3,4,5,6]", "Error"], correctAnswer: 1 },
                { id: 5, text: "What is the output?\n\nfrom functools import reduce\nresult = reduce(lambda a, b: a + b, [1,2,3,4])\nprint(result)", options: ["[1,2,3,4]", "4", "10", "Error"], correctAnswer: 2 },
                { id: 6, text: "What is the output?\n\nwords = ['hello', 'world', 'python']\nupper = list(map(str.upper, words))\nprint(upper[2])", options: ["python", "PYTHON", "Python", "Error"], correctAnswer: 1 },
                { id: 7, text: "What is the output?\n\nnums = [0, 1, '', 'hello', None, 42]\ntruthy = list(filter(None, nums))\nprint(len(truthy))", options: ["6", "4", "3", "2"], correctAnswer: 2 },
                { id: 8, text: "What is the output?\n\nfrom functools import reduce\nresult = reduce(lambda a,b: a*b, range(1,6))\nprint(result)", options: ["15", "120", "720", "Error"], correctAnswer: 1 },
                { id: 9, text: "What is the output?\n\npairs = [(1,'b'), (3,'a'), (2,'c')]\nsorted_pairs = sorted(pairs, key=lambda x: x[1])\nprint(sorted_pairs[0])", options: ["(1,'b')", "(3,'a')", "(2,'c')", "Error"], correctAnswer: 1 },
                { id: 10, text: "What is the output?\n\nfrom functools import reduce\nnums = [3, 1, 4, 1, 5, 9]\nresult = reduce(lambda a,b: a if a > b else b, nums)\neven_squares = list(map(lambda x: x**2, filter(lambda x: x%2==0, nums)))\nprint(result, even_squares)", options: ["9 [16]", "9 [4]", "5 [16]", "Error"], correctAnswer: 0 },
            ]
        },
    ],

    'py-15': [
        {
            id: 'intermediate', title: '📙 Intermediate Challenge', questions: [
                { id: 1, text: "What is broadcasting in NumPy?", options: ["Sending data", "Operating on arrays of different shapes", "Printing arrays", "Copying arrays"], correctAnswer: 1 },
                { id: 2, text: "What is the difference between a view and a copy?", options: ["Same thing", "View shares memory, copy is independent", "Copy shares memory", "Neither shares memory"], correctAnswer: 1 },
                { id: 3, text: "What does np.arange() do?", options: ["Creates array of ones", "Creates array with evenly spaced values", "Sorts an array", "Reshapes an array"], correctAnswer: 1 },
                { id: 4, text: "What is vectorization?", options: ["Creating vectors", "Operating on entire arrays without loops", "Converting to lists", "Plotting data"], correctAnswer: 1 },
                { id: 5, text: "What does np.concatenate() do?", options: ["Splits arrays", "Joins arrays along an axis", "Creates new array", "Deletes arrays"], correctAnswer: 1 },
                { id: 6, text: "What is the dtype attribute?", options: ["Data name", "Data type of array elements", "Array dimension", "Array length"], correctAnswer: 1 },
                { id: 7, text: "How to create a 3x3 identity matrix?", options: ["np.identity(3)", "np.eye(3)", "Both A and B", "np.unit(3)"], correctAnswer: 2 },
                { id: 8, text: "What does np.where() do?", options: ["Finds position", "Returns elements based on condition", "Sorts by condition", "Filters NaN"], correctAnswer: 1 },
                { id: 9, text: "What is fancy indexing?", options: ["Pretty printing", "Indexing with arrays of indices", "String indexing", "Reverse indexing"], correctAnswer: 1 },
                { id: 10, text: "What is the difference between np.dot() and @ operator?", options: ["No difference for matrix multiplication", "dot is element-wise", "@ is element-wise", "They are unrelated"], correctAnswer: 0 },
            ]
        },
        {
            id: 'coding', title: '💻 Coding Quiz', questions: [
                { id: 1, text: "What is the output?\n\nimport numpy as np\na = np.array([1, 2, 3])\nprint(a.shape)", options: ["(3,)", "(1, 3)", "[3]", "3"], correctAnswer: 0 },
                { id: 2, text: "What is the output?\n\nimport numpy as np\na = np.zeros(3)\nprint(a)", options: ["[0, 0, 0]", "[0. 0. 0.]", "[None, None, None]", "Error"], correctAnswer: 1 },
                { id: 3, text: "What is the output?\n\nimport numpy as np\na = np.array([1, 2, 3])\nprint(a * 2)", options: ["[1, 2, 3, 1, 2, 3]", "[2 4 6]", "[2, 4, 6]", "Error"], correctAnswer: 1 },
                { id: 4, text: "What is the output?\n\nimport numpy as np\na = np.array([10, 20, 30, 40])\nprint(a[1:3])", options: ["[10 20 30]", "[20 30]", "[20 30 40]", "[10 20]"], correctAnswer: 1 },
                { id: 5, text: "What is the output?\n\nimport numpy as np\na = np.arange(6).reshape(2, 3)\nprint(a.shape)", options: ["(6,)", "(2, 3)", "(3, 2)", "Error"], correctAnswer: 1 },
                { id: 6, text: "What is the output?\n\nimport numpy as np\na = np.array([3, 1, 4, 1, 5])\nprint(np.mean(a))", options: ["2.8", "3", "1", "14"], correctAnswer: 0 },
                { id: 7, text: "What is the output?\n\nimport numpy as np\na = np.array([1, 2, 3])\nb = np.array([4, 5, 6])\nprint(np.dot(a, b))", options: ["[4, 10, 18]", "32", "[5, 7, 9]", "Error"], correctAnswer: 1 },
                { id: 8, text: "What is the output?\n\nimport numpy as np\na = np.array([[1,2],[3,4]])\nprint(a.T)", options: ["[[1,2],[3,4]]", "[[1,3],[2,4]]", "[[4,3],[2,1]]", "Error"], correctAnswer: 1 },
                { id: 9, text: "What is the output?\n\nimport numpy as np\na = np.array([1, 2, 3, 4, 5])\nmask = a > 3\nprint(a[mask])", options: ["[True, True]", "[4 5]", "[1 2 3]", "Error"], correctAnswer: 1 },
                { id: 10, text: "What is the output?\n\nimport numpy as np\na = np.array([[1,2,3],[4,5,6]])\nprint(np.sum(a, axis=0))", options: ["[6 15]", "[5 7 9]", "21", "[[1,2,3],[4,5,6]]"], correctAnswer: 1 },
            ]
        },
    ],

    'py-16': [
        {
            id: 'intermediate', title: '📙 Intermediate Challenge', questions: [
                { id: 1, text: "What is the difference between loc and iloc?", options: ["Same thing", "loc uses labels, iloc uses integer positions", "iloc uses labels", "Neither accesses rows"], correctAnswer: 1 },
                { id: 2, text: "What does df.apply() do?", options: ["Applies CSS", "Applies a function along an axis", "Approves changes", "Appends data"], correctAnswer: 1 },
                { id: 3, text: "What is a MultiIndex?", options: ["Multiple DataFrames", "Hierarchical indexing with multiple levels", "Multiple columns", "A backup index"], correctAnswer: 1 },
                { id: 4, text: "What does pd.concat() vs pd.merge() do?", options: ["Same thing", "concat stacks, merge joins on keys", "merge stacks, concat joins", "Neither combines DataFrames"], correctAnswer: 1 },
                { id: 5, text: "What is method chaining in Pandas?", options: ["Linking methods", "Calling multiple methods in sequence on same object", "Creating chains", "Method inheritance"], correctAnswer: 1 },
                { id: 6, text: "How to handle duplicate rows?", options: ["ignore()", "drop_duplicates()", "remove()", "clean()"], correctAnswer: 1 },
                { id: 7, text: "What does df.pivot_table() do?", options: ["Rotates the table", "Creates summary statistics grouped by categories", "Deletes columns", "Sorts data"], correctAnswer: 1 },
                { id: 8, text: "What is the difference between dropna() and fillna()?", options: ["Same thing", "dropna removes, fillna replaces missing values", "fillna removes", "dropna replaces"], correctAnswer: 1 },
                { id: 9, text: "What does df.agg() allow?", options: ["Adding rows", "Applying multiple aggregation functions at once", "Aggregating files", "Nothing"], correctAnswer: 1 },
                { id: 10, text: "What is vectorized string operations in Pandas?", options: ["String encryption", "Using .str accessor for element-wise string ops", "Converting to vectors", "Printing strings"], correctAnswer: 1 },
            ]
        },
        {
            id: 'coding', title: '💻 Coding Quiz', questions: [
                { id: 1, text: "What is the output?\n\nimport pandas as pd\ndf = pd.DataFrame({'A': [1,2,3]})\nprint(df.shape)", options: ["(3,)", "(3, 1)", "(1, 3)", "3"], correctAnswer: 1 },
                { id: 2, text: "What is the output?\n\nimport pandas as pd\ndf = pd.DataFrame({'A': [1,2,3], 'B': [4,5,6]})\nprint(df['A'].sum())", options: ["6", "15", "[1,2,3]", "Error"], correctAnswer: 0 },
                { id: 3, text: "What is the output?\n\nimport pandas as pd\ns = pd.Series([10, 20, 30])\nprint(s.mean())", options: ["10", "20.0", "30", "60"], correctAnswer: 1 },
                { id: 4, text: "What is the output?\n\nimport pandas as pd\ndf = pd.DataFrame({'A': [1,2,3], 'B': [4,5,6]})\nprint(len(df.columns))", options: ["3", "2", "6", "1"], correctAnswer: 1 },
                { id: 5, text: "What is the output?\n\nimport pandas as pd\ndf = pd.DataFrame({'A': [1,None,3], 'B': [4,5,None]})\nprint(df.isnull().sum().sum())", options: ["0", "1", "2", "3"], correctAnswer: 2 },
                { id: 6, text: "What is the output?\n\nimport pandas as pd\ndf = pd.DataFrame({'A': [1,2,2,3], 'B': [4,5,5,6]})\nresult = df.drop_duplicates()\nprint(len(result))", options: ["4", "3", "2", "1"], correctAnswer: 1 },
                { id: 7, text: "What is the output?\n\nimport pandas as pd\ndf = pd.DataFrame({'A': [3,1,2]})\ndf_sorted = df.sort_values('A')\nprint(df_sorted['A'].tolist())", options: ["[3, 1, 2]", "[1, 2, 3]", "[3, 2, 1]", "Error"], correctAnswer: 1 },
                { id: 8, text: "What is the output?\n\nimport pandas as pd\ndf = pd.DataFrame({'Name': ['A','B','A','B'], 'Score': [10,20,30,40]})\nresult = df.groupby('Name')['Score'].mean()\nprint(result['A'])", options: ["10", "20.0", "30", "40"], correctAnswer: 1 },
                { id: 9, text: "What is the output?\n\nimport pandas as pd\ndf = pd.DataFrame({'A': [1,2,3,4,5]})\nfiltered = df[df['A'] > 3]\nprint(filtered['A'].tolist())", options: ["[1,2,3]", "[3,4,5]", "[4,5]", "[4, 5]"], correctAnswer: 3 },
                { id: 10, text: "What is the output?\n\nimport pandas as pd\ndf = pd.DataFrame({'A': [1,2,3], 'B': ['x','y','z']})\ndf['C'] = df['A'].apply(lambda x: x ** 2)\nprint(df['C'].tolist())", options: ["[1, 2, 3]", "[2, 4, 6]", "[1, 4, 9]", "Error"], correctAnswer: 2 },
            ]
        },
    ],

    'py-17': [
        {
            id: 'intermediate', title: '📙 Intermediate Challenge', questions: [
                { id: 1, text: "What is the difference between plt.plot() and ax.plot()?", options: ["Same thing", "plt uses global state, ax is object-oriented", "ax is deprecated", "plt is object-oriented"], correctAnswer: 1 },
                { id: 2, text: "What is a figure vs axes in Matplotlib?", options: ["Same thing", "Figure is the window, axes is the plot area", "Axes is the window", "Figure is one plot"], correctAnswer: 1 },
                { id: 3, text: "How to create multiple subplots?", options: ["plt.multi()", "plt.subplots(rows, cols)", "plt.grid()", "plt.many()"], correctAnswer: 1 },
                { id: 4, text: "What does tight_layout() do?", options: ["Makes plots tight", "Automatically adjusts spacing to prevent overlap", "Reduces figure size", "Compresses data"], correctAnswer: 1 },
                { id: 5, text: "What is the difference between plt.show() and plt.savefig()?", options: ["Same thing", "show displays, savefig saves to file", "savefig displays", "show saves"], correctAnswer: 1 },
                { id: 6, text: "How to set axis limits?", options: ["plt.range()", "plt.xlim() / plt.ylim()", "plt.axis_range()", "plt.bounds()"], correctAnswer: 1 },
                { id: 7, text: "What is a colormap?", options: ["A map of colors", "Mapping of data values to colors", "Color picker tool", "A legend"], correctAnswer: 1 },
                { id: 8, text: "What does plt.legend() display?", options: ["Title", "Labels for each plotted data series", "Axis labels", "Grid lines"], correctAnswer: 1 },
                { id: 9, text: "What format is best for high-quality publication figures?", options: ["JPEG", "PNG", "SVG/PDF (vector formats)", "GIF"], correctAnswer: 2 },
                { id: 10, text: "What is Seaborn's relationship to Matplotlib?", options: ["Replacement", "Built on top of Matplotlib with higher-level API", "Unrelated", "Older version"], correctAnswer: 1 },
            ]
        },
        {
            id: 'coding', title: '💻 Coding Quiz', questions: [
                { id: 1, text: "Which code creates a basic line plot?\n\nA) plt.plot([1,2,3]); plt.show()\nB) plt.draw([1,2,3])\nC) plt.line([1,2,3])\nD) plt.chart([1,2,3])", options: ["A", "B", "C", "D"], correctAnswer: 0 },
                { id: 2, text: "Which code adds a title to the plot?\n\nA) plt.name('My Chart')\nB) plt.title('My Chart')\nC) plt.header('My Chart')\nD) plt.top('My Chart')", options: ["A", "B", "C", "D"], correctAnswer: 1 },
                { id: 3, text: "What does this code create?\n\nplt.bar(['A','B','C'], [10,20,30])\nplt.show()", options: ["Line chart", "Bar chart", "Scatter plot", "Pie chart"], correctAnswer: 1 },
                { id: 4, text: "What does this code create?\n\nplt.scatter([1,2,3,4], [10,20,25,30])\nplt.xlabel('X')\nplt.ylabel('Y')\nplt.show()", options: ["Line chart with labels", "Scatter plot with axis labels", "Bar chart", "Histogram"], correctAnswer: 1 },
                { id: 5, text: "What does this code do?\n\nfig, axes = plt.subplots(1, 2)\naxes[0].plot([1,2,3])\naxes[1].bar(['A','B'], [5,10])\nplt.show()", options: ["Creates 2 stacked plots", "Creates 2 side-by-side plots", "Creates 1 combined plot", "Error"], correctAnswer: 1 },
                { id: 6, text: "What does this code save the figure as?\n\nplt.plot([1,2,3], [4,5,6])\nplt.savefig('plot.png', dpi=300)", options: ["Low quality JPEG", "High resolution PNG file", "SVG file", "Nothing"], correctAnswer: 1 },
                { id: 7, text: "What does this code create?\n\nimport numpy as np\nx = np.random.randn(1000)\nplt.hist(x, bins=30)\nplt.title('Distribution')\nplt.show()", options: ["Bar chart", "Scatter plot", "Histogram of random data", "Line chart"], correctAnswer: 2 },
                { id: 8, text: "What does this code display?\n\nsizes = [30, 25, 25, 20]\nlabels = ['A', 'B', 'C', 'D']\nplt.pie(sizes, labels=labels, autopct='%1.1f%%')\nplt.show()", options: ["Bar chart with percentages", "Pie chart with labels and percentages", "Donut chart", "Stacked bar chart"], correctAnswer: 1 },
                { id: 9, text: "What does this code do?\n\nfig, ax = plt.subplots()\nax.plot([1,2,3], label='Line 1')\nax.plot([3,2,1], label='Line 2')\nax.legend()\nax.set_title('Comparison')\nplt.show()", options: ["Shows 2 separate charts", "Shows 2 lines on same plot with legend", "Shows a bar chart", "Error: can't plot twice"], correctAnswer: 1 },
                { id: 10, text: "What will this code produce?\n\nimport numpy as np\nx = np.linspace(0, 2*np.pi, 100)\nfig, (ax1, ax2) = plt.subplots(2, 1, figsize=(8,6))\nax1.plot(x, np.sin(x), 'r-')\nax1.set_title('Sine')\nax2.plot(x, np.cos(x), 'b--')\nax2.set_title('Cosine')\nplt.tight_layout()\nplt.show()", options: ["One plot with sin and cos", "Two vertically stacked plots: red sine and blue dashed cosine", "Two side-by-side plots", "Error"], correctAnswer: 1 },
            ]
        },
    ],

};
