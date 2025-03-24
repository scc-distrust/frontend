class DraggableElement {
    event: (event: MouseEvent) => void;
    
    elementOffset: number[] = [0, 0];
    isDragging: boolean = false;
    constraints: HTMLElement[] = [];

    constructor(
        private readonly element: HTMLElement,
        private readonly callback: (x, y) => void
    ) {
        this.event = (event: MouseEvent) => {
            if (!this.isDragging) return;

            for (const constraint of this.constraints) {
                const rect = constraint.getBoundingClientRect();
                const x = event.pageX - rect.left;
                const y = event.pageY - rect.top;

                const maxX = rect.right - rect.width;
                const maxY = rect.bottom - rect.height;

                if (x < 0 || y < 0 || x > rect.width || y > rect.height) return;
            }

            callback(event.pageX - this.elementOffset[0], event.pageY - this.elementOffset[1]);
        };

        element.addEventListener('mousedown', (event: MouseEvent) => {
            this.isDragging = true;
            this.elementOffset = [event.pageX - element.offsetLeft, event.pageY - element.offsetTop];
            document.addEventListener('mousemove', this.event);
        })
    
        document.addEventListener('mouseup', () => {
            if (!this.isDragging) return;
            this.isDragging = false;
            this.elementOffset = [0, 0];
            document.removeEventListener('mousemove', this.event);
        })
    }

    addConstraint(element: HTMLElement): DraggableElement {
        this.constraints.push(element);
        return this;
    }

}

export const mount = (element: HTMLElement, callback: (x: number, y: number) => void): DraggableElement => {
    return new DraggableElement(element, callback)
}