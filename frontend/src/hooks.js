
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

