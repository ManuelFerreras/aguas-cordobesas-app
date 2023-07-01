export const preventNumbersLowerThanZero = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (Number(event.target.value) <= 0) {
        event.target.value = ''
    }
}

export const formatTextMaxLength = (text: string, maxLength: number) => {
    if (!text) return ''

    if (text?.length > maxLength) {
        return text.slice(0, maxLength) + '...'
    }
    return text
}