---
title: Functions
layout: docs
methods:

  - signature: functions.call(functionName, parameters)
    id: call
    generator: true
    description: |
      Calls a [cloud function](https://firebase.google.com/docs/functions/) with the given parameters.
      The function has to be triggered by HTTP request.

      ⚠️ You will need to **enable CORS** in order for this to work.
      The easiest way to do so is to use the [cors](https://www.npmjs.com/package/cors) middleware for express.

      This assumes that your functions are hosted in the `us-central1` region.
      If this is not the case you can change the region used by setting `rsf.region`:

      ```js
      const rsf = new ReduxSagaFirebase(...);
      rsf.region = 'other-region1';
      ```
    arguments:
      - name: functionName
        type: String
        description: A string representing the function name. This will be used as a pathname in the https request.
      - name: parameters
        type: Object
        description: Defaults to `{}`. A javascript object describing the query parameters to use in the http request.
    output: A javascript object (`application/json`) or a string (anything else) depending on the Content-Type of the response.
    example: |
      ```js
      function* callFunction() {
        // Will call: https://us-central1-project-id.firebaseapp.com/sayHello?name=Alfred
        const result = yield call(rsf.functions.call, 'sayHello', {
          name: 'Alfred'
        });

        // `result` is either an object or a string (depends on response's Content-Type)
      }
      ```
---
