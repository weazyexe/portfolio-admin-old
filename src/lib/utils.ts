export const generateId = (length: number) => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
};

export const queryParse = (path: string): any => {
    const qmIndex = path.indexOf('?'); // question mark index
    const query = path.slice(qmIndex + 1);

    return query
        .split('&')
        .reduce((prev, keyValuePair) => {
            const key = keyValuePair.split('=')[0];
            const value = keyValuePair.split('=')[1];
            prev[key] = value;
            return prev;
        }, {} as any);
};
