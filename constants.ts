import { Course, ClusterType } from './types';

export const determineCluster = (score: number): ClusterType => {
  if (score >= 7) return ClusterType.ADVANCE;
  if (score >= 4) return ClusterType.INTERMEDIATE;
  if (score >= 4) return ClusterType.INTERMEDIATE;
  return ClusterType.EXPLORER;
};

export const calculateBadge = (percentage: number) => {
  const correct = Math.round(percentage / 10); // assumes 10 questions per quiz
  if (correct >= 9) return 'Gold';
  if (correct >= 7) return 'Silver';
  if (correct >= 4) return 'Bronze';
  return 'Novice';
};

export const ONBOARDING_QUESTIONS = [
  // PYTHON (1 Easy, 1 Medium, 1 Hard)
  {
    id: 1,
    course: 'Python',
    difficulty: 'Easy',
    question: "What is the correct file extension for Python files?",
    options: [".python", ".py", ".pt", ".p"],
    correctAnswer: 1 // .py
  },
  {
    id: 2,
    course: 'Python',
    difficulty: 'Medium',
    question: "Which of these is a mutable data type in Python?",
    options: ["Tuple", "String", "List", "Integer"],
    correctAnswer: 2 // List
  },
  {
    id: 3,
    course: 'Python',
    difficulty: 'Hard',
    question: "What is the output of: print([x for x in range(3) if x % 2 == 0])?",
    options: ["[0, 2]", "[0, 1, 2]", "[1, 2]", "[0]"],
    correctAnswer: 0 // [0, 2] - Actually range(3) is 0,1,2. 0%2==0(T), 1%2==0(F), 2%2==0(T). So [0, 2].
  },

  // MACHINE LEARNING (1 Easy, 1 Medium, 1 Hard)
  {
    id: 4,
    course: 'Machine Learning',
    difficulty: 'Easy',
    question: "Which type of learning uses labeled data?",
    options: ["Unsupervised Learning", "Reinforcement Learning", "Supervised Learning", "Clustering"],
    correctAnswer: 2 // Supervised
  },
  {
    id: 5,
    course: 'Machine Learning',
    difficulty: 'Medium',
    question: "Which algorithm is typically used for classification problems?",
    options: ["Linear Regression", "Logistic Regression", "K-Means", "PCA"],
    correctAnswer: 1 // Logistic Regression
  },
  {
    id: 6,
    course: 'Machine Learning',
    difficulty: 'Hard',
    question: "What is the 'Vanishing Gradient' problem associated with?",
    options: ["Decision Trees", "Deep Neural Networks", "SVM", "K-Nearest Neighbors"],
    correctAnswer: 1 // DNN
  },

  // DATA SCIENCE (1 Easy, 1 Medium, 1 Hard)
  {
    id: 7,
    course: 'Data Science',
    difficulty: 'Easy',
    question: "Which library is primarily used for data manipulation in Python?",
    options: ["Matplotlib", "Seaborn", "Pandas", "Scikit-learn"],
    correctAnswer: 2 // Pandas
  },
  {
    id: 8,
    course: 'Data Science',
    difficulty: 'Medium',
    question: "In a box plot, what does the box represent?",
    options: ["Mean and Median", "The entire range", "Interquartile Range (IQR)", "Standard Deviation"],
    correctAnswer: 2 // IQR
  },
  {
    id: 9,
    course: 'Data Science',
    difficulty: 'Hard',
    question: "Which theorem states that the sampling distribution of the sample mean approximates a normal distribution?",
    options: ["Bayes' Theorem", "Central Limit Theorem", "Pythagorean Theorem", "Law of Large Numbers"],
    correctAnswer: 1 // CLT
  }
];

export const COURSES: Course[] = [
  {
    id: 'python-101',
    title: 'Python Programming',
    description: 'Master the basics of Python, from syntax to object-oriented programming.',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
    topics: [
      {
        id: 'py-0',
        title: 'Python Syntax Basics',
        videoUrl: 'https://www.youtube.com/embed/kqtD5dpn9C8',
        bookContent: 'Python uses indentation to define code blocks. Variables are created when you assign a value to them. Python is dynamically typed, meaning you don\'t need to declare variable types.',
        quizzes: [{
          id: 'assessment', title: 'Topic Assessment',
          questions: [
            { id: 1, text: "Which symbol initiates a comment in Python?", options: ["//", "#", "/*", "<!--"], correctAnswer: 1 },
            { id: 2, text: "Python uses indentation to...", options: ["Indent code", "Define blocks of code", "Make it look nice", "Comment"], correctAnswer: 1 },
            { id: 3, text: "Correct file extension for Python?", options: [".py", ".python", ".pt", ".p"], correctAnswer: 0 },
            { id: 4, text: "How to print 'Hello'?", options: ["echo 'Hello'", "print('Hello')", "console.log('Hello')", "printf('Hello')"], correctAnswer: 1 },
            { id: 5, text: "Is Python case-sensitive?", options: ["Yes", "No", "Only for variables", "Only for functions"], correctAnswer: 0 },
            { id: 6, text: "Which variable name is invalid?", options: ["my_var", "_myvar", "2myvar", "myVar"], correctAnswer: 2 },
            { id: 7, text: "Which function gets input from user?", options: ["get()", "input()", "scan()", "cin"], correctAnswer: 1 },
            { id: 8, text: "Is a semicolon required at end of line?", options: ["Yes", "No", "Sometimes", "Only in loops"], correctAnswer: 1 },
            { id: 9, text: "What creates a variable?", options: ["var x", "int x", "Assigning a value", "declare x"], correctAnswer: 2 },
            { id: 10, text: "Multiline comments can be created with?", options: ["Triple quotes", "Double slash", "#*", "<!--"], correctAnswer: 0 }
          ]
        }]
      },
      {
        id: 'py-1',
        title: 'Variables and Data Types',
        videoUrl: 'https://www.youtube.com/embed/cQT33yu9pY8',
        bookContent: 'Python has several built-in data types: integers, floats, strings, booleans, lists, tuples, dictionaries, and sets. Use type() to check the type of any variable.',
        quizzes: [{
          id: 'assessment', title: 'Topic Assessment',
          questions: [
            { id: 1, text: "Which is an integer?", options: ["5", "5.0", "'5'", "[5]"], correctAnswer: 0 },
            { id: 2, text: "Which is a float?", options: ["10", "10.5", "'10.5'", "Ten"], correctAnswer: 1 },
            { id: 3, text: "Function to check type?", options: ["check()", "typeof()", "type()", "class()"], correctAnswer: 2 },
            { id: 4, text: "Is a string mutable?", options: ["Yes", "No", "Sometimes", "If short"], correctAnswer: 1 },
            { id: 5, text: "Which defines a list?", options: ["()", "{}", "[]", "<>"], correctAnswer: 2 },
            { id: 6, text: "Which defines a tuple?", options: ["()", "{}", "[]", "<>"], correctAnswer: 0 },
            { id: 7, text: "Which defines a dictionary?", options: ["()", "{key:value}", "[]", "<>"], correctAnswer: 1 },
            { id: 8, text: "Boolean values are...", options: ["True/False", "Yes/No", "1/0", "All of above"], correctAnswer: 0 },
            { id: 9, text: "Can you change a tuple?", options: ["Yes", "No", "Only append", "Only sort"], correctAnswer: 1 },
            { id: 10, text: "Convert int 5 to float?", options: ["float(5)", "int(5)", "str(5)", "5.0()"], correctAnswer: 0 }
          ]
        }]
      },
      {
        id: 'py-2',
        title: 'Control Flow - Loops',
        videoUrl: 'https://www.youtube.com/embed/6iF8Xb7Z3wQ',
        bookContent: 'Python supports for loops and while loops. The for loop iterates over sequences (lists, tuples, strings). The while loop executes as long as a condition is true.',
        quizzes: [{
          id: 'assessment', title: 'Topic Assessment',
          questions: [
            { id: 1, text: "Start a for loop?", options: ["for x in y:", "foreach x in y", "loop x in y", "for (x in y)"], correctAnswer: 0 },
            { id: 2, text: "Start a while loop?", options: ["while x < 5:", "while (x < 5)", "do while x < 5", "loop while"], correctAnswer: 0 },
            { id: 3, text: "Stop a loop?", options: ["exit", "break", "stop", "return"], correctAnswer: 1 },
            { id: 4, text: "Skip current iteration?", options: ["break", "pass", "continue", "skip"], correctAnswer: 2 },
            { id: 5, text: "range(5) generates?", options: ["1,2,3,4,5", "0,1,2,3,4", "1-5", "0-5"], correctAnswer: 1 },
            { id: 6, text: "Can you loop through a string?", options: ["Yes", "No", "Only words", "Only lines"], correctAnswer: 0 },
            { id: 7, text: "What is 'pass'?", options: ["Correct answer", "Null operation", "Break", "Continue"], correctAnswer: 1 },
            { id: 8, text: "Nested loops are...", options: ["Allowed", "Forbidden", "Only 2 levels", "Only 3 levels"], correctAnswer: 0 },
            { id: 9, text: "Else clause in loop executes when?", options: ["Loop breaks", "Loop finishes normally", "Always", "Never"], correctAnswer: 1 },
            { id: 10, text: "Correct while syntax?", options: ["while x > 5:", "while x > 5 {}", "while x > 5 then", "if while"], correctAnswer: 0 }
          ]
        }]
      },
      {
        id: 'py-3',
        title: 'Functions',
        videoUrl: 'https://www.youtube.com/embed/9Os0o3wzS_I',
        bookContent: 'Functions are defined using the def keyword. They can accept parameters and return values. Python supports default arguments, *args, and **kwargs for flexible function signatures.',
        quizzes: [{
          id: 'assessment', title: 'Topic Assessment',
          questions: [
            { id: 1, text: "Define a function?", options: ["function x()", "def x():", "func x()", "define x"], correctAnswer: 1 },
            { id: 2, text: "Return a value?", options: ["output x", "return x", "send x", "value x"], correctAnswer: 1 },
            { id: 3, text: "Parameter vs Argument?", options: ["Same thing", "Param in def, Arg in call", "Arg in def, Param in call", "No difference"], correctAnswer: 1 },
            { id: 4, text: "Default parameter value?", options: ["def x(a=1):", "def x(a:1)", "def x(a==1)", "def x(a=default)"], correctAnswer: 0 },
            { id: 5, text: "Variable length args?", options: ["*args", "**kwargs", "args[]", "...args"], correctAnswer: 0 },
            { id: 6, text: "Keyword args?", options: ["*args", "**kwargs", "args{}", "key=value"], correctAnswer: 1 },
            { id: 7, text: "Anonymous function?", options: ["lambda", "anonymous", "def", "inline"], correctAnswer: 0 },
            { id: 8, text: "Global variable inside function?", options: ["global x", "extern x", "var x", "import x"], correctAnswer: 0 },
            { id: 9, text: "Recursion is...", options: ["Function calling itself", "Looping", "Importing", "Error"], correctAnswer: 0 },
            { id: 10, text: "Docstring?", options: ["Documentation string", "Variable type", "Function name", "Return value"], correctAnswer: 0 }
          ]
        }]
      },
      {
        id: 'py-4',
        title: 'Lists and List Comprehension',
        videoUrl: 'https://www.youtube.com/embed/AhSvKGTh28Q',
        bookContent: 'Lists are ordered, mutable collections. List comprehension provides a concise way to create lists: [x**2 for x in range(10)]. Common methods: append(), extend(), pop(), sort().',
        quizzes: [{
          id: 'assessment', title: 'Topic Assessment',
          questions: [
            { id: 1, text: "Add to end of list?", options: ["add()", "append()", "insert()", "push()"], correctAnswer: 1 },
            { id: 2, text: "Remove item by index?", options: ["remove()", "pop()", "del()", "clear()"], correctAnswer: 1 },
            { id: 3, text: "Access first item?", options: ["list[0]", "list[1]", "list.first()", "list.get(0)"], correctAnswer: 0 },
            { id: 4, text: "List comprehension syntax?", options: ["[expr for item in list]", "{expr for item}", "(expr for item)", "loop in list"], correctAnswer: 0 },
            { id: 5, text: "Sort a list?", options: ["list.sort()", "sort(list)", "order(list)", "list.order()"], correctAnswer: 0 },
            { id: 6, text: "Length of list?", options: ["length(list)", "len(list)", "list.len", "list.size"], correctAnswer: 1 },
            { id: 7, text: "Negative indexing?", options: ["Access from end", "Error", "Access from start", "Reverse"], correctAnswer: 0 },
            { id: 8, text: "Slicing list[1:3]?", options: ["Items at 1, 2, 3", "Items at 1, 2", "Items at 0, 1, 2", "Items at 2, 3"], correctAnswer: 1 },
            { id: 9, text: "Combine two lists?", options: ["list1 + list2", "list1.add(list2)", "merge(list1, list2)", "combine()"], correctAnswer: 0 },
            { id: 10, text: "Check if item in list?", options: ["if x in list", "if list.has(x)", "if list.contains(x)", "check()"], correctAnswer: 0 }
          ]
        }]
      },
      {
        id: 'py-5',
        title: 'Dictionaries',
        videoUrl: 'https://www.youtube.com/embed/daefaLgNkw0',
        bookContent: 'Dictionaries store key-value pairs. Keys must be immutable (strings, numbers, tuples). Access values using dict[key] or dict.get(key). Methods: keys(), values(), items().',
        quizzes: [{
          id: 'assessment', title: 'Topic Assessment',
          questions: [
            { id: 1, text: "Format of dictionary?", options: ["{key:value}", "[key,value]", "(key,value)", "key=value"], correctAnswer: 0 },
            { id: 2, text: "Access value by key?", options: ["dict[key]", "dict(key)", "dict.key", "dict->key"], correctAnswer: 0 },
            { id: 3, text: "Safe way to access key?", options: ["dict.get(key)", "dict[key]", "dict.fetch(key)", "dict.find(key)"], correctAnswer: 0 },
            { id: 4, text: "Get all keys?", options: ["dict.keys()", "dict.all()", "dict.list()", "keys(dict)"], correctAnswer: 0 },
            { id: 5, text: "Get all values?", options: ["dict.values()", "dict.vals()", "values(dict)", "dict.get_values()"], correctAnswer: 0 },
            { id: 6, text: "Remove key-value pair?", options: ["pop()", "remove()", "delete()", "cut()"], correctAnswer: 0 },
            { id: 7, text: "Are keys unique?", options: ["Yes", "No", "Only strings", "Only numbers"], correctAnswer: 0 },
            { id: 8, text: "Can values be lists?", options: ["Yes", "No", "Only tuples", "Only strings"], correctAnswer: 0 },
            { id: 9, text: "Change value?", options: ["dict[key] = new_val", "dict.add(key, new_val)", "dict.change()", "dict.update()"], correctAnswer: 0 },
            { id: 10, text: "Iterate over dictionary?", options: ["for key in dict:", "for x in dict.values", "Both correct", "None"], correctAnswer: 2 }
          ]
        }]
      },
      {
        id: 'py-6',
        title: 'File Handling',
        videoUrl: 'https://www.youtube.com/embed/Uh2ebFW8OYM',
        bookContent: 'Use open() to work with files. Modes: r (read), w (write), a (append). Always use "with" statement for automatic file closing. Read methods: read(), readline(), readlines().',
        quizzes: [{
          id: 'assessment', title: 'Topic Assessment',
          questions: [
            { id: 1, text: "Function to open file?", options: ["open()", "file()", "load()", "read()"], correctAnswer: 0 },
            { id: 2, text: "Mode for reading?", options: ["'r'", "'w'", "'a'", "'x'"], correctAnswer: 0 },
            { id: 3, text: "Mode for writing (overwrite)?", options: ["'w'", "'r'", "'a'", "'rw'"], correctAnswer: 0 },
            { id: 4, text: "Mode for appending?", options: ["'a'", "'w'", "'p'", "'add'"], correctAnswer: 0 },
            { id: 5, text: "Why use 'with open...'?", options: ["Auto-closes file", "Faster", "Less code", "Required"], correctAnswer: 0 },
            { id: 6, text: "Read entire file?", options: ["read()", "readline()", "readlines()", "fetch()"], correctAnswer: 0 },
            { id: 7, text: "Read one line?", options: ["readline()", "read()", "next()", "line()"], correctAnswer: 0 },
            { id: 8, text: "Read lines into list?", options: ["readlines()", "list()", "readall()", "lines()"], correctAnswer: 0 },
            { id: 9, text: "Close file manually?", options: ["close()", "end()", "stop()", "finish()"], correctAnswer: 0 },
            { id: 10, text: "Check if file exists?", options: ["os.path.exists()", "file.exists()", "check()", "open()"], correctAnswer: 0 }
          ]
        }]
      },
      {
        id: 'py-7',
        title: 'Modules and Packages',
        videoUrl: 'https://www.youtube.com/embed/CqvZ3vGoGs0',
        bookContent: 'Modules are Python files containing functions and variables. Import using: import module or from module import function. Create packages by adding __init__.py to directories.',
        quizzes: [{
          id: 'assessment', title: 'Topic Assessment',
          questions: [
            { id: 1, text: "What is a module?", options: ["Python file with code", "Folder", "Function", "Class"], correctAnswer: 0 },
            { id: 2, text: "How to import module 'math'?", options: ["import math", "include math", "using math", "#include math"], correctAnswer: 0 },
            { id: 3, text: "Import specific function?", options: ["from math import sqrt", "import sqrt from math", "using math.sqrt", "get sqrt"], correctAnswer: 0 },
            { id: 4, text: "Alias a module?", options: ["import math as m", "import math alias m", "alias math m", "name math m"], correctAnswer: 0 },
            { id: 5, text: "List functions in module?", options: ["dir()", "list()", "help()", "show()"], correctAnswer: 0 },
            { id: 6, text: "What is a package?", options: ["Directory with __init__.py", "Zip file", "Exe file", "Variable"], correctAnswer: 0 },
            { id: 7, text: "Standard library included?", options: ["Yes", "No", "Sometimes", "Only math"], correctAnswer: 0 },
            { id: 8, text: "Install external package?", options: ["pip install pkg", "npm install pkg", "apt install pkg", "python install"], correctAnswer: 0 },
            { id: 9, text: "Where does Python look for imports?", options: ["sys.path", "C drive", "Desktop", "Randomly"], correctAnswer: 0 },
            { id: 10, text: "Create your own module?", options: ["Save .py file", "Compile .c file", "Write header", "Register online"], correctAnswer: 0 }
          ]
        }]
      },
      {
        id: 'py-8',
        title: 'Object-Oriented Programming',
        videoUrl: 'https://www.youtube.com/embed/JeznW_7DlB0',
        bookContent: 'Classes define blueprints for objects. Use __init__ for constructors. self refers to the instance. Inheritance allows classes to inherit from parent classes. Encapsulation protects data.',
        quizzes: [{
          id: 'assessment', title: 'Topic Assessment',
          questions: [
            { id: 1, text: "Define a class?", options: ["class MyClass:", "def MyClass:", "struct MyClass", "object MyClass"], correctAnswer: 0 },
            { id: 2, text: "Constructor method?", options: ["__init__", "__start__", "__main__", "__new__"], correctAnswer: 0 },
            { id: 3, text: "What is 'self'?", options: ["Reference to instance", "Reference to class", "Global keyword", "Nothing"], correctAnswer: 0 },
            { id: 4, text: "Create an object?", options: ["obj = MyClass()", "obj = new MyClass()", "obj = create MyClass", "MyClass obj"], correctAnswer: 0 },
            { id: 5, text: "Inheritance?", options: ["class Child(Parent):", "class Child extends Parent", "class Child implements Parent", "class Child : Parent"], correctAnswer: 0 },
            { id: 6, text: "Private variable convention?", options: ["_var or __var", "private var", "var --private", "$var"], correctAnswer: 0 },
            { id: 7, text: "Polymorphism?", options: ["Same method different behavior", "Many classes", "One class", "Encryption"], correctAnswer: 0 },
            { id: 8, text: "What is an instance?", options: ["Object created from class", "The class itself", "A method", "A variable"], correctAnswer: 0 },
            { id: 9, text: "Call parent method?", options: ["super().method()", "parent.method()", "base.method()", "call()"], correctAnswer: 0 },
            { id: 10, text: "Everything in Python is...", options: ["An object", "A function", "A primitive", "A string"], correctAnswer: 0 }
          ]
        }]
      },
      {
        id: 'py-9',
        title: 'Error Handling',
        videoUrl: 'https://www.youtube.com/embed/NIWwJbo-9_8',
        bookContent: 'Use try/except blocks to handle exceptions. Common exceptions: ValueError, TypeError, FileNotFoundError. The finally block always executes. Raise custom exceptions with raise.',
        quizzes: [{
          id: 'assessment', title: 'Topic Assessment',
          questions: [
            { id: 1, text: "Block to test errors?", options: ["try", "catch", "test", "check"], correctAnswer: 0 },
            { id: 2, text: "Block to handle error?", options: ["except", "catch", "handle", "error"], correctAnswer: 0 },
            { id: 3, text: "Block executing regardless?", options: ["finally", "always", "done", "next"], correctAnswer: 0 },
            { id: 4, text: "Raise an error?", options: ["raise", "throw", "error", "trigger"], correctAnswer: 0 },
            { id: 5, text: "Catch specific error?", options: ["except ValueError:", "catch ValueError", "if ValueError", "on Error"], correctAnswer: 0 },
            { id: 6, text: "Catch all errors?", options: ["except Exception:", "catch all", "except *", "error all"], correctAnswer: 0 },
            { id: 7, text: "Else block in try/except?", options: ["Runs if no error", "Runs if error", "Runs always", "Never runs"], correctAnswer: 0 },
            { id: 8, text: "Common error div by zero?", options: ["ZeroDivisionError", "MathError", "CalcError", "NumError"], correctAnswer: 0 },
            { id: 9, text: "Error accessing invalid index?", options: ["IndexError", "KeyError", "RangeError", "ValueError"], correctAnswer: 0 },
            { id: 10, text: "Custom exception?", options: ["Inherit from Exception", "Inherit from Error", "Create string", "Not possible"], correctAnswer: 0 }
          ]
        }]
      },
      {
        id: 'py-10',
        title: 'Advanced Functions (Lambda, Map, Filter)',
        videoUrl: 'https://www.youtube.com/embed/hYzwCsKGRrg',
        bookContent: 'Lambda functions are small anonymous functions defined with the lambda keyword. Use map() to apply a function to all items in an input list. Use filter() to filter elements from an iterable.',
        quizzes: [{
          id: 'assessment', title: 'Topic Assessment',
          questions: [
            { id: 1, text: "Lambda function keyword?", options: ["def", "lambda", "func", "anon"], correctAnswer: 1 },
            { id: 2, text: "Map function does what?", options: ["Applies func to all items", "Filters items", "Reduces list", "Sorts list"], correctAnswer: 0 },
            { id: 3, text: "Filter function does what?", options: ["Filters items based on condition", "Applies func to all", "Deletes list", "Finds max"], correctAnswer: 0 },
            { id: 4, text: "Lambda argument limit?", options: ["1", "2", "None", "0"], correctAnswer: 2 },
            { id: 5, text: "Expressions in lambda?", options: ["Only one", "Multiple", "None", "Unlimited"], correctAnswer: 0 },
            { id: 6, text: "Output of map() is...", options: ["List", "Map Object", "Tuple", "String"], correctAnswer: 1 },
            { id: 7, text: "Convert map object to list?", options: ["list()", "to_list()", "convert()", "[]"], correctAnswer: 0 },
            { id: 8, text: "Reduce function is in which module?", options: ["functools", "math", "sys", "itertools"], correctAnswer: 0 },
            { id: 9, text: "Can lambda have default values?", options: ["Yes", "No", "Only first arg", "Only last arg"], correctAnswer: 0 },
            { id: 10, text: "Lambda syntax?", options: ["lambda args: expr", "lambda: expr args", "def lambda...", "args => expr"], correctAnswer: 0 }
          ]
        }]
      },

      {
        id: 'py-15',
        title: 'Introduction to NumPy',
        videoUrl: 'https://www.youtube.com/embed/QUT1VHiLmmI',
        bookContent: 'NumPy is the fundamental package for scientific computing in Python. It provides support for arrays (ndarrays), matrices, and high-level mathematical functions. It is faster and more efficient than Python lists.',
        quizzes: [{
          id: 'assessment', title: 'Topic Assessment',
          questions: [
            { id: 1, text: "Core NumPy object?", options: ["ndarray", "list", "dict", "matrix"], correctAnswer: 0 },
            { id: 2, text: "Create array?", options: ["np.array()", "np.create()", "np.list()", "np.new()"], correctAnswer: 0 },
            { id: 3, text: "Why NumPy over lists?", options: ["Faster & efficient", "Slower", "Same", "More memory"], correctAnswer: 0 },
            { id: 4, text: "Get array dimensions?", options: ["arr.shape", "arr.size", "arr.dim", "arr.len"], correctAnswer: 0 },
            { id: 5, text: "Array of zeros?", options: ["np.zeros()", "np.empty()", "np.null()", "np.0()"], correctAnswer: 0 },
            { id: 6, text: " reshape array?", options: ["reshape()", "shape()", "resize()", "change()"], correctAnswer: 0 },
            { id: 7, text: "Mathematical operations?", options: ["Element-wise", "Not possible", "Only scalar", "Slow"], correctAnswer: 0 },
            { id: 8, text: "Linear Algebra module?", options: ["np.linalg", "np.math", "np.le", "np.alg"], correctAnswer: 0 },
            { id: 9, text: "Random numbers?", options: ["np.random", "np.rand", "np.rng", "np.chance"], correctAnswer: 0 },
            { id: 10, text: "Slicing works same as lists?", options: ["Yes", "No", "No slicing", "Different syntax"], correctAnswer: 0 }
          ]
        }]
      },
      {
        id: 'py-16',
        title: 'Data Analysis with Pandas',
        videoUrl: 'https://www.youtube.com/embed/vmEHCJofslg',
        bookContent: 'Pandas is a powerful data manipulation tool built on NumPy. The core structures are Series (1D) and DataFrame (2D). Use it for reading/writing data (CSV, Excel, SQL), cleaning, filtering, and aggregation.',
        quizzes: [{
          id: 'assessment', title: 'Topic Assessment',
          questions: [
            { id: 1, text: "Core 2D structure?", options: ["DataFrame", "Series", "Panel", "Table"], correctAnswer: 0 },
            { id: 2, text: "Read CSV?", options: ["pd.read_csv()", "pd.csv()", "pd.load()", "pd.import()"], correctAnswer: 0 },
            { id: 3, text: "First 5 rows?", options: ["head()", "top()", "first()", "start()"], correctAnswer: 0 },
            { id: 4, text: "Get column names?", options: ["df.columns", "df.names", "df.headers", "df.keys"], correctAnswer: 0 },
            { id: 5, text: "Summary stats?", options: ["describe()", "summary()", "stats()", "info()"], correctAnswer: 0 },
            { id: 6, text: "Select column?", options: ["df['col']", "df.col", "Both valid", "None"], correctAnswer: 2 },
            { id: 7, text: "Filter rows?", options: ["df[condition]", "df.filter(condition)", "df.where()", "df.select()"], correctAnswer: 0 },
            { id: 8, text: "Missing values check?", options: ["isnull()", "nan()", "missing()", "empty()"], correctAnswer: 0 },
            { id: 9, text: "Group data?", options: ["groupby()", "cluster()", "batch()", "sort()"], correctAnswer: 0 },
            { id: 10, text: "Save to Excel?", options: ["to_excel()", "save_excel()", "write_excel()", "export()"], correctAnswer: 0 }
          ]
        }]
      },
      {
        id: 'py-17',
        title: 'Visualization with Matplotlib',
        videoUrl: 'https://www.youtube.com/embed/3Xc3CA655Y4',
        bookContent: 'Matplotlib is a comprehensive library for creating static, animated, and interactive visualizations in Python. Use pyplot to plot line graphs, scatter plots, histograms, and bar charts. Customize with titles, labels, and legends.',
        quizzes: [{
          id: 'assessment', title: 'Topic Assessment',
          questions: [
            { id: 1, text: "Standard import?", options: ["import matplotlib.pyplot as plt", "import pyplot", "import plt", "import mpl"], correctAnswer: 0 },
            { id: 2, text: "Create line plot?", options: ["plt.plot()", "plt.line()", "plt.draw()", "plt.chart()"], correctAnswer: 0 },
            { id: 3, text: "Show plot?", options: ["plt.show()", "plt.display()", "plt.run()", "plt.open()"], correctAnswer: 0 },
            { id: 4, text: "Label X axis?", options: ["xlabel()", "labelx()", "xtitle()", "xaxis()"], correctAnswer: 0 },
            { id: 5, text: "Create bar chart?", options: ["bar()", "barchart()", "column()", "histo()"], correctAnswer: 0 },
            { id: 6, text: "Create scatter plot?", options: ["scatter()", "dot()", "point()", "plot()"], correctAnswer: 0 },
            { id: 7, text: "Add title?", options: ["title()", "header()", "name()", "top()"], correctAnswer: 0 },
            { id: 8, text: "Create grid?", options: ["grid()", "lines()", "mesh()", "net()"], correctAnswer: 0 },
            { id: 9, text: "Save figure?", options: ["savefig()", "save()", "export()", "download()"], correctAnswer: 0 },
            { id: 10, text: "Multiple plots?", options: ["subplots()", "multi()", "many()", "array()"], correctAnswer: 0 }
          ]
        }]
      },

    ],
    quizQuestions: [
      { id: 1, text: "What is the correct file extension for Python files?", options: [".pyth", ".pt", ".py", ".pe"], correctAnswer: 2 },
      { id: 2, text: "How do you create a variable with the floating number 2.8?", options: ["x = 2.8", "x = float(2.8)", "Both are correct", "None"], correctAnswer: 2 },
      { id: 3, text: "Which method can be used to remove any whitespace from both the beginning and the end of a string?", options: ["trim()", "strip()", "len()", "ptrim()"], correctAnswer: 1 },
      { id: 4, text: "Which collection is ordered, changeable, and allows duplicate members?", options: ["Set", "Dictionary", "Tuple", "List"], correctAnswer: 3 },
      { id: 5, text: "How do you start writing a while loop in Python?", options: ["while x > y {", "while (x > y)", "while x > y:", "x > y while {"], correctAnswer: 2 },
      { id: 6, text: "Which statement is used to stop a loop?", options: ["break", "stop", "exit", "return"], correctAnswer: 0 },
      { id: 7, text: "How do you define a function in Python?", options: ["function myFunction()", "def myFunction():", "create myFunction()", "func myFunction:"], correctAnswer: 1 },
      { id: 8, text: "Which keyword is used to import a module?", options: ["import", "include", "using", "from"], correctAnswer: 0 },
      { id: 9, text: "What is the output of print(10 > 9)?", options: ["False", "True", "Error", "None"], correctAnswer: 1 },
      { id: 10, text: "Which operator is used to multiply numbers?", options: ["%", "x", "#", "*"], correctAnswer: 3 },
    ]
  },
  {
    id: 'ml-101',
    title: 'Machine Learning',
    description: 'Introduction to ML concepts, supervised and unsupervised learning.',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/scikitlearn/scikitlearn-original.svg',
    topics: [
      {
        id: 'ml-0',
        title: 'Introduction to Machine Learning',
        videoUrl: 'https://www.youtube.com/embed/ukzFI9rgwfU',
        bookContent: 'Machine Learning is a subset of AI where computers learn patterns from data without explicit programming. Types: Supervised, Unsupervised, and Reinforcement Learning.',
        quizzes: [{
          id: 'assessment', title: 'Topic Assessment',
          questions: [
            { id: 1, text: "What is Machine Learning?", options: ["Explicit programming", "Learning from data", "Hardware design", "Web design"], correctAnswer: 1 },
            { id: 2, text: "Which is NOT a type of Machine Learning?", options: ["Supervised", "Unsupervised", "Reinforcement", "Deductive"], correctAnswer: 3 },
            { id: 3, text: "In Supervised Learning, data is...", options: ["Labeled", "Unlabeled", "Missing", "Corrupted"], correctAnswer: 0 },
            { id: 4, text: "What is the goal of ML?", options: ["To store data", "To predict or classify", "To delete data", "To encrypt data"], correctAnswer: 1 },
            { id: 5, text: "Which of these is a regression problem?", options: ["Predicting house prices", "Classifying emails", "Recognizing faces", "Grouping customers"], correctAnswer: 0 },
            { id: 6, text: "Which is an example of Unsupervised Learning?", options: ["Spam filter", "Clustering customers", "Voice recognition", "Stock prediction"], correctAnswer: 1 },
            { id: 7, text: "What defines Reinforcement Learning?", options: ["Labeled data", "Agents and rewards", "Clustering", "Fixed rules"], correctAnswer: 1 },
            { id: 8, text: "What is a 'Training Set'?", options: ["Data to test the model", "Data to learn patterns", "Data to validate", "Production data"], correctAnswer: 1 },
            { id: 9, text: "What is a 'Label'?", options: ["The input", "The output/target", "The algorithm", "The error"], correctAnswer: 1 },
            { id: 10, text: "Which field is closely related to ML?", options: ["Statistics", "Geology", "History", "Botany"], correctAnswer: 0 }
          ]
        }]
      },
      {
        id: 'ml-1',
        title: 'Linear Regression',
        videoUrl: 'https://www.youtube.com/embed/7ArmBVF2dCs',
        bookContent: 'Linear regression predicts continuous values by fitting a line through data points. Formula: y = mx + b. Use Mean Squared Error (MSE) to measure accuracy.',
        quizzes: [{
          id: 'assessment', title: 'Topic Assessment',
          questions: [
            { id: 1, text: "What does Linear Regression predict?", options: ["Categories", "Continuous values", "Clusters", "Images"], correctAnswer: 1 },
            { id: 2, text: "What is the equation of a line?", options: ["y = mx + b", "y = x^2", "y = log(x)", "y = e^x"], correctAnswer: 0 },
            { id: 3, text: "What is 'm' in y = mx + b?", options: ["Intercept", "Slope", "Error", "Input"], correctAnswer: 1 },
            { id: 4, text: "What does MSE stand for?", options: ["Mean Standard Error", "Mean Squared Error", "Max Sum Error", "Min Squared Error"], correctAnswer: 1 },
            { id: 5, text: "If perfect correlation, MSE is...", options: ["1", "100", "0", "Infinite"], correctAnswer: 2 },
            { id: 6, text: "Linear Regression is a type of...", options: ["Supervised Learning", "Unsupervised Learning", "Clustering", "Reinforcement Learning"], correctAnswer: 0 },
            { id: 7, text: "What is the 'Intercept'?", options: ["Value of y when x=0", "Value of x when y=0", "The slope", "The error"], correctAnswer: 0 },
            { id: 8, text: "Which method is used to find the best fit line?", options: ["Least Squares", "Most Squares", "Random Guess", "Clustering"], correctAnswer: 0 },
            { id: 9, text: "Can Linear Regression handle multiple input variables?", options: ["Yes", "No", "Only 2", "Only 3"], correctAnswer: 0 },
            { id: 10, text: "What happens if data is not linear?", options: ["Linear Regression works perfectly", "Linear Regression may perform poorly", "It crashes", "It becomes classification"], correctAnswer: 1 }
          ]
        }]
      },
      {
        id: 'ml-2',
        title: 'Logistic Regression',
        videoUrl: 'https://www.youtube.com/embed/yIYKR4sgzI8',
        bookContent: 'Logistic regression is used for binary classification. It uses the sigmoid function to output probabilities between 0 and 1. Threshold typically set at 0.5.',
        quizzes: [{
          id: 'assessment', title: 'Topic Assessment',
          questions: [
            { id: 1, text: "What is Logistic Regression used for?", options: ["Regression", "Classification", "Clustering", "Dim reduction"], correctAnswer: 1 },
            { id: 2, text: "What function does it use?", options: ["Linear", "Sigmoid", "ReLU", "Tanh"], correctAnswer: 1 },
            { id: 3, text: "The output of sigmoid is between...", options: ["-1 and 1", "0 and 1", "0 and 100", "-inf and inf"], correctAnswer: 1 },
            { id: 4, text: "What is the typical threshold for binary class?", options: ["0.1", "0.9", "0.5", "0"], correctAnswer: 2 },
            { id: 5, text: "If p > 0.5, the class is...", options: ["0", "1", "Unknown", "Error"], correctAnswer: 1 },
            { id: 6, text: "Is Logistic Regression a regression algorithm?", options: ["Yes, technically", "No, it's classification", "It's clustering", "None"], correctAnswer: 1 },
            { id: 7, text: "Which cost function is used?", options: ["MSE", "Log Loss / Cross Entropy", "MAE", "Hinge Loss"], correctAnswer: 1 },
            { id: 8, text: "Can it handle multi-class?", options: ["No, never", "Yes, with One-vs-Rest", "Only binary", "Only trinary"], correctAnswer: 1 },
            { id: 9, text: "What shape is the sigmoid curve?", options: ["Linear", "S-shape", "U-shape", "Circle"], correctAnswer: 1 },
            { id: 10, text: "Logistic Regression is...", options: ["Supervised", "Unsupervised", "Reinforcement", "Generative"], correctAnswer: 0 }
          ]
        }]
      },
      {
        id: 'ml-3',
        title: 'Decision Trees',
        videoUrl: 'https://www.youtube.com/embed/7VeUPuFGJHk',
        bookContent: 'Decision trees split data based on feature values. They use metrics like Gini impurity or Information Gain. Prone to overfitting - use pruning or Random Forests.',
        quizzes: [{
          id: 'assessment', title: 'Topic Assessment',
          questions: [
            { id: 1, text: "What is a Decision Tree?", options: ["A flow-chart like structure", "A linear equation", "A neural network", "A cluster"], correctAnswer: 0 },
            { id: 2, text: "What determines a split?", options: ["Randomness", "Feature values maximizing gain", "User input", "Alphabetical order"], correctAnswer: 1 },
            { id: 3, text: "What is a leaf node?", options: ["The start", "A split point", "A final decision/class", "An error"], correctAnswer: 2 },
            { id: 4, text: "Common metric to measure impurity?", options: ["Gini Impurity", "Accuracy", "Recall", "F1"], correctAnswer: 0 },
            { id: 5, text: "What is a major disadvantage?", options: ["Underfitting", "Overfitting", "Too fast", "Only binary"], correctAnswer: 1 },
            { id: 6, text: "How to reduce overfitting?", options: ["Make deeper", "Pruning", "Add more noise", "Remove labels"], correctAnswer: 1 },
            { id: 7, text: "What is the root node?", options: ["The bottom node", "The top-most node", "A middle node", "The answer"], correctAnswer: 1 },
            { id: 8, text: "Can it handle categorical data?", options: ["Yes", "No", "Only numbers", "Only booleans"], correctAnswer: 0 },
            { id: 9, text: "What is 'Entropy'?", options: ["Measure of purity", "Measure of disorder", "Measure of speed", "Measure of size"], correctAnswer: 1 },
            { id: 10, text: "Decision Trees are...", options: ["Parametric", "Non-parametric", "Linear", "Unsupervised"], correctAnswer: 1 }
          ]
        }]
      },
      {
        id: 'ml-4',
        title: 'Support Vector Machines',
        videoUrl: 'https://www.youtube.com/embed/efR1C6CvhmE',
        bookContent: 'SVM finds the optimal hyperplane that separates classes with maximum margin. Kernel trick allows non-linear classification. Common kernels: linear, RBF, polynomial.',
        quizzes: [{
          id: 'assessment', title: 'Topic Assessment',
          questions: [
            { id: 1, text: "What does SVM stand for?", options: ["Simple Vector Machine", "Support Vector Machine", "Super Vector Machine", "Standard Virtual Machine"], correctAnswer: 1 },
            { id: 2, text: "What is a hyperplane?", options: ["A 3D object", "A decision boundary", "A vector", "A support point"], correctAnswer: 1 },
            { id: 3, text: "SVM maximizes the...", options: ["Error", "Margin", "Variance", "Bias"], correctAnswer: 1 },
            { id: 4, text: "What are Support Vectors?", options: ["Data points furthest from line", "Data points closest to hyperplane", "All data points", "Outliers"], correctAnswer: 1 },
            { id: 5, text: "What handles non-linear data in SVM?", options: ["Kernel Trick", "More layers", "Randomness", "Normalization"], correctAnswer: 0 },
            { id: 6, text: "Common kernel function?", options: ["RBF", "Sigmoid", "ReLU", "Softmax"], correctAnswer: 0 },
            { id: 7, text: "Is SVM used for regression?", options: ["No, never", "Yes (SVR)", "Only classification", "Only clustering"], correctAnswer: 1 },
            { id: 8, text: "SVM typically works well on...", options: ["Massive datasets", "Small-medium complex datasets", "Unlabeled data", "Text only"], correctAnswer: 1 },
            { id: 9, text: "High 'C' parameter means...", options: ["Strict margin (potential overfitting)", "Soft margin (underfitting)", "Fast training", "Slow training"], correctAnswer: 0 },
            { id: 10, text: "What is the 'gamma' parameter?", options: ["Influence of single training example", "Number of trees", "Learning rate", "Batch size"], correctAnswer: 0 }
          ]
        }]
      },
      {
        id: 'ml-5',
        title: 'K-Means Clustering',
        videoUrl: 'https://www.youtube.com/embed/4b5d3muPQmA',
        bookContent: 'K-Means is an unsupervised algorithm that groups data into K clusters. Steps: initialize centroids, assign points, update centroids, repeat until convergence.',
        quizzes: [{
          id: 'assessment', title: 'Topic Assessment',
          questions: [
            { id: 1, text: "K-Means is...", options: ["Supervised", "Unsupervised", "Reinforcement", "Semi-supervised"], correctAnswer: 1 },
            { id: 2, text: "What does 'K' represent?", options: ["Number of steps", "Number of clusters", "Number of points", "Error rate"], correctAnswer: 1 },
            { id: 3, text: "How is a point assigned to a cluster?", options: ["Randomly", "Nearest centroid", "Farthest centroid", "User choice"], correctAnswer: 1 },
            { id: 4, text: "What is a centroid?", options: ["Center of a cluster", "Edge of a cluster", "Outlier", "Label"], correctAnswer: 0 },
            { id: 5, text: "When does the algorithm stop?", options: ["After 1 step", "When centroids don't move", "When K=0", "Never"], correctAnswer: 1 },
            { id: 6, text: "Method to find optimal K?", options: ["Elbow Method", "Knee Method", "Hand Method", "Eye Method"], correctAnswer: 0 },
            { id: 7, text: "Is K-Means deterministic?", options: ["Yes", "No (depends on initialization)", "Always", "Unsure"], correctAnswer: 1 },
            { id: 8, text: "K-Means is sensitive to...", options: ["Outliers", "Colors", "Labels", "Time"], correctAnswer: 0 },
            { id: 9, text: "Does it work well with non-spherical clusters?", options: ["Yes", "No", "Always", "Maybe"], correctAnswer: 1 },
            { id: 10, text: "Distance metric usually used?", options: ["Manhattan", "Euclidean", "Cosine", "Jaccard"], correctAnswer: 1 }
          ]
        }]
      },
      {
        id: 'ml-6',
        title: 'Neural Networks Basics',
        videoUrl: 'https://www.youtube.com/embed/aircAruvnKk',
        bookContent: 'Neural networks consist of layers of interconnected nodes. Input layer receives data, hidden layers process it, output layer produces results. Activation functions add non-linearity.',
        quizzes: [{
          id: 'assessment', title: 'Topic Assessment',
          questions: [
            { id: 1, text: "Basic unit of a Neural Network?", options: ["Pixel", "Neuron/Perceptron", "Cluster", "Tree"], correctAnswer: 1 },
            { id: 2, text: "Input layer does what?", options: ["Processes data", "Receives data", "Outputs predictions", "Calculates error"], correctAnswer: 1 },
            { id: 3, text: "Layers between Input and Output are...", options: ["Middle layers", "Hidden layers", "Secret layers", "Black boxes"], correctAnswer: 1 },
            { id: 4, text: "Why Activation Functions?", options: ["Add linearity", "Add non-linearity", "Speed up", "Slow down"], correctAnswer: 1 },
            { id: 5, text: "Common activation function?", options: ["ReLU", "Linear", "Circle", "Square"], correctAnswer: 0 },
            { id: 6, text: "Algorithm to train Neural Networks?", options: ["Backpropagation", "Forwardpropagation", "K-Means", "Apriori"], correctAnswer: 0 },
            { id: 7, text: "What are weights?", options: ["Importance of connections", "Mass of neurons", "Number of layers", "Input size"], correctAnswer: 0 },
            { id: 8, text: "What is Deep Learning?", options: ["NN with many layers", "NN with 1 layer", "Linear Regression", "K-Means"], correctAnswer: 0 },
            { id: 9, text: "What is an Epoch?", options: ["One pass of full dataset", "One batch", "One minute", "One neuron"], correctAnswer: 0 },
            { id: 10, text: "Loss function does what?", options: ["Measures accuracy", "Measures error", "Measures speed", "Measures size"], correctAnswer: 1 }
          ]
        }]
      },
      {
        id: 'ml-7',
        title: 'Model Evaluation Metrics',
        videoUrl: 'https://www.youtube.com/embed/85dtiMz9tSo',
        bookContent: 'Classification metrics: Accuracy, Precision, Recall, F1-Score, AUC-ROC. Regression metrics: MSE, RMSE, MAE, R². Use confusion matrix to understand predictions.',
        quizzes: [{
          id: 'assessment', title: 'Topic Assessment',
          questions: [
            { id: 1, text: "Accuracy is...", options: ["Correct/Total", "True/False", "Error/Total", "Total/Correct"], correctAnswer: 0 },
            { id: 2, text: "Recall is important when...", options: ["False Negatives are costly", "False Positives are costly", "Speed matters", "Space matters"], correctAnswer: 0 },
            { id: 3, text: "Precision is important when...", options: ["False Negatives are costly", "False Positives are costly", "Speed matters", "Space matters"], correctAnswer: 1 },
            { id: 4, text: "F1 Score is...", options: ["Harmonic mean of Precision & Recall", "Average of Precision & Recall", "Sum of Precision & Recall", "Difference"], correctAnswer: 0 },
            { id: 5, text: "Metric for Regression?", options: ["Accuracy", "F1", "MSE", "Confusion Matrix"], correctAnswer: 2 },
            { id: 6, text: "What is a Confusion Matrix?", options: ["Table of predictions vs actuals", "A complex equation", "A neural network", "A plot"], correctAnswer: 0 },
            { id: 7, text: "ROC Curve plots...", options: ["TPR vs FPR", "Precision vs Recall", "Accuracy vs Loss", "X vs Y"], correctAnswer: 0 },
            { id: 8, text: "AUC stands for...", options: ["Area Under Curve", "Area Under Circle", "All Under Control", "Average Unit Cost"], correctAnswer: 0 },
            { id: 9, text: "If AUC = 0.5, the model is...", options: ["Perfect", "Random guessing", "Good", "Bad"], correctAnswer: 1 },
            { id: 10, text: "R-squared value range?", options: ["0 to 1", "-1 to 1", "0 to 100", "-inf to inf"], correctAnswer: 0 }
          ]
        }]
      },
      {
        id: 'ml-8',
        title: 'Feature Engineering',
        videoUrl: 'https://www.youtube.com/embed/6WDFfaYtN6s',
        bookContent: 'Feature engineering transforms raw data into meaningful features. Techniques: normalization, one-hot encoding, feature scaling, handling missing values, dimensionality reduction.',
        quizzes: [{
          id: 'assessment', title: 'Topic Assessment',
          questions: [
            { id: 1, text: "Goal of Feature Engineering?", options: ["Increase data size", "Improve model performance", "Delete data", "Hide data"], correctAnswer: 1 },
            { id: 2, text: "Normalization scales data to...", options: ["0 to 1", "-1 to 1", "0 to 100", "Any range"], correctAnswer: 0 },
            { id: 3, text: "One-Hot Encoding handles...", options: ["Numerical data", "Categorical data", "Missing data", "Images"], correctAnswer: 1 },
            { id: 4, text: "Handling missing values by filling with mean is...", options: ["Imputation", "Deletion", "Normalization", "Scaling"], correctAnswer: 0 },
            { id: 5, text: "What is Dimensionality Reduction?", options: ["Reducing number of features", "Reducing number of rows", "Reducing model size", "Reducing error"], correctAnswer: 0 },
            { id: 6, text: "Technique for Dim Reduction?", options: ["PCA", "CNN", "RNN", "SVM"], correctAnswer: 0 },
            { id: 7, text: "Standardization scales to...", options: ["Mean 0, Std 1", "Mean 1, Std 0", "Mean 0, Std 0", "Range 0-1"], correctAnswer: 0 },
            { id: 8, text: "Why scale features?", options: ["Algorithms converge faster", "Looks better", "Uses less memory", "Required for trees"], correctAnswer: 0 },
            { id: 9, text: "What creates new features from existing ones?", options: ["Feature extraction/creation", "Feature selection", "Feature deletion", "Feature plotting"], correctAnswer: 0 },
            { id: 10, text: "Correlation matrix helps in...", options: ["Feature selection", "Imputation", "Encoding", "Scaling"], correctAnswer: 0 }
          ]
        }]
      },
      {
        id: 'ml-9',
        title: 'Model Deployment',
        videoUrl: 'https://www.youtube.com/embed/H73m9XvKHug',
        bookContent: 'Deploy models using Flask/FastAPI for APIs. Use pickle/joblib to save models. Consider Docker for containerization. Monitor model performance and retrain periodically.',
        quizzes: [{
          id: 'assessment', title: 'Topic Assessment',
          questions: [
            { id: 1, text: "What is Model Deployment?", options: ["Training the model", "Making model available for use", "Deleting the model", "Testing the model"], correctAnswer: 1 },
            { id: 2, text: "Common tool for Python APIs?", options: ["Flask", "React", "Angular", "Vue"], correctAnswer: 0 },
            { id: 3, text: "Format to serialize Python objects?", options: ["Pickle", "Cucumber", "Tomato", "Onion"], correctAnswer: 0 },
            { id: 4, text: "Why use Docker?", options: ["Containerization & consistency", "Faster training", "Better accuracy", "Smaller code"], correctAnswer: 0 },
            { id: 5, text: "What is Model Monitoring?", options: ["Tracking performance over time", "Watching the screen", "Security scanning", "Data cleaning"], correctAnswer: 0 },
            { id: 6, text: "What is 'Model Drift'?", options: ["Model performance degrading over time", "Model moving servers", "Model getting faster", "Model deleting data"], correctAnswer: 0 },
            { id: 7, text: "REST API uses...", options: ["HTTP requests", "FTP", "SMTP", "SSH"], correctAnswer: 0 },
            { id: 8, text: "Joblib is good for...", options: ["Saving large numpy arrays", "Web scraping", "Plotting", "Testing"], correctAnswer: 0 },
            { id: 9, text: "A 'Prediction Endpoint' usually accepts...", options: ["Input data", "Output data", "Model weights", "Training code"], correctAnswer: 0 },
            { id: 10, text: "Continuous Integration/Deployment?", options: ["CI/CD", "AI/ML", "TCP/IP", "HTML/CSS"], correctAnswer: 0 }
          ]
        }]
      }
    ],
    quizQuestions: [
      { id: 1, text: "What is Machine Learning?", options: ["Hard coding rules", "Learning from data", "Database management", "Web development"], correctAnswer: 1 },
      { id: 2, text: "Which is a Supervised Learning algorithm?", options: ["K-Means", "Linear Regression", "Apriori", "PCA"], correctAnswer: 1 },
      { id: 3, text: "What is Overfitting?", options: ["Model performs well on training data but poor on test data", "Model performs poor on both", "Model is too simple", "Data is missing"], correctAnswer: 0 },
      { id: 4, text: "What is a feature in ML?", options: ["The output variable", "An input variable", "The error rate", "The algorithm used"], correctAnswer: 1 },
      { id: 5, text: "Which library is popular for ML in Python?", options: ["React", "Scikit-learn", "Django", "Flask"], correctAnswer: 1 },
      { id: 6, text: "What does NLP stand for?", options: ["Natural Language Processing", "Neural Language Programming", "New Learning Process", "None"], correctAnswer: 0 },
      { id: 7, text: "In K-Means, what is 'K'?", options: ["Number of iterations", "Number of clusters", "The learning rate", "The error threshold"], correctAnswer: 1 },
      { id: 8, text: "What is a confusion matrix used for?", options: ["Data cleaning", "Model evaluation", "Feature selection", "Visualization"], correctAnswer: 1 },
      { id: 9, text: "Which activation function is commonly used in hidden layers?", options: ["Sigmoid", "ReLU", "Softmax", "Linear"], correctAnswer: 1 },
      { id: 10, text: "What is the purpose of a test set?", options: ["To train the model", "To validate hyperparameters", "To evaluate final performance", "To clean data"], correctAnswer: 2 },
    ]
  },
  {
    id: 'ds-101',
    title: 'Data Science',
    description: 'Learn to analyze, visualize, and interpret complex data.',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg',
    topics: [
      {
        id: 'ds-0',
        title: 'Introduction to Data Science',
        videoUrl: 'https://www.youtube.com/embed/X3paOmcrTjQ',
        bookContent: 'Data Science combines statistics, programming, and domain expertise to extract insights from data. The process: collection, cleaning, exploration, modeling, and communication.',
        quizzes: [{
          id: 'assessment', title: 'Topic Assessment',
          questions: [
            { id: 1, text: "What is Data Science?", options: ["Hardware maintenance", "Extracting insights from data", "Web design", "Network security"], correctAnswer: 1 },
            { id: 2, text: "Which component is NOT standard in DS?", options: ["Statistics", "Domain Expertise", "Graphic Design", "Computer Science"], correctAnswer: 2 },
            { id: 3, text: "First step in DS process?", options: ["Modeling", "Data Collection", "Deployment", "Visualization"], correctAnswer: 1 },
            { id: 4, text: "What is 'Structured Data'?", options: ["Text", "Images", "Tables/Databases", "Audio"], correctAnswer: 2 },
            { id: 5, text: "What is 'Unstructured Data'?", options: ["SQL tables", "Emails/Images", "CSV files", "Excel sheets"], correctAnswer: 1 },
            { id: 6, text: "Which language is most popular for DS?", options: ["C++", "Java", "Python", "Swift"], correctAnswer: 2 },
            { id: 7, text: "What is Data Mining?", options: ["Finding patterns in large datasets", "Deleting data", "Securing data", "Creating data"], correctAnswer: 0 },
            { id: 8, text: "Goal of DS?", options: ["To make charts", "To solve problems with data", "To write code", "To buy computers"], correctAnswer: 1 },
            { id: 9, text: "What is 'Big Data'?", options: ["Any small file", "Large, complex datasets", "A large database", "A long string"], correctAnswer: 1 },
            { id: 10, text: "Role of a Data Scientist?", options: ["Fix printers", "Analyze data", "Manage servers", "Write OS"], correctAnswer: 1 }
          ]
        }]
      },
      {
        id: 'ds-1',
        title: 'Pandas for Data Analysis',
        videoUrl: 'https://www.youtube.com/embed/vmEHCJofslg',
        bookContent: 'Pandas provides DataFrames for tabular data. Key operations: read_csv(), head(), describe(), groupby(), merge(). Handle missing data with fillna() or dropna().',
        quizzes: [{
          id: 'assessment', title: 'Topic Assessment',
          questions: [
            { id: 1, text: "Core Pandas data structure?", options: ["List", "DataFrame", "Tree", "Graph"], correctAnswer: 1 },
            { id: 2, text: "Function to read CSV?", options: ["read_file", "read_csv", "load_csv", "open_csv"], correctAnswer: 1 },
            { id: 3, text: "View first 5 rows?", options: ["top()", "start()", "head()", "first()"], correctAnswer: 2 },
            { id: 4, text: "Get summary statistics?", options: ["summary()", "stats()", "describe()", "info()"], correctAnswer: 2 },
            { id: 5, text: "Select a column 'A'?", options: ["df['A']", "df(A)", "df.get(A)", "df->A"], correctAnswer: 0 },
            { id: 6, text: "Filter rows where col A > 5?", options: ["df[df['A'] > 5]", "df.filter(A > 5)", "df.where(A > 5)", "df.select(A > 5)"], correctAnswer: 0 },
            { id: 7, text: "Handle missing values?", options: ["remove()", "fillna()", "ignore()", "hide()"], correctAnswer: 1 },
            { id: 8, text: "Group data?", options: ["group()", "cluster()", "groupby()", "batch()"], correctAnswer: 2 },
            { id: 9, text: "Merge two dataframes?", options: ["join()", "merge()", "combine()", "link()"], correctAnswer: 1 },
            { id: 10, text: "Save to CSV?", options: ["save_csv()", "to_csv()", "write_csv()", "export_csv()"], correctAnswer: 1 }
          ]
        }]
      },
      {
        id: 'ds-2',
        title: 'Data Cleaning Techniques',
        videoUrl: 'https://www.youtube.com/embed/bDhvCp3_lYw',
        bookContent: 'Clean data by handling missing values, removing duplicates, fixing data types, and handling outliers. Use df.isnull().sum() to find missing values. Consistent formatting is crucial.',
        quizzes: [{
          id: 'assessment', title: 'Topic Assessment',
          questions: [
            { id: 1, text: "Why clean data?", options: ["Garbage in, garbage out", "To make it smaller", "To encrypt it", "No reason"], correctAnswer: 0 },
            { id: 2, text: "Check for null values?", options: ["isnull()", "isnone()", "isempty()", "checknull()"], correctAnswer: 0 },
            { id: 3, text: "Remove duplicates?", options: ["delete_duplicates()", "drop_duplicates()", "remove_dups()", "clean_dups()"], correctAnswer: 1 },
            { id: 4, text: "Imputation means?", options: ["Deleting data", "Filling missing values", "Sorting data", "Copying data"], correctAnswer: 1 },
            { id: 5, text: "Detect outliers using?", options: ["Box plot", "Pie chart", "Bar graph", "Table"], correctAnswer: 0 },
            { id: 6, text: "Correct data types?", options: ["astype()", "totype()", "convert()", "change()"], correctAnswer: 0 },
            { id: 7, text: "If 50% data missing in column?", options: ["Fill with mean", "Drop column", "Leave it", "Fill with 0"], correctAnswer: 1 },
            { id: 8, text: "Standardize text casing?", options: ["str.upper()", "str.lower()", "str.case()", "str.fix()"], correctAnswer: 1 },
            { id: 9, text: "Trim whitespace?", options: ["strip()", "trim()", "cut()", "clip()"], correctAnswer: 0 },
            { id: 10, text: "Validate data against?", options: ["Rules/Constraints", "Guesswork", "Randomness", "Nothing"], correctAnswer: 0 }
          ]
        }]
      },
      {
        id: 'ds-3',
        title: 'Exploratory Data Analysis',
        videoUrl: 'https://www.youtube.com/embed/xi0vhXFPegw',
        bookContent: 'EDA uncovers patterns and anomalies. Check distributions, correlations, and relationships. Use statistical summaries and visualizations. Ask questions about the data.',
        quizzes: [{
          id: 'assessment', title: 'Topic Assessment',
          questions: [
            { id: 1, text: "What is EDA?", options: ["Exploratory Data Analysis", "External Data Acquisition", "Easy Data Access", "Error Data Assessment"], correctAnswer: 0 },
            { id: 2, text: "Goal of EDA?", options: ["Understand data structure", " Build final model", "Deploy to production", "Write API"], correctAnswer: 0 },
            { id: 3, text: "Univariate analysis involves?", options: ["One variable", "Two variables", "Many variables", "No variables"], correctAnswer: 0 },
            { id: 4, text: "Bivariate analysis involves?", options: ["One variable", "Two variables", "Three variables", "Zero"], correctAnswer: 1 },
            { id: 5, text: "Tool for correlation matrix?", options: ["heatmap", "piechart", "histogram", "tree"], correctAnswer: 0 },
            { id: 6, text: "Visualizing distribution?", options: ["Histogram", "Scatter plot", "Line chart", "Table"], correctAnswer: 0 },
            { id: 7, text: "Scatter plot indicates?", options: ["Relationship between 2 variables", "Distribution of 1", "Composition", "Ranking"], correctAnswer: 0 },
            { id: 8, text: "Summary statistics include?", options: ["Mean, Median, Mode", "Colors", "Names", "Dates"], correctAnswer: 0 },
            { id: 9, text: "Skewness measures?", options: ["Asymmetry", "Height", "Width", "Count"], correctAnswer: 0 },
            { id: 10, text: "Kurtosis measures?", options: ["Tailedness", "Center", "Spread", "Sum"], correctAnswer: 0 }
          ]
        }]
      },
      {
        id: 'ds-4',
        title: 'Data Visualization with Matplotlib',
        videoUrl: 'https://www.youtube.com/embed/3Xc3CA655Y4',
        bookContent: 'Matplotlib creates static visualizations. Plot types: line, bar, scatter, histogram, pie. Customize with titles, labels, legends. Use plt.subplots() for multiple charts.',
        quizzes: [{
          id: 'assessment', title: 'Topic Assessment',
          questions: [
            { id: 1, text: "Import convention for pyplot?", options: ["import matplotlib.pyplot as plt", "import plotting", "import plt", "import matplot"], correctAnswer: 0 },
            { id: 2, text: "Create a figure?", options: ["plt.figure()", "plt.create()", "plt.new()", "plt.window()"], correctAnswer: 0 },
            { id: 3, text: "Add title?", options: ["plt.title()", "plt.header()", "plt.top()", "plt.name()"], correctAnswer: 0 },
            { id: 4, text: "Label x-axis?", options: ["plt.xlabel()", "plt.labelx()", "plt.x()", "plt.axisx()"], correctAnswer: 0 },
            { id: 5, text: "Make a scatter plot?", options: ["plt.scatter()", "plt.dot()", "plt.point()", "plt.scat()"], correctAnswer: 0 },
            { id: 6, text: "Show the plot?", options: ["plt.show()", "plt.display()", "plt.render()", "plt.view()"], correctAnswer: 0 },
            { id: 7, text: "Create subplots?", options: ["plt.subplots()", "plt.multi()", "plt.grid()", "plt.split()"], correctAnswer: 0 },
            { id: 8, text: "Change line color?", options: ["color='red'", "c='red'", "line='red'", "fill='red'"], correctAnswer: 0 },
            { id: 9, text: "Types of plots supported?", options: ["Line, Bar, Hist, etc.", "Only Line", "only 3D", "None"], correctAnswer: 0 },
            { id: 10, text: "Save figure?", options: ["plt.savefig()", "plt.save()", "plt.export()", "plt.download()"], correctAnswer: 0 }
          ]
        }]
      },
      {
        id: 'ds-5',
        title: 'Statistical Inference',
        videoUrl: 'https://www.youtube.com/embed/0oc49DyA3hU',
        bookContent: 'Statistical inference draws conclusions from sample data. Key concepts: population vs sample, confidence intervals, margin of error. Central Limit Theorem enables inference.',
        quizzes: [{
          id: 'assessment', title: 'Topic Assessment',
          questions: [
            { id: 1, text: "Population vs Sample?", options: ["Sample is subset of Population", "Population is subset of Sample", "They are same", "Unrelated"], correctAnswer: 0 },
            { id: 2, text: "Goal of inference?", options: ["Draw conclusions about population", "Describe sample only", "Make charts", "Collect data"], correctAnswer: 0 },
            { id: 3, text: "Confidence Interval?", options: ["Range likely containing parameter", "Fixed value", "The error", "The mean"], correctAnswer: 0 },
            { id: 4, text: "Central Limit Theorem involves?", options: ["Sample means", "Population max", "Sample min", "Median"], correctAnswer: 0 },
            { id: 5, text: "CLT states distribution approaches...", options: ["Normal", "Uniform", "Exponential", "Random"], correctAnswer: 0 },
            { id: 6, text: "Margin of Error?", options: ["Uncertainty radius", "The mistake", "The bias", "The standard deviation"], correctAnswer: 0 },
            { id: 7, text: "Standard Error?", options: ["Std dev of sampling distribution", "Std dev of population", "Mean of sample", "Variance"], correctAnswer: 0 },
            { id: 8, text: "Point Estimate?", options: ["Single value estimate", "Range estimate", "Graph", "Table"], correctAnswer: 0 },
            { id: 9, text: "Bias?", options: ["Systematic error", "Random error", "Noise", "Variance"], correctAnswer: 0 },
            { id: 10, text: "Random Sampling ensures?", options: ["Representativeness", "Accuracy", "Speed", "Low cost"], correctAnswer: 0 }
          ]
        }]
      },
      {
        id: 'ds-6',
        title: 'Hypothesis Testing',
        videoUrl: 'https://www.youtube.com/embed/0oc49DyA3hU',
        bookContent: 'Hypothesis testing determines if results are statistically significant. Steps: state hypotheses, choose significance level, calculate test statistic, make decision based on p-value.',
        quizzes: [{
          id: 'assessment', title: 'Topic Assessment',
          questions: [
            { id: 1, text: "Null Hypothesis (H0)?", options: ["No effect/difference", "There is an effect", "The alternative", "The answer"], correctAnswer: 0 },
            { id: 2, text: "Alternative Hypothesis (H1)?", options: ["There is an effect", "No effect", "The status quo", "The null"], correctAnswer: 0 },
            { id: 3, text: "P-value?", options: ["Prob of observing data if H0 true", "Prob H0 is true", "Prob H1 is true", "The error rate"], correctAnswer: 0 },
            { id: 4, text: "If p-value < alpha?", options: ["Reject H0", "Fail to reject H0", "Accept H0", "Reject H1"], correctAnswer: 0 },
            { id: 5, text: "Common alpha level?", options: ["0.05", "0.5", "5.0", "10"], correctAnswer: 0 },
            { id: 6, text: "Type I Error?", options: ["False Positive", "False Negative", "Correct Rejection", "Correct Acceptance"], correctAnswer: 0 },
            { id: 7, text: "Type II Error?", options: ["False Negative", "False Positive", "Correct Rejection", "True Positive"], correctAnswer: 0 },
            { id: 8, text: "Test Statistic?", options: ["Calculated from sample data", "The p-value", "The alpha", "The hypothesis"], correctAnswer: 0 },
            { id: 9, text: "T-test used for?", options: ["Comparing means", "Comparing variances", "Comparing counts", "Comparing strings"], correctAnswer: 0 },
            { id: 10, text: "ANOVA used for?", options: ["Comparing >2 means", "Comparing 2 means", "Comparing 1 mean", "Regression"], correctAnswer: 0 }
          ]
        }]
      },
      {
        id: 'ds-7',
        title: 'Probability Fundamentals',
        videoUrl: 'https://www.youtube.com/embed/uzkc-qNVoOk',
        bookContent: 'Probability measures likelihood of events. Key concepts: sample space, events, conditional probability, Bayes theorem. Distributions: normal, binomial, Poisson.',
        quizzes: [{
          id: 'assessment', title: 'Topic Assessment',
          questions: [
            { id: 1, text: "Probability range?", options: ["0 to 1", "-1 to 1", "0 to 100", "Any number"], correctAnswer: 0 },
            { id: 2, text: "P(A and B) if independent?", options: ["P(A) * P(B)", "P(A) + P(B)", "P(A) / P(B)", "P(A) - P(B)"], correctAnswer: 0 },
            { id: 3, text: "P(A or B) mutually exclusive?", options: ["P(A) + P(B)", "P(A) * P(B)", "P(A) - P(B)", "0"], correctAnswer: 0 },
            { id: 4, text: "Conditional Probability P(A|B)?", options: ["Prob of A given B", "Prob of B given A", "Prob of A and B", "Prob of A or B"], correctAnswer: 0 },
            { id: 5, text: "Normal Distribution shape?", options: ["Bell curve", "Flat", "Skewed", "U-shape"], correctAnswer: 0 },
            { id: 6, text: "Bayes Theorem updates?", options: ["Beliefs based on evidence", "Data based on theory", "Nothing", "Parameters"], correctAnswer: 0 },
            { id: 7, text: "Sample Space?", options: ["Set of all outcomes", "Subset of outcomes", "One outcome", "Zero"], correctAnswer: 0 },
            { id: 8, text: "Complement of Event A?", options: ["Not A", "A and B", "A or B", "A"], correctAnswer: 0 },
            { id: 9, text: "Sum of probabilities in sample space?", options: ["1", "0", "100", "Infinite"], correctAnswer: 0 },
            { id: 10, text: "Discrete vs Continuous?", options: ["Countable vs Measurable", "Measurable vs Countable", "Same", "Opposite"], correctAnswer: 0 }
          ]
        }]
      },
      {
        id: 'ds-8',
        title: 'SQL for Data Science',
        videoUrl: 'https://www.youtube.com/embed/HXV3zeQKqGY',
        bookContent: 'SQL queries databases. Commands: SELECT, FROM, WHERE, JOIN, GROUP BY, ORDER BY. Aggregate functions: COUNT, SUM, AVG, MAX, MIN. Subqueries for complex analysis.',
        quizzes: [{
          id: 'assessment', title: 'Topic Assessment',
          questions: [
            { id: 1, text: "SQL stands for?", options: ["Structured Query Language", "Simple Query List", "Standard Question Link", "System Query Logic"], correctAnswer: 0 },
            { id: 2, text: "Retrieving data command?", options: ["SELECT", "GET", "FETCH", "PULL"], correctAnswer: 0 },
            { id: 3, text: "Filtering command?", options: ["WHERE", "FILTER", "WHEN", "IF"], correctAnswer: 0 },
            { id: 4, text: "Aggregating data?", options: ["GROUP BY", "SUMMARIZE", "COLLECT", "AGGREGATE"], correctAnswer: 0 },
            { id: 5, text: "Sorting results?", options: ["ORDER BY", "SORT", "ARRANGE", "ALIGN"], correctAnswer: 0 },
            { id: 6, text: "Combine tables?", options: ["JOIN", "MERGE", "LINK", "CONNECT"], correctAnswer: 0 },
            { id: 7, text: "Count rows?", options: ["COUNT()", "SUM()", "TOTAL()", "ADD()"], correctAnswer: 0 },
            { id: 8, text: "Unique values?", options: ["DISTINCT", "UNIQUE", "DIFFERENT", "SINGLE"], correctAnswer: 0 },
            { id: 9, text: "Pattern matching?", options: ["LIKE", "MATCH", "SAME", "IS"], correctAnswer: 0 },
            { id: 10, text: "Primary Key?", options: ["Unique identifier", "First column", "Main data", "Password"], correctAnswer: 0 }
          ]
        }]
      },
      {
        id: 'ds-9',
        title: 'Big Data Concepts',
        videoUrl: 'https://www.youtube.com/embed/bAyrObl7TYE',
        bookContent: 'Big Data: Volume, Velocity, Variety. Tools: Hadoop, Spark, Kafka. Distributed computing processes data across clusters. Consider scalability and data pipelines.',
        quizzes: [{
          id: 'assessment', title: 'Topic Assessment',
          questions: [
            { id: 1, text: "The 3 Vs of Big Data?", options: ["Volume, Velocity, Variety", "Value, Vision, Voice", "Vector, Vertex, Volume", "Velocity, Viscosity, Volume"], correctAnswer: 0 },
            { id: 2, text: "Tool for distributed processing?", options: ["Apache Spark", "Excel", "Notepad", "Calculator"], correctAnswer: 0 },
            { id: 3, text: "Hadoop uses?", options: ["MapReduce", "BubbleSort", "QuickSort", "LinearSearch"], correctAnswer: 0 },
            { id: 4, text: "Distributed File System?", options: ["HDFS", "NTFS", "FAT32", "EXT4"], correctAnswer: 0 },
            { id: 5, text: "Streaming data tool?", options: ["Kafka", "Word", "Paint", "Outlook"], correctAnswer: 0 },
            { id: 6, text: "NoSQL Database?", options: ["MongoDB", "MySQL", "PostgreSQL", "Oracle"], correctAnswer: 0 },
            { id: 7, text: "Scalability means?", options: ["Handling growth", "Getting smaller", "Staying constant", "Restarting"], correctAnswer: 0 },
            { id: 8, text: "Data Lake?", options: ["Storage for raw data", "A pond", "Structured database", "Temp folder"], correctAnswer: 0 },
            { id: 9, text: "ETL stands for?", options: ["Extract, Transform, Load", "Edit, Test, Loop", "Enter, Type, Listen", "Easy, True, Live"], correctAnswer: 0 },
            { id: 10, text: "Cloud provider for Big Data?", options: ["AWS", "Photoshop", "Unity", "Steam"], correctAnswer: 0 }
          ]
        }]
      }
    ],
    quizQuestions: [
      { id: 1, text: "Which Python library is main for data manipulation?", options: ["NumPy", "Pandas", "Matplotlib", "Seaborn"], correctAnswer: 1 },
      { id: 2, text: "What does CSV stand for?", options: ["Comma Separated Values", "Computer Style View", "Common Systematic Values", "Code Syntax Value"], correctAnswer: 0 },
      { id: 3, text: "What is Data Cleaning?", options: ["Deleting all data", "Fixing incorrect/incomplete data", "Backing up data", "Encrypting data"], correctAnswer: 1 },
      { id: 4, text: "Which chart is best for showing distribution?", options: ["Pie Chart", "Histogram", "Line Chart", "Scatter Plot"], correctAnswer: 1 },
      { id: 5, text: "What is the median?", options: ["The average", "The middle value", "The most frequent value", "The range"], correctAnswer: 1 },
      { id: 6, text: "What is an outlier?", options: ["A missing value", "A value significantly different from others", "The average value", "A label"], correctAnswer: 1 },
      { id: 7, text: "Which join returns all records from the left table?", options: ["Inner Join", "Right Join", "Left Join", "Outer Join"], correctAnswer: 2 },
      { id: 8, text: "What is variance?", options: ["Measure of spread", "Measure of central tendency", "The maximum value", "The count"], correctAnswer: 0 },
      { id: 9, text: "Which is a categorical variable?", options: ["Height", "Weight", "Color", "Age"], correctAnswer: 2 },
      { id: 10, text: "What is 'Big Data' characterized by?", options: ["Volume, Velocity, Variety", "Small size", "Structured only", "Excel files"], correctAnswer: 0 },
    ]
  }
];
