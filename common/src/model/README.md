# Models

## Approach

The general way [I](https://github.com/sarpik) go about models is that we:

* ~~create an interface for the model with optional parameters:~~ Use [`Partial<Friend>`](https://www.typescriptlang.org/docs/handbook/utility-types.html#partialt)!!! OMG this is so good!

* inside the constructor, we allow optional (Partial) data to be passed in, allowing us to provide however much data we want, and providing default values for others:

```ts
export class Friend {
	name: string = "";

	constructor(data?: Partial<Friend>) {
		Object.assign(this, data);
	}
}
```

and that's it!
