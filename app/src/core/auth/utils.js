function isInArray(arr=[], userId) {
    const found = arr.some(el => el.id === userId);
    return found;
}

const isMedium = (user, mediums) => {
    return isInArray(mediums, user.user.id)
}

export default isMedium;