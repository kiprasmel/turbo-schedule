# Models

## Approach

The general way [I](https://github.com/sarpik) go about models is that we:

* create an interface for the model with optional parameters:

```ts
export interface IFriend {
	name?: string;
}
```

* create a class, which implements that interface, with required parameters and their initialization, meaning that we always provide a default value:

```ts
export class Friend implements IFriend {
	name: string = "";
}
```

* inside the constructor, we allow optional data of the interface's type (`IFriend` here) to be passed in, allowing us to provide however much data we want, and providing default values for others:


```ts
export class Friend implements IFriend {
	name: string = "";

	constructor(data?: IFriend) {
		Object.assign(this, data);
	}
}
```

and that's it!

## Final outcome

```ts
export interface IFriend {
	name?: string;
}

export class Friend implements IFriend {
	name: string = "";

	constructor(data?: IFriend) {
		Object.assign(this, data);
	}
}
```
