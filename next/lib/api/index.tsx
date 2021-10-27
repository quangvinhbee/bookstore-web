import axios from 'axios'

export type HeaderType = {
    token: string
}
export type BodyType = {}
export type METHOD = 'GET' | 'POST' | 'PUT' | 'DELETE'
export type TypeProps = {
    method: METHOD
    url: String
    header?: HeaderType
    body?: BodyType
    params?: any
}
export async function API({ method, url, header, body, params, ...props }: TypeProps) {
    if (method == 'GET') {
        return await axios.get<any>(`${url}`, { headers: header, params: params })
    } else if (method == 'POST') {
        return await axios.post<any>(`${url}`, body, { headers: header, params: params })
    } else if (method == 'PUT') {
        return await axios.put<any>(`${url}`, body, { headers: header, params: params })
    } else if (method == 'DELETE') {
        return await axios.delete<any>(`${url}`, { headers: header, params: params })
    }
}
