import { Component, component$, useSignal, useTask$,$, useVisibleTask$, type NoSerialize} from "@builder.io/qwik";
import {GridStack} from 'gridstack';
import 'gridstack/dist/gridstack.css';

export default component$(() => {
    
    let grid: { current: NoSerialize<GridStack> | null } = { current: null };
    
    // eslint-disable-next-line qwik/no-use-visible-task
    useVisibleTask$(() => {
        console.log('usingVisibleTask$');
        grid.current = GridStack.init({margin: 0}) as NoSerialize<GridStack>;
    });

    // GridStack
    const addNested = $(() => {
        console.log('addNested');

        var items = [
            {content: 'my first widget'}, // will default to location (0,0) and 1x1
            {w: 2, content: 'another longer widget!'}, // will be placed next at (1,0) and 2x1
            {w: 3, content: "third widget"}
          ];
        grid?.current?.addWidget(items[0]);

        grid?.current?.getGridItems().forEach((item) => {
            console.log("item:", item)
        });

        console.log("cell heigh:", grid?.current?.getCellHeight());
    });

    useTask$(async () => {
        // A task without `track` any state effectively behaves like a `on mount` hook.
        console.log('Runs once when the component mounts in the server OR client.');
    });

    return (
        <>
        <div>
            <h1>How to integrate GridStack.js with React.js</h1>
            <p>
              As with any virtual DOM based framework, you need to check if React
              has rendered the DOM (or any updates to it){" "}
              <strong>before</strong> you initialize GridStack or call its
              methods. As a basic example, check this component's{" "}
              <code>mounted</code> hook.
            </p>
            <p>
              If your app requires more complex render logic than the inline
              template in `addWidget`, consider&nbsp;
              <a href="https://github.com/gridstack/gridstack.js/tree/master/doc#makewidgetel">
                makeWidget
              </a>
              &nbsp;to let React deal with DOM rendering.
            </p>
            <button type="button" onClick$={() => addNested()}>
              Add Widget
            </button>
            <div class="App">
                <div class="grid-stack">
                    <div class="grid-stack-item border-dark" data-gs-width="4" data-gs-height="4">
                    <div class="grid-stack-item-content">Item 1</div>
                </div>
                <div class="grid-stack-item border-dark" data-gs-width="4" data-gs-height="4">
                    <div class="grid-stack-item-content">Item 2</div>
                </div>
                <div class="grid-stack-item border-dark" data-gs-width="4" data-gs-height="4">
                    <div class="grid-stack-item-content">Item 3</div>
                </div>
            </div>
        </div>
        </div>
        </>
    );
});