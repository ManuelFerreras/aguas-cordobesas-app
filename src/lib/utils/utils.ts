export const preventNumbersLowerThanZero = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (Number(event.target.value) <= 0) {
        event.target.value = ''
    }
}