import { CodingChallenge } from './types';

export const PYTHON_CODING_CHALLENGES: Record<string, CodingChallenge[]> = {

    'py-0': [
        {
            id: 1, title: 'Hello World', difficulty: 'Easy',
            problemStatement: 'You are building a simple greeting application. The first step is to make Python print a welcome message to the console.',
            hints: ['Use the print() function', 'Strings need to be in quotes'],
            task: 'Write a program that prints "Hello, World!" to the console.',
            starterCode: '# Write your code below\n',
            expectedOutput: 'Hello, World!'
        },
        {
            id: 2, title: 'Basic Arithmetic', difficulty: 'Easy',
            problemStatement: 'A calculator app needs arithmetic operations. Perform basic math and display the results.',
            hints: ['Use +, -, *, / operators', 'Use print() to display results'],
            task: 'Calculate and print the result of 15 + 27, then on a new line print the result of 100 - 37.',
            starterCode: '# Calculate and print results\n',
            expectedOutput: '42\n63'
        },
        {
            id: 3, title: 'Variable Assignment', difficulty: 'Easy',
            problemStatement: 'You need to store student information in variables and display them in a formatted way.',
            hints: ['Assign values using =', 'Use f-strings for formatting: f"text {variable}"'],
            task: 'Create variables name="Alice" and age=20, then print "Alice is 20 years old".',
            starterCode: '# Create variables and print formatted output\nname = \nage = \n',
            expectedOutput: 'Alice is 20 years old'
        },
        {
            id: 4, title: 'String Operations', difficulty: 'Medium',
            problemStatement: 'A text processing tool needs to manipulate strings — convert case and extract parts of text.',
            hints: ['Use .upper() and .lower() methods', 'Use slicing with [start:end]', 'len() gives the length'],
            task: 'Given text="Python Programming", print it in uppercase, then print the first 6 characters, then print the length.',
            starterCode: 'text = "Python Programming"\n# Print uppercase\n# Print first 6 characters\n# Print length\n',
            expectedOutput: 'PYTHON PROGRAMMING\nPython\n18'
        },
        {
            id: 5, title: 'Type Conversion & Input', difficulty: 'Hard',
            problemStatement: 'Build a mini type converter that demonstrates different type conversions and formats the output.',
            hints: ['Use int(), float(), str() for conversion', 'Use type() to check types', 'f-strings can embed expressions'],
            task: 'Convert the string "42" to an integer, add 8 to it, print the result. Then convert 3.14 to int, print it. Finally print the type of True.',
            starterCode: '# String to int conversion\nnum_str = "42"\n\n# Float to int\npi = 3.14\n\n# Type of boolean\n',
            expectedOutput: "50\n3\n<class 'bool'>"
        },
    ],

    'py-1': [
        {
            id: 1, title: 'Integer & Float', difficulty: 'Easy',
            problemStatement: 'Explore how Python handles different number types when you mix them in operations.',
            hints: ['Mixing int and float gives float', 'Use type() to check'],
            task: 'Print the result of 10 + 5.5, then print its type.',
            starterCode: '# Add integer and float\nresult = 10 + 5.5\n',
            expectedOutput: "15.5\n<class 'float'>"
        },
        {
            id: 2, title: 'Boolean Logic', difficulty: 'Easy',
            problemStatement: 'Build a simple truth table checker for AND and OR operations.',
            hints: ['Use and, or, not operators', 'True and False are capitalized in Python'],
            task: 'Print the result of: True and False, True or False, not True — each on a new line.',
            starterCode: '# Boolean operations\n',
            expectedOutput: 'False\nTrue\nFalse'
        },
        {
            id: 3, title: 'List Basics', difficulty: 'Easy',
            problemStatement: 'Create a list of fruits and demonstrate basic list operations.',
            hints: ['Lists use square brackets []', 'append() adds to end', 'len() gives length'],
            task: 'Create a list fruits=["apple","banana","cherry"]. Print it. Append "date". Print the length.',
            starterCode: 'fruits = ["apple", "banana", "cherry"]\n',
            expectedOutput: "['apple', 'banana', 'cherry']\n4"
        },
        {
            id: 4, title: 'Dictionary Operations', difficulty: 'Medium',
            problemStatement: 'Build a simple student record using a dictionary and access its data.',
            hints: ['Dicts use curly braces {}', 'Access with dict[key]', '.keys() returns all keys'],
            task: 'Create student={"name":"Bob","age":21,"grade":"A"}. Print the name, then print all keys as a list.',
            starterCode: 'student = {"name": "Bob", "age": 21, "grade": "A"}\n',
            expectedOutput: "Bob\n['name', 'age', 'grade']"
        },
        {
            id: 5, title: 'Type Juggling', difficulty: 'Hard',
            problemStatement: 'Demonstrate Python\'s dynamic typing and type conversion chains.',
            hints: ['Variables can change type', 'bool(0) is False, bool(1) is True', 'str() converts anything to string'],
            task: 'Print bool(0), bool(""), bool("hello"), bool([]) — each on its own line. Then print int(True) + int(False).',
            starterCode: '# Truthiness of different types\n\n# Integer value of booleans\n',
            expectedOutput: 'False\nFalse\nTrue\nFalse\n1'
        },
    ],

    'py-2': [
        {
            id: 1, title: 'Simple For Loop', difficulty: 'Easy',
            problemStatement: 'Print numbers 1 through 5 using a for loop.',
            hints: ['range(1, 6) gives 1,2,3,4,5', 'Use for i in range()'],
            task: 'Use a for loop to print numbers 1 to 5, each on a new line.',
            starterCode: '# Print 1 to 5\n',
            expectedOutput: '1\n2\n3\n4\n5'
        },
        {
            id: 2, title: 'While Loop Counter', difficulty: 'Easy',
            problemStatement: 'Use a while loop to count down from 5 to 1.',
            hints: ['Initialize counter before loop', 'Decrease counter inside loop', 'Loop while counter > 0'],
            task: 'Use a while loop to print a countdown from 5 to 1.',
            starterCode: 'count = 5\n# Write while loop\n',
            expectedOutput: '5\n4\n3\n2\n1'
        },
        {
            id: 3, title: 'Sum of Numbers', difficulty: 'Easy',
            problemStatement: 'Calculate the sum of all numbers from 1 to 10 using a loop.',
            hints: ['Initialize total = 0', 'Add each number in the loop', 'Print total after loop'],
            task: 'Use a for loop to calculate and print the sum of numbers 1 to 10.',
            starterCode: 'total = 0\n# Sum numbers 1 to 10\n',
            expectedOutput: '55'
        },
        {
            id: 4, title: 'Even Numbers Filter', difficulty: 'Medium',
            problemStatement: 'Filter and collect even numbers from a range using a loop with a condition.',
            hints: ['Use % 2 == 0 to check even', 'Use continue or if to filter', 'Collect in a list or print directly'],
            task: 'Print all even numbers from 1 to 20, separated by spaces on one line.',
            starterCode: '# Print even numbers from 1 to 20\n',
            expectedOutput: '2 4 6 8 10 12 14 16 18 20'
        },
        {
            id: 5, title: 'Multiplication Table', difficulty: 'Hard',
            problemStatement: 'Generate a multiplication table using nested loops.',
            hints: ['Use nested for loops', 'Use end=" " in print for same line', 'Print newline after inner loop'],
            task: 'Print a 3x3 multiplication table (1-3). Each row on a new line, values separated by tabs.',
            starterCode: '# 3x3 multiplication table\nfor i in range(1, 4):\n    # inner loop\n    pass\n',
            expectedOutput: '1\t2\t3\n2\t4\t6\n3\t6\t9'
        },
    ],

    'py-3': [
        {
            id: 1, title: 'Simple Function', difficulty: 'Easy',
            problemStatement: 'Create a greeting function that takes a name and returns a personalized message.',
            hints: ['Use def keyword', 'Use return to send back value', 'Call function with argument'],
            task: 'Define a function greet(name) that returns "Hello, {name}!". Call it with "Alice" and print the result.',
            starterCode: '# Define greet function\n\n# Call and print\n',
            expectedOutput: 'Hello, Alice!'
        },
        {
            id: 2, title: 'Calculator Function', difficulty: 'Easy',
            problemStatement: 'Build a function that performs basic arithmetic operations.',
            hints: ['Function can take multiple parameters', 'Use return statement'],
            task: 'Define add(a, b) that returns a+b. Print add(15, 27) and add(100, -37).',
            starterCode: '# Define add function\n\n# Test it\n',
            expectedOutput: '42\n63'
        },
        {
            id: 3, title: 'Default Parameters', difficulty: 'Medium',
            problemStatement: 'Create a function with default parameter values for flexible usage.',
            hints: ['Default params: def func(x, y=default)', 'Default is used when argument not provided'],
            task: 'Define power(base, exp=2) that returns base**exp. Print power(3), power(2, 10), power(5, 3).',
            starterCode: '# Define power function with default exponent\n\n# Test calls\n',
            expectedOutput: '9\n1024\n125'
        },
        {
            id: 4, title: 'Variable Arguments', difficulty: 'Medium',
            problemStatement: 'Create a function that accepts any number of arguments using *args.',
            hints: ['*args collects positional arguments as tuple', 'Use sum() on args', 'len() gives count'],
            task: 'Define stats(*nums) that prints the sum and count of arguments. Call stats(10, 20, 30, 40).',
            starterCode: '# Define stats function with *args\n\n# Call it\n',
            expectedOutput: 'Sum: 100\nCount: 4'
        },
        {
            id: 5, title: 'Recursive Function', difficulty: 'Hard',
            problemStatement: 'Implement the Fibonacci sequence using recursion and iteration comparison.',
            hints: ['Fibonacci: fib(n) = fib(n-1) + fib(n-2)', 'Base cases: fib(0)=0, fib(1)=1', 'Use a loop to print sequence'],
            task: 'Define fib(n) recursively. Print the first 8 Fibonacci numbers (0 through 7) separated by spaces.',
            starterCode: '# Define recursive fibonacci\ndef fib(n):\n    pass\n\n# Print first 8 numbers\n',
            expectedOutput: '0 1 1 2 3 5 8 13'
        },
    ],

    'py-4': [
        {
            id: 1, title: 'List Manipulation', difficulty: 'Easy',
            problemStatement: 'Perform basic list operations: add, remove, and access elements.',
            hints: ['append() adds to end', 'pop() removes last', 'Access by index: list[i]'],
            task: 'Create nums=[1,2,3]. Append 4. Pop the last element. Print the list, then print the popped value.',
            starterCode: 'nums = [1, 2, 3]\n',
            expectedOutput: '[1, 2, 3]\n4'
        },
        {
            id: 2, title: 'List Slicing', difficulty: 'Easy',
            problemStatement: 'Extract specific portions of a list using slicing.',
            hints: ['list[start:end] excludes end', 'Negative index counts from end', 'list[::-1] reverses'],
            task: 'Given nums=[10,20,30,40,50]. Print first 3 elements. Print last 2 elements. Print reversed list.',
            starterCode: 'nums = [10, 20, 30, 40, 50]\n',
            expectedOutput: '[10, 20, 30]\n[40, 50]\n[50, 40, 30, 20, 10]'
        },
        {
            id: 3, title: 'List Comprehension', difficulty: 'Medium',
            problemStatement: 'Use list comprehensions to create lists in a concise, Pythonic way.',
            hints: ['Syntax: [expr for item in iterable]', 'Add if clause to filter', 'Can nest comprehensions'],
            task: 'Create squares of 1-5 using comprehension, print it. Create evens from 1-10, print it.',
            starterCode: '# Squares of 1-5\n\n# Even numbers 1-10\n',
            expectedOutput: '[1, 4, 9, 16, 25]\n[2, 4, 6, 8, 10]'
        },
        {
            id: 4, title: 'Sorting & Filtering', difficulty: 'Medium',
            problemStatement: 'Sort a list of scores and filter out failing grades.',
            hints: ['sorted() returns new list', 'Use list comprehension with if', 'Use key parameter for custom sort'],
            task: 'Given scores=[85,42,91,67,38,73,95]. Sort ascending and print. Then print only passing scores (>=50).',
            starterCode: 'scores = [85, 42, 91, 67, 38, 73, 95]\n',
            expectedOutput: '[38, 42, 67, 73, 85, 91, 95]\n[85, 91, 67, 73, 95]'
        },
        {
            id: 5, title: 'Matrix Operations', difficulty: 'Hard',
            problemStatement: 'Work with 2D lists (matrices) — create, access, and transform them.',
            hints: ['2D list: [[row1], [row2]]', 'Access: matrix[row][col]', 'Flatten with nested comprehension'],
            task: 'Create matrix=[[1,2,3],[4,5,6],[7,8,9]]. Print element at row 1, col 2. Flatten to 1D list and print it.',
            starterCode: 'matrix = [[1,2,3],[4,5,6],[7,8,9]]\n',
            expectedOutput: '6\n[1, 2, 3, 4, 5, 6, 7, 8, 9]'
        },
    ],

    'py-5': [
        {
            id: 1, title: 'Dictionary Basics', difficulty: 'Easy',
            problemStatement: 'Create and access data in a dictionary.',
            hints: ['Access with dict[key]', 'Add: dict[key] = value', 'Use .get(key, default) for safe access'],
            task: 'Create person={"name":"Alice","age":25}. Print the name. Add "city":"NYC". Print the full dict.',
            starterCode: 'person = {"name": "Alice", "age": 25}\n',
            expectedOutput: "Alice\n{'name': 'Alice', 'age': 25, 'city': 'NYC'}"
        },
        {
            id: 2, title: 'Dictionary Iteration', difficulty: 'Easy',
            problemStatement: 'Iterate over dictionary keys, values, and items.',
            hints: ['.keys() for keys', '.values() for values', '.items() for key-value pairs'],
            task: 'Given scores={"math":90,"science":85,"english":78}. Print each subject and score as "subject: score".',
            starterCode: 'scores = {"math": 90, "science": 85, "english": 78}\n',
            expectedOutput: 'math: 90\nscience: 85\nenglish: 78'
        },
        {
            id: 3, title: 'Word Counter', difficulty: 'Medium',
            problemStatement: 'Count word frequency in a sentence using a dictionary.',
            hints: ['Split sentence with .split()', 'Use dict.get(word, 0) + 1', 'Or use dict comprehension'],
            task: 'Count words in "the cat sat on the mat". Print the count for "the".',
            starterCode: 'sentence = "the cat sat on the mat"\n# Count words\n',
            expectedOutput: '2'
        },
        {
            id: 4, title: 'Nested Dictionary', difficulty: 'Medium',
            problemStatement: 'Work with nested dictionaries representing structured data.',
            hints: ['Access nested: dict[key1][key2]', 'Loop through nested structure'],
            task: 'Create students={"Alice":{"grade":"A","score":95},"Bob":{"grade":"B","score":82}}. Print Alice\'s score, then Bob\'s grade.',
            starterCode: 'students = {\n    "Alice": {"grade": "A", "score": 95},\n    "Bob": {"grade": "B", "score": 82}\n}\n',
            expectedOutput: '95\nB'
        },
        {
            id: 5, title: 'Dictionary Comprehension', difficulty: 'Hard',
            problemStatement: 'Transform data using dictionary comprehensions and merge operations.',
            hints: ['{k:v for k,v in iterable}', 'Use dict.update() to merge', 'Can filter with if clause'],
            task: 'Create a dict of squares {1:1, 2:4, ...5:25} using comprehension, print it. Then filter only even keys and print.',
            starterCode: '# Squares dict\n\n# Even keys only\n',
            expectedOutput: '{1: 1, 2: 4, 3: 9, 4: 16, 5: 25}\n{2: 4, 4: 16}'
        },
    ],

    'py-6': [
        {
            id: 1, title: 'Write to File', difficulty: 'Easy',
            problemStatement: 'Write text content to a file and verify it was written correctly.',
            hints: ['Use open(file, "w") to write', 'Use with statement for auto-close', 'Read it back to verify'],
            task: 'Write "Hello, File!" to "output.txt", then read it back and print the content.',
            starterCode: '# Write to file\n\n# Read and print\n',
            expectedOutput: 'Hello, File!'
        },
        {
            id: 2, title: 'Read Lines', difficulty: 'Easy',
            problemStatement: 'Read a file line by line and process each line.',
            hints: ['Use readlines() to get list of lines', 'strip() removes newline', 'Iterate with for loop'],
            task: 'Write 3 lines ("Line 1", "Line 2", "Line 3") to a file, then read and print each line (stripped).',
            starterCode: '# Write lines\nwith open("data.txt", "w") as f:\n    f.write("Line 1\\nLine 2\\nLine 3\\n")\n\n# Read and print each line\n',
            expectedOutput: 'Line 1\nLine 2\nLine 3'
        },
        {
            id: 3, title: 'Append Mode', difficulty: 'Medium',
            problemStatement: 'Use append mode to add data to an existing file without overwriting.',
            hints: ['Use "a" mode to append', '"w" mode overwrites', 'Read after to verify'],
            task: 'Write "First" to test.txt. Append " Second" to it. Read and print the full content.',
            starterCode: '# Write first part\n\n# Append second part\n\n# Read and print\n',
            expectedOutput: 'First Second'
        },
        {
            id: 4, title: 'CSV-like Processing', difficulty: 'Medium',
            problemStatement: 'Process comma-separated data from a file.',
            hints: ['Split lines with .split(",")', 'Strip whitespace', 'Can use list comprehension'],
            task: 'Write "Alice,90\\nBob,85\\nCharlie,92" to grades.csv. Read it and print each name with score.',
            starterCode: '# Write CSV data\nwith open("grades.csv", "w") as f:\n    f.write("Alice,90\\nBob,85\\nCharlie,92")\n\n# Read and process\n',
            expectedOutput: 'Alice: 90\nBob: 85\nCharlie: 92'
        },
        {
            id: 5, title: 'JSON File Handling', difficulty: 'Hard',
            problemStatement: 'Save and load structured data using JSON format.',
            hints: ['import json', 'json.dump(data, file) to save', 'json.load(file) to read', 'json.dumps() for string'],
            task: 'Save {"name":"Alice","scores":[90,85,92]} to data.json. Load it back and print the average score.',
            starterCode: 'import json\n\ndata = {"name": "Alice", "scores": [90, 85, 92]}\n# Save to JSON\n\n# Load and calculate average\n',
            expectedOutput: '89.0'
        },
    ],

    'py-7': [
        {
            id: 1, title: 'Using math Module', difficulty: 'Easy',
            problemStatement: 'Import and use the math module for mathematical operations.',
            hints: ['import math', 'math.sqrt(), math.pi, math.ceil()'],
            task: 'Import math. Print the square root of 144, the value of pi rounded to 4 decimals, and ceil(4.2).',
            starterCode: 'import math\n',
            expectedOutput: '12.0\n3.1416\n5'
        },
        {
            id: 2, title: 'Random Module', difficulty: 'Easy',
            problemStatement: 'Use the random module with a fixed seed for reproducible results.',
            hints: ['random.seed() for reproducibility', 'random.randint(a,b) for integers', 'random.choice() for lists'],
            task: 'Set seed to 42. Print 3 random integers between 1 and 100.',
            starterCode: 'import random\nrandom.seed(42)\n',
            expectedOutput: '82\n15\n4'
        },
        {
            id: 3, title: 'Date & Time', difficulty: 'Medium',
            problemStatement: 'Work with the datetime module to handle dates.',
            hints: ['from datetime import date, datetime', 'date(year, month, day)', '.strftime() for formatting'],
            task: 'Create a date for Jan 15, 2024. Print it in "DD/MM/YYYY" format. Print the day name.',
            starterCode: 'from datetime import date\nd = date(2024, 1, 15)\n',
            expectedOutput: '15/01/2024\nMonday'
        },
        {
            id: 4, title: 'Collections Module', difficulty: 'Medium',
            problemStatement: 'Use Counter and defaultdict from collections module.',
            hints: ['from collections import Counter, defaultdict', 'Counter counts elements', '.most_common(n)'],
            task: 'Use Counter on "mississippi". Print the 2 most common characters as a list of tuples.',
            starterCode: 'from collections import Counter\n',
            expectedOutput: "[('i', 4), ('s', 4)]"
        },
        {
            id: 5, title: 'Custom Module Simulation', difficulty: 'Hard',
            problemStatement: 'Simulate creating and using a custom module by organizing code into functions.',
            hints: ['Define functions first', 'Call them in sequence', 'Use __name__ == "__main__" pattern'],
            task: 'Create functions: area_circle(r) and area_rect(w,h). Print area_circle(5) rounded to 2 decimals and area_rect(4,6).',
            starterCode: 'import math\n\ndef area_circle(r):\n    pass\n\ndef area_rect(w, h):\n    pass\n\n# Test\n',
            expectedOutput: '78.54\n24'
        },
    ],

    'py-8': [
        {
            id: 1, title: 'Basic Class', difficulty: 'Easy',
            problemStatement: 'Create a simple class with attributes and a method.',
            hints: ['Use class keyword', '__init__ is constructor', 'self refers to instance'],
            task: 'Create class Dog with name and breed attributes, and a bark() method that returns "{name} says Woof!". Create a dog and print bark().',
            starterCode: 'class Dog:\n    def __init__(self, name, breed):\n        pass\n    \n    def bark(self):\n        pass\n\n# Create and test\n',
            expectedOutput: 'Rex says Woof!'
        },
        {
            id: 2, title: 'Class with Methods', difficulty: 'Easy',
            problemStatement: 'Build a Rectangle class with area and perimeter methods.',
            hints: ['Store width and height in __init__', 'Area = width * height', 'Perimeter = 2*(w+h)'],
            task: 'Create Rectangle class. Create rect with width=5, height=3. Print its area and perimeter.',
            starterCode: 'class Rectangle:\n    pass\n\n# Create and test\n',
            expectedOutput: '15\n16'
        },
        {
            id: 3, title: 'Inheritance', difficulty: 'Medium',
            problemStatement: 'Use inheritance to create specialized classes from a base class.',
            hints: ['class Child(Parent)', 'super().__init__() calls parent', 'Override methods in child'],
            task: 'Create Animal with speak(). Create Dog(Animal) that returns "Woof" and Cat(Animal) that returns "Meow". Print both.',
            starterCode: 'class Animal:\n    def speak(self):\n        return "..."\n\n# Create Dog and Cat classes\n\n# Test\n',
            expectedOutput: 'Woof\nMeow'
        },
        {
            id: 4, title: 'Bank Account', difficulty: 'Medium',
            problemStatement: 'Build a BankAccount class with deposit, withdraw, and balance features.',
            hints: ['Initialize balance in __init__', 'Check sufficient funds before withdraw', 'Return self for chaining'],
            task: 'Create BankAccount(owner, balance=0). Deposit 100, withdraw 30, print balance. Try withdrawing 200 and print "Insufficient funds".',
            starterCode: 'class BankAccount:\n    pass\n\n# Test\n',
            expectedOutput: '70\nInsufficient funds'
        },
        {
            id: 5, title: 'Dunder Methods', difficulty: 'Hard',
            problemStatement: 'Implement magic methods to make custom objects work with Python operators.',
            hints: ['__str__ for print()', '__add__ for + operator', '__len__ for len()', '__eq__ for =='],
            task: 'Create Vector(x,y) with __add__ (returns new Vector) and __str__ (returns "Vector(x,y)"). Add Vector(1,2) + Vector(3,4) and print result.',
            starterCode: 'class Vector:\n    pass\n\n# Test\n',
            expectedOutput: 'Vector(4, 6)'
        },
    ],

    'py-9': [
        {
            id: 1, title: 'Basic Try-Except', difficulty: 'Easy',
            problemStatement: 'Handle a simple division-by-zero error gracefully.',
            hints: ['Use try-except block', 'ZeroDivisionError for division by zero'],
            task: 'Try dividing 10 by 0. Catch the error and print "Cannot divide by zero". Then divide 10 by 2 and print the result.',
            starterCode: '# Handle division\n',
            expectedOutput: 'Cannot divide by zero\n5.0'
        },
        {
            id: 2, title: 'Multiple Exceptions', difficulty: 'Easy',
            problemStatement: 'Handle different types of errors with specific except blocks.',
            hints: ['Multiple except blocks for different errors', 'ValueError for bad conversion', 'IndexError for bad index'],
            task: 'Try converting "hello" to int — catch ValueError and print "Bad value". Try accessing list[10] for [1,2,3] — catch IndexError and print "Bad index".',
            starterCode: '# ValueError\n\n# IndexError\n',
            expectedOutput: 'Bad value\nBad index'
        },
        {
            id: 3, title: 'Try-Except-Finally', difficulty: 'Medium',
            problemStatement: 'Use finally block to ensure cleanup code always runs.',
            hints: ['finally runs whether or not exception occurs', 'else runs only if no exception', 'Order: try-except-else-finally'],
            task: 'Try dividing 10 by 0. In except print "Error caught". In finally print "Cleanup done". Then try 10/5 with else printing the result.',
            starterCode: '# First: error case\n\n# Second: success case\n',
            expectedOutput: 'Error caught\nCleanup done\n2.0'
        },
        {
            id: 4, title: 'Custom Exception', difficulty: 'Medium',
            problemStatement: 'Create a custom exception class for domain-specific error handling.',
            hints: ['class CustomError(Exception)', 'raise CustomError("message")', 'Catch with except CustomError as e'],
            task: 'Create AgeError(Exception). Write validate_age(age) that raises AgeError if age<0 or age>150. Test with -5 and print the error message.',
            starterCode: '# Define custom exception\n\n# Validate function\n\n# Test\n',
            expectedOutput: 'Invalid age: -5'
        },
        {
            id: 5, title: 'Robust Input Processor', difficulty: 'Hard',
            problemStatement: 'Build a function that robustly processes a list of mixed data.',
            hints: ['Use try-except inside a loop', 'Continue processing after each error', 'Track successes and failures'],
            task: 'Process items=["42","hello","3.14","","7"]. Convert each to float. Print values or "Error: {item}" for failures. Print count of successes.',
            starterCode: 'items = ["42", "hello", "3.14", "", "7"]\nsuccesses = 0\n',
            expectedOutput: '42.0\nError: hello\n3.14\nError: \n7.0\n3'
        },
    ],

    'py-10': [
        {
            id: 1, title: 'Lambda Functions', difficulty: 'Easy',
            problemStatement: 'Create and use simple lambda functions for quick operations.',
            hints: ['lambda x: expression', 'Assign to variable or use inline', 'Good for short one-liners'],
            task: 'Create lambda double that doubles a number. Print double(5) and double(12).',
            starterCode: '# Lambda function\ndouble = \n',
            expectedOutput: '10\n24'
        },
        {
            id: 2, title: 'Map Function', difficulty: 'Easy',
            problemStatement: 'Transform a list using map() with a lambda function.',
            hints: ['map(function, iterable)', 'Returns iterator - wrap in list()', 'Lambda for inline function'],
            task: 'Use map to square each number in [1,2,3,4,5]. Print the result as a list.',
            starterCode: 'nums = [1, 2, 3, 4, 5]\n',
            expectedOutput: '[1, 4, 9, 16, 25]'
        },
        {
            id: 3, title: 'Filter Function', difficulty: 'Medium',
            problemStatement: 'Filter elements from a list based on a condition.',
            hints: ['filter(function, iterable)', 'Function returns True/False', 'Wrap in list()'],
            task: 'Filter ages=[12,18,25,15,30,17,21] to keep only adults (>=18). Print the result.',
            starterCode: 'ages = [12, 18, 25, 15, 30, 17, 21]\n',
            expectedOutput: '[18, 25, 30, 21]'
        },
        {
            id: 4, title: 'Reduce Function', difficulty: 'Medium',
            problemStatement: 'Use reduce to aggregate a list into a single value.',
            hints: ['from functools import reduce', 'reduce(func, iterable)', 'func takes accumulator and current'],
            task: 'Use reduce to find the product of [1,2,3,4,5]. Print the result.',
            starterCode: 'from functools import reduce\nnums = [1, 2, 3, 4, 5]\n',
            expectedOutput: '120'
        },
        {
            id: 5, title: 'Chaining Functional Tools', difficulty: 'Hard',
            problemStatement: 'Combine map, filter, and reduce to process data in a pipeline.',
            hints: ['Chain: filter → map → reduce', 'Or use nested calls', 'Process step by step for clarity'],
            task: 'Given nums=[1,2,3,4,5,6,7,8,9,10]: filter evens, square them, sum the squares. Print each step and final result.',
            starterCode: 'from functools import reduce\nnums = [1,2,3,4,5,6,7,8,9,10]\n',
            expectedOutput: '[2, 4, 6, 8, 10]\n[4, 16, 36, 64, 100]\n220'
        },
    ],

    'py-15': [
        {
            id: 1, title: 'Create Arrays', difficulty: 'Easy',
            problemStatement: 'Create NumPy arrays from lists and explore their properties.',
            hints: ['np.array() from list', '.shape for dimensions', '.dtype for data type'],
            task: 'Create array [1,2,3,4,5]. Print the array, its shape, and dtype.',
            starterCode: 'import numpy as np\narr = np.array([1, 2, 3, 4, 5])\n',
            expectedOutput: "[1 2 3 4 5]\n(5,)\nint32"
        },
        {
            id: 2, title: 'Array Operations', difficulty: 'Easy',
            problemStatement: 'Perform element-wise arithmetic operations on arrays.',
            hints: ['Arrays support +, -, *, /', 'Operations are element-wise', 'Scalar operations broadcast'],
            task: 'Create a=[1,2,3] and b=[4,5,6]. Print a+b, a*b, and a*10.',
            starterCode: 'import numpy as np\na = np.array([1, 2, 3])\nb = np.array([4, 5, 6])\n',
            expectedOutput: '[5 7 9]\n[ 4 10 18]\n[10 20 30]'
        },
        {
            id: 3, title: 'Array Slicing', difficulty: 'Medium',
            problemStatement: 'Slice and reshape arrays for data manipulation.',
            hints: ['arr[start:end]', 'arr.reshape(rows, cols)', 'np.arange() for sequences'],
            task: 'Create array 0-11, reshape to 3x4. Print the array. Print second row. Print column at index 2.',
            starterCode: 'import numpy as np\narr = np.arange(12).reshape(3, 4)\n',
            expectedOutput: '[[ 0  1  2  3]\n [ 4  5  6  7]\n [ 8  9 10 11]]\n[4 5 6 7]\n[ 2  6 10]'
        },
        {
            id: 4, title: 'Statistical Functions', difficulty: 'Medium',
            problemStatement: 'Use NumPy statistical functions to analyze data.',
            hints: ['np.mean(), np.std(), np.median()', 'np.min(), np.max()', 'axis parameter for row/column'],
            task: 'Given data=[85,92,78,95,88]. Print mean, median, std (rounded to 2 decimals), min, max.',
            starterCode: 'import numpy as np\ndata = np.array([85, 92, 78, 95, 88])\n',
            expectedOutput: '87.6\n88.0\n5.85\n78\n95'
        },
        {
            id: 5, title: 'Boolean Masking', difficulty: 'Hard',
            problemStatement: 'Use boolean indexing to filter and transform array data.',
            hints: ['condition creates boolean mask', 'arr[mask] filters', 'np.where(cond, true_val, false_val)'],
            task: 'Given scores=[45,82,67,91,55,78,43,88]. Print scores above 70. Replace below 50 with 50 using np.where and print.',
            starterCode: 'import numpy as np\nscores = np.array([45, 82, 67, 91, 55, 78, 43, 88])\n',
            expectedOutput: '[82 91 78 88]\n[50 82 67 91 55 78 50 88]'
        },
    ],

    'py-16': [
        {
            id: 1, title: 'Create DataFrame', difficulty: 'Easy',
            problemStatement: 'Create a Pandas DataFrame from a dictionary and explore it.',
            hints: ['pd.DataFrame(dict)', '.shape for dimensions', '.columns for column names'],
            task: 'Create a DataFrame with Name=["Alice","Bob","Charlie"] and Age=[25,30,35]. Print the DataFrame and its shape.',
            starterCode: 'import pandas as pd\n',
            expectedOutput: '      Name  Age\n0    Alice   25\n1      Bob   30\n2  Charlie   35\n(3, 2)'
        },
        {
            id: 2, title: 'Column Operations', difficulty: 'Easy',
            problemStatement: 'Access and create new columns in a DataFrame.',
            hints: ["df['col'] to access", "df['new'] = values to create", 'Use arithmetic on columns'],
            task: 'Create df with Price=[100,200,300] and Qty=[2,3,1]. Add Total=Price*Qty column. Print the DataFrame.',
            starterCode: 'import pandas as pd\ndf = pd.DataFrame({"Price": [100, 200, 300], "Qty": [2, 3, 1]})\n',
            expectedOutput: '   Price  Qty  Total\n0    100    2    200\n1    200    3    600\n2    300    1    300'
        },
        {
            id: 3, title: 'Filtering Data', difficulty: 'Medium',
            problemStatement: 'Filter DataFrame rows based on conditions.',
            hints: ['df[df["col"] > value]', 'Use & for AND, | for OR', 'Wrap conditions in parentheses'],
            task: 'Create df with Name, Score=[90,65,82,45,78]. Print students with score >= 70.',
            starterCode: 'import pandas as pd\ndf = pd.DataFrame({"Name": ["Alice","Bob","Charlie","David","Eve"], "Score": [90,65,82,45,78]})\n',
            expectedOutput: '      Name  Score\n0    Alice     90\n2  Charlie     82\n4      Eve     78'
        },
        {
            id: 4, title: 'GroupBy Operations', difficulty: 'Medium',
            problemStatement: 'Group data and compute aggregate statistics.',
            hints: ['.groupby("col").agg(func)', '.mean(), .sum(), .count()', 'Can use dict for multiple aggs'],
            task: 'Create df with Dept=["HR","IT","HR","IT","HR"] and Salary=[50,80,55,75,60]. Print mean salary by department.',
            starterCode: 'import pandas as pd\ndf = pd.DataFrame({"Dept": ["HR","IT","HR","IT","HR"], "Salary": [50,80,55,75,60]})\n',
            expectedOutput: '      Salary\nDept        \nHR      55.0\nIT      77.5'
        },
        {
            id: 5, title: 'Data Cleaning', difficulty: 'Hard',
            problemStatement: 'Handle missing values and duplicates in a dataset.',
            hints: ['.isnull().sum() to check', '.fillna(value) to fill', '.drop_duplicates() to remove dupes', '.dropna() to remove nulls'],
            task: 'Create df with A=[1,None,3,3,5], B=[None,2,3,3,5]. Print null counts. Fill NaN with 0. Remove duplicates. Print final df.',
            starterCode: 'import pandas as pd\nimport numpy as np\ndf = pd.DataFrame({"A": [1,np.nan,3,3,5], "B": [np.nan,2,3,3,5]})\n',
            expectedOutput: 'A    1\nB    1\ndtype: int64\n     A    B\n0  1.0  0.0\n1  0.0  2.0\n2  3.0  3.0\n4  5.0  5.0'
        },
    ],

    'py-17': [
        {
            id: 1, title: 'Basic Line Plot', difficulty: 'Easy',
            problemStatement: 'Create a simple line plot — Since this is a code editor without display, we will focus on the code structure.',
            hints: ['import matplotlib.pyplot as plt', 'plt.plot(x, y)', 'plt.savefig() to save'],
            task: 'Create x=[1,2,3,4,5] and y=[2,4,6,8,10]. Create a plot, add title "My Plot", save as "plot.png". Print "Plot saved!".',
            starterCode: 'import matplotlib\nmatplotlib.use("Agg")\nimport matplotlib.pyplot as plt\n\nx = [1, 2, 3, 4, 5]\ny = [2, 4, 6, 8, 10]\n',
            expectedOutput: 'Plot saved!'
        },
        {
            id: 2, title: 'Bar Chart', difficulty: 'Easy',
            problemStatement: 'Create a bar chart for categorical data.',
            hints: ['plt.bar(categories, values)', 'plt.xlabel(), plt.ylabel()', 'plt.title()'],
            task: 'Create a bar chart for categories=["A","B","C"] with values=[10,25,15]. Save and print "Bar chart saved!".',
            starterCode: 'import matplotlib\nmatplotlib.use("Agg")\nimport matplotlib.pyplot as plt\n\ncategories = ["A", "B", "C"]\nvalues = [10, 25, 15]\n',
            expectedOutput: 'Bar chart saved!'
        },
        {
            id: 3, title: 'Multiple Subplots', difficulty: 'Medium',
            problemStatement: 'Create a figure with multiple subplots.',
            hints: ['fig, axes = plt.subplots(rows, cols)', 'axes[i].plot()', 'plt.tight_layout()'],
            task: 'Create 1x2 subplots. Left: line plot of [1,4,9]. Right: bar chart of [3,7,2]. Save and print "Subplots saved!".',
            starterCode: 'import matplotlib\nmatplotlib.use("Agg")\nimport matplotlib.pyplot as plt\n',
            expectedOutput: 'Subplots saved!'
        },
        {
            id: 4, title: 'Statistical Plot', difficulty: 'Medium',
            problemStatement: 'Create a histogram from random data to visualize distribution.',
            hints: ['np.random.randn() for normal dist', 'plt.hist(data, bins=n)', 'Set seed for reproducibility'],
            task: 'Generate 1000 random normal values (seed=42). Print mean and std rounded to 2 decimals. Save histogram. Print "Histogram saved!".',
            starterCode: 'import matplotlib\nmatplotlib.use("Agg")\nimport matplotlib.pyplot as plt\nimport numpy as np\nnp.random.seed(42)\n',
            expectedOutput: '0.02\n0.99\nHistogram saved!'
        },
        {
            id: 5, title: 'Complete Visualization', difficulty: 'Hard',
            problemStatement: 'Create a publication-quality figure combining multiple elements.',
            hints: ['Use fig, ax = plt.subplots(figsize=(w,h))', 'ax.set_xlabel(), ax.legend()', 'plt.tight_layout()'],
            task: 'Create x=np.linspace(0,10,100). Plot sin(x) and cos(x) on same axes. Add legend, title, grid. Save and print "Complete plot saved!".',
            starterCode: 'import matplotlib\nmatplotlib.use("Agg")\nimport matplotlib.pyplot as plt\nimport numpy as np\n\nx = np.linspace(0, 10, 100)\n',
            expectedOutput: 'Complete plot saved!'
        },
    ],

};
