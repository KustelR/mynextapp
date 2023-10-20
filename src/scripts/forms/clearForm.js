function clearForm(element) {
    const form = Object.entries(element.target);
    let i = 0;
    form.forEach(item => {
        if (item[1].value) {
            element.target[item[0]].value = '';
        }
    })
}


export default clearForm