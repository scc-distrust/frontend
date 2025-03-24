class DraggableElement {
    private event: (event: MouseEvent) => void;
    
    private baseOffset: number[] = [0, 0];
    private isDragging: boolean = false;
    private constraints: HTMLElement[] = [];

    constructor(
        element: HTMLElement,
        callback: (event: DragEvent) => void
    ) {
        this.event = (event: MouseEvent) => {
            if (!this.isDragging) return;

            for (const constraint of this.constraints) {

            }

            callback({
                mouse: {
                    x: event.pageX,
                    y: event.pageY,
                },
                element: {
                    x: event.pageX,
                    y: event.pageY,
                }
            });
        };

        element.addEventListener('mousedown', (event: MouseEvent) => {
            this.isDragging = true;
            document.addEventListener('mousemove', this.event);
        })
    
        document.addEventListener('mouseup', () => {
            if (!this.isDragging) return;
            document.removeEventListener('mousemove', this.event);
        })

        document.addEventListener('selectionchange', (event) => {
            if (this.isDragging) {
                event.preventDefault();
            }
        })
    }

    addConstraint(element: HTMLElement): DraggableElement {
        this.constraints.push(element);
        return this;
    }

    offsetXZ(x: number, y: number): DraggableElement {
        this.baseOffset = [x, y];
        return this;
    }

    offsetElement(element: HTMLElement): DraggableElement {
        const rect = element.getBoundingClientRect();
        this.baseOffset = [rect.left, rect.top];
        return this;
    }

}

export const mount = (element: HTMLElement, callback: (event: DragEvent) => void): DraggableElement => {
    return new DraggableElement(element, callback)
}

export interface DragEvent {
    mouse: {
        x: number;
        y: number;
    };
    element: {
        x: number;
        y: number;
    };
}