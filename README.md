# CodeCompare
Tool to compare two code snippets with an iterating variable n

## Usage

Type your starting value for `n`, your ending value for `n`, and your code snippets in the appropriate inputs. You can reference `n` in your snippets, and it will be interpreted as the current iteration.

You can think of the code executing behind the scenes as looking like this

```JavaScript
for(var n = startN; n <= endN; n++){
	function1();
	function2();
}
```

Again, both functions can access the variable `n` - they're computed using `eval`.


## Todo

* Support for async functions
* Better way to not block UI thread
* Color choosing
* Integrate with Brython/Skulpt to support Python