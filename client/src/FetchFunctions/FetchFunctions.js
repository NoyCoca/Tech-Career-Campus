const api = "https://newsapi.org/v2/top-headlines?country=il&category=technology&apiKey="
const api_key = "eacee67e305a4dab808bf7f4f527a643"


export const fetchNewApi = () => {
    return fetch(`${api}${api_key}`)
        .then((res) => res.json())
        .then((response) => response)
        .catch(err => {
            console.error(err);
        });
}

export const fetchSyllabus = () => {
    return fetch('http://localhost:8080/api/course')
        .then((res) => res.json())
        .then((response) => response)
        .catch(err => {
            console.error(err);
        });
}