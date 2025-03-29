class DraggableElement {
    private event: (event: MouseEvent) => void;

    private elementOffset: number[] = [0, 0];
    private baseOffset: number[] = [0, 0];
    private isDragging: boolean = false;
    private constraints: Constraint[] = [];
    private events: RegisteredListener<any>[] = [];

    private register<K extends keyof HTMLElementEventMap>(
        element: Node,
        event: K,
        handler: (event: HTMLElementEventMap[K]) => void
    ) {
        element.addEventListener(event, handler as any);
        this.events.push({ element, event, handler });
    }

    constructor(
        element: HTMLElement,
        callback: (event: DragEvent) => void
    ) {
        this.elementOffset = [element.offsetLeft, element.offsetTop];

        this.event = (event: MouseEvent) => {
            if (!this.isDragging) return;

            let elementX = event.pageX - this.baseOffset[0];
            let elementY = event.pageY - this.baseOffset[1];

            for (const constraint of this.constraints) {
                const rect = constraint.element.getBoundingClientRect();

                const maxLeft = rect.left - this.baseOffset[0] + constraint.padding;
                const maxTop = rect.top - this.baseOffset[1] + constraint.padding;
                const maxRight = maxLeft + rect.width - (constraint.padding * 2);
                const maxBottom = maxTop + rect.height - (constraint.padding * 2);

                elementX = Math.max(Math.min(elementX, maxRight), maxLeft);
                elementY = Math.max(Math.min(elementY, maxBottom), maxTop);
            }

            const x = elementX - this.elementOffset[0];
            const y = elementY - this.elementOffset[1];

            callback({
                mouse: {
                    x: event.pageX,
                    y: event.pageY,
                },
                element: {
                    x,
                    y,
                }
            });
        };

        this.register(element, 'mousedown', (_) => {
            this.isDragging = true;
            document.addEventListener('mousemove', this.event);
        });

        this.register(element, 'mouseup', () => {
            if (!this.isDragging) return;
            document.removeEventListener('mousemove', this.event);
        });

        this.register(document, 'selectstart', (event: Event) => {
            if (!this.isDragging) return;
            event.preventDefault();
        });
    }

    addConstraint(element: Constraint): DraggableElement {
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

    cancel(): DraggableElement {
        this.isDragging = false;

        document.removeEventListener('mousemove', this.event);
        for (const event of this.events) {
            event.element.removeEventListener(event.event, event.handler);
        }

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

interface Constraint {
    element: HTMLElement;
    padding: number;
}

interface RegisteredListener<K extends keyof HTMLElementEventMap> {
    element: Node;
    event: K,
    handler: (event: HTMLElementEventMap[K]) => void;
}