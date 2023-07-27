# Autograder Reflection System

## 📐 Background

You are a Computer Science instructor who gives students a task to write hints on correcting a false assignments chosen from previous database to the students' own correct solutions. By trying to understand how mistakes are made and how to correct it, students are expected to form a deeper understanding of the project.

The system contains three repos:
1. **SIADS505**
	- Hold Workspace and Autograder instances running on Coursera
	- Gather telemetry data from student submissions
	- Process telemetry data send to API Gateway and to MongoDB
2. **ars-reflection-system** for selecting and displaying
	- Lambda functions integrated with API Gateway to select hint from database
	- Auth0
	- Webapp displaying side-by-side code snippets
	-  Gather student hints and ratings on hints
3. **jupyter-submission-analysis** for analyzing and visualizing past student submissions

There are two questions here essentially that needs to be solved.
1. There are many false solutions in the history database. How do we decide which assignments are the best for the student to reflect on?
2. How do we measure that the false solution is the best for the student to reflect on?
3. Given two solutions, one correct and one incorrect, what is the best way for the student to write hint?

For the first question, there are several algorithms here we can apply to
- Time series
- Compare similarity
- Keywords

For the second question, we introduce a rating system.

For the third question, it is still yet to be decided by the algorithm.

For the server code,
- Preprocess
	- Before analyzing the code, we'll pre-process it. This involves tasks like **removing comments, normalizing variable names (e.g., replacing them with placeholders), and formatting the code consistently**.
- Syntax and static analysis
	- **If there's an error in syntax or during static analysis, we abandon it.**
	- Using static analysis, we can identify and categorize some types of mistakes:
		- Syntax errors can be easily identified using a parser for the programming language.
		- Common logic errors, such as the use of an assignment operator (=) in a condition (when == was probably intended), can also be found this way.
	- We can detect unused variables, unnecessary computations, etc.
- For the rest of the code we send to code similarity and text analysis phase and identify **one critical error**

