# algorithm-plus contributing guide

I'm glad you're interested in contributing to algorithm plus. Before submitting your contribution, please take some time to read the guide.

## QuickStart

Algorithm plus uses `pnpm` to build the ``monorepo repository, and you should use [pnpm](https://www.pnpm.cn/)Package management tools to ensure that no issues arise due to differences in package management tools

## Directory

Before contributing, please spend sometime read directory struct

- `data-struct`: Common data structures
- `shared`: Internal utilities shared across multiple packages

You can create your own directory. For example. If you need implement `sort` feature, you can create `sort` under `package` directory. After development completed, export your features in `index.ts`.

## Import packages

The packages can import each other directly using their package names. Note that when importing a package the name listed in its package.json should be used. Most of the time the `@algorithm-plus` prefix is needed:

```typescript
import {deepClone} from '@algorithm-plus/shared';
```

## Unit Test

Unit testing can help you discover bugs. Therefore, when developing new features, you should create unit tests and ensure coverage>=90%.