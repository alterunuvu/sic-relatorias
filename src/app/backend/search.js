import axios from 'axios';
import { API_FILTERS, START_DATE_KEY, ID_REL_KEY, KEYS_MAP, RESULTS_PER_PAGE } from './settings';

const buildQuery = (searchText, filters) => {
    // size - tamano de la lista resultante
    // from fila inicial a traer, util para mosrtrar resultados paginados
    let query = {
        "query": {
            "bool": {
                "must": [
                    {
                        "query_string": {
                            "fields": ["contenido_archivo"],
                            "query": searchText
                        }
                    }
                ],
                "filter": filters
            }
        }
    }

    return query;
}

export const buildFilters = (filters) => {
    let filterArray = [];

    // arma array de filtros exceptuando fecha providencia
    Object.keys(KEYS_MAP).map(
        (key) => {
            if(filters[key] !== undefined && filters[key] !== ""){
                let filter = {
                    "term": {
                        [KEYS_MAP[key]]: filters[key]
                    }
                }

                filterArray.push(filter);
            }

            return null;
        }
    );

    if(filters.startDate !== "" && filters.endDate !== ""){
        let rangeDate = {
            "range": {
                [START_DATE_KEY]: {
                    "gte": filters.startDate,
                    "lte": filters.endDate
                }
            }
        }

        filterArray.push(rangeDate);
    }

    return filterArray;
}

export function search(searchValue, filters, pageNum){  
    let query = {
        ...buildQuery(searchValue, filters),
        "size": RESULTS_PER_PAGE,
        "from": RESULTS_PER_PAGE * (pageNum - 1),
    };

    return axios.get(API_FILTERS, {
        params: {
            source: JSON.stringify(query),
            source_content_type: 'application/json'
        }
    }).then((res) => {
        return res;
    });
}

export function sort(searchValue, filters, pageNum, sortType){  
    let query = {
        ...buildQuery(searchValue, filters),
        "size": RESULTS_PER_PAGE,
        "from": RESULTS_PER_PAGE * (pageNum - 1),
        "sort": [
            {
                [sortType]: {
                    "order": "asc"
                }
            }
        ]
    };

    return axios.get(API_FILTERS, {
        params: {
            source: JSON.stringify(query),
            source_content_type: 'application/json'
        }
    }).then((res) => {
        return res;
    });
}

export function groupDates(searchValue, filters){
    let query = {
        ...buildQuery(searchValue, filters),
        "aggs": {
            "resultado": {
                "terms": {
                    "field": START_DATE_KEY
                },
                "aggs": {
                    "activo": {
                        "value_count": {
                            "field": ID_REL_KEY
                        }
                    }
                }
            }
        }
    }

    return axios.get(API_FILTERS, {
        params: {
            source: JSON.stringify(query),
            source_content_type: 'application/json'
        }
    }).then((res) => {
        return res;
    });
}

export async function initSearch(text, filters, pageNumber){
    const results = await search(text, filters, pageNumber).then(
        res => { return res; }
    );

    return results;
}


export async function initSort(text, filters, pageNumber, sortType){
    const results = await sort(text, filters, pageNumber, sortType).then(
        res => { return res; }
    );

    return results;
}

export async function searchDateGroups(text, filters) {
    const group = await groupDates(text, filters).then(
        res => { return res; }
    );
    return group;
}