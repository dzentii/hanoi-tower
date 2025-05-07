// Интерфейс Container с дженериком
export interface Container<T> {
    value: T;
}

// Функция для получения значения
export function getValue<T>(container: Container<T>): T {
    return container.value;
}

// Примеры использования
const stringContainer: Container<string> = { value: "Hello, World!" };
console.log(getValue(stringContainer)); // "Hello, World!"

const booleanContainer: Container<boolean> = { value: true };
console.log(getValue(booleanContainer)); // true