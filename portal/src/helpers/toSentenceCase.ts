const toSentenceCase = (str: string) => {
    const x = str.replace(/([A-Z])/g, ' $1');
    return x.charAt(0).toUpperCase() + x.slice(1);
};

export default toSentenceCase;
