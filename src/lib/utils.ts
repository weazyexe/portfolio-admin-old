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

export const lightenDarkenColor = (col: string, amt: number): string => {
    let usePound = false;

    if (col[0] === "#") {
        col = col.slice(1);
        usePound = true;
    }

    let num = parseInt(col,16);

    let r = (num >> 16) + amt;

    if (r > 255) r = 255;
    else if  (r < 0) r = 0;

    let b = ((num >> 8) & 0x00FF) + amt;

    if (b > 255) b = 255;
    else if  (b < 0) b = 0;

    let g = (num & 0x0000FF) + amt;

    if (g > 255) g = 255;
    else if (g < 0) g = 0;

    return (usePound?"#":"") + (g | (b << 8) | (r << 16)).toString(16);
};
