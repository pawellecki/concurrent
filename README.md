# async function with limit of concurrent Promises + tests

to start:
- clone repo
- go to 'my-app' folder
- 'yarn' to install dependencies
- 'yarn start' to start

_______________________________________________________________________________________________________
Task 1:
Create a simple UI in React with a text field (having a blue border) and a submit
button. If the text field contains a string that is an integer, then the submit button can
succeed and an alert is shown with the number. Else the text field's border will turn
red and vibrate 3 times. If the user keeps entering non-integer number (for example:
including some letters) and press submit button again then the text field will vibrate
again

Task 2:
Write a map function that accepts 3 arguments:
1. An array of values
2. An async function
3. An integer representing concurrency limit
The function should map over the values from the input array (1st argument) using
async function (2nd argument) with maximum number of concurrent Promises
equal to concurrency limit number (3rd argument).
The function should work for any kind of values in the input array.
Please write a test suite in a framework of choice that proves the implementation
works as expected.
