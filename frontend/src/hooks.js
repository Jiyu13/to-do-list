
export function handleCloseModal(ref, state) {
    const handler = (e) => {
        if (ref && !ref.contains(e.target)) {
            state.set(false)
        }
    }
    document.addEventListener('mousedown', handler);

    return () => {
        document.removeEventListener('mousedown', handler);
    };
}

export function upateLists(targetArray, updatedData) {
    return targetArray.map(a => {
        if (a._id === updatedData._id) {
            return updatedData
        } else {
            return a
        }
    })
}