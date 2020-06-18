export const fillArray = (data: any[], num: number) => {
    console.log(data)
    if (data) {
        const count = data.length % num;
        for (let i = 0; i < count; i++) {
            data.push({} as any);
        }
    }
    return data
}
