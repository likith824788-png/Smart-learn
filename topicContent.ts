// Extended course content for each topic
export const TOPIC_CONTENT: { [key: string]: string } = {
    // Python Topics
    'py-0': `# Python Syntax Basics

Python is one of the most beginner-friendly programming languages, known for its clean and readable syntax. Unlike many other languages, Python uses indentation (whitespace) to define code blocks instead of curly braces.

## Key Concepts

**Indentation Rules:**
- Use 4 spaces for each indentation level (recommended by PEP 8)
- Mixing tabs and spaces can cause errors
- Consistent indentation is mandatory, not optional

**Comments:**
- Single-line comments start with #
- Multi-line comments use triple quotes """

**Print Statements:**
The print() function outputs text to the console. You can print strings, numbers, and variables.

**Basic Syntax Example:**
\`\`\`python
# This is a comment
name = "Python"
version = 3.11
print(f"Hello, {name} {version}!")

if version > 3:
    print("Modern Python!")
\`\`\`

**Best Practices:**
- Use meaningful variable names
- Follow PEP 8 style guidelines
- Write comments for complex logic
- Keep lines under 79 characters`,

    'py-1': `# Variables and Data Types

Python is dynamically typed, meaning you don't declare variable types explicitly. The interpreter determines the type based on the assigned value.

## Primitive Data Types

**Integers (int):** Whole numbers without decimal points
\`\`\`python
age = 25
count = -100
big_number = 1_000_000  # Underscores for readability
\`\`\`

**Floats (float):** Numbers with decimal points
\`\`\`python
price = 19.99
pi = 3.14159
scientific = 2.5e-3  # 0.0025
\`\`\`

**Strings (str):** Text enclosed in quotes
\`\`\`python
name = "Alice"
message = 'Hello World'
multiline = """This spans
multiple lines"""
\`\`\`

**Booleans (bool):** True or False values
\`\`\`python
is_active = True
has_permission = False
\`\`\`

## Type Checking and Conversion
\`\`\`python
x = 42
print(type(x))  # <class 'int'>
y = str(x)      # Convert to string "42"
z = float(x)    # Convert to float 42.0
\`\`\`

**Variable Naming Rules:**
- Must start with letter or underscore
- Can contain letters, numbers, underscores
- Case-sensitive (Name ≠ name)
- Cannot use Python keywords`,

    'py-2': `# Control Flow - Loops

Loops allow you to execute code repeatedly. Python provides two main loop types: for loops and while loops.

## For Loops

For loops iterate over sequences (lists, strings, ranges, etc.):

\`\`\`python
# Iterating over a list
fruits = ["apple", "banana", "cherry"]
for fruit in fruits:
    print(fruit)

# Using range()
for i in range(5):  # 0 to 4
    print(i)

# Range with start, stop, step
for i in range(0, 10, 2):  # 0, 2, 4, 6, 8
    print(i)
\`\`\`

## While Loops

While loops continue as long as a condition is True:

\`\`\`python
count = 0
while count < 5:
    print(count)
    count += 1
\`\`\`

## Loop Control Statements

**break:** Exit the loop immediately
**continue:** Skip to next iteration
**else:** Execute after loop completes normally

\`\`\`python
for num in range(10):
    if num == 5:
        break      # Exit loop
    if num % 2 == 0:
        continue   # Skip even numbers
    print(num)
else:
    print("Loop completed")  # Won't run if break occurred
\`\`\`

## Nested Loops
\`\`\`python
for i in range(3):
    for j in range(3):
        print(f"({i}, {j})")
\`\`\``,

    'py-3': `# Functions in Python

Functions are reusable blocks of code that perform specific tasks. They help organize code and avoid repetition.

## Defining Functions

\`\`\`python
def greet(name):
    """This is a docstring - describes the function"""
    return f"Hello, {name}!"

result = greet("Alice")
print(result)  # Hello, Alice!
\`\`\`

## Parameters and Arguments

**Positional Arguments:**
\`\`\`python
def add(a, b):
    return a + b

add(5, 3)  # a=5, b=3
\`\`\`

**Default Parameters:**
\`\`\`python
def greet(name, greeting="Hello"):
    return f"{greeting}, {name}!"

greet("Bob")              # Hello, Bob!
greet("Bob", "Hi")        # Hi, Bob!
\`\`\`

**Keyword Arguments:**
\`\`\`python
def create_user(name, age, city):
    return {"name": name, "age": age, "city": city}

create_user(age=25, name="Alice", city="NYC")
\`\`\`

## *args and **kwargs

\`\`\`python
def sum_all(*args):
    return sum(args)

sum_all(1, 2, 3, 4, 5)  # 15

def print_info(**kwargs):
    for key, value in kwargs.items():
        print(f"{key}: {value}")

print_info(name="Alice", age=25)
\`\`\`

## Lambda Functions
\`\`\`python
square = lambda x: x ** 2
numbers = [1, 2, 3, 4, 5]
squared = list(map(lambda x: x**2, numbers))
\`\`\``,

    'py-4': `# Lists and List Comprehension

Lists are ordered, mutable collections that can hold items of different types.

## Creating Lists
\`\`\`python
empty_list = []
numbers = [1, 2, 3, 4, 5]
mixed = [1, "hello", 3.14, True]
nested = [[1, 2], [3, 4], [5, 6]]
\`\`\`

## Accessing Elements
\`\`\`python
fruits = ["apple", "banana", "cherry", "date"]
print(fruits[0])    # apple (first)
print(fruits[-1])   # date (last)
print(fruits[1:3])  # ['banana', 'cherry'] (slicing)
\`\`\`

## Common Methods
\`\`\`python
nums = [3, 1, 4, 1, 5]
nums.append(9)      # Add to end
nums.insert(0, 2)   # Insert at index
nums.extend([2, 6]) # Add multiple
nums.remove(1)      # Remove first occurrence
nums.pop()          # Remove and return last
nums.sort()         # Sort in place
nums.reverse()      # Reverse in place
len(nums)           # Get length
\`\`\`

## List Comprehension

A concise way to create lists:

\`\`\`python
# Traditional approach
squares = []
for x in range(10):
    squares.append(x ** 2)

# List comprehension
squares = [x ** 2 for x in range(10)]

# With condition
evens = [x for x in range(20) if x % 2 == 0]

# Nested comprehension
matrix = [[i*j for j in range(5)] for i in range(5)]
\`\`\`

## Useful Operations
\`\`\`python
nums = [1, 2, 3]
print(sum(nums))     # 6
print(max(nums))     # 3
print(min(nums))     # 1
print(2 in nums)     # True
\`\`\``,

    'py-5': `# Dictionaries

Dictionaries store key-value pairs. Keys must be immutable (strings, numbers, tuples), and values can be any type.

## Creating Dictionaries
\`\`\`python
empty = {}
person = {"name": "Alice", "age": 30, "city": "NYC"}
using_dict = dict(name="Bob", age=25)
\`\`\`

## Accessing Values
\`\`\`python
person = {"name": "Alice", "age": 30}
print(person["name"])        # Alice
print(person.get("email"))   # None (no error)
print(person.get("email", "N/A"))  # N/A (default)
\`\`\`

## Modifying Dictionaries
\`\`\`python
person = {"name": "Alice", "age": 30}
person["email"] = "alice@email.com"  # Add new key
person["age"] = 31                    # Update value
del person["age"]                     # Delete key
person.pop("email")                   # Remove and return
person.update({"city": "LA", "job": "Engineer"})
\`\`\`

## Dictionary Methods
\`\`\`python
person = {"name": "Alice", "age": 30}
print(person.keys())    # dict_keys(['name', 'age'])
print(person.values())  # dict_values(['Alice', 30])
print(person.items())   # dict_items([('name', 'Alice'), ('age', 30)])
\`\`\`

## Iterating Over Dictionaries
\`\`\`python
scores = {"math": 90, "english": 85, "science": 92}

for subject in scores:
    print(subject)

for subject, score in scores.items():
    print(f"{subject}: {score}")
\`\`\`

## Dictionary Comprehension
\`\`\`python
squares = {x: x**2 for x in range(6)}
# {0: 0, 1: 1, 2: 4, 3: 9, 4: 16, 5: 25}
\`\`\``,

    // ML Topics - First few
    'ml-0': `# Introduction to Machine Learning

Machine Learning (ML) is a subset of Artificial Intelligence that enables computers to learn patterns from data without being explicitly programmed.

## What is Machine Learning?

Traditional programming follows explicit rules:
- Input → Rules → Output

Machine Learning reverses this:
- Input + Output → Model learns Rules

## Types of Machine Learning

**1. Supervised Learning**
- Learns from labeled data
- Examples: Classification, Regression
- Use cases: Spam detection, price prediction

**2. Unsupervised Learning**
- Finds patterns in unlabeled data
- Examples: Clustering, Dimensionality Reduction
- Use cases: Customer segmentation, anomaly detection

**3. Reinforcement Learning**
- Learns through trial and error
- Agent receives rewards/penalties
- Use cases: Game AI, robotics

## The ML Workflow

1. **Data Collection:** Gather relevant data
2. **Data Preprocessing:** Clean and prepare data
3. **Feature Engineering:** Select/create features
4. **Model Selection:** Choose appropriate algorithm
5. **Training:** Fit model to data
6. **Evaluation:** Test performance
7. **Deployment:** Put model into production

## Key Terminology

- **Features:** Input variables (X)
- **Labels:** Output/target variable (Y)
- **Training Set:** Data used to train model
- **Test Set:** Data used to evaluate model
- **Model:** Mathematical representation learned from data
- **Prediction:** Output generated by the model`,

    'ml-1': `# Linear Regression

Linear Regression is a fundamental supervised learning algorithm used to predict continuous numerical values.

## The Concept

Linear regression finds the best-fitting straight line through data points. The line is defined by the equation:

**y = mx + b**
- y: Predicted value
- m: Slope (coefficient)
- x: Input feature
- b: Y-intercept (bias)

## How It Works

1. Start with random line parameters
2. Calculate predictions for all points
3. Measure error (difference from actual values)
4. Adjust parameters to reduce error
5. Repeat until error is minimized

## Cost Function

Mean Squared Error (MSE) measures prediction accuracy:

\`\`\`
MSE = (1/n) × Σ(actual - predicted)²
\`\`\`

Lower MSE = Better model

## Implementation with Scikit-learn

\`\`\`python
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split

# Split data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)

# Create and train model
model = LinearRegression()
model.fit(X_train, y_train)

# Make predictions
predictions = model.predict(X_test)

# Evaluate
from sklearn.metrics import mean_squared_error, r2_score
mse = mean_squared_error(y_test, predictions)
r2 = r2_score(y_test, predictions)
\`\`\`

## Assumptions

1. Linear relationship between X and Y
2. Independence of observations
3. Homoscedasticity (constant variance)
4. Normal distribution of residuals`,

    // DS Topics - First few
    'ds-0': `# Introduction to Data Science

Data Science is an interdisciplinary field that uses scientific methods, algorithms, and systems to extract insights from structured and unstructured data.

## What is Data Science?

Data Science combines:
- **Statistics:** Understanding data distributions
- **Computer Science:** Programming and algorithms
- **Domain Expertise:** Industry-specific knowledge

## The Data Science Process

1. **Problem Definition**
   - What question are we trying to answer?
   - What would success look like?

2. **Data Collection**
   - Databases, APIs, web scraping
   - Surveys, sensors, logs

3. **Data Cleaning**
   - Handle missing values
   - Remove duplicates
   - Fix inconsistencies

4. **Exploratory Data Analysis (EDA)**
   - Understand data structure
   - Find patterns and anomalies
   - Create visualizations

5. **Modeling**
   - Choose appropriate algorithms
   - Train and validate models
   - Tune hyperparameters

6. **Communication**
   - Present findings clearly
   - Create dashboards
   - Write reports

## Essential Tools

**Programming:**
- Python (Pandas, NumPy, Scikit-learn)
- R (ggplot2, dplyr)
- SQL

**Visualization:**
- Matplotlib, Seaborn
- Tableau, Power BI

**Big Data:**
- Spark, Hadoop
- Cloud platforms (AWS, GCP, Azure)

## Career Paths

- Data Analyst
- Data Scientist
- Machine Learning Engineer
- Data Engineer
- Business Intelligence Analyst`
};
