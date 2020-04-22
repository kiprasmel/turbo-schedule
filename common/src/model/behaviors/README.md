# behaviors

We're using composition here.

It's important to think about **what something does**, rather than **what something is**.

## Boilerplate

```ts
/* eslint-disable lines-between-class-members */

import { Constructor } from "../../Constructor";

export const DoesSomethingMixin = <TBaseClass extends Constructor>(BaseClass: TBaseClass = class {} as TBaseClass) =>
	class extends BaseClass {

	};
```

## See also

* https://github.com/sarpik/turbo-schedule/issues/35
* https://alligator.io/js/class-composition/
* https://mariusschulz.com/blog/mixin-classes-in-typescript
