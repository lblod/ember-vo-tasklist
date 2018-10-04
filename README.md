ember-vo-tasklist [STUB]
==============================================================================

Tasklist addon.

Installation
------------------------------------------------------------------------------

```
ember install @lblod/ember-vo-tasklist
```


Usage
------------------------------------------------------------------------------

This addon provides the management of tasklists.
This addon has as the extra feature of tasklists which can be re-used.
Therefore, a decoupling from the tasklist vs. the completion of a task has been designed.

See model files for more information about the model.

There is minimal css, which can be imported in host app styles/app.scss:

`@import 'ember-vo-tasklist';`

Make sure your model files are availble too in the host app.

TODO
------------------------------------------------------------------------------
As said, this is only a stub implementation. Only an already existing tasklist can be completed.
So there is a lot todo before being a fullblown tasklist management addon.
The templates are pretty basic too.


Contributing
------------------------------------------------------------------------------

### Installation

* `git clone <repository-url>`
* `cd ember-vo-tasklist`
* `npm install`

### Linting

* `npm run lint:hbs`
* `npm run lint:js`
* `npm run lint:js -- --fix`

### Running tests

* `ember test` – Runs the test suite on the current Ember version
* `ember test --server` – Runs the test suite in "watch mode"
* `ember try:each` – Runs the test suite against multiple Ember versions

### Running the dummy application

* `ember serve`
* Visit the dummy application at [http://localhost:4200](http://localhost:4200).

For more information on using ember-cli, visit [https://ember-cli.com/](https://ember-cli.com/).

License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
