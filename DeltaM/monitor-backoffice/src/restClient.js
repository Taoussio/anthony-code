// in src/restClient
import {
    GET_LIST,
    GET_ONE,
    GET_MANY,
    GET_MANY_REFERENCE,
    CREATE,
    UPDATE,
    DELETE,
    fetchUtils,
} from 'admin-on-rest';
import { stringify } from 'query-string';

const API_URL = process.env.REACT_APP_API_HOSTNAME;

const mapGet = {
    'Request': 'requests',
    'Error': 'errors',
}

const mapPost = {
    'Request': 'request',
}

const convertRESTRequestToHTTP = (type, resource, params) => {
    console.log({ type, resource, params })
    let url = '';
    const options = {};
    switch (type) {
        case GET_LIST: {
            const { page, perPage } = params.pagination;
            const { field, order } = params.sort;
            const query = {
                limit: perPage,
                offset: (page - 1) * perPage,
                __nocache: 'true',
                sort_field: field,
                sort_order: order,
                ...params.filter
            };
            url = `${API_URL}/${mapGet[resource]}?${stringify(query)}`;
            break;
        }
        case GET_ONE:
            url = `${API_URL}/${mapGet[resource]}?${stringify({ id: params.id })}`;
            break;
        case GET_MANY: {
            const query = {
                filter: JSON.stringify({ id: params.ids }),
            };
            url = `${API_URL}/${resource}?${stringify(query)}`;
            break;
        }
        case GET_MANY_REFERENCE: {
            const { page, perPage } = params.pagination;
            const { field, order } = params.sort;
            const query = {
                sort: JSON.stringify([field, order]),
                range: JSON.stringify([(page - 1) * perPage, (page * perPage) - 1]),
                filter: JSON.stringify({ ...params.filter, [params.target]: params.id }),
            };
            url = `${API_URL}/${resource}?${stringify(query)}`;
            break;
        }
        case UPDATE:
            delete params.data.updatedAt
            delete params.data.createdAt
            url = `${API_URL}/${mapPost[resource]}`;
            options.method = 'PUT';
            options.body = JSON.stringify(params.data);
            break;
        case CREATE:
            url = `${API_URL}/${mapPost[resource]}`;
            options.method = 'POST';
            options.body = JSON.stringify(params.data);
            break;
        case DELETE:
            url = `${API_URL}/${mapPost[resource]}`;
            options.method = 'DELETE';
            options.body = JSON.stringify({ id: params.id });
            break;
        default:
            throw new Error(`Unsupported fetch action type ${type}`);
    }
    return { url, options };
};

/**
 * @param {Object} response HTTP response from fetch()
 * @param {String} type One of the constants appearing at the top if this file, e.g. 'UPDATE'
 * @param {String} resource Name of the resource to fetch, e.g. 'posts'
 * @param {Object} params The REST request params, depending on the type
 * @returns {Object} REST response
 */
const convertHTTPResponseToREST = (response, type, resource, params) => {
    const { headers, json } = response;
    switch (type) {
        case GET_LIST:
            if (resource === 'Request') {
                return {
                    data: json.data.map(e => ({
                        ...e,
                        updatedAt: new Date(e.updatedAt).toLocaleString(),
                        createdAt: new Date(e.createdAt).toLocaleString()
                    })),
                    total: json.total
                }
            }
            return {
                data: json.data.map(e => ({
                    ...e,
                })),
                total: json.total
            }
        case GET_ONE:
            if (resource === 'Request') {
                return {
                    data: json.data.map(e => ({
                        ...e,
                        updatedAt: new Date(e.updatedAt).toLocaleString(),
                        createdAt: new Date(e.createdAt).toLocaleString(),
                    }))[0],
                };
            }
        case CREATE:
            return { data: { ...params.data, id: json.id } };
        default:
            return { data: json };
    }
};

/**
 * @param {string} type Request type, e.g GET_LIST
 * @param {string} resource Resource name, e.g. "posts"
 * @param {Object} payload Request parameters. Depends on the request type
 * @returns {Promise} the Promise for a REST response
 */
export default (type, resource, params) => {
    const { fetchJson } = fetchUtils;
    const { url, options } = convertRESTRequestToHTTP(type, resource, params);
    return fetchJson(url, options)
        .then(response => convertHTTPResponseToREST(response, type, resource, params));
};