function createDataObject(element) {
    let data = {};
    const form = Object.entries(element.target);
    form.forEach(item => {
        const tagName = item[1].tagName;
        const id = item[1].id;
        const value = item[1].value;
        if (tagName && id && value && id) {
            data[id] = value;
        }
    });
    return data;
}

export default createDataObject