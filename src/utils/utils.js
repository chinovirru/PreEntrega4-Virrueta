const generateId = (list) => {
    if (list.length === 0) {
        return 1
    }

    let id = Math.max(...list.map(item => item.id))
    return id+1
}

export { generateId }