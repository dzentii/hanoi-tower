class Stack<T> {
    private items: T[] = [];

    // Добавление элемента на вершину стека
    push(item: T): void {
        this.items.push(item);
    }

    // Удаление и возврат элемента с вершины стека
    pop(): T | undefined {
        return this.items.pop();
    }

    // Просмотр элемента на вершине стека без удаления
    peek(): T | undefined {
        return this.items[this.items.length - 1];
    }

    // Проверка на пустоту
    isEmpty(): boolean {
        return this.items.length === 0;
    }

    // Размер стека
    size(): number {
        return this.items.length;
    }

    toString(): string {
        return this.items.join(', ');
    }
}

// Класс для представления кольца
class Ring {
    constructor(public size: number, public color: string = 'default') {}

    toString(): string {
        return `Ring(Размер=${this.size}, цвет=${this.color})`;
    }
}

// Класс игры
class HanoiTower {
    private towers: [Stack<Ring>, Stack<Ring>, Stack<Ring>];
    private moveCount: number = 0;

    constructor(private numDisks: number) {
        if (numDisks < 1) {
            throw new Error("Количество дисков должно быть не менее 1");
        }

        // Инициализация трех башен
        this.towers = [
            new Stack<Ring>(),
            new Stack<Ring>(),
            new Stack<Ring>()
        ];

        // Заполняем первую башню кольцами (от большего к меньшему)
        for (let i = numDisks; i >= 1; i--) {
            this.towers[0].push(new Ring(i, this.getColorForSize(i)));
        }
    }

    // Получение цвета по размеру
    private getColorForSize(size: number): string {
        const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet', 'black'];
        return colors[size - 1] || 'gray';
    }

    // Метод для перемещения диска
    moveDisk(from: number, to: number): void {
        if (from < 0 || from > 2 || to < 0 || to > 2) {
            throw new Error("Индекс башни должен быть 0, 1 или 2");
        }

        const fromTower = this.towers[from];
        const toTower = this.towers[to];

        if (fromTower.isEmpty()) {
            throw new Error("Невозможно переместиться из пустой башни");
        }

        const diskToMove = fromTower.peek()!;

        if (!toTower.isEmpty() && diskToMove.size > toTower.peek()!.size) {
            throw new Error("Невозможно поместить больший диск на меньший");
        }

        // Перемещение
        toTower.push(fromTower.pop()!);
        this.moveCount++;

        console.log(`Перемещение #${this.moveCount}: Перемещен диск ${diskToMove} из башни ${from + 1} на башню ${to + 1}`);
    }

    // Рекурсивное решение
    solve(): void {
        console.log("Начало решения Ханойской башни с", this.numDisks, "дисками");
        this.moveTower(this.numDisks, 0, 2, 1);
        console.log("Решено за", this.moveCount, "ходов");
    }

    private moveTower(disks: number, from: number, to: number, via: number): void {
        if (disks === 1) {
            this.moveDisk(from, to);
        } else {
            this.moveTower(disks - 1, from, via, to);
            this.moveDisk(from, to);
            this.moveTower(disks - 1, via, to, from);
        }
    }

    // Метод для вывода текущего состояния башен
    printState(): void {
        console.log("\nТекущее состояние башни:");
        for (let i = 0; i < 3; i++) {
            console.log(`Башня ${i + 1}: [${this.towers[i].toString()}]`);
        }
    }
}

// Демонстрация работы
const hanoi = new HanoiTower(3);
hanoi.printState();
hanoi.solve();
hanoi.printState();