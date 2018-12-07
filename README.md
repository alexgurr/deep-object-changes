# deep-object-changes
![npm](https://nodei.co/npm/deep-object-changes.png?compact=true) ![issues](https://img.shields.io/github/issues/alexgurr/deep-object-changes.svg) ![stars](https://img.shields.io/github/stars/alexgurr/deep-object-changes.svg)

Compares two objects, an original and an updated version and returns an object with only the changes.

Will deep compare objects recursively, but will only shallow compare arrays.

This module is useful for working out the bare minimum payload needed to send to a server.

## Example

```
  import deepObjectChanges from 'deep-object-changes';
  
  const EXAMPLE_USER_RES = {
    firstName: 'Emperor',
    lastName: 'Palpatine',
    age: 75,
    location: {
      street: 'Death Star',
      postCode: 'SPACE'
    }
  };
  
  const EXAMPLE_CHANGED_USER = {
    firstName: 'Emperor',
    lastName: 'Palpatine',
    age: 85,
     location: {
      street: 'Death Star',
      postCode: 'GALAXY'
    }
  }
  
  deepObjectChanges(EXAMPLE_USER_RES, EXAMPLE_CHANGED_USER);
  
  /**
    Outputs: 
    
    {
      age: 85,
       location: {
        postCode: 'GALAXY'
      }
    }
 */
  
```
