// принцип разделения интерфейса
// цель создавать узкоспециализированные интерфейсы. Надо исключать варианты когда классы будут зависить от интерфейсов которые они не используют

// неверно
interface Bird {
    fly(): void;
    walk(): void;
}

// верно
interface CanWalk {
    walk(): void;
}
interface CanFly {
    fly(): void;
}

class Nightingale implements CanWalk, CanFly {
    fly(): void {
        console.log("Nightingale fly.");
    }
    walk(): void {
        console.log("Nightingale walk.");
    }
    
}

class Kiwi implements CanWalk {
    walk(): void {
        console.log("Kiwi walk.");
    }
    
}