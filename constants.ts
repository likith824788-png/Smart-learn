import { Course, ClusterType } from './types';

export const determineCluster = (score: number): ClusterType => {
  if (score > 75) return ClusterType.TOPPER;
  if (score > 50) return ClusterType.AVERAGE;
  if (score > 25) return ClusterType.BELOW_AVERAGE;
  return ClusterType.FAILURE;
};

export const COURSES: Course[] = [
  {
    id: 'python-101',
    title: 'Python Programming',
    description: 'Master the basics of Python, from syntax to object-oriented programming.',
    icon: '🐍',
    topics: [
      {
        id: 'py-0',
        title: 'Python Syntax Basics',
        videoUrl: 'https://www.youtube.com/embed/kqtD5dpn9C8',
        bookContent: 'Python uses indentation to define code blocks. Variables are created when you assign a value to them. Python is dynamically typed, meaning you don\'t need to declare variable types.'
      },
      {
        id: 'py-1',
        title: 'Variables and Data Types',
        videoUrl: 'https://www.youtube.com/embed/cQT33yu9pY8',
        bookContent: 'Python has several built-in data types: integers, floats, strings, booleans, lists, tuples, dictionaries, and sets. Use type() to check the type of any variable.'
      },
      {
        id: 'py-2',
        title: 'Control Flow - Loops',
        videoUrl: 'https://www.youtube.com/embed/6iF8Xb7Z3wQ',
        bookContent: 'Python supports for loops and while loops. The for loop iterates over sequences (lists, tuples, strings). The while loop executes as long as a condition is true.'
      },
      {
        id: 'py-3',
        title: 'Functions',
        videoUrl: 'https://www.youtube.com/embed/9Os0o3wzS_I',
        bookContent: 'Functions are defined using the def keyword. They can accept parameters and return values. Python supports default arguments, *args, and **kwargs for flexible function signatures.'
      },
      {
        id: 'py-4',
        title: 'Lists and List Comprehension',
        videoUrl: 'https://www.youtube.com/embed/AhSvKGTh28Q',
        bookContent: 'Lists are ordered, mutable collections. List comprehension provides a concise way to create lists: [x**2 for x in range(10)]. Common methods: append(), extend(), pop(), sort().'
      },
      {
        id: 'py-5',
        title: 'Dictionaries',
        videoUrl: 'https://www.youtube.com/embed/daefaLgNkw0',
        bookContent: 'Dictionaries store key-value pairs. Keys must be immutable (strings, numbers, tuples). Access values using dict[key] or dict.get(key). Methods: keys(), values(), items().'
      },
      {
        id: 'py-6',
        title: 'File Handling',
        videoUrl: 'https://www.youtube.com/embed/Uh2ebFW8OYM',
        bookContent: 'Use open() to work with files. Modes: r (read), w (write), a (append). Always use "with" statement for automatic file closing. Read methods: read(), readline(), readlines().'
      },
      {
        id: 'py-7',
        title: 'Modules and Packages',
        videoUrl: 'https://www.youtube.com/embed/CqvZ3vGoGs0',
        bookContent: 'Modules are Python files containing functions and variables. Import using: import module or from module import function. Create packages by adding __init__.py to directories.'
      },
      {
        id: 'py-8',
        title: 'Object-Oriented Programming',
        videoUrl: 'https://www.youtube.com/embed/JeznW_7DlB0',
        bookContent: 'Classes define blueprints for objects. Use __init__ for constructors. self refers to the instance. Inheritance allows classes to inherit from parent classes. Encapsulation protects data.'
      },
      {
        id: 'py-9',
        title: 'Error Handling',
        videoUrl: 'https://www.youtube.com/embed/NIWwJbo-9_8',
        bookContent: 'Use try/except blocks to handle exceptions. Common exceptions: ValueError, TypeError, FileNotFoundError. The finally block always executes. Raise custom exceptions with raise.'
      }
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
    icon: '🤖',
    topics: [
      {
        id: 'ml-0',
        title: 'Introduction to Machine Learning',
        videoUrl: 'https://www.youtube.com/embed/ukzFI9rgwfU',
        bookContent: 'Machine Learning is a subset of AI where computers learn patterns from data without explicit programming. Types: Supervised, Unsupervised, and Reinforcement Learning.'
      },
      {
        id: 'ml-1',
        title: 'Linear Regression',
        videoUrl: 'https://www.youtube.com/embed/7ArmBVF2dCs',
        bookContent: 'Linear regression predicts continuous values by fitting a line through data points. Formula: y = mx + b. Use Mean Squared Error (MSE) to measure accuracy.'
      },
      {
        id: 'ml-2',
        title: 'Logistic Regression',
        videoUrl: 'https://www.youtube.com/embed/yIYKR4sgzI8',
        bookContent: 'Logistic regression is used for binary classification. It uses the sigmoid function to output probabilities between 0 and 1. Threshold typically set at 0.5.'
      },
      {
        id: 'ml-3',
        title: 'Decision Trees',
        videoUrl: 'https://www.youtube.com/embed/7VeUPuFGJHk',
        bookContent: 'Decision trees split data based on feature values. They use metrics like Gini impurity or Information Gain. Prone to overfitting - use pruning or Random Forests.'
      },
      {
        id: 'ml-4',
        title: 'Support Vector Machines',
        videoUrl: 'https://www.youtube.com/embed/efR1C6CvhmE',
        bookContent: 'SVM finds the optimal hyperplane that separates classes with maximum margin. Kernel trick allows non-linear classification. Common kernels: linear, RBF, polynomial.'
      },
      {
        id: 'ml-5',
        title: 'K-Means Clustering',
        videoUrl: 'https://www.youtube.com/embed/4b5d3muPQmA',
        bookContent: 'K-Means is an unsupervised algorithm that groups data into K clusters. Steps: initialize centroids, assign points, update centroids, repeat until convergence.'
      },
      {
        id: 'ml-6',
        title: 'Neural Networks Basics',
        videoUrl: 'https://www.youtube.com/embed/aircAruvnKk',
        bookContent: 'Neural networks consist of layers of interconnected nodes. Input layer receives data, hidden layers process it, output layer produces results. Activation functions add non-linearity.'
      },
      {
        id: 'ml-7',
        title: 'Model Evaluation Metrics',
        videoUrl: 'https://www.youtube.com/embed/85dtiMz9tSo',
        bookContent: 'Classification metrics: Accuracy, Precision, Recall, F1-Score, AUC-ROC. Regression metrics: MSE, RMSE, MAE, R². Use confusion matrix to understand predictions.'
      },
      {
        id: 'ml-8',
        title: 'Feature Engineering',
        videoUrl: 'https://www.youtube.com/embed/6WDFfaYtN6s',
        bookContent: 'Feature engineering transforms raw data into meaningful features. Techniques: normalization, one-hot encoding, feature scaling, handling missing values, dimensionality reduction.'
      },
      {
        id: 'ml-9',
        title: 'Model Deployment',
        videoUrl: 'https://www.youtube.com/embed/H73m9XvKHug',
        bookContent: 'Deploy models using Flask/FastAPI for APIs. Use pickle/joblib to save models. Consider Docker for containerization. Monitor model performance and retrain periodically.'
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
    icon: '📊',
    topics: [
      {
        id: 'ds-0',
        title: 'Introduction to Data Science',
        videoUrl: 'https://www.youtube.com/embed/X3paOmcrTjQ',
        bookContent: 'Data Science combines statistics, programming, and domain expertise to extract insights from data. The process: collection, cleaning, exploration, modeling, and communication.'
      },
      {
        id: 'ds-1',
        title: 'Pandas for Data Analysis',
        videoUrl: 'https://www.youtube.com/embed/vmEHCJofslg',
        bookContent: 'Pandas provides DataFrames for tabular data. Key operations: read_csv(), head(), describe(), groupby(), merge(). Handle missing data with fillna() or dropna().'
      },
      {
        id: 'ds-2',
        title: 'Data Cleaning Techniques',
        videoUrl: 'https://www.youtube.com/embed/bDhvCp3_lYw',
        bookContent: 'Clean data by handling missing values, removing duplicates, fixing data types, and handling outliers. Use df.isnull().sum() to find missing values. Consistent formatting is crucial.'
      },
      {
        id: 'ds-3',
        title: 'Exploratory Data Analysis',
        videoUrl: 'https://www.youtube.com/embed/xi0vhXFPegw',
        bookContent: 'EDA uncovers patterns and anomalies. Check distributions, correlations, and relationships. Use statistical summaries and visualizations. Ask questions about the data.'
      },
      {
        id: 'ds-4',
        title: 'Data Visualization with Matplotlib',
        videoUrl: 'https://www.youtube.com/embed/3Xc3CA655Y4',
        bookContent: 'Matplotlib creates static visualizations. Plot types: line, bar, scatter, histogram, pie. Customize with titles, labels, legends. Use plt.subplots() for multiple charts.'
      },
      {
        id: 'ds-5',
        title: 'Statistical Inference',
        videoUrl: 'https://www.youtube.com/embed/0oc49DyA3hU',
        bookContent: 'Statistical inference draws conclusions from sample data. Key concepts: population vs sample, confidence intervals, margin of error. Central Limit Theorem enables inference.'
      },
      {
        id: 'ds-6',
        title: 'Hypothesis Testing',
        videoUrl: 'https://www.youtube.com/embed/0oc49DyA3hU',
        bookContent: 'Hypothesis testing determines if results are statistically significant. Steps: state hypotheses, choose significance level, calculate test statistic, make decision based on p-value.'
      },
      {
        id: 'ds-7',
        title: 'Probability Fundamentals',
        videoUrl: 'https://www.youtube.com/embed/uzkc-qNVoOk',
        bookContent: 'Probability measures likelihood of events. Key concepts: sample space, events, conditional probability, Bayes theorem. Distributions: normal, binomial, Poisson.'
      },
      {
        id: 'ds-8',
        title: 'SQL for Data Science',
        videoUrl: 'https://www.youtube.com/embed/HXV3zeQKqGY',
        bookContent: 'SQL queries databases. Commands: SELECT, FROM, WHERE, JOIN, GROUP BY, ORDER BY. Aggregate functions: COUNT, SUM, AVG, MAX, MIN. Subqueries for complex analysis.'
      },
      {
        id: 'ds-9',
        title: 'Big Data Concepts',
        videoUrl: 'https://www.youtube.com/embed/bAyrObl7TYE',
        bookContent: 'Big Data: Volume, Velocity, Variety. Tools: Hadoop, Spark, Kafka. Distributed computing processes data across clusters. Consider scalability and data pipelines.'
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
