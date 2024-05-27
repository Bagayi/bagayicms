import { component$, Slot, $ } from '@builder.io/qwik';
import styles from './draggable.module.css';

export default component$(() => {

    const handleDrag = $((event: MouseEvent) => {

        event.preventDefault();
        event.stopImmediatePropagation();
        const element = event.target as HTMLElement;
        let draggableElement = element;

        while (draggableElement && !draggableElement.classList.contains(styles.draggable)) {
            if (draggableElement.parentElement == null) {
                return;
            }
            draggableElement = draggableElement.parentElement;
        }
    
        console.log("event target", draggableElement.classList);
        // Check if the element has the 'draggable' class
        if (!draggableElement.classList.contains(styles.draggable)) {
            // If not, return early to stop the function
            return;
        }

        // get the mouse cursor position at startup:
        let startX = event.clientX;
        let startY = event.clientY;

        let start_element_position = element.getBoundingClientRect();

        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;

        function elementDrag(event: MouseEvent) {
            event.preventDefault();

            const newX = event.clientX + start_element_position.left - startX;
            const newY = event.clientY + start_element_position.top - startY;
            
            // Update the element's position
            draggableElement.style.position = 'absolute';
            draggableElement.style.left = `${newX}px`;
            draggableElement.style.top = `${newY}px`;
        }

        function closeDragElement() {
            /* stop moving when mouse button is released:*/
            document.onmouseup = null;
            document.onmousemove = null;
          }
    })

    return (
        <div class={styles.draggable} onMouseDown$={(e: MouseEvent) => handleDrag(e)}>
            <Slot />
        </div>
    );
});