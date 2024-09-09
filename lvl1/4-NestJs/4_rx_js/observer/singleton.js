const subject = {
    subscribers: [],
    subscribe(observer) {
        this.subscribers.push(observer);
    },
    next(value) {
        this.subscribers.forEach(
            subscriber => subscriber(value)
        );
    }
};

subject.subscribe(console.log);
subject.subscribe(value => {
    const plus10 = value + 10;
    console.log('plus 10:' + plus10)
});

subject.next(55);
