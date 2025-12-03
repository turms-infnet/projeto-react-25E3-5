const convertFileToBase64 = (file, setData) => {
    if (!file) {
        setData((values) => ({
            ...values,
            image: ''
        }));
        return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
        const base64String = reader.result;
        setData((values) => ({
            ...values,
            image: base64String
        }))
    }
    reader.readAsDataURL(file);
}

export {
    convertFileToBase64
}