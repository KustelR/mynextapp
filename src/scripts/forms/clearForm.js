function clearForm(event) {
    const form = Object.entries(event.target);

    let i = 0;
    form.forEach(item => {
        if (item[1].value) {
            const element = event.target[item[0]];
            element.value = '';
            if (!(element.nodeName === 'INPUT')) return;

            const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value").set;
            nativeInputValueSetter.call(element, '');

            const ev2 = new Event('input', { bubbles: true});
            element.dispatchEvent(ev2);
        }
    })
}


export default clearForm