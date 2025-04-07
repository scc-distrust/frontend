class DraggableElement {
    private event: (event: MouseEvent | TouchEvent) => void;

    private elementOffset: number[] = [0, 0];
    private baseOffset: number[] = [0, 0];
    private isDragging: boolean = false;
    private constraints: Constraint[] = [];
    private events: RegisteredListener<any>[] = [];

    private letGoListeners: (() => void)[] = [];

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

        this.event = (event: MouseEvent | TouchEvent) => {
            if (!this.isDragging) return;

            let pageX: number = 0;
            let pageY: number = 0;

            if (event instanceof TouchEvent) {
                pageX = event.touches[0].pageX;
                pageY = event.touches[0].pageY;
            } else {
                pageX = event.pageX;
                pageY = event.pageY;
            }

            let elementX = pageX - this.baseOffset[0];
            let elementY = pageY - this.baseOffset[1];

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
                    x: pageX,
                    y: pageY,
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

        this.register(element, 'touchstart', (_) => {
            this.isDragging = true;
            document.addEventListener('touchmove', this.event);
        });

        this.register(element, 'mouseup', () => {
            if (!this.isDragging) return;
            this.letGoListeners.forEach(l => l());
            document.removeEventListener('mousemove', this.event);
        });

        this.register(element, 'touchend', () => {
            if (!this.isDragging) return;
            this.letGoListeners.forEach(l => l());
            document.removeEventListener('touchmove', this.event);
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

    letGo(callback: () => void): DraggableElement {
        this.letGoListeners.push(callback);
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