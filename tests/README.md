# LintelTest

Test infrastructure which uses playwright to run end-to-end tests of the browser-based CAD tool Lintel. 

| Script | What it does |
|---|---|
| `npx playwright install` | Run this once to make sure latest playwright is installed in the directory |
| `npm run test:e2e` | Runs all the playwright end-to-end tests |

There are some tests which use screenshots to validate state of the viewport- there are already existing screenshots which should work on linux or windows. But if you are using Mac, you will need to update screenshots for mac by running `npx playwright test -u` once. 



## Overall Testing Strategy:

The strategy behind the tests implemented here is based on a modular approach where the most emphasis is placed on reusability, granularity, and readability. A main benefit of this approach is that maintaining tests is very easy as most actions and workflows are covered by reusable functions in `util/lintelTest.ts` and mapped locators in `util/locators.ts`. This makes scaling quick, easy and clean, whether an engineer or agent is writing more tests. This also makes for easy maintenance as actions and selectors are used by many tests, but only need to be updated in one place. Another benefit is that the tests are intuitive and readable. Huge benefit is that agents instructed to follow the conventions of these tests write tests and code which is extremely readable and quickly digestible. 

### Assignment tasks:
1. 3D interactions in the viewport: almost all the tests cover 3D interactions in the viewport, and particularly the test `viewer.spec.ts` covers workflows in which something only true inside the canvas is being validated.
2. Tools and their inputs: specifically the tests `createBox.spec.ts`, `extrudeRectangle.spec.ts`, and `planarSurfaceProperties.spec.ts` cover these workflows. 
3. The layers panel: `changeLayerColor.spec.ts`, `objectLayers.spec.ts`, and `layerVisibilityLocking.spec.ts`. 

## Flakiness Risks

1. Loading the App from `localStorage` could potentially cause flakiness in tests inheriting browser states, drawings, etc. from previous runs. Possible solution in the following section, having the tests inject dependencies, having a fresh storage per test.

2. Animation and rendering depending on frame timing: Camera framing uses `performance.now()` and `requestAnimationFrame` and viewport renders use another animation frame `Viewport.ts`. Under CI load these could be slow and/or cause instability in pixel-exact renderings. Potential solution mentioned in next section, a read-only app snapshot.   


## Further hooks, test APIs, or changes to request product team to make the product more testable

### Two product implementations/suggestions:

1. Another panel in the application to select Objects from: I implemented this part myself, so the suggested changes are already here on this branch. Before the implemented objects panel, the only clear way of selecting an existing object was to click it inside the viewport, which proves difficult within playwright and would not be reliable in testing. An objects panel where the user can see the existing objects and select them is both a nice added functionality for the user and makes it more testable. 

2. When selecting a new color for a Layer, the state in the browser does not allow for any other objects to be visible, requiring the user to click somewhere else in the window to close the color picker. For the sake of testing specifically, at least enabling other objects to be visible while the color picker is open would be ideal; for the sake of the user, perhaps closing the color picker altogether after selecting a color or an 'x' close modal button would work. 

### Infrastructure suggestions for making the product more testable

The code is already quite reliable with solid geometry logic and flexible options such as `ToolManager` accepting either clicks of the toolbar or directly typed input commands. With that said, a great opportunity for improvement is in the browser-dependent behavior. Some of these changes could make the browser behavior more deterministic and observable: 

1. Injecting dependencies on test-level to make them independent of browser state: Currently the tests load from a `localStorage`, but loading an initial state, storage, and timer/scheduler would make the tests more independent. This might look something like this: 

`new App({ initialState, storage, scheduler })` 

2. Some sort of test driver for viewpoint interactions. Actions the user would perform in the viewer, clicking objects, points in space, are difficult to mimic with playwright. A driver for these interactions would add testability for actions within the viewport. 

3. An app snapshot: something like a read-only snapshot of objects, layers, selection IDs, properties, etc. would give the tests a potentially more robust method of verification in addition to validating the viewport through means such as screenshots. This might look like an API to gather signals from `App.ts` and `ToolManager.ts`. 



