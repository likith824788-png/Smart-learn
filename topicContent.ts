// Extended course content for each topic
export const TOPIC_CONTENT: { [key: string]: string } = {

    // ===================== PYTHON TOPICS =====================

    'py-0': `# Python Syntax Basics

## What is Python?

Python is a high-level, interpreted, general-purpose programming language created by Guido van Rossum in 1991. It emphasizes code readability with its use of significant indentation.

### Key Features of Python
- **Easy to Learn:** Simple syntax similar to English
- **Interpreted:** Code is executed line by line
- **Dynamically Typed:** No need to declare variable types
- **Cross-Platform:** Runs on Windows, macOS, Linux
- **Extensive Libraries:** Rich ecosystem of packages

## Python Indentation

Unlike other languages that use braces \`{}\`, Python uses **indentation** (whitespace) to define code blocks.

\`\`\`python
# Correct indentation
if True:
    print("This is indented correctly")
    if True:
        print("Nested indentation")

# Incorrect - will cause IndentationError
if True:
print("This will cause an error")
\`\`\`

## Comments

Comments help explain code and are ignored during execution.

\`\`\`python
# This is a single-line comment

"""
This is a
multi-line comment
(docstring)
"""

x = 5  # Inline comment
\`\`\`

## Variables and Assignment

Variables are created when you assign a value. No declaration keyword needed.

\`\`\`python
# Variable assignment
name = "Alice"        # String
age = 25              # Integer
height = 5.6          # Float
is_student = True     # Boolean

# Multiple assignment
x, y, z = 1, 2, 3
a = b = c = 0

# Variable naming rules
my_var = 10       # Valid - snake_case (recommended)
_private = 20     # Valid - starts with underscore
myVar = 30        # Valid - camelCase
# 2var = 40       # Invalid - cannot start with number
# my-var = 50     # Invalid - no hyphens
\`\`\`

## Print Function

The \`print()\` function outputs text to the console.

\`\`\`python
print("Hello, World!")
print("Name:", name, "Age:", age)
print(f"My name is {name} and I am {age}")  # f-string
print("Value: %d" % 42)                      # % formatting
print("Value: {}".format(42))                 # .format()
\`\`\`

## Input Function

\`input()\` reads user input as a string.

\`\`\`python
name = input("Enter your name: ")
age = int(input("Enter your age: "))    # Convert to int
price = float(input("Enter price: "))   # Convert to float
print(f"Hello {name}, you are {age} years old")
\`\`\`

## Basic Operators

\`\`\`python
# Arithmetic
print(10 + 3)   # 13  Addition
print(10 - 3)   # 7   Subtraction
print(10 * 3)   # 30  Multiplication
print(10 / 3)   # 3.33 Division (float)
print(10 // 3)  # 3   Floor division
print(10 % 3)   # 1   Modulus (remainder)
print(10 ** 3)  # 1000 Exponentiation

# Comparison
print(5 == 5)   # True   Equal
print(5 != 3)   # True   Not equal
print(5 > 3)    # True   Greater than
print(5 < 3)    # False  Less than
print(5 >= 5)   # True   Greater or equal
print(5 <= 3)   # False  Less or equal

# Logical
print(True and False)   # False
print(True or False)    # True
print(not True)         # False
\`\`\`

## Type Conversion

\`\`\`python
x = "10"
y = int(x)      # String to int
z = float(x)    # String to float
s = str(100)    # Int to string
b = bool(1)     # Int to bool (True)
b2 = bool(0)    # Int to bool (False)
print(type(y))  # <class 'int'>
\`\`\``,


    'py-1': `# Variables and Data Types

## Overview

Every value in Python has a data type. Python is dynamically typed — the interpreter determines the type at runtime.

## Primitive Data Types

### Integers (int)
Whole numbers without decimal points. No size limit in Python.

\`\`\`python
age = 25
count = -100
big_number = 1_000_000  # Underscores for readability
binary = 0b1010         # Binary literal (10)
octal = 0o17            # Octal literal (15)
hexadec = 0xFF          # Hex literal (255)
print(type(age))        # <class 'int'>
\`\`\`

### Floats (float)
Numbers with decimal points or scientific notation.

\`\`\`python
price = 19.99
pi = 3.14159
scientific = 2.5e-3     # 0.0025
negative = -0.001
infinity = float('inf')
print(type(price))      # <class 'float'>

# Float precision issue
print(0.1 + 0.2)        # 0.30000000000000004
print(round(0.1 + 0.2, 1))  # 0.3
\`\`\`

### Strings (str)
Sequences of characters enclosed in quotes.

\`\`\`python
single = 'Hello'
double = "World"
multi = """This is a
multi-line string"""

# String operations
name = "Python"
print(len(name))        # 6
print(name[0])          # P
print(name[-1])         # n
print(name[1:4])        # yth (slicing)
print(name.upper())     # PYTHON
print(name.lower())     # python
print(name.replace("P", "J"))  # Jython
print("th" in name)     # True
print(name * 3)         # PythonPythonPython
print(name + " 3.12")   # Python 3.12

# String methods
text = "  Hello, World!  "
print(text.strip())       # "Hello, World!"
print(text.split(","))    # ['  Hello', ' World!  ']
print("-".join(["a","b","c"]))  # "a-b-c"
print("Hello".startswith("He"))  # True
print("Hello".endswith("lo"))    # True
print("Hello".find("ll"))       # 2
print("Hello".count("l"))       # 2
\`\`\`

### Booleans (bool)
Represent True or False values.

\`\`\`python
is_active = True
is_deleted = False
print(type(is_active))   # <class 'bool'>

# Truthy and Falsy values
print(bool(0))       # False
print(bool(""))      # False
print(bool([]))      # False
print(bool(None))    # False
print(bool(1))       # True
print(bool("text"))  # True
print(bool([1,2]))   # True
\`\`\`

### NoneType
Represents the absence of a value.

\`\`\`python
result = None
print(type(result))  # <class 'NoneType'>
print(result is None)  # True
\`\`\`

## Collection Data Types

### Lists
Ordered, mutable, allows duplicates.
\`\`\`python
fruits = ["apple", "banana", "cherry"]
mixed = [1, "two", 3.0, True]
nested = [[1,2], [3,4]]
\`\`\`

### Tuples
Ordered, immutable, allows duplicates.
\`\`\`python
coordinates = (10.0, 20.0)
single = (42,)  # Note the comma for single-element tuple
\`\`\`

### Sets
Unordered, no duplicates.
\`\`\`python
unique = {1, 2, 3, 3, 3}  # {1, 2, 3}
\`\`\`

### Dictionaries
Key-value pairs, ordered (3.7+), mutable.
\`\`\`python
person = {"name": "Alice", "age": 30}
\`\`\`

## Type Checking and Conversion

\`\`\`python
x = 42
print(type(x))           # <class 'int'>
print(isinstance(x, int))  # True

# Type conversion
int("10")     # 10
float("3.14") # 3.14
str(100)      # "100"
list("abc")   # ['a', 'b', 'c']
tuple([1,2])  # (1, 2)
set([1,1,2])  # {1, 2}
\`\`\``,


    'py-2': `# Control Flow - Loops

## For Loops

For loops iterate over a sequence (list, tuple, string, range).

\`\`\`python
# Iterating over a list
fruits = ["apple", "banana", "cherry"]
for fruit in fruits:
    print(fruit)

# Iterating over a string
for char in "Python":
    print(char)

# Using range()
for i in range(5):           # 0, 1, 2, 3, 4
    print(i)

for i in range(2, 8):        # 2, 3, 4, 5, 6, 7
    print(i)

for i in range(0, 10, 2):    # 0, 2, 4, 6, 8
    print(i)

for i in range(10, 0, -1):   # 10, 9, 8, ..., 1
    print(i)
\`\`\`

### enumerate() - Get Index and Value

\`\`\`python
colors = ["red", "green", "blue"]
for index, color in enumerate(colors):
    print(f"{index}: {color}")
# 0: red
# 1: green
# 2: blue

for i, color in enumerate(colors, start=1):
    print(f"{i}. {color}")
\`\`\`

### zip() - Iterate Multiple Sequences

\`\`\`python
names = ["Alice", "Bob", "Charlie"]
ages = [25, 30, 35]
for name, age in zip(names, ages):
    print(f"{name} is {age}")
\`\`\`

## While Loops

While loops continue as long as a condition is True.

\`\`\`python
count = 0
while count < 5:
    print(count)
    count += 1

# Infinite loop with break
while True:
    user_input = input("Type 'quit' to exit: ")
    if user_input == "quit":
        break
\`\`\`

## Loop Control Statements

### break - Exit the loop immediately
\`\`\`python
for num in range(10):
    if num == 5:
        break
    print(num)  # Prints 0, 1, 2, 3, 4
\`\`\`

### continue - Skip to next iteration
\`\`\`python
for num in range(10):
    if num % 2 == 0:
        continue
    print(num)  # Prints 1, 3, 5, 7, 9
\`\`\`

### else - Execute after loop completes normally
\`\`\`python
for i in range(5):
    print(i)
else:
    print("Loop completed!")  # Runs after loop finishes

for i in range(5):
    if i == 3:
        break
else:
    print("This won't print because of break")
\`\`\`

### pass - Placeholder (do nothing)
\`\`\`python
for i in range(5):
    pass  # Placeholder for future code
\`\`\`

## Nested Loops

\`\`\`python
# Multiplication table
for i in range(1, 4):
    for j in range(1, 4):
        print(f"{i} x {j} = {i*j}", end="  ")
    print()
# 1 x 1 = 1  1 x 2 = 2  1 x 3 = 3
# 2 x 1 = 2  2 x 2 = 4  2 x 3 = 6
# 3 x 1 = 3  3 x 2 = 6  3 x 3 = 9

# Pattern printing
for i in range(1, 6):
    print("*" * i)
# *
# **
# ***
# ****
# *****
\`\`\`

## Common Loop Patterns

\`\`\`python
# Sum of numbers
total = sum(range(1, 101))  # 5050

# Finding maximum
numbers = [34, 12, 89, 45, 67]
max_val = numbers[0]
for num in numbers:
    if num > max_val:
        max_val = num
print(max_val)  # 89

# Counting occurrences
text = "hello world"
count = 0
for char in text:
    if char == "l":
        count += 1
print(count)  # 3

# Building a list
squares = []
for x in range(10):
    squares.append(x ** 2)
print(squares)  # [0, 1, 4, 9, 16, 25, 36, 49, 64, 81]
\`\`\``,


    'py-3': `# Functions

## Defining Functions

Functions are reusable blocks of code defined using the \`def\` keyword.

\`\`\`python
def greet():
    print("Hello, World!")

greet()  # Call the function

def greet_person(name):
    print(f"Hello, {name}!")

greet_person("Alice")  # Hello, Alice!
\`\`\`

## Parameters and Arguments

### Positional Arguments
\`\`\`python
def add(a, b):
    return a + b

result = add(5, 3)  # a=5, b=3
print(result)        # 8
\`\`\`

### Default Parameters
\`\`\`python
def greet(name, greeting="Hello"):
    return f"{greeting}, {name}!"

print(greet("Alice"))           # Hello, Alice!
print(greet("Bob", "Hi"))       # Hi, Bob!
\`\`\`

### Keyword Arguments
\`\`\`python
def create_user(name, age, city):
    return {"name": name, "age": age, "city": city}

user = create_user(age=25, name="Alice", city="NYC")
print(user)  # {'name': 'Alice', 'age': 25, 'city': 'NYC'}
\`\`\`

## *args and **kwargs

### *args - Variable Positional Arguments
\`\`\`python
def sum_all(*args):
    return sum(args)

print(sum_all(1, 2, 3, 4, 5))  # 15
print(sum_all(10, 20))          # 30
\`\`\`

### **kwargs - Variable Keyword Arguments
\`\`\`python
def print_info(**kwargs):
    for key, value in kwargs.items():
        print(f"{key}: {value}")

print_info(name="Alice", age=25, city="NYC")
# name: Alice
# age: 25
# city: NYC
\`\`\`

### Combining All Types
\`\`\`python
def func(a, b, *args, **kwargs):
    print(f"a={a}, b={b}")
    print(f"args={args}")
    print(f"kwargs={kwargs}")

func(1, 2, 3, 4, x=5, y=6)
# a=1, b=2
# args=(3, 4)
# kwargs={'x': 5, 'y': 6}
\`\`\`

## Return Values

\`\`\`python
def divide(a, b):
    if b == 0:
        return None
    return a / b

# Multiple return values
def min_max(numbers):
    return min(numbers), max(numbers)

low, high = min_max([3, 1, 4, 1, 5, 9])
print(f"Min: {low}, Max: {high}")  # Min: 1, Max: 9
\`\`\`

## Lambda Functions

Small anonymous functions defined in one line.

\`\`\`python
square = lambda x: x ** 2
print(square(5))  # 25

add = lambda a, b: a + b
print(add(3, 4))  # 7

# Common use with sorted
students = [("Alice", 90), ("Bob", 75), ("Charlie", 85)]
sorted_students = sorted(students, key=lambda s: s[1], reverse=True)
print(sorted_students)
# [('Alice', 90), ('Charlie', 85), ('Bob', 75)]
\`\`\`

## Scope and Global Variables

\`\`\`python
x = "global"

def my_func():
    x = "local"       # Local variable
    print(x)           # local

my_func()
print(x)               # global

def modify_global():
    global x
    x = "modified"

modify_global()
print(x)               # modified
\`\`\`

## Recursion

A function that calls itself.

\`\`\`python
def factorial(n):
    if n <= 1:
        return 1
    return n * factorial(n - 1)

print(factorial(5))  # 120 (5*4*3*2*1)

def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

print(fibonacci(10))  # 55
\`\`\`

## Docstrings

\`\`\`python
def calculate_area(radius):
    """Calculate the area of a circle.
    
    Args:
        radius (float): The radius of the circle.
    
    Returns:
        float: The area of the circle.
    """
    import math
    return math.pi * radius ** 2

print(calculate_area.__doc__)
\`\`\``,


    'py-4': `# Lists and List Comprehension

## Creating Lists

\`\`\`python
# Empty list
empty = []
empty2 = list()

# With values
numbers = [1, 2, 3, 4, 5]
mixed = [1, "two", 3.0, True, None]
nested = [[1, 2], [3, 4], [5, 6]]
from_range = list(range(10))  # [0,1,2,...,9]
\`\`\`

## Accessing Elements

\`\`\`python
fruits = ["apple", "banana", "cherry", "date", "elderberry"]

print(fruits[0])    # apple (first)
print(fruits[-1])   # elderberry (last)
print(fruits[1:3])  # ['banana', 'cherry']
print(fruits[:3])   # ['apple', 'banana', 'cherry']
print(fruits[2:])   # ['cherry', 'date', 'elderberry']
print(fruits[::2])  # ['apple', 'cherry', 'elderberry'] (every 2nd)
print(fruits[::-1]) # Reversed list
\`\`\`

## Modifying Lists

\`\`\`python
nums = [1, 2, 3]

# Adding elements
nums.append(4)           # [1, 2, 3, 4]
nums.insert(0, 0)        # [0, 1, 2, 3, 4]
nums.extend([5, 6])      # [0, 1, 2, 3, 4, 5, 6]

# Removing elements
nums.remove(0)           # Removes first occurrence of 0
popped = nums.pop()      # Removes and returns last element
popped_at = nums.pop(1)  # Removes and returns element at index 1
del nums[0]              # Deletes element at index 0
nums.clear()             # Removes all elements

# Modifying
nums = [3, 1, 4, 1, 5]
nums[0] = 10             # [10, 1, 4, 1, 5]
nums[1:3] = [20, 30]     # [10, 20, 30, 1, 5]
\`\`\`

## List Methods

\`\`\`python
nums = [3, 1, 4, 1, 5, 9, 2, 6]

nums.sort()              # [1, 1, 2, 3, 4, 5, 6, 9] (in-place)
nums.sort(reverse=True)  # [9, 6, 5, 4, 3, 2, 1, 1]
sorted_nums = sorted(nums)  # Returns new sorted list

nums.reverse()           # Reverses in-place
nums.count(1)            # 2 (count of 1s)
nums.index(5)            # Index of first 5

# Copy
copy1 = nums.copy()
copy2 = nums[:]
copy3 = list(nums)
\`\`\`

## List Comprehension

Concise way to create lists from existing iterables.

\`\`\`python
# Basic syntax: [expression for item in iterable]
squares = [x ** 2 for x in range(10)]
# [0, 1, 4, 9, 16, 25, 36, 49, 64, 81]

# With condition
evens = [x for x in range(20) if x % 2 == 0]
# [0, 2, 4, 6, 8, 10, 12, 14, 16, 18]

# With if-else
labels = ["even" if x % 2 == 0 else "odd" for x in range(5)]
# ['even', 'odd', 'even', 'odd', 'even']

# Nested comprehension
matrix = [[i * j for j in range(1, 4)] for i in range(1, 4)]
# [[1, 2, 3], [2, 4, 6], [3, 6, 9]]

# Flatten nested list
flat = [x for row in matrix for x in row]
# [1, 2, 3, 2, 4, 6, 3, 6, 9]

# String operations
words = ["Hello", "World", "Python"]
upper = [w.upper() for w in words]
lengths = [len(w) for w in words]
\`\`\`

## Useful Built-in Functions

\`\`\`python
nums = [3, 1, 4, 1, 5, 9]

print(len(nums))     # 6
print(sum(nums))     # 23
print(max(nums))     # 9
print(min(nums))     # 1
print(sorted(nums))  # [1, 1, 3, 4, 5, 9]
print(any([0, 0, 1]))  # True
print(all([1, 1, 1]))  # True
print(2 in nums)     # False
print(list(reversed(nums)))  # [9, 5, 1, 4, 1, 3]

# Map and Filter
doubled = list(map(lambda x: x * 2, nums))
big = list(filter(lambda x: x > 3, nums))
\`\`\``,


    'py-5': `# Dictionaries

## What are Dictionaries?

Dictionaries store **key-value pairs**. Keys must be immutable (strings, numbers, tuples). Values can be any type.

\`\`\`python
# Creating dictionaries
empty = {}
empty2 = dict()

person = {
    "name": "Alice",
    "age": 30,
    "city": "New York",
    "hobbies": ["reading", "coding"]
}

# From dict() constructor
point = dict(x=10, y=20)
from_tuples = dict([("a", 1), ("b", 2)])
\`\`\`

## Accessing Values

\`\`\`python
person = {"name": "Alice", "age": 30, "city": "NYC"}

print(person["name"])         # Alice
print(person.get("age"))      # 30
print(person.get("phone", "N/A"))  # N/A (default if missing)
# person["phone"]             # KeyError!

print(person.keys())          # dict_keys(['name', 'age', 'city'])
print(person.values())        # dict_values(['Alice', 30, 'NYC'])
print(person.items())         # dict_items([('name','Alice'), ...])
\`\`\`

## Modifying Dictionaries

\`\`\`python
person = {"name": "Alice", "age": 30}

# Add or update
person["email"] = "alice@example.com"  # Add new key
person["age"] = 31                      # Update existing
person.update({"city": "NYC", "age": 32})  # Update multiple

# Removing
del person["email"]                 # Delete by key
age = person.pop("age")            # Remove and return value
last = person.popitem()            # Remove last inserted pair
person.clear()                      # Remove all
\`\`\`

## Iterating Over Dictionaries

\`\`\`python
scores = {"math": 90, "english": 85, "science": 92}

# Iterate keys
for subject in scores:
    print(subject)

# Iterate values
for score in scores.values():
    print(score)

# Iterate key-value pairs
for subject, score in scores.items():
    print(f"{subject}: {score}")
\`\`\`

## Dictionary Comprehension

\`\`\`python
# Basic
squares = {x: x**2 for x in range(6)}
# {0: 0, 1: 1, 2: 4, 3: 9, 4: 16, 5: 25}

# With condition
even_squares = {x: x**2 for x in range(10) if x % 2 == 0}

# From two lists
keys = ["name", "age", "city"]
values = ["Alice", 30, "NYC"]
person = {k: v for k, v in zip(keys, values)}

# Inverting a dictionary
original = {"a": 1, "b": 2, "c": 3}
inverted = {v: k for k, v in original.items()}
# {1: 'a', 2: 'b', 3: 'c'}
\`\`\`

## Nested Dictionaries

\`\`\`python
students = {
    "alice": {"age": 25, "grade": "A"},
    "bob": {"age": 22, "grade": "B"},
    "charlie": {"age": 23, "grade": "A"}
}

print(students["alice"]["grade"])  # A

# Add to nested
students["alice"]["email"] = "alice@school.com"

# Iterate nested
for name, info in students.items():
    print(f"{name}: Grade {info['grade']}")
\`\`\`

## Useful Methods

\`\`\`python
d = {"a": 1, "b": 2}

# setdefault - get value or set default if missing
d.setdefault("c", 3)  # Returns 3 and adds it
d.setdefault("a", 99) # Returns 1 (already exists)

# Merging (Python 3.9+)
d1 = {"a": 1, "b": 2}
d2 = {"b": 3, "c": 4}
merged = d1 | d2  # {'a': 1, 'b': 3, 'c': 4

\`\`\`
        `,

    // ===================== PYTHON TOPICS (continued) =====================



    'py-6': `# File Handling

## Opening Files

Python uses the built-in \`open()\` function to work with files.

### File Modes
| Mode | Description |
|------|-------------|
| 'r' | Read (default) - file must exist |
| 'w' | Write - creates or overwrites |
| 'a' | Append - creates or appends |
| 'x' | Exclusive create - fails if exists |
| 'b' | Binary mode |
| 'r+' | Read and write |

## Reading Files

\`\`\`python
# Method 1: read() - entire file as string
with open("example.txt", "r") as f:
    content = f.read()
    print(content)

# Method 2: readline() - one line at a time
with open("example.txt", "r") as f:
    line1 = f.readline()
    line2 = f.readline()

# Method 3: readlines() - list of lines
with open("example.txt", "r") as f:
    lines = f.readlines()

# Method 4: iterate line by line (memory efficient)
with open("example.txt", "r") as f:
    for line in f:
        print(line.strip())
\`\`\`

## Writing Files

\`\`\`python
# Write mode - creates new or overwrites existing
with open("output.txt", "w") as f:
    f.write("Hello, World!\\n")
    f.write("Second line\\n")

# Write multiple lines
lines = ["Line 1\\n", "Line 2\\n", "Line 3\\n"]
with open("output.txt", "w") as f:
    f.writelines(lines)

# Append mode - adds to existing file
with open("log.txt", "a") as f:
    f.write("New log entry\\n")
\`\`\`

## The with Statement

Always use \`with\` to automatically close files, even if an error occurs.

\`\`\`python
# GOOD: with statement (auto-close)
with open("data.txt", "r") as f:
    data = f.read()
# File is automatically closed here

# BAD: manual open/close (may leak resources)
f = open("data.txt", "r")
data = f.read()
f.close()  # Must remember to close!
\`\`\`

## Working with File Paths

\`\`\`python
import os

# Check if file exists
print(os.path.exists("myfile.txt"))

# Get file size
print(os.path.getsize("myfile.txt"))

# Join paths (cross-platform)
path = os.path.join("folder", "subfolder", "file.txt")

# Get file extension
name, ext = os.path.splitext("data.csv")
print(name, ext)  # data .csv

# List directory contents
files = os.listdir(".")
print(files)
\`\`\`

## Working with CSV Files

\`\`\`python
import csv

# Reading CSV
with open("data.csv", "r") as f:
    reader = csv.reader(f)
    header = next(reader)
    for row in reader:
        print(row)

# Writing CSV
with open("output.csv", "w", newline="") as f:
    writer = csv.writer(f)
    writer.writerow(["Name", "Age", "City"])
    writer.writerow(["Alice", 30, "NYC"])

# DictReader - read as dictionaries
with open("data.csv", "r") as f:
    reader = csv.DictReader(f)
    for row in reader:
        print(row["Name"], row["Age"])
\`\`\`

## Working with JSON Files

\`\`\`python
import json

# Writing JSON
data = {"name": "Alice", "age": 30, "scores": [90, 85, 92]}
with open("data.json", "w") as f:
    json.dump(data, f, indent=4)

# Reading JSON
with open("data.json", "r") as f:
    loaded = json.load(f)
    print(loaded["name"])

# JSON string conversion
json_str = json.dumps(data)
parsed = json.loads(json_str)
\`\`\``,


    'py-7': `# Modules and Packages

## What is a Module?

A module is a Python file (.py) containing functions, classes, and variables that can be reused in other programs.

\`\`\`python
# Importing entire module
import math
print(math.pi)         # 3.141592653589793
print(math.sqrt(16))   # 4.0
print(math.ceil(4.2))  # 5
print(math.floor(4.8)) # 4

# Import specific items
from math import pi, sqrt
print(pi)
print(sqrt(25))  # 5.0

# Import with alias
import numpy as np
import pandas as pd

# Import all (not recommended)
from math import *
\`\`\`

## Common Standard Library Modules

### os - Operating System Interface
\`\`\`python
import os
print(os.getcwd())           # Current directory
os.mkdir("new_folder")       # Create directory
os.rename("old.txt", "new.txt")
os.remove("file.txt")        # Delete file
print(os.listdir("."))       # List files
print(os.path.exists("f.txt"))  # Check existence
\`\`\`

### sys - System Parameters
\`\`\`python
import sys
print(sys.version)   # Python version
print(sys.path)      # Module search paths
print(sys.argv)      # Command line arguments
\`\`\`

### datetime - Date and Time
\`\`\`python
from datetime import datetime, timedelta
now = datetime.now()
print(now.strftime("%Y-%m-%d %H:%M"))
tomorrow = now + timedelta(days=1)
birthday = datetime(2000, 5, 15)
age_days = (now - birthday).days
\`\`\`

### random - Random Numbers
\`\`\`python
import random
print(random.randint(1, 10))
print(random.random())
print(random.choice(["a", "b", "c"]))
random.shuffle([1, 2, 3, 4, 5])
print(random.sample(range(100), 5))
\`\`\`

### collections - Specialized Containers
\`\`\`python
from collections import Counter, defaultdict, namedtuple

# Counter
words = ["apple", "banana", "apple", "cherry", "banana", "apple"]
count = Counter(words)
print(count.most_common(2))

# defaultdict
dd = defaultdict(list)
dd["fruits"].append("apple")

# namedtuple
Point = namedtuple("Point", ["x", "y"])
p = Point(10, 20)
print(p.x, p.y)
\`\`\`

## Creating Your Own Module

\`\`\`python
# mymodule.py
def greet(name):
    return f"Hello, {name}!"

PI = 3.14159

class Calculator:
    def add(self, a, b):
        return a + b

# main.py
import mymodule
print(mymodule.greet("Alice"))
calc = mymodule.Calculator()
print(calc.add(5, 3))
\`\`\`

## Packages

A package is a directory containing modules and an \`__init__.py\` file.

\`\`\`python
# Directory structure:
# mypackage/
#   __init__.py
#   module1.py
#   module2.py
#   subpackage/
#     __init__.py
#     module3.py

from mypackage import module1
from mypackage.subpackage import module3
\`\`\`

## Installing External Packages

\`\`\`python
# pip install requests
# pip install numpy pandas matplotlib
# pip install -r requirements.txt
# pip list
# pip freeze > requirements.txt
\`\`\``,


    'py-8': `# Object-Oriented Programming

## What is OOP?

OOP organizes code into objects combining data (attributes) and behavior (methods). Four pillars: **Encapsulation, Abstraction, Inheritance, Polymorphism**.

## Classes and Objects

\`\`\`python
class Dog:
    species = "Canis lupus familiaris"  # Class attribute

    def __init__(self, name, age):
        self.name = name    # Instance attribute
        self.age = age

    def bark(self):
        return f"{self.name} says Woof!"

    def info(self):
        return f"{self.name} is {self.age} years old"

dog1 = Dog("Buddy", 3)
dog2 = Dog("Max", 5)
print(dog1.bark())   # Buddy says Woof!
print(dog2.info())   # Max is 5 years old
\`\`\`

## Encapsulation

\`\`\`python
class BankAccount:
    def __init__(self, owner, balance=0):
        self.owner = owner         # Public
        self._id = "ACC123"        # Protected (convention)
        self.__balance = balance   # Private (name mangling)

    def deposit(self, amount):
        if amount > 0:
            self.__balance += amount

    def withdraw(self, amount):
        if 0 < amount <= self.__balance:
            self.__balance -= amount
            return amount
        return 0

    def get_balance(self):
        return self.__balance

account = BankAccount("Alice", 1000)
account.deposit(500)
print(account.get_balance())  # 1500
\`\`\`

## Inheritance

\`\`\`python
class Animal:
    def __init__(self, name, sound):
        self.name = name
        self.sound = sound

    def speak(self):
        return f"{self.name} says {self.sound}!"

class Cat(Animal):
    def __init__(self, name, indoor=True):
        super().__init__(name, "Meow")
        self.indoor = indoor

    def purr(self):
        return f"{self.name} purrs..."

class Dog(Animal):
    def __init__(self, name, breed):
        super().__init__(name, "Woof")
        self.breed = breed

    def fetch(self):
        return f"{self.name} fetches the ball!"

cat = Cat("Whiskers")
dog = Dog("Rex", "Labrador")
print(cat.speak())   # Whiskers says Meow!
print(dog.fetch())   # Rex fetches the ball!
\`\`\`

## Polymorphism

\`\`\`python
class Shape:
    def area(self):
        raise NotImplementedError

class Circle(Shape):
    def __init__(self, radius):
        self.radius = radius
    def area(self):
        return 3.14159 * self.radius ** 2

class Rectangle(Shape):
    def __init__(self, width, height):
        self.width = width
        self.height = height
    def area(self):
        return self.width * self.height

shapes = [Circle(5), Rectangle(4, 6), Circle(3)]
for shape in shapes:
    print(f"Area: {shape.area():.2f}")
\`\`\`

## Special (Dunder) Methods

\`\`\`python
class Vector:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def __str__(self):
        return f"Vector({self.x}, {self.y})"

    def __add__(self, other):
        return Vector(self.x + other.x, self.y + other.y)

    def __eq__(self, other):
        return self.x == other.x and self.y == other.y

    def __len__(self):
        return int((self.x**2 + self.y**2)**0.5)

v1 = Vector(3, 4)
v2 = Vector(1, 2)
v3 = v1 + v2
print(v3)       # Vector(4, 6)
print(len(v1))  # 5
\`\`\`

## Class Methods and Static Methods

\`\`\`python
class Employee:
    raise_rate = 1.05
    employee_count = 0

    def __init__(self, name, salary):
        self.name = name
        self.salary = salary
        Employee.employee_count += 1

    @classmethod
    def set_raise_rate(cls, rate):
        cls.raise_rate = rate

    @staticmethod
    def is_workday(day):
        return day.weekday() < 5

    def apply_raise(self):
        self.salary *= self.raise_rate
\`\`\``,


    'py-9': `# Error Handling

## Types of Errors

### Syntax Errors
Detected before the program runs.
\`\`\`python
# SyntaxError examples:
# if True print("hello")  - Missing colon
# def func(               - Unclosed parenthesis
\`\`\`

### Runtime Exceptions
Occur during program execution.
\`\`\`python
# Common exceptions:
# ValueError: int("hello")
# TypeError: "2" + 2
# ZeroDivisionError: 10 / 0
# IndexError: [1,2,3][5]
# KeyError: {"a": 1}["b"]
# FileNotFoundError: open("nonexistent.txt")
# AttributeError: "hello".append("x")
# NameError: print(undefined_variable)
\`\`\`

## Try / Except

\`\`\`python
# Basic try/except
try:
    result = 10 / 0
except ZeroDivisionError:
    print("Cannot divide by zero!")

# Catching multiple exceptions
try:
    num = int(input("Enter number: "))
    result = 100 / num
except ValueError:
    print("Not a valid number!")
except ZeroDivisionError:
    print("Cannot divide by zero!")

# Catch multiple in one line
try:
    x = int("hello")
except (ValueError, TypeError) as e:
    print(f"Error: {e}")

# Catch any exception
try:
    risky_operation()
except Exception as e:
    print(f"Something went wrong: {e}")
\`\`\`

## Try / Except / Else / Finally

\`\`\`python
try:
    f = open("data.txt", "r")
    content = f.read()
except FileNotFoundError:
    print("File not found!")
else:
    print("File read successfully!")
    print(f"Content: {content}")
finally:
    print("Cleanup complete")  # ALWAYS runs
\`\`\`

## Raising Exceptions

\`\`\`python
def set_age(age):
    if not isinstance(age, int):
        raise TypeError("Age must be an integer")
    if age < 0:
        raise ValueError("Age cannot be negative")
    if age > 150:
        raise ValueError("Age unrealistic")
    return age

try:
    set_age(-5)
except ValueError as e:
    print(f"Invalid: {e}")
\`\`\`

## Custom Exceptions

\`\`\`python
class InsufficientFundsError(Exception):
    def __init__(self, balance, amount):
        self.balance = balance
        self.amount = amount
        super().__init__(
            f"Cannot withdraw {amount}. Balance: {balance}"
        )

class BankAccount:
    def __init__(self, balance):
        self.balance = balance

    def withdraw(self, amount):
        if amount > self.balance:
            raise InsufficientFundsError(self.balance, amount)
        self.balance -= amount

account = BankAccount(100)
try:
    account.withdraw(150)
except InsufficientFundsError as e:
    print(e)
\`\`\`

## Best Practices

\`\`\`python
# 1. Be specific with exceptions
try:
    value = data["key"]
except KeyError:
    value = "default"

# 2. Use context managers for resources
with open("file.txt") as f:
    data = f.read()

# 3. Log errors for debugging
import logging
try:
    result = process_data()
except Exception as e:
    logging.error(f"Failed: {e}")
    raise  # Re-raise after logging

# 4. Avoid bare except
try:
    risky()
except:  # BAD - catches everything
    pass

# Better:
try:
    risky()
except Exception as e:
    handle(e)
\`\`\``,


    'py-10': `# Advanced Functions (Lambda, Map, Filter)

## Lambda Functions

Anonymous functions defined with the lambda keyword.

\`\`\`python
square = lambda x: x ** 2
print(square(5))    # 25

add = lambda a, b: a + b
print(add(3, 7))    # 10

full_name = lambda first, last: f"{first} {last}"
print(full_name("John", "Doe"))

classify = lambda x: "even" if x % 2 == 0 else "odd"
print(classify(7))  # odd
\`\`\`

## Map Function

Applies a function to every item in an iterable.

\`\`\`python
numbers = [1, 2, 3, 4, 5]
squared = list(map(lambda x: x ** 2, numbers))
print(squared)  # [1, 4, 9, 16, 25]

def celsius_to_fahrenheit(c):
    return (c * 9/5) + 32

temps_c = [0, 20, 37, 100]
temps_f = list(map(celsius_to_fahrenheit, temps_c))
print(temps_f)  # [32.0, 68.0, 98.6, 212.0]

# Map with multiple iterables
a = [1, 2, 3]
b = [10, 20, 30]
sums = list(map(lambda x, y: x + y, a, b))
print(sums)  # [11, 22, 33]

# Convert types
str_nums = ["1", "2", "3"]
int_nums = list(map(int, str_nums))
\`\`\`

## Filter Function

Filters elements based on a condition.

\`\`\`python
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
evens = list(filter(lambda x: x % 2 == 0, numbers))
print(evens)  # [2, 4, 6, 8, 10]

mixed = [-5, -2, 0, 3, 7, -1, 8]
positive = list(filter(lambda x: x > 0, mixed))
print(positive)  # [3, 7, 8]

words = ["hello", "", "world", "", "python"]
non_empty = list(filter(None, words))
print(non_empty)  # ['hello', 'world', 'python']

students = [("Alice", 85), ("Bob", 42), ("Charlie", 91)]
passed = list(filter(lambda s: s[1] >= 50, students))
print(passed)  # [('Alice', 85), ('Charlie', 91)]
\`\`\`

## Reduce Function

Reduces an iterable to a single value by cumulative application.

\`\`\`python
from functools import reduce

numbers = [1, 2, 3, 4, 5]
total = reduce(lambda a, b: a + b, numbers)
print(total)  # 15

maximum = reduce(lambda a, b: a if a > b else b, numbers)
print(maximum)  # 5

words = ["Hello", " ", "World", "!"]
sentence = reduce(lambda a, b: a + b, words)
print(sentence)  # Hello World!

factorial = reduce(lambda a, b: a * b, range(1, 6))
print(factorial)  # 120
\`\`\`

## Combining Map, Filter, Reduce

\`\`\`python
from functools import reduce

numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

# Sum of squares of even numbers
result = reduce(
    lambda a, b: a + b,
    map(lambda x: x ** 2,
        filter(lambda x: x % 2 == 0, numbers))
)
print(result)  # 220

# Equivalent (more readable)
result2 = sum(x**2 for x in numbers if x % 2 == 0)
\`\`\`

## Decorators

Functions that modify behavior of other functions.

\`\`\`python
def timer(func):
    import time
    def wrapper(*args, **kwargs):
        start = time.time()
        result = func(*args, **kwargs)
        elapsed = time.time() - start
        print(f"{func.__name__} took {elapsed:.4f}s")
        return result
    return wrapper

@timer
def slow_function():
    import time
    time.sleep(1)
    return "Done"

slow_function()
\`\`\`

## Generators

Functions that yield values lazily, saving memory.

\`\`\`python
def countdown(n):
    while n > 0:
        yield n
        n -= 1

for num in countdown(5):
    print(num)  # 5, 4, 3, 2, 1

# Generator expression
squares = (x**2 for x in range(1000000))
print(next(squares))  # 0
print(next(squares))  # 1
\`\`\``,


    'py-15': `# Introduction to NumPy

## What is NumPy?

NumPy (Numerical Python) is the fundamental package for scientific computing. It provides the ndarray, a powerful N-dimensional array object, plus tools for linear algebra, random numbers, and more.

### Why NumPy over Lists?
- **Speed:** 10-100x faster than Python lists
- **Memory:** Uses less memory
- **Broadcasting:** Vectorized operations without loops
- **Integration:** Foundation for Pandas, Scikit-learn, TensorFlow

## Creating Arrays

\`\`\`python
import numpy as np

# From Python lists
arr1d = np.array([1, 2, 3, 4, 5])
arr2d = np.array([[1, 2, 3], [4, 5, 6]])

# Special arrays
zeros = np.zeros((3, 4))       # 3x4 of zeros
ones = np.ones((2, 3))         # 2x3 of ones
full = np.full((3, 3), 7)      # 3x3 filled with 7
eye = np.eye(4)                # 4x4 identity matrix
empty = np.empty((2, 2))       # Uninitialized

# Ranges
arange = np.arange(0, 10, 2)   # [0, 2, 4, 6, 8]
linspace = np.linspace(0, 1, 5) # [0, 0.25, 0.5, 0.75, 1.0]
\`\`\`

## Array Properties

\`\`\`python
arr = np.array([[1, 2, 3], [4, 5, 6]])

print(arr.shape)    # (2, 3) - dimensions
print(arr.ndim)     # 2 - number of dimensions
print(arr.size)     # 6 - total elements
print(arr.dtype)    # int64 - data type
print(arr.itemsize) # 8 - bytes per element
\`\`\`

## Indexing and Slicing

\`\`\`python
arr = np.array([10, 20, 30, 40, 50])

print(arr[0])      # 10
print(arr[-1])     # 50
print(arr[1:4])    # [20, 30, 40]
print(arr[::2])    # [10, 30, 50]

# 2D indexing
matrix = np.array([[1, 2, 3], [4, 5, 6], [7, 8, 9]])
print(matrix[1, 2])     # 6 (row 1, col 2)
print(matrix[:, 1])     # [2, 5, 8] (all rows, col 1)
print(matrix[0:2, :])   # First 2 rows

# Boolean indexing
arr = np.array([1, 2, 3, 4, 5])
mask = arr > 3
print(arr[mask])   # [4, 5]
print(arr[arr % 2 == 0])  # [2, 4]
\`\`\`

## Mathematical Operations

\`\`\`python
a = np.array([1, 2, 3])
b = np.array([4, 5, 6])

# Element-wise
print(a + b)    # [5, 7, 9]
print(a * b)    # [4, 10, 18]
print(a ** 2)   # [1, 4, 9]
print(np.sqrt(a))  # [1.0, 1.414, 1.732]

# Aggregate functions
print(np.sum(a))    # 6
print(np.mean(a))   # 2.0
print(np.std(a))    # 0.816
print(np.max(a))    # 3
print(np.min(a))    # 1
print(np.argmax(a)) # 2 (index of max)
\`\`\`

## Reshaping and Manipulation

\`\`\`python
arr = np.arange(12)

# Reshape
matrix = arr.reshape(3, 4)      # 3x4
reshaped = arr.reshape(2, 2, 3) # 2x2x3

# Flatten
flat = matrix.flatten()  # Back to 1D

# Transpose
transposed = matrix.T

# Stacking
a = np.array([1, 2, 3])
b = np.array([4, 5, 6])
vstacked = np.vstack([a, b])  # [[1,2,3],[4,5,6]]
hstacked = np.hstack([a, b])  # [1,2,3,4,5,6]
\`\`\`

## Linear Algebra

\`\`\`python
A = np.array([[1, 2], [3, 4]])
B = np.array([[5, 6], [7, 8]])

# Matrix multiplication
C = np.dot(A, B)   # or A @ B
print(C)

# Determinant
det = np.linalg.det(A)

# Inverse
inv = np.linalg.inv(A)

# Eigenvalues
eigenvalues, eigenvectors = np.linalg.eig(A)
\`\`\`

## Random Numbers

\`\`\`python
# Random floats [0, 1)
rand = np.random.rand(3, 3)

# Random integers
randint = np.random.randint(1, 100, size=(5,))

# Normal distribution
normal = np.random.randn(1000)

# Set seed for reproducibility
np.random.seed(42)
\`\`\``,


    'py-16': `# Data Analysis with Pandas

## What is Pandas?

Pandas is a powerful data manipulation and analysis library built on NumPy. Its core data structures are **Series** (1D) and **DataFrame** (2D).

## Creating DataFrames

\`\`\`python
import pandas as pd

# From dictionary
df = pd.DataFrame({
    "Name": ["Alice", "Bob", "Charlie", "Diana"],
    "Age": [25, 30, 35, 28],
    "City": ["NYC", "London", "Paris", "Tokyo"],
    "Salary": [70000, 80000, 90000, 75000]
})

# From list of dictionaries
data = [
    {"name": "Alice", "score": 90},
    {"name": "Bob", "score": 85}
]
df2 = pd.DataFrame(data)

# Series (1D)
ages = pd.Series([25, 30, 35], name="Age")
\`\`\`

## Reading and Writing Data

\`\`\`python
# Read CSV
df = pd.read_csv("data.csv")

# Read with options
df = pd.read_csv("data.csv",
    sep=",",
    header=0,
    index_col="id",
    na_values=["NA", "missing"],
    parse_dates=["date_col"]
)

# Read Excel
df = pd.read_excel("data.xlsx", sheet_name="Sheet1")

# Write to files
df.to_csv("output.csv", index=False)
df.to_excel("output.xlsx", index=False)
df.to_json("output.json")
\`\`\`

## Exploring Data

\`\`\`python
print(df.head())        # First 5 rows
print(df.tail(3))       # Last 3 rows
print(df.shape)         # (rows, columns)
print(df.columns)       # Column names
print(df.dtypes)        # Data types
print(df.info())        # Summary
print(df.describe())    # Statistics
print(df.nunique())     # Unique values per column
print(df.isnull().sum()) # Missing values
\`\`\`

## Selecting Data

\`\`\`python
# Select column
print(df["Name"])        # Single column
print(df[["Name", "Age"]])  # Multiple columns

# Select rows
print(df.iloc[0])        # By index position
print(df.iloc[0:3])      # Slice by position
print(df.loc[0])         # By label

# Conditional selection
adults = df[df["Age"] > 25]
nyc = df[df["City"] == "NYC"]
rich_adults = df[(df["Age"] > 25) & (df["Salary"] > 75000)]
\`\`\`

## Modifying Data

\`\`\`python
# Add column
df["Bonus"] = df["Salary"] * 0.1

# Remove column
df = df.drop("Bonus", axis=1)

# Rename columns
df = df.rename(columns={"Name": "FullName"})

# Change values
df.loc[0, "Age"] = 26

# Apply function
df["Age_Group"] = df["Age"].apply(
    lambda x: "Young" if x < 30 else "Senior"
)

# Sort
df_sorted = df.sort_values("Age", ascending=False)
\`\`\`

## Handling Missing Data

\`\`\`python
# Check for missing
print(df.isnull().sum())
print(df.isnull().any())

# Fill missing values
df["Col"].fillna(0, inplace=True)
df["Col"].fillna(df["Col"].mean(), inplace=True)
df.fillna(method="ffill")  # Forward fill

# Drop missing
df.dropna()              # Drop rows with any NaN
df.dropna(subset=["Age"])  # Drop if Age is NaN
\`\`\`

## Grouping and Aggregation

\`\`\`python
# Groupby
grouped = df.groupby("City")
print(grouped["Salary"].mean())
print(grouped["Age"].agg(["mean", "min", "max"]))

# Multiple aggregations
summary = df.groupby("City").agg({
    "Salary": ["mean", "sum"],
    "Age": "median"
})

# Pivot table
pivot = df.pivot_table(
    values="Salary",
    index="City",
    aggfunc="mean"
)
\`\`\`

## Merging DataFrames

\`\`\`python
df1 = pd.DataFrame({"id": [1, 2, 3], "name": ["A", "B", "C"]})
df2 = pd.DataFrame({"id": [2, 3, 4], "score": [90, 85, 78]})

# Merge (like SQL JOIN)
merged = pd.merge(df1, df2, on="id", how="inner")
left_merged = pd.merge(df1, df2, on="id", how="left")

# Concatenate
combined = pd.concat([df1_part, df2_part], ignore_index=True)
\`\`\``,


    'py-17': `# Visualization with Matplotlib

## What is Matplotlib?

Matplotlib is the most commonly used library for creating static, animated, and interactive visualizations in Python. The \`pyplot\` module provides a MATLAB-like interface.

## Basic Line Plot

\`\`\`python
import matplotlib.pyplot as plt

x = [1, 2, 3, 4, 5]
y = [2, 4, 6, 8, 10]

plt.plot(x, y)
plt.title("Simple Line Plot")
plt.xlabel("X Axis")
plt.ylabel("Y Axis")
plt.show()
\`\`\`

## Customizing Plots

\`\`\`python
plt.plot(x, y,
    color="red",
    linewidth=2,
    linestyle="--",
    marker="o",
    markersize=8,
    label="Line 1"
)
plt.legend()
plt.grid(True, alpha=0.3)
plt.title("Customized Plot", fontsize=16)
plt.show()
\`\`\`

## Multiple Lines

\`\`\`python
x = range(1, 11)
y1 = [i**2 for i in x]
y2 = [i**1.5 for i in x]

plt.plot(x, y1, "b-o", label="Quadratic")
plt.plot(x, y2, "r--s", label="Power 1.5")
plt.legend()
plt.title("Multiple Lines")
plt.show()
\`\`\`

## Bar Chart

\`\`\`python
categories = ["Python", "Java", "C++", "JavaScript"]
values = [35, 25, 20, 20]
colors = ["#3776AB", "#f89820", "#004482", "#F7DF1E"]

plt.bar(categories, values, color=colors)
plt.title("Programming Language Popularity")
plt.ylabel("Percentage")
plt.show()

# Horizontal bar
plt.barh(categories, values, color=colors)
plt.show()
\`\`\`

## Scatter Plot

\`\`\`python
import numpy as np

x = np.random.randn(100)
y = x + np.random.randn(100) * 0.5

plt.scatter(x, y, c="blue", alpha=0.6, s=50)
plt.title("Scatter Plot")
plt.xlabel("X values")
plt.ylabel("Y values")
plt.show()

# With color mapping
colors = np.random.rand(100)
sizes = np.random.randint(20, 200, 100)
plt.scatter(x, y, c=colors, s=sizes, alpha=0.5, cmap="viridis")
plt.colorbar()
plt.show()
\`\`\`

## Histogram

\`\`\`python
data = np.random.randn(1000)

plt.hist(data, bins=30, color="steelblue", edgecolor="white", alpha=0.8)
plt.title("Distribution of Random Data")
plt.xlabel("Value")
plt.ylabel("Frequency")
plt.axvline(data.mean(), color="red", linestyle="--", label="Mean")
plt.legend()
plt.show()
\`\`\`

## Pie Chart

\`\`\`python
labels = ["Python", "Java", "C++", "Others"]
sizes = [40, 25, 20, 15]
explode = (0.1, 0, 0, 0)

plt.pie(sizes, explode=explode, labels=labels,
        autopct="%1.1f%%", shadow=True, startangle=90)
plt.title("Language Usage")
plt.show()
\`\`\`

## Subplots

\`\`\`python
fig, axes = plt.subplots(2, 2, figsize=(10, 8))

# Top-left: Line
axes[0, 0].plot([1,2,3,4], [1,4,9,16])
axes[0, 0].set_title("Line Plot")

# Top-right: Bar
axes[0, 1].bar(["A","B","C"], [3,7,2])
axes[0, 1].set_title("Bar Chart")

# Bottom-left: Scatter
axes[1, 0].scatter(np.random.rand(50), np.random.rand(50))
axes[1, 0].set_title("Scatter Plot")

# Bottom-right: Histogram
axes[1, 1].hist(np.random.randn(500), bins=20)
axes[1, 1].set_title("Histogram")

plt.tight_layout()
plt.show()
\`\`\`

## Saving Figures

\`\`\`python
plt.plot([1,2,3], [1,4,9])
plt.title("Save Example")
plt.savefig("plot.png", dpi=300, bbox_inches="tight")
plt.savefig("plot.pdf")
plt.savefig("plot.svg")
\`\`\`

## Styling

\`\`\`python
# Available styles
print(plt.style.available)

# Use a style
plt.style.use("seaborn-v0_8")
plt.style.use("dark_background")
plt.style.use("ggplot")

# Custom figure size
fig, ax = plt.subplots(figsize=(12, 6))
ax.plot(x, y)
\`\`\``,

    // ===================== MACHINE LEARNING TOPICS =====================



    'ml-0': `# Introduction to Machine Learning

## What is Machine Learning?

Machine Learning (ML) is a subset of Artificial Intelligence where computers learn patterns from data without being explicitly programmed. Instead of writing rules, we feed data to algorithms that build mathematical models.

### ML vs Traditional Programming
| Traditional Programming | Machine Learning |
|------------------------|-----------------|
| Input + Rules = Output | Input + Output = Rules |
| Programmer writes logic | Algorithm discovers logic |
| Fixed behavior | Improves with more data |

## Types of Machine Learning

### 1. Supervised Learning
The algorithm learns from **labeled data** (input-output pairs).

**Types:**
- **Classification:** Predict a category (spam/not spam, cat/dog)
- **Regression:** Predict a continuous value (house prices, temperature)

\`\`\`python
# Example: Predicting house prices (regression)
from sklearn.linear_model import LinearRegression
model = LinearRegression()
model.fit(X_train, y_train)  # Learn from labeled data
predictions = model.predict(X_test)
\`\`\`

**Common Algorithms:**
- Linear/Logistic Regression
- Decision Trees, Random Forest
- Support Vector Machines (SVM)
- K-Nearest Neighbors (KNN)
- Neural Networks

### 2. Unsupervised Learning
The algorithm finds patterns in **unlabeled data**.

**Types:**
- **Clustering:** Group similar data (customer segments)
- **Dimensionality Reduction:** Reduce features (PCA)
- **Association:** Find rules (market basket analysis)

\`\`\`python
# Example: Customer segmentation (clustering)
from sklearn.cluster import KMeans
model = KMeans(n_clusters=3)
model.fit(X)  # No labels needed
clusters = model.predict(X)
\`\`\`

### 3. Reinforcement Learning
An agent learns by **interacting with an environment** and receiving rewards or penalties.

**Key Concepts:**
- **Agent:** The learner/decision maker
- **Environment:** What the agent interacts with
- **Action:** What the agent does
- **Reward:** Feedback from the environment
- **Policy:** Strategy the agent follows

**Examples:** Game-playing AI, self-driving cars, robotics

## The ML Workflow

1. **Define the Problem:** What are you trying to predict?
2. **Collect Data:** Gather relevant data
3. **Prepare Data:** Clean, transform, split into train/test
4. **Choose Model:** Select appropriate algorithm
5. **Train Model:** Fit model to training data
6. **Evaluate:** Test performance on unseen data
7. **Tune:** Adjust hyperparameters
8. **Deploy:** Put model into production

## Key Terminology

- **Features (X):** Input variables used for prediction
- **Labels/Target (y):** Output variable to predict
- **Training Set:** Data used to train the model (typically 80%)
- **Test Set:** Data used to evaluate the model (typically 20%)
- **Overfitting:** Model memorizes training data, fails on new data
- **Underfitting:** Model is too simple, fails on both
- **Bias:** Error from assumptions in the algorithm
- **Variance:** Error from sensitivity to training data
- **Hyperparameters:** Settings configured before training

## Python ML Libraries

\`\`\`python
# Scikit-learn - Classical ML
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score

# TensorFlow/Keras - Deep Learning
import tensorflow as tf

# PyTorch - Deep Learning
import torch

# Data handling
import numpy as np
import pandas as pd
\`\`\``,


    'ml-1': `# Linear Regression

## What is Linear Regression?

Linear Regression models the relationship between a dependent variable (y) and one or more independent variables (X) by fitting a linear equation.

### Simple Linear Regression
One independent variable: **y = mx + b**
- **y:** Predicted value
- **m:** Slope (coefficient)
- **x:** Input feature
- **b:** Intercept (bias)

### Multiple Linear Regression
Multiple features: **y = b0 + b1*x1 + b2*x2 + ... + bn*xn**

## How It Works

The algorithm finds the best-fit line by minimizing the **Sum of Squared Residuals** (distance between actual and predicted values).

\`\`\`python
# Ordinary Least Squares (OLS)
# Minimizes: Sum of (actual - predicted)^2
\`\`\`

## Implementation with Scikit-learn

\`\`\`python
import numpy as np
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error, r2_score

# Sample data
X = np.array([[1], [2], [3], [4], [5], [6], [7], [8], [9], [10]])
y = np.array([2.1, 4.0, 5.8, 8.1, 10.2, 11.9, 14.1, 15.8, 18.0, 20.1])

# Split data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)

# Create and train model
model = LinearRegression()
model.fit(X_train, y_train)

# Model parameters
print(f"Slope (coef): {model.coef_[0]:.4f}")
print(f"Intercept: {model.intercept_:.4f}")

# Predictions
predictions = model.predict(X_test)

# Evaluation
mse = mean_squared_error(y_test, predictions)
rmse = np.sqrt(mse)
r2 = r2_score(y_test, predictions)
print(f"MSE: {mse:.4f}")
print(f"RMSE: {rmse:.4f}")
print(f"R-squared: {r2:.4f}")
\`\`\`

## Evaluation Metrics

| Metric | Formula | Interpretation |
|--------|---------|---------------|
| MSE | Mean of (actual - predicted)^2 | Lower is better |
| RMSE | Square root of MSE | Same unit as target |
| MAE | Mean of abs(actual - predicted) | Average error |
| R-squared | 1 - (SS_res / SS_total) | 0 to 1, higher is better |

## Assumptions

1. **Linearity:** Relationship between X and y is linear
2. **Independence:** Observations are independent
3. **Homoscedasticity:** Constant variance of residuals
4. **Normality:** Residuals are normally distributed
5. **No Multicollinearity:** Features are not highly correlated

## Polynomial Regression

When data is not linear, we can fit polynomial curves.

\`\`\`python
from sklearn.preprocessing import PolynomialFeatures

poly = PolynomialFeatures(degree=2)
X_poly = poly.fit_transform(X)

model = LinearRegression()
model.fit(X_poly, y)
\`\`\`

## Regularization

Prevents overfitting by adding penalty terms.

\`\`\`python
from sklearn.linear_model import Ridge, Lasso

# Ridge (L2) - shrinks coefficients
ridge = Ridge(alpha=1.0)
ridge.fit(X_train, y_train)

# Lasso (L1) - can zero out coefficients
lasso = Lasso(alpha=0.1)
lasso.fit(X_train, y_train)
\`\`\``,


    'ml-2': `# Logistic Regression

## What is Logistic Regression?

Despite its name, Logistic Regression is a **classification** algorithm. It predicts the probability that an instance belongs to a particular class using the **sigmoid function**.

### Sigmoid Function
The sigmoid maps any real number to a value between 0 and 1.

\`\`\`
sigmoid(z) = 1 / (1 + e^(-z))
\`\`\`

**Properties:**
- Output range: (0, 1) — interpreted as probability
- S-shaped curve
- sigmoid(0) = 0.5
- As z approaches infinity, sigmoid approaches 1
- As z approaches negative infinity, sigmoid approaches 0

## Binary Classification

\`\`\`python
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, classification_report

# Train model
model = LogisticRegression()
model.fit(X_train, y_train)

# Predict classes
predictions = model.predict(X_test)

# Predict probabilities
probabilities = model.predict_proba(X_test)
print(probabilities[:5])  # [[P(class 0), P(class 1)], ...]

# Evaluate
print(f"Accuracy: {accuracy_score(y_test, predictions):.4f}")
print(classification_report(y_test, predictions))
\`\`\`

## Decision Boundary

The model predicts class 1 if P(y=1|X) > threshold (default 0.5).

\`\`\`python
# Custom threshold
threshold = 0.3
custom_preds = (model.predict_proba(X_test)[:, 1] > threshold).astype(int)
\`\`\`

## Cost Function

Logistic Regression uses **Log Loss** (Binary Cross-Entropy):

\`\`\`
Loss = -[y*log(p) + (1-y)*log(1-p)]
\`\`\`

Where y is the actual class and p is the predicted probability.

## Multi-Class Classification

### One-vs-Rest (OvR)
Train one classifier per class. Each classifier determines if an instance belongs to that class or not.

### Softmax (Multinomial)
Extension for multiple classes. Outputs probabilities for all classes that sum to 1.

\`\`\`python
# Multi-class logistic regression
model = LogisticRegression(multi_class="multinomial", solver="lbfgs")
model.fit(X_train, y_train)
predictions = model.predict(X_test)
\`\`\`

## Evaluation Metrics for Classification

\`\`\`python
from sklearn.metrics import (
    confusion_matrix, accuracy_score,
    precision_score, recall_score, f1_score,
    roc_auc_score, roc_curve
)

# Confusion matrix
cm = confusion_matrix(y_test, predictions)
# [[TN, FP],
#  [FN, TP]]

print(f"Accuracy:  {accuracy_score(y_test, predictions):.4f}")
print(f"Precision: {precision_score(y_test, predictions):.4f}")
print(f"Recall:    {recall_score(y_test, predictions):.4f}")
print(f"F1 Score:  {f1_score(y_test, predictions):.4f}")
\`\`\`

## When to Use Logistic Regression

**Good for:**
- Binary and multi-class classification
- When you need interpretable results
- Baseline model for comparison
- Linearly separable data

**Not ideal for:**
- Non-linear decision boundaries
- Very complex relationships
- Image or text classification (use deep learning)`,


    'ml-3': `# Decision Trees

## What is a Decision Tree?

A Decision Tree is a flowchart-like model that makes decisions based on feature values. It splits data at each node using conditions, leading to leaf nodes that contain predictions.

### Structure
- **Root Node:** Top node, first split
- **Internal Nodes:** Decision points with conditions
- **Branches:** Outcomes of conditions
- **Leaf Nodes:** Final predictions (class or value)

## How Splits are Determined

### Gini Impurity (for Classification)
Measures the probability of misclassifying a randomly chosen element.

\`\`\`
Gini = 1 - Sum(pi^2)
\`\`\`

Where pi is the probability of class i. Lower Gini = purer node.

### Information Gain / Entropy
Entropy measures disorder. Information Gain is the reduction in entropy after a split.

\`\`\`
Entropy = -Sum(pi * log2(pi))
\`\`\`

### For Regression: Variance Reduction
Splits that minimize the variance of target values.

## Implementation

\`\`\`python
from sklearn.tree import DecisionTreeClassifier, DecisionTreeRegressor
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score

# Classification
clf = DecisionTreeClassifier(
    max_depth=5,
    min_samples_split=10,
    min_samples_leaf=5,
    criterion="gini"  # or "entropy"
)
clf.fit(X_train, y_train)
predictions = clf.predict(X_test)
print(f"Accuracy: {accuracy_score(y_test, predictions):.4f}")

# Regression
reg = DecisionTreeRegressor(max_depth=5)
reg.fit(X_train, y_train)
predictions = reg.predict(X_test)
\`\`\`

## Visualizing the Tree

\`\`\`python
from sklearn.tree import export_text, plot_tree
import matplotlib.pyplot as plt

# Text representation
tree_rules = export_text(clf, feature_names=feature_names)
print(tree_rules)

# Visual plot
fig, ax = plt.subplots(figsize=(20, 10))
plot_tree(clf, feature_names=feature_names,
          class_names=class_names, filled=True, ax=ax)
plt.show()
\`\`\`

## Advantages and Disadvantages

**Advantages:**
- Easy to understand and interpret
- No feature scaling needed
- Handles both numerical and categorical data
- Can capture non-linear relationships

**Disadvantages:**
- Prone to **overfitting** (especially deep trees)
- Unstable — small data changes can alter the tree
- Biased toward features with many levels
- Greedy algorithm — may not find optimal tree

## Preventing Overfitting

### Pruning
- **Pre-pruning:** Set max_depth, min_samples_split, min_samples_leaf
- **Post-pruning:** Build full tree, then remove branches

\`\`\`python
# Pre-pruning with hyperparameters
clf = DecisionTreeClassifier(
    max_depth=5,             # Limit tree depth
    min_samples_split=20,    # Min samples to split
    min_samples_leaf=10,     # Min samples in leaf
    max_features="sqrt"      # Limit features per split
)
\`\`\`

## Random Forest (Ensemble)

Combines multiple decision trees for better performance.

\`\`\`python
from sklearn.ensemble import RandomForestClassifier

rf = RandomForestClassifier(n_estimators=100, max_depth=10)
rf.fit(X_train, y_train)
predictions = rf.predict(X_test)

# Feature importance
importances = rf.feature_importances_
for name, imp in zip(feature_names, importances):
    print(f"{name}: {imp:.4f}")
\`\`\``,


    'ml-4': `# Support Vector Machines

## What is SVM?

Support Vector Machine (SVM) is a supervised learning algorithm that finds the optimal **hyperplane** (decision boundary) that separates classes with the **maximum margin**.

### Key Concepts
- **Hyperplane:** A decision boundary that separates classes
- **Support Vectors:** Data points closest to the hyperplane
- **Margin:** Distance between the hyperplane and support vectors
- **Goal:** Maximize the margin between classes

## How SVM Works

1. Find the hyperplane that best separates the two classes
2. Maximize the margin (distance between hyperplane and nearest points)
3. The nearest points to the hyperplane are the "support vectors"
4. Only support vectors matter for the decision boundary

## Linear SVM

\`\`\`python
from sklearn.svm import SVC
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler

# Always scale features for SVM
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

# Linear SVM
svm = SVC(kernel="linear", C=1.0)
svm.fit(X_train_scaled, y_train)
predictions = svm.predict(X_test_scaled)
\`\`\`

## The Kernel Trick

For non-linearly separable data, the kernel trick maps data to a higher-dimensional space where a linear separator can be found.

### Common Kernels

| Kernel | Use Case |
|--------|----------|
| Linear | Linearly separable data |
| RBF (Radial Basis Function) | Default, most versatile |
| Polynomial | Non-linear relationships |
| Sigmoid | Similar to neural networks |

\`\`\`python
# RBF kernel (default)
svm_rbf = SVC(kernel="rbf", C=1.0, gamma="scale")
svm_rbf.fit(X_train, y_train)

# Polynomial kernel
svm_poly = SVC(kernel="poly", degree=3)
svm_poly.fit(X_train, y_train)
\`\`\`

## Important Hyperparameters

### C (Regularization)
- **High C:** Strict margin, may overfit
- **Low C:** Soft margin, may underfit
- Controls the trade-off between margin size and classification error

### Gamma (RBF kernel)
- **High gamma:** Each point has close-range influence (overfitting)
- **Low gamma:** Each point has far-range influence (underfitting)

\`\`\`python
from sklearn.model_selection import GridSearchCV

param_grid = {
    "C": [0.1, 1, 10, 100],
    "gamma": ["scale", "auto", 0.1, 0.01],
    "kernel": ["rbf", "linear"]
}

grid = GridSearchCV(SVC(), param_grid, cv=5, scoring="accuracy")
grid.fit(X_train, y_train)
print(f"Best params: {grid.best_params_}")
print(f"Best score: {grid.best_score_:.4f}")
\`\`\`

## SVM for Regression (SVR)

\`\`\`python
from sklearn.svm import SVR

svr = SVR(kernel="rbf", C=100, gamma=0.1, epsilon=0.1)
svr.fit(X_train, y_train)
predictions = svr.predict(X_test)
\`\`\`

## Advantages and Disadvantages

**Advantages:**
- Effective in high-dimensional spaces
- Works well with clear margin of separation
- Memory efficient (uses only support vectors)

**Disadvantages:**
- Not ideal for very large datasets (slow training)
- Sensitive to feature scaling
- Doesn't provide probability estimates directly
- Choosing the right kernel can be tricky`,


    'ml-5': `# K-Means Clustering

## What is K-Means?

K-Means is an **unsupervised learning** algorithm that groups data points into K clusters based on similarity. Each cluster has a center point called the **centroid**.

## How K-Means Works

### Algorithm Steps:
1. **Initialize:** Randomly select K points as initial centroids
2. **Assign:** Assign each point to the nearest centroid
3. **Update:** Recalculate centroids as the mean of assigned points
4. **Repeat:** Steps 2-3 until centroids don't change (convergence)

\`\`\`python
from sklearn.cluster import KMeans
import numpy as np

# Create and fit model
kmeans = KMeans(n_clusters=3, random_state=42, n_init=10)
kmeans.fit(X)

# Results
labels = kmeans.labels_          # Cluster assignments
centroids = kmeans.cluster_centers_  # Cluster centers
inertia = kmeans.inertia_        # Sum of squared distances

# Predict new points
new_labels = kmeans.predict(X_new)
\`\`\`

## Choosing K (Number of Clusters)

### Elbow Method
Plot inertia vs K and find the "elbow" point.

\`\`\`python
import matplotlib.pyplot as plt

inertias = []
K_range = range(1, 11)
for k in K_range:
    km = KMeans(n_clusters=k, random_state=42)
    km.fit(X)
    inertias.append(km.inertia_)

plt.plot(K_range, inertias, "bo-")
plt.xlabel("Number of Clusters (K)")
plt.ylabel("Inertia")
plt.title("Elbow Method")
plt.show()
\`\`\`

### Silhouette Score
Measures how similar a point is to its own cluster vs other clusters. Range: -1 to 1 (higher is better).

\`\`\`python
from sklearn.metrics import silhouette_score

for k in range(2, 11):
    km = KMeans(n_clusters=k, random_state=42)
    labels = km.fit_predict(X)
    score = silhouette_score(X, labels)
    print(f"K={k}: Silhouette Score = {score:.4f}")
\`\`\`

## Visualization

\`\`\`python
import matplotlib.pyplot as plt

plt.scatter(X[:, 0], X[:, 1], c=labels, cmap="viridis", alpha=0.5)
plt.scatter(centroids[:, 0], centroids[:, 1],
            c="red", marker="X", s=200, label="Centroids")
plt.legend()
plt.title(f"K-Means Clustering (K={3})")
plt.show()
\`\`\`

## Limitations

1. **Must specify K** in advance
2. **Sensitive to initialization** (use K-Means++)
3. **Sensitive to outliers** (strongly influence centroids)
4. **Assumes spherical clusters** of similar size
5. **Not ideal** for non-convex shapes

## Alternatives

- **DBSCAN:** Density-based, finds arbitrary shapes, no K needed
- **Hierarchical Clustering:** Builds a tree of clusters
- **Gaussian Mixture Models:** Soft clustering with probability

\`\`\`python
from sklearn.cluster import DBSCAN
db = DBSCAN(eps=0.5, min_samples=5)
labels = db.fit_predict(X)
\`\`\``,


    'ml-6': `# Neural Networks Basics

## What is a Neural Network?

A neural network is a computing system inspired by biological neurons. It consists of layers of interconnected nodes (neurons) that process information.

### Architecture
1. **Input Layer:** Receives raw features
2. **Hidden Layers:** Process and transform data
3. **Output Layer:** Produces predictions

## The Perceptron (Single Neuron)

A single neuron computes a weighted sum plus bias, then applies an activation function.

\`\`\`
output = activation(w1*x1 + w2*x2 + ... + wn*xn + bias)
\`\`\`

## Activation Functions

| Function | Formula | Use Case |
|----------|---------|----------|
| ReLU | max(0, x) | Hidden layers (most common) |
| Sigmoid | 1/(1+e^-x) | Binary classification output |
| Tanh | (e^x - e^-x)/(e^x + e^-x) | Hidden layers |
| Softmax | e^xi / Sum(e^xj) | Multi-class output |
| Leaky ReLU | max(0.01x, x) | Prevents "dying ReLU" |

## Forward Propagation

Data flows from input to output through the network:
1. Multiply inputs by weights
2. Add bias
3. Apply activation function
4. Pass to next layer

## Backpropagation

Training algorithm that adjusts weights to minimize error:
1. **Forward pass:** Calculate predicted output
2. **Calculate loss:** Compare prediction to actual
3. **Backward pass:** Compute gradients of loss
4. **Update weights:** Adjust using gradient descent

## Implementation with TensorFlow/Keras

\`\`\`python
import tensorflow as tf
from tensorflow import keras

# Build a simple neural network
model = keras.Sequential([
    keras.layers.Dense(128, activation="relu", input_shape=(num_features,)),
    keras.layers.Dropout(0.2),        # Prevent overfitting
    keras.layers.Dense(64, activation="relu"),
    keras.layers.Dropout(0.2),
    keras.layers.Dense(10, activation="softmax")  # 10 classes
])

# Compile
model.compile(
    optimizer="adam",
    loss="sparse_categorical_crossentropy",
    metrics=["accuracy"]
)

# Train
history = model.fit(X_train, y_train,
                    epochs=50,
                    batch_size=32,
                    validation_split=0.2)

# Evaluate
loss, accuracy = model.evaluate(X_test, y_test)
print(f"Test Accuracy: {accuracy:.4f}")
\`\`\`

## Key Terminology

- **Epoch:** One complete pass through the training data
- **Batch Size:** Number of samples processed before weight update
- **Learning Rate:** Step size for weight updates
- **Loss Function:** Measures prediction error
- **Optimizer:** Algorithm to update weights (Adam, SGD)
- **Dropout:** Randomly disables neurons during training (regularization)
- **Overfitting:** Model memorizes training data
- **Deep Learning:** Neural networks with many hidden layers

## Types of Neural Networks

- **Feedforward (FNN/MLP):** Basic architecture
- **Convolutional (CNN):** Image processing
- **Recurrent (RNN/LSTM):** Sequential data, text
- **Transformer:** NLP, attention mechanism
- **GAN:** Generating new data (images, text)`,


    'ml-7': `# Model Evaluation Metrics

## Why Evaluation Matters

A model's performance on training data doesn't reflect real-world performance. We need proper evaluation metrics and strategies to measure how well a model generalizes.

## Classification Metrics

### Confusion Matrix
A table showing predicted vs actual values.

\`\`\`
                  Predicted
                  Negative  Positive
Actual Negative     TN        FP
       Positive     FN        TP
\`\`\`

\`\`\`python
from sklearn.metrics import confusion_matrix, ConfusionMatrixDisplay
import matplotlib.pyplot as plt

cm = confusion_matrix(y_test, predictions)
disp = ConfusionMatrixDisplay(cm, display_labels=["Negative", "Positive"])
disp.plot(cmap="Blues")
plt.show()
\`\`\`

### Core Metrics

| Metric | Formula | When to Use |
|--------|---------|------------|
| Accuracy | (TP+TN) / Total | Balanced classes |
| Precision | TP / (TP+FP) | When FP is costly (spam filter) |
| Recall | TP / (TP+FN) | When FN is costly (disease detection) |
| F1-Score | 2*(P*R)/(P+R) | Imbalanced classes |

\`\`\`python
from sklearn.metrics import (
    accuracy_score, precision_score,
    recall_score, f1_score, classification_report
)

print(f"Accuracy:  {accuracy_score(y_test, preds):.4f}")
print(f"Precision: {precision_score(y_test, preds):.4f}")
print(f"Recall:    {recall_score(y_test, preds):.4f}")
print(f"F1:        {f1_score(y_test, preds):.4f}")
print(classification_report(y_test, preds))
\`\`\`

### ROC Curve and AUC

\`\`\`python
from sklearn.metrics import roc_curve, roc_auc_score

# Get probabilities
y_proba = model.predict_proba(X_test)[:, 1]

# ROC curve
fpr, tpr, thresholds = roc_curve(y_test, y_proba)
auc = roc_auc_score(y_test, y_proba)

plt.plot(fpr, tpr, label=f"AUC = {auc:.4f}")
plt.plot([0,1], [0,1], "k--")
plt.xlabel("False Positive Rate")
plt.ylabel("True Positive Rate")
plt.title("ROC Curve")
plt.legend()
plt.show()
\`\`\`

**AUC Interpretation:**
- 1.0: Perfect model
- 0.5: Random guessing
- < 0.5: Worse than random

## Regression Metrics

| Metric | Description |
|--------|-------------|
| MSE | Mean of squared errors |
| RMSE | Square root of MSE (same unit as target) |
| MAE | Mean of absolute errors |
| R-squared | Proportion of variance explained (0-1) |

\`\`\`python
from sklearn.metrics import mean_squared_error, mean_absolute_error, r2_score

mse = mean_squared_error(y_test, preds)
rmse = np.sqrt(mse)
mae = mean_absolute_error(y_test, preds)
r2 = r2_score(y_test, preds)
\`\`\`

## Cross-Validation

More reliable than a single train/test split.

\`\`\`python
from sklearn.model_selection import cross_val_score

scores = cross_val_score(model, X, y, cv=5, scoring="accuracy")
print(f"Mean: {scores.mean():.4f} (+/- {scores.std():.4f})")
\`\`\``,


    'ml-8': `# Feature Engineering

## What is Feature Engineering?

Feature engineering transforms raw data into meaningful features that improve model performance. It is often the most impactful step in the ML pipeline.

## Handling Missing Values

\`\`\`python
import pandas as pd
import numpy as np

# Check missing values
print(df.isnull().sum())

# Strategy 1: Drop rows/columns
df.dropna()                    # Drop rows with any NaN
df.dropna(thresh=3)            # Keep rows with at least 3 non-NaN
df.drop("col", axis=1)        # Drop column

# Strategy 2: Imputation
from sklearn.impute import SimpleImputer

# Fill with mean/median/mode
imputer = SimpleImputer(strategy="mean")
df["col"] = imputer.fit_transform(df[["col"]])

# Fill with specific value
df["col"].fillna(0, inplace=True)
df["col"].fillna(df["col"].median(), inplace=True)

# Forward/backward fill
df["col"].fillna(method="ffill")  # Use previous value
df["col"].fillna(method="bfill")  # Use next value
\`\`\`

## Feature Scaling

Many algorithms (SVM, KNN, Neural Networks) require scaled features.

### Normalization (Min-Max Scaling)
Scales to range [0, 1].

\`\`\`python
from sklearn.preprocessing import MinMaxScaler

scaler = MinMaxScaler()
X_scaled = scaler.fit_transform(X)
# formula: (x - min) / (max - min)
\`\`\`

### Standardization (Z-score)
Scales to mean=0, std=1.

\`\`\`python
from sklearn.preprocessing import StandardScaler

scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)
# formula: (x - mean) / std
\`\`\`

## Encoding Categorical Variables

### One-Hot Encoding
Creates binary columns for each category.

\`\`\`python
from sklearn.preprocessing import OneHotEncoder

encoder = OneHotEncoder(sparse=False, drop="first")
encoded = encoder.fit_transform(df[["color"]])
# color: red -> [0, 0], blue -> [1, 0], green -> [0, 1]

# Pandas shortcut
df_encoded = pd.get_dummies(df, columns=["color"], drop_first=True)
\`\`\`

### Label Encoding
Assigns integer to each category.

\`\`\`python
from sklearn.preprocessing import LabelEncoder

le = LabelEncoder()
df["size_encoded"] = le.fit_transform(df["size"])
# small -> 0, medium -> 1, large -> 2
\`\`\`

## Feature Creation

\`\`\`python
# Date features
df["year"] = df["date"].dt.year
df["month"] = df["date"].dt.month
df["day_of_week"] = df["date"].dt.dayofweek
df["is_weekend"] = df["day_of_week"].isin([5, 6]).astype(int)

# Interaction features
df["price_per_sqft"] = df["price"] / df["sqft"]

# Binning continuous variables
df["age_group"] = pd.cut(df["age"],
    bins=[0, 18, 35, 50, 65, 100],
    labels=["Teen", "Young", "Middle", "Senior", "Elder"]
)

# Log transformation (for skewed data)
df["log_income"] = np.log1p(df["income"])
\`\`\`

## Dimensionality Reduction

### PCA (Principal Component Analysis)

\`\`\`python
from sklearn.decomposition import PCA

pca = PCA(n_components=2)
X_reduced = pca.fit_transform(X_scaled)
print(f"Variance explained: {pca.explained_variance_ratio_}")
\`\`\`

## Feature Selection

\`\`\`python
# Correlation analysis
corr = df.corr()
print(corr["target"].sort_values(ascending=False))

# SelectKBest
from sklearn.feature_selection import SelectKBest, f_classif
selector = SelectKBest(f_classif, k=10)
X_selected = selector.fit_transform(X, y)

# Feature importance from tree models
importances = model.feature_importances_
\`\`\``,


    'ml-9': `# Model Deployment

## What is Model Deployment?

Model deployment is the process of making your trained ML model available for real-world use — typically by serving it as an API endpoint that accepts input data and returns predictions.

## Saving and Loading Models

### Using Pickle

\`\`\`python
import pickle

# Save model
with open("model.pkl", "wb") as f:
    pickle.dump(model, f)

# Load model
with open("model.pkl", "rb") as f:
    loaded_model = pickle.load(f)

predictions = loaded_model.predict(new_data)
\`\`\`

### Using Joblib (better for large arrays)

\`\`\`python
import joblib

# Save
joblib.dump(model, "model.joblib")

# Load
loaded_model = joblib.load("model.joblib")
\`\`\`

## Creating an API with Flask

\`\`\`python
from flask import Flask, request, jsonify
import joblib
import numpy as np

app = Flask(__name__)
model = joblib.load("model.joblib")

@app.route("/predict", methods=["POST"])
def predict():
    data = request.json
    features = np.array(data["features"]).reshape(1, -1)
    prediction = model.predict(features)
    return jsonify({
        "prediction": int(prediction[0]),
        "status": "success"
    })

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
\`\`\`

## Creating an API with FastAPI

\`\`\`python
from fastapi import FastAPI
from pydantic import BaseModel
import joblib
import numpy as np

app = FastAPI()
model = joblib.load("model.joblib")

class PredictionRequest(BaseModel):
    features: list

@app.post("/predict")
def predict(request: PredictionRequest):
    features = np.array(request.features).reshape(1, -1)
    prediction = model.predict(features)
    return {"prediction": int(prediction[0])}
\`\`\`

## Docker Containerization

\`\`\`dockerfile
# Dockerfile
FROM python:3.9-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
EXPOSE 5000
CMD ["python", "app.py"]
\`\`\`

\`\`\`bash
# Build and run
docker build -t ml-api .
docker run -p 5000:5000 ml-api
\`\`\`

## Model Monitoring

### Key Metrics to Track
- **Prediction latency:** Response time
- **Throughput:** Requests per second
- **Data drift:** Input distribution changes
- **Model drift:** Performance degradation over time
- **Error rate:** Failed predictions

### Retraining Strategies
1. **Scheduled:** Retrain at fixed intervals (weekly/monthly)
2. **Triggered:** Retrain when performance drops below threshold
3. **Continuous:** Online learning, update with each new data point

## MLOps Best Practices

1. **Version Control:** Track model versions, data versions, code
2. **CI/CD Pipeline:** Automated testing and deployment
3. **A/B Testing:** Compare new model vs current in production
4. **Logging:** Log all predictions for debugging and auditing
5. **Rollback:** Ability to revert to a previous model version
6. **Scalability:** Handle varying prediction loads
7. **Security:** Validate inputs, rate limiting, authentication

## Cloud Deployment Options

| Platform | Service |
|----------|---------|
| AWS | SageMaker, Lambda, EC2 |
| Google Cloud | AI Platform, Cloud Run |
| Azure | Azure ML, Functions |
| Heroku | Web App deployment |
| Streamlit | Rapid prototyping |`,

    // ===================== DATA SCIENCE TOPICS =====================



    'ds-0': `# Introduction to Data Science

## What is Data Science?

Data Science is an interdisciplinary field that uses scientific methods, algorithms, and systems to extract knowledge and insights from structured and unstructured data. It combines **statistics**, **computer science**, and **domain expertise**.

### The Data Science Venn Diagram
- **Math & Statistics:** Probability, hypothesis testing, regression
- **Computer Science:** Programming, databases, algorithms
- **Domain Knowledge:** Business understanding, context

## The Data Science Process (CRISP-DM)

### 1. Business Understanding
Define the problem and objectives.
- What question are you trying to answer?
- What decisions will the results inform?

### 2. Data Collection
Gather relevant data from various sources.
\`\`\`python
import pandas as pd
# From files
df = pd.read_csv("sales_data.csv")
# From databases
# df = pd.read_sql("SELECT * FROM users", connection)
# From APIs
# import requests; data = requests.get(url).json()
\`\`\`

### 3. Data Cleaning
Handle missing values, outliers, formatting issues.
\`\`\`python
df.dropna()
df.fillna(df.mean())
df.drop_duplicates()
df["date"] = pd.to_datetime(df["date"])
\`\`\`

### 4. Exploratory Data Analysis (EDA)
Understand patterns, distributions, and relationships.
\`\`\`python
print(df.describe())
print(df.corr())
df.hist(figsize=(12, 8))
\`\`\`

### 5. Modeling
Apply statistical or ML models to the data.
\`\`\`python
from sklearn.linear_model import LinearRegression
model = LinearRegression()
model.fit(X_train, y_train)
\`\`\`

### 6. Communication
Present findings through reports, dashboards, and visualizations.

## Structured vs Unstructured Data

| Type | Examples | Storage |
|------|----------|---------|
| Structured | Tables, spreadsheets, SQL databases | Relational DB |
| Semi-structured | JSON, XML, emails | Document stores |
| Unstructured | Text, images, audio, video | Data lakes |

## Essential Tools and Technologies

### Programming Languages
- **Python:** Pandas, NumPy, Scikit-learn, TensorFlow
- **R:** ggplot2, dplyr, caret
- **SQL:** PostgreSQL, MySQL, SQLite

### Visualization
- Matplotlib, Seaborn (Python)
- Tableau, Power BI (Business tools)
- Plotly, D3.js (Interactive)

### Big Data
- Spark, Hadoop (distributed processing)
- AWS, GCP, Azure (cloud platforms)

## Career Paths in Data Science

- **Data Analyst:** Reports, dashboards, SQL
- **Data Scientist:** ML models, experiments, research
- **ML Engineer:** Deploy and scale models
- **Data Engineer:** Build data pipelines
- **BI Analyst:** Business insights and reporting`,


    'ds-1': `# Pandas for Data Analysis

## What is Pandas?

Pandas is the most popular Python library for data manipulation and analysis. Its core data structures are the **Series** (1D) and **DataFrame** (2D table).

## Creating DataFrames

\`\`\`python
import pandas as pd

# From dictionary
df = pd.DataFrame({
    "Product": ["Laptop", "Phone", "Tablet", "Monitor"],
    "Price": [999, 699, 399, 299],
    "Units": [50, 120, 80, 45],
    "Category": ["Electronics", "Electronics", "Electronics", "Accessories"]
})

# From CSV
df = pd.read_csv("sales.csv")

# From Excel
df = pd.read_excel("data.xlsx")
\`\`\`

## Data Exploration

\`\`\`python
df.head()          # First 5 rows
df.tail(3)         # Last 3 rows
df.shape           # (rows, columns)
df.columns         # Column names
df.dtypes          # Data types
df.info()          # Summary info
df.describe()      # Statistics (mean, std, min, max)
df.nunique()       # Unique count per column
df.value_counts()  # Value frequencies
\`\`\`

## Selecting Data

\`\`\`python
# Column selection
df["Price"]              # Single column (Series)
df[["Product", "Price"]] # Multiple columns (DataFrame)

# Row selection
df.iloc[0]       # First row by position
df.iloc[0:3]     # First 3 rows
df.loc[0]        # By label
df.loc[0:2, "Product":"Price"]  # Label-based slicing

# Conditional filtering
expensive = df[df["Price"] > 500]
electronics = df[df["Category"] == "Electronics"]
combo = df[(df["Price"] > 300) & (df["Units"] > 50)]
\`\`\`

## Data Manipulation

\`\`\`python
# Add new column
df["Revenue"] = df["Price"] * df["Units"]

# Drop column
df = df.drop("Category", axis=1)

# Rename columns
df = df.rename(columns={"Units": "Quantity"})

# Sort values
df_sorted = df.sort_values("Price", ascending=False)

# Apply function
df["Price_Category"] = df["Price"].apply(
    lambda x: "High" if x > 500 else "Low"
)

# Replace values
df["Category"] = df["Category"].replace("Electronics", "Tech")
\`\`\`

## Handling Missing Data

\`\`\`python
# Check for missing values
print(df.isnull().sum())
print(df.isnull().any())

# Fill missing values
df["Price"].fillna(df["Price"].mean(), inplace=True)
df["Category"].fillna("Unknown", inplace=True)

# Drop rows with missing values
df.dropna()
df.dropna(subset=["Price"])  # Only check Price column

# Interpolation
df["Value"].interpolate(method="linear")
\`\`\`

## GroupBy and Aggregation

\`\`\`python
# Group by category
grouped = df.groupby("Category")

# Single aggregation
print(grouped["Price"].mean())
print(grouped["Units"].sum())

# Multiple aggregations
summary = df.groupby("Category").agg({
    "Price": ["mean", "min", "max"],
    "Units": ["sum", "count"]
})

# Named aggregation
result = df.groupby("Category").agg(
    avg_price=("Price", "mean"),
    total_units=("Units", "sum"),
    num_products=("Product", "count")
)
\`\`\`

## Merging and Joining

\`\`\`python
# Merge (like SQL JOIN)
orders = pd.DataFrame({"product_id": [1,2,3], "qty": [5,3,7]})
products = pd.DataFrame({"product_id": [1,2,4], "name": ["A","B","D"]})

inner = pd.merge(orders, products, on="product_id", how="inner")
left = pd.merge(orders, products, on="product_id", how="left")
outer = pd.merge(orders, products, on="product_id", how="outer")

# Concatenate (stack)
combined = pd.concat([df1, df2], ignore_index=True)
\`\`\`

## Saving Data

\`\`\`python
df.to_csv("output.csv", index=False)
df.to_excel("output.xlsx", index=False)
df.to_json("output.json")
\`\`\``,


    'ds-2': `# Data Cleaning Techniques

## Why Data Cleaning is Important

"Garbage in, garbage out." Real-world data is messy — it contains missing values, duplicates, inconsistent formats, and outliers. Data cleaning typically consumes **60-80%** of a data scientist's time.

## Types of Data Quality Issues

| Issue | Example |
|-------|---------|
| Missing values | NaN, blank cells |
| Duplicates | Same record appears twice |
| Inconsistent formats | "NYC", "New York", "N.Y." |
| Wrong data types | "25" stored as string |
| Outliers | Age = 999 |
| Invalid values | Negative age, future dates |

## Handling Missing Values

\`\`\`python
import pandas as pd
import numpy as np

# Detect missing values
print(df.isnull().sum())
print(df.isnull().sum() / len(df) * 100)  # Percentage

# Strategy 1: Drop
df.dropna()                    # Drop rows with any NaN
df.dropna(thresh=3)            # Keep rows with >= 3 non-NaN
df.drop("col_with_many_nans", axis=1)  # Drop column

# Strategy 2: Fill with constant
df["col"].fillna(0, inplace=True)
df["col"].fillna("Unknown", inplace=True)

# Strategy 3: Fill with statistics
df["col"].fillna(df["col"].mean(), inplace=True)
df["col"].fillna(df["col"].median(), inplace=True)
df["col"].fillna(df["col"].mode()[0], inplace=True)

# Strategy 4: Forward/Backward fill
df["col"].fillna(method="ffill")  # Previous value
df["col"].fillna(method="bfill")  # Next value

# Strategy 5: Interpolation
df["col"].interpolate(method="linear")
\`\`\`

## Removing Duplicates

\`\`\`python
# Check duplicates
print(df.duplicated().sum())
print(df[df.duplicated()])

# Remove duplicates
df = df.drop_duplicates()
df = df.drop_duplicates(subset=["email"])  # Based on specific column
df = df.drop_duplicates(keep="last")  # Keep last occurrence
\`\`\`

## Fixing Data Types

\`\`\`python
# Check data types
print(df.dtypes)

# Convert types
df["age"] = df["age"].astype(int)
df["price"] = pd.to_numeric(df["price"], errors="coerce")
df["date"] = pd.to_datetime(df["date"])
df["category"] = df["category"].astype("category")
\`\`\`

## Standardizing Text Data

\`\`\`python
# Case standardization
df["city"] = df["city"].str.lower()
df["name"] = df["name"].str.title()

# Remove whitespace
df["text"] = df["text"].str.strip()
df["text"] = df["text"].str.replace(r"\\s+", " ", regex=True)

# Fix inconsistent values
mapping = {"NYC": "New York", "N.Y.": "New York", "LA": "Los Angeles"}
df["city"] = df["city"].replace(mapping)
\`\`\`

## Detecting and Handling Outliers

\`\`\`python
# Method 1: IQR (Interquartile Range)
Q1 = df["price"].quantile(0.25)
Q3 = df["price"].quantile(0.75)
IQR = Q3 - Q1
lower = Q1 - 1.5 * IQR
upper = Q3 + 1.5 * IQR
outliers = df[(df["price"] < lower) | (df["price"] > upper)]

# Method 2: Z-score
from scipy import stats
z_scores = stats.zscore(df["price"])
outliers = df[abs(z_scores) > 3]

# Handle outliers
df = df[(df["price"] >= lower) & (df["price"] <= upper)]  # Remove
df["price"] = df["price"].clip(lower, upper)  # Cap
\`\`\`

## Validation Rules

\`\`\`python
# Validate data quality
assert df["age"].between(0, 120).all(), "Invalid ages found"
assert df["email"].str.contains("@").all(), "Invalid emails"
assert df["date"].dt.year.between(2000, 2024).all(), "Date out of range"
assert df.duplicated().sum() == 0, "Duplicates remain"
\`\`\``,


    'ds-3': `# Exploratory Data Analysis

## What is EDA?

Exploratory Data Analysis (EDA) is the process of examining and visualizing data to understand its main characteristics, find patterns, spot anomalies, and form hypotheses — all BEFORE applying formal modeling.

## Types of Analysis

### 1. Univariate Analysis (One Variable)
Examining the distribution of a single variable.

\`\`\`python
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

# Numerical: histogram, box plot
df["price"].hist(bins=30, figsize=(10, 5))
plt.title("Price Distribution")
plt.show()

df.boxplot(column="price")
plt.show()

# Categorical: bar chart, value counts
df["category"].value_counts().plot(kind="bar")
plt.title("Category Frequencies")
plt.show()

# Statistics
print(df["price"].describe())
print(f"Skewness: {df['price'].skew():.2f}")
print(f"Kurtosis: {df['price'].kurtosis():.2f}")
\`\`\`

### 2. Bivariate Analysis (Two Variables)
Examining relationships between two variables.

\`\`\`python
# Numerical vs Numerical: scatter plot
plt.scatter(df["sqft"], df["price"], alpha=0.5)
plt.xlabel("Square Feet")
plt.ylabel("Price")
plt.title("Price vs Size")
plt.show()

# Numerical vs Categorical: box plot
df.boxplot(column="price", by="category")
plt.show()

# Categorical vs Categorical: cross-tabulation
pd.crosstab(df["category"], df["region"]).plot(kind="bar")
plt.show()
\`\`\`

### 3. Multivariate Analysis (Multiple Variables)
Examining relationships among many variables.

\`\`\`python
# Correlation matrix
corr = df.select_dtypes(include=[np.number]).corr()
sns.heatmap(corr, annot=True, cmap="coolwarm", center=0)
plt.title("Correlation Matrix")
plt.show()

# Pair plot
sns.pairplot(df[["price", "sqft", "bedrooms", "age"]])
plt.show()
\`\`\`

## Key Statistical Measures

### Central Tendency
\`\`\`python
mean = df["price"].mean()        # Average
median = df["price"].median()    # Middle value
mode = df["price"].mode()[0]     # Most frequent
\`\`\`

### Dispersion
\`\`\`python
variance = df["price"].var()     # Squared deviation
std_dev = df["price"].std()      # Standard deviation
range_val = df["price"].max() - df["price"].min()
iqr = df["price"].quantile(0.75) - df["price"].quantile(0.25)
\`\`\`

### Shape
\`\`\`python
skewness = df["price"].skew()    # Asymmetry
# Positive: right-skewed (tail toward right)
# Negative: left-skewed (tail toward left)
# Zero: symmetric

kurtosis = df["price"].kurtosis()  # Tail heaviness
# Positive: heavy tails (leptokurtic)
# Negative: light tails (platykurtic)
\`\`\`

## EDA Checklist

1. **Shape:** df.shape — how big is the data?
2. **Types:** df.dtypes — correct data types?
3. **Missing:** df.isnull().sum() — any missing values?
4. **Stats:** df.describe() — summary statistics
5. **Distribution:** Histograms for numerical columns
6. **Correlation:** Heatmap of correlations
7. **Outliers:** Box plots to find outliers
8. **Categories:** Value counts for categorical columns
9. **Relationships:** Scatter plots between key variables
10. **Target:** Distribution of the target variable

## Common Visualization for EDA

\`\`\`python
fig, axes = plt.subplots(2, 2, figsize=(14, 10))

# Distribution
axes[0, 0].hist(df["price"], bins=30, color="steelblue")
axes[0, 0].set_title("Price Distribution")

# Box plot
df.boxplot(column="price", by="type", ax=axes[0, 1])
axes[0, 1].set_title("Price by Type")

# Scatter
axes[1, 0].scatter(df["sqft"], df["price"], alpha=0.4)
axes[1, 0].set_title("Price vs SqFt")

# Correlation
sns.heatmap(df.corr(), annot=True, ax=axes[1, 1], cmap="YlOrRd")
axes[1, 1].set_title("Correlations")

plt.tight_layout()
plt.show()
\`\`\``,


    'ds-4': `# Data Visualization with Matplotlib

## Why Visualization Matters

Visualization transforms data into visual context — making patterns, trends, outliers, and correlations easier to understand than raw numbers.

## Basic Plots

### Line Plot
\`\`\`python
import matplotlib.pyplot as plt
import numpy as np

x = np.arange(1, 13)
revenue = [12, 15, 14, 18, 22, 25, 28, 30, 27, 32, 35, 40]

plt.figure(figsize=(10, 6))
plt.plot(x, revenue, color="blue", linewidth=2, marker="o")
plt.title("Monthly Revenue 2024", fontsize=16)
plt.xlabel("Month")
plt.ylabel("Revenue (in thousands)")
plt.grid(True, alpha=0.3)
plt.xticks(x, ["Jan","Feb","Mar","Apr","May","Jun",
               "Jul","Aug","Sep","Oct","Nov","Dec"])
plt.show()
\`\`\`

### Bar Chart
\`\`\`python
categories = ["Python", "JavaScript", "Java", "C++", "Go"]
popularity = [35, 28, 20, 10, 7]
colors = ["#3776AB", "#F7DF1E", "#f89820", "#00599C", "#00ADD8"]

plt.figure(figsize=(10, 6))
plt.bar(categories, popularity, color=colors, edgecolor="white")
plt.title("Programming Language Popularity")
plt.ylabel("Percentage (%)")

# Add value labels
for i, v in enumerate(popularity):
    plt.text(i, v + 0.5, f"{v}%", ha="center", fontweight="bold")
plt.show()
\`\`\`

### Scatter Plot
\`\`\`python
np.random.seed(42)
x = np.random.randn(200)
y = 2 * x + np.random.randn(200) * 0.5

plt.figure(figsize=(8, 6))
plt.scatter(x, y, c="steelblue", alpha=0.6, s=50, edgecolors="white")
plt.title("Scatter Plot with Trend")
plt.xlabel("Feature X")
plt.ylabel("Feature Y")
z = np.polyfit(x, y, 1)
p = np.poly1d(z)
plt.plot(sorted(x), p(sorted(x)), "r--", linewidth=2)
plt.show()
\`\`\`

### Histogram
\`\`\`python
data = np.random.randn(1000)

plt.figure(figsize=(10, 6))
plt.hist(data, bins=40, color="steelblue", edgecolor="white", alpha=0.8)
plt.axvline(data.mean(), color="red", linestyle="--", label=f"Mean: {data.mean():.2f}")
plt.axvline(np.median(data), color="green", linestyle="--", label=f"Median: {np.median(data):.2f}")
plt.title("Normal Distribution")
plt.xlabel("Value")
plt.ylabel("Frequency")
plt.legend()
plt.show()
\`\`\`

### Pie Chart
\`\`\`python
labels = ["Product A", "Product B", "Product C", "Product D"]
sizes = [35, 25, 20, 20]
explode = (0.05, 0, 0, 0)
colors = ["#ff9999", "#66b3ff", "#99ff99", "#ffcc99"]

plt.figure(figsize=(8, 8))
plt.pie(sizes, explode=explode, labels=labels, colors=colors,
        autopct="%1.1f%%", shadow=True, startangle=90)
plt.title("Market Share")
plt.show()
\`\`\`

## Advanced Features

### Subplots
\`\`\`python
fig, axes = plt.subplots(2, 2, figsize=(12, 10))

axes[0, 0].plot([1,2,3,4], [1,4,2,3])
axes[0, 0].set_title("Line Plot")

axes[0, 1].bar(["A","B","C"], [3, 7, 2])
axes[0, 1].set_title("Bar Chart")

axes[1, 0].scatter(np.random.rand(50), np.random.rand(50))
axes[1, 0].set_title("Scatter")

axes[1, 1].hist(np.random.randn(500), bins=20)
axes[1, 1].set_title("Histogram")

plt.suptitle("Multiple Plots", fontsize=16)
plt.tight_layout()
plt.show()
\`\`\`

### Customization
\`\`\`python
plt.style.use("seaborn-v0_8")  # Use style

fig, ax = plt.subplots(figsize=(10, 6))
ax.plot(x, y, "b-o", markersize=8, label="Data")
ax.set_title("Styled Plot", fontsize=18, fontweight="bold")
ax.set_xlabel("X Axis", fontsize=14)
ax.set_ylabel("Y Axis", fontsize=14)
ax.legend(fontsize=12)
ax.grid(True, alpha=0.3)
fig.savefig("plot.png", dpi=300, bbox_inches="tight")
\`\`\`

## Seaborn (Built on Matplotlib)

\`\`\`python
import seaborn as sns

# Heatmap
sns.heatmap(df.corr(), annot=True, cmap="coolwarm")

# Distribution
sns.histplot(df["price"], kde=True)
sns.boxplot(x="category", y="price", data=df)

# Relationships
sns.scatterplot(x="sqft", y="price", hue="type", data=df)
sns.pairplot(df[["price", "sqft", "bedrooms"]])
\`\`\``,


    'ds-5': `# Statistical Inference

## What is Statistical Inference?

Statistical inference draws conclusions about a **population** based on a **sample** of data. It allows us to make decisions and predictions beyond the observed data.

### Population vs Sample
- **Population:** The entire group of interest (all customers)
- **Sample:** A subset of the population (100 surveyed customers)
- **Parameter:** A value describing the population (population mean, mu)
- **Statistic:** A value describing the sample (sample mean, x-bar)

## Sampling Methods

| Method | Description |
|--------|-------------|
| Simple Random | Every member has equal chance |
| Stratified | Divide into groups, sample from each |
| Systematic | Every nth element |
| Cluster | Randomly select entire groups |
| Convenience | Easiest to reach (biased!) |

## Central Limit Theorem (CLT)

The CLT states that the distribution of **sample means** approaches a **normal distribution** as the sample size increases, regardless of the population's shape.

\`\`\`python
import numpy as np
import matplotlib.pyplot as plt

# Demonstrate CLT
population = np.random.exponential(2, 100000)  # Not normal!

sample_means = []
for _ in range(10000):
    sample = np.random.choice(population, size=30)
    sample_means.append(sample.mean())

plt.hist(sample_means, bins=50, edgecolor="white")
plt.title("Distribution of Sample Means (CLT)")
plt.xlabel("Sample Mean")
plt.show()
# Result: approximately normal!
\`\`\`

## Confidence Intervals

A **confidence interval** provides a range of values likely to contain the true population parameter.

\`\`\`python
from scipy import stats

data = [23, 25, 28, 30, 22, 27, 26, 24, 29, 31]

# 95% confidence interval for the mean
mean = np.mean(data)
se = stats.sem(data)  # Standard error
ci = stats.t.interval(0.95, len(data)-1, loc=mean, scale=se)
print(f"95% CI: ({ci[0]:.2f}, {ci[1]:.2f})")
print(f"Sample mean: {mean:.2f}")
\`\`\`

**Interpretation:** "We are 95% confident that the true population mean lies between the lower and upper bounds."

## Standard Error

The standard error measures how much the sample statistic varies from sample to sample.

\`\`\`python
# Standard Error = Standard Deviation / sqrt(n)
se = np.std(data, ddof=1) / np.sqrt(len(data))
\`\`\`

## Margin of Error

The margin of error is the range around the sample statistic.

\`\`\`
Margin of Error = Critical Value * Standard Error
\`\`\`

## Types of Estimation

### Point Estimate
A single value estimate of a population parameter.
\`\`\`python
point_estimate = np.mean(sample)  # Best guess for pop mean
\`\`\`

### Interval Estimate
A range of values (confidence interval).
\`\`\`python
# See confidence interval example above
\`\`\`

## Bias and Variance

- **Bias:** Systematic error in estimation (consistently over/under)
- **Variance:** How much estimates vary from sample to sample
- **Bias-Variance Trade-off:** Reducing one often increases the other

## Sample Size Determination

\`\`\`python
# Required sample size for desired margin of error
from scipy import stats

z = stats.norm.ppf(0.975)  # 1.96 for 95% CI
margin_of_error = 2
estimated_std = 10

n = (z * estimated_std / margin_of_error) ** 2
print(f"Required sample size: {int(np.ceil(n))}")
\`\`\``,


    'ds-6': `# Hypothesis Testing

## What is Hypothesis Testing?

Hypothesis testing is a statistical method to determine whether there is enough evidence in a sample to support or reject a claim about a population parameter.

## The Hypothesis Testing Framework

### Step 1: State Hypotheses
- **Null Hypothesis (H0):** No effect, no difference (status quo)
- **Alternative Hypothesis (H1/Ha):** There is an effect/difference

### Step 2: Choose Significance Level (alpha)
- Common values: 0.05 (5%), 0.01 (1%), 0.10 (10%)
- Alpha represents the probability of rejecting H0 when it's true

### Step 3: Calculate Test Statistic
- A number summarizing the sample evidence

### Step 4: Find p-value
- Probability of observing data as extreme as ours, assuming H0 is true

### Step 5: Make Decision
- If p-value < alpha: **Reject H0** (evidence supports H1)
- If p-value >= alpha: **Fail to reject H0** (insufficient evidence)

## Types of Tests

### One-Sample t-test
Compare a sample mean to a known value.

\`\`\`python
from scipy import stats

sample = [23, 25, 28, 30, 22, 27, 26, 24, 29, 31]
known_mean = 25  # Hypothesized population mean

t_stat, p_value = stats.ttest_1samp(sample, known_mean)
print(f"t-statistic: {t_stat:.4f}")
print(f"p-value: {p_value:.4f}")

alpha = 0.05
if p_value < alpha:
    print("Reject H0: significant difference")
else:
    print("Fail to reject H0: no significant difference")
\`\`\`

### Two-Sample t-test
Compare means of two groups.

\`\`\`python
group_a = [85, 90, 78, 92, 88, 95, 80]
group_b = [75, 82, 70, 85, 78, 72, 80]

t_stat, p_value = stats.ttest_ind(group_a, group_b)
print(f"t-statistic: {t_stat:.4f}")
print(f"p-value: {p_value:.4f}")
\`\`\`

### Paired t-test
Compare before/after measurements.

\`\`\`python
before = [85, 90, 78, 92, 88]
after = [90, 95, 82, 96, 92]

t_stat, p_value = stats.ttest_rel(before, after)
print(f"p-value: {p_value:.4f}")
\`\`\`

### Chi-Square Test
Test independence between categorical variables.

\`\`\`python
# Contingency table
observed = [[30, 10], [20, 40]]
chi2, p_value, dof, expected = stats.chi2_contingency(observed)
print(f"Chi-square: {chi2:.4f}, p-value: {p_value:.4f}")
\`\`\`

### ANOVA (F-test)
Compare means of 3+ groups.

\`\`\`python
group1 = [85, 90, 78]
group2 = [75, 82, 70]
group3 = [95, 88, 92]

f_stat, p_value = stats.f_oneway(group1, group2, group3)
print(f"F-statistic: {f_stat:.4f}, p-value: {p_value:.4f}")
\`\`\`

## Types of Errors

| | H0 True | H0 False |
|---|---------|----------|
| Reject H0 | Type I Error (alpha) | Correct |
| Fail to Reject | Correct | Type II Error (beta) |

- **Type I (False Positive):** Concluding there's an effect when there isn't
- **Type II (False Negative):** Missing a real effect
- **Power = 1 - beta:** Probability of detecting a real effect

## Practical Significance vs Statistical Significance

A result can be **statistically significant** but not **practically meaningful**. Always consider effect size alongside p-values.

\`\`\`python
# Cohen's d (effect size)
def cohens_d(group1, group2):
    n1, n2 = len(group1), len(group2)
    var1, var2 = np.var(group1, ddof=1), np.var(group2, ddof=1)
    pooled_std = np.sqrt(((n1-1)*var1 + (n2-1)*var2) / (n1+n2-2))
    return (np.mean(group1) - np.mean(group2)) / pooled_std

# Small: 0.2, Medium: 0.5, Large: 0.8
\`\`\``,


    'ds-7': `# Probability Fundamentals

## What is Probability?

Probability measures the likelihood of an event occurring. It ranges from 0 (impossible) to 1 (certain).

\`\`\`
P(A) = Number of favorable outcomes / Total outcomes
\`\`\`

## Basic Concepts

### Sample Space
The set of all possible outcomes.
\`\`\`python
# Coin flip
sample_space = {"Heads", "Tails"}

# Rolling a die
sample_space = {1, 2, 3, 4, 5, 6}

# Two coins
sample_space = {("H","H"), ("H","T"), ("T","H"), ("T","T")}
\`\`\`

### Events
A subset of the sample space.
\`\`\`python
# Event: rolling an even number
event = {2, 4, 6}
probability = len(event) / 6  # 0.5
\`\`\`

## Probability Rules

### Complement Rule
P(not A) = 1 - P(A)

### Addition Rule
\`\`\`python
# Mutually exclusive (can't occur together)
# P(A or B) = P(A) + P(B)
# Example: P(1 or 2 on die) = 1/6 + 1/6 = 2/6

# Not mutually exclusive
# P(A or B) = P(A) + P(B) - P(A and B)
\`\`\`

### Multiplication Rule
\`\`\`python
# Independent events
# P(A and B) = P(A) * P(B)
# Example: Two heads in a row = 0.5 * 0.5 = 0.25

# Dependent events
# P(A and B) = P(A) * P(B|A)
\`\`\`

## Conditional Probability

P(A|B) = P(A and B) / P(B)

The probability of A given that B has occurred.

\`\`\`python
# Example: Deck of cards
# P(King | Face card) = P(King and Face) / P(Face)
# = (4/52) / (12/52) = 4/12 = 1/3
\`\`\`

## Bayes' Theorem

Updates probability based on new evidence.

\`\`\`
P(A|B) = P(B|A) * P(A) / P(B)
\`\`\`

\`\`\`python
# Medical test example
# P(Disease) = 0.01 (prior)
# P(Positive | Disease) = 0.99 (sensitivity)
# P(Positive | No Disease) = 0.05 (false positive rate)

p_disease = 0.01
p_positive_given_disease = 0.99
p_positive_given_no_disease = 0.05

p_positive = (p_positive_given_disease * p_disease +
              p_positive_given_no_disease * (1 - p_disease))

p_disease_given_positive = (p_positive_given_disease * p_disease) / p_positive
print(f"P(Disease|Positive) = {p_disease_given_positive:.4f}")
# Only about 16.7%!
\`\`\`

## Probability Distributions

### Discrete Distributions

**Binomial:** Number of successes in n trials.
\`\`\`python
from scipy.stats import binom
# P(exactly 7 heads in 10 coin flips)
p = binom.pmf(k=7, n=10, p=0.5)
print(f"P(7 heads): {p:.4f}")
\`\`\`

**Poisson:** Number of events in a fixed interval.
\`\`\`python
from scipy.stats import poisson
# Average 5 emails/hour. P(exactly 3)?
p = poisson.pmf(k=3, mu=5)
\`\`\`

### Continuous Distributions

**Normal (Gaussian):** Bell-shaped, defined by mean and std.
\`\`\`python
from scipy.stats import norm
# P(score < 85) if mean=75, std=10
p = norm.cdf(85, loc=75, scale=10)
print(f"P(score < 85): {p:.4f}")

# 95th percentile
val = norm.ppf(0.95, loc=75, scale=10)
print(f"95th percentile: {val:.2f}")
\`\`\`

## Expected Value and Variance

\`\`\`python
# Expected value: E[X] = sum(xi * P(xi))
# Variance: Var(X) = E[(X - mu)^2]
# Standard Deviation = sqrt(Variance)

import numpy as np
data = [2, 4, 4, 4, 5, 5, 7, 9]
print(f"Mean: {np.mean(data):.2f}")
print(f"Variance: {np.var(data):.2f}")
print(f"Std Dev: {np.std(data):.2f}")
\`\`\``,


    'ds-8': `# SQL for Data Science

## What is SQL?

SQL (Structured Query Language) is the standard language for managing and querying relational databases. It is essential for data scientists to extract, filter, and aggregate data.

## Basic Queries

### SELECT - Retrieve Data
\`\`\`sql
-- Select all columns
SELECT * FROM users;

-- Select specific columns
SELECT name, email, age FROM users;

-- Unique values
SELECT DISTINCT city FROM users;

-- Limit results
SELECT * FROM users LIMIT 10;

-- Alias
SELECT name AS full_name, age AS user_age FROM users;
\`\`\`

### WHERE - Filter Rows
\`\`\`sql
SELECT * FROM users WHERE age > 25;
SELECT * FROM users WHERE city = 'New York';
SELECT * FROM users WHERE age BETWEEN 20 AND 30;
SELECT * FROM users WHERE name LIKE 'A%';    -- Starts with A
SELECT * FROM users WHERE city IN ('NYC', 'LA', 'Chicago');
SELECT * FROM users WHERE email IS NOT NULL;
SELECT * FROM users WHERE age > 25 AND city = 'NYC';
SELECT * FROM users WHERE age < 20 OR age > 60;
\`\`\`

### ORDER BY - Sort Results
\`\`\`sql
SELECT * FROM users ORDER BY age ASC;       -- Ascending
SELECT * FROM users ORDER BY age DESC;      -- Descending
SELECT * FROM users ORDER BY city, age DESC; -- Multiple columns
\`\`\`

## Aggregate Functions

\`\`\`sql
SELECT COUNT(*) FROM users;                 -- Count rows
SELECT COUNT(DISTINCT city) FROM users;     -- Count unique cities
SELECT AVG(age) FROM users;                 -- Average
SELECT SUM(salary) FROM users;              -- Sum
SELECT MAX(salary) FROM users;              -- Maximum
SELECT MIN(age) FROM users;                 -- Minimum
\`\`\`

## GROUP BY

\`\`\`sql
-- Count users per city
SELECT city, COUNT(*) AS user_count
FROM users
GROUP BY city;

-- Average salary by department
SELECT department, AVG(salary) AS avg_salary
FROM employees
GROUP BY department
HAVING AVG(salary) > 50000;   -- Filter groups
\`\`\`

## JOIN - Combine Tables

\`\`\`sql
-- INNER JOIN: matching rows from both tables
SELECT o.id, u.name, o.amount
FROM orders o
INNER JOIN users u ON o.user_id = u.id;

-- LEFT JOIN: all left table rows + matching right
SELECT u.name, o.amount
FROM users u
LEFT JOIN orders o ON u.id = o.user_id;

-- RIGHT JOIN: all right table rows + matching left
SELECT u.name, o.amount
FROM users u
RIGHT JOIN orders o ON u.id = o.user_id;

-- FULL OUTER JOIN: all rows from both tables
SELECT u.name, o.amount
FROM users u
FULL OUTER JOIN orders o ON u.id = o.user_id;
\`\`\`

## Subqueries

\`\`\`sql
-- Users with above-average salary
SELECT name, salary
FROM employees
WHERE salary > (SELECT AVG(salary) FROM employees);

-- Most recent order per user
SELECT *
FROM orders
WHERE (user_id, date) IN (
    SELECT user_id, MAX(date)
    FROM orders
    GROUP BY user_id
);
\`\`\`

## Window Functions

\`\`\`sql
-- Rank employees by salary within department
SELECT name, department, salary,
       RANK() OVER (PARTITION BY department ORDER BY salary DESC) as rank
FROM employees;

-- Running total
SELECT date, amount,
       SUM(amount) OVER (ORDER BY date) AS running_total
FROM transactions;
\`\`\`

## Common Data Science SQL Patterns

\`\`\`sql
-- Cohort analysis
SELECT DATE_TRUNC('month', signup_date) AS cohort,
       COUNT(DISTINCT user_id) AS users
FROM users GROUP BY 1;

-- Year-over-year growth
SELECT year, revenue,
       LAG(revenue) OVER (ORDER BY year) AS prev_year,
       (revenue - LAG(revenue) OVER (ORDER BY year)) * 100.0 /
       LAG(revenue) OVER (ORDER BY year) AS growth_pct
FROM annual_revenue;
\`\`\``,


    'ds-9': `# Big Data Concepts

## What is Big Data?

Big Data refers to datasets that are too large, fast, or complex for traditional data processing tools. It is characterized by the **5 Vs**.

### The 5 Vs of Big Data

| V | Description | Example |
|---|-------------|---------|
| **Volume** | Massive amount of data | Petabytes of social media data |
| **Velocity** | Speed of data generation | Real-time stock market feeds |
| **Variety** | Different types of data | Text, images, video, sensor data |
| **Veracity** | Quality and trustworthiness | Noisy or incomplete data |
| **Value** | Extracting useful insights | Business decisions from data |

## Big Data Technologies

### Apache Hadoop
A framework for distributed storage and processing.

**Components:**
- **HDFS (Hadoop Distributed File System):** Distributed storage across clusters
- **MapReduce:** Programming model for parallel processing
- **YARN:** Resource management

\`\`\`python
# MapReduce concept in Python
# Map: Apply function to each element
mapped = map(lambda x: (x, 1), words)

# Reduce: Aggregate results
from functools import reduce
total = reduce(lambda a, b: a + b, values)
\`\`\`

### Apache Spark
Fast, in-memory processing engine (10-100x faster than MapReduce).

\`\`\`python
from pyspark.sql import SparkSession

spark = SparkSession.builder.appName("MyApp").getOrCreate()

# Read data
df = spark.read.csv("big_data.csv", header=True, inferSchema=True)

# Transform
result = (df
    .filter(df["age"] > 25)
    .groupBy("city")
    .agg({"salary": "avg"})
    .orderBy("avg(salary)", ascending=False)
)

result.show()
\`\`\`

### Apache Kafka
Distributed streaming platform for real-time data.

**Use Cases:**
- Real-time analytics
- Log aggregation
- Event-driven architectures
- Stream processing pipelines

## Data Storage Solutions

### Data Warehouse vs Data Lake

| Feature | Data Warehouse | Data Lake |
|---------|---------------|-----------|
| Data Type | Structured | All types |
| Schema | Schema-on-write | Schema-on-read |
| Processing | Batch | Batch + streaming |
| Users | Business analysts | Data scientists |
| Tools | Snowflake, Redshift | S3, Azure Data Lake |

### NoSQL Databases

| Type | Use Case | Examples |
|------|----------|---------|
| Document | Flexible schemas | MongoDB, CouchDB |
| Key-Value | Caching, sessions | Redis, DynamoDB |
| Column | Analytics | Cassandra, HBase |
| Graph | Relationships | Neo4j, ArangoDB |

## ETL Pipelines

**ETL = Extract, Transform, Load**

\`\`\`python
# Simplified ETL example
# 1. EXTRACT from source
raw_data = extract_from_api("https://api.example.com/data")

# 2. TRANSFORM (clean, enrich)
cleaned = remove_duplicates(raw_data)
enriched = add_timestamps(cleaned)
formatted = convert_types(enriched)

# 3. LOAD into target
load_to_warehouse(formatted, "target_table")
\`\`\`

## Cloud Platforms

| Provider | Services |
|----------|----------|
| AWS | S3, Redshift, EMR, SageMaker, Kinesis |
| Google Cloud | BigQuery, Dataflow, Dataproc, Vertex AI |
| Azure | Synapse, Data Factory, Databricks, ML Studio |

## Scalability Concepts

- **Horizontal Scaling:** Add more machines (scale out)
- **Vertical Scaling:** Add more power to one machine (scale up)
- **Partitioning:** Split data across multiple nodes
- **Replication:** Copy data for fault tolerance
- **Sharding:** Distribute data across databases

## Career Skills for Big Data

1. **SQL** for querying large datasets
2. **Python/Scala** for Spark processing
3. **Cloud platforms** (AWS, GCP, Azure)
4. **Data pipeline tools** (Airflow, dbt)
5. **Distributed systems** understanding
6. **Data modeling** and warehousing`,

};
