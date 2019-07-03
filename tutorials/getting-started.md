## Getting Started

The test runner script `sia.js` contains everything you need to know to get the test suite running and documentation generated, just type `node ./sia.js -h`into the terminal to get more information.

The abstraction library (bureau) can be used with any test framework, and in this example, I've used Mocha to demonstrate the readability that bureau provides (Dynamic Loading being the best example).

The POM is an object that works through a series of files and requires.
First, you'll want to add a page or a site into the POM, using an object with language chains, you can make the tests self documenting:

``` 
const {Element} = require(`${process.cwd()}/bureau/abstraction/abstractions.js`);
let menu = {
	item: (text) => {
		return new Element({linkText: text});
	}
}
exports.menu = menu;
```

Add a require in the index file for that folder, (or make a new one and reference that new index file in the parent folder's index file) so that the language chain can reach the elements that you have just documented.

These are now usable in a test:

``` 
describe("A Menu Item", ()=>{
	it("should be clickable", async ()=>{
		return await (await menu.item.can.be.found).and.can.be.clicked
	})
}) 
```