export const getLists = async() => {
    return await axios.get('/api/v1/to_do_list').then(response => response.data)
}