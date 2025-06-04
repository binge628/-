export function randomNum(min: number, max: number): number {
    let num = Math.floor(Math.random() * (min - max) + max);
    return num;
}