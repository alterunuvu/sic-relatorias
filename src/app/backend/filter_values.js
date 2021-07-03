import axios from 'axios';
import { API_FILTERS } from './settings';

export function get(type){  
    let query = {
        "size": 0,
        "aggregations": {
            "Estado": {
                "terms": {
                    "field":type
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
        let arrTmp = [];
        res.data.aggregations.Estado.buckets.forEach(element => {
            arrTmp.push(
                {
                    "label": element.key,
                    "value": element.key
                }
            );
        });

        return arrTmp;
    });
}