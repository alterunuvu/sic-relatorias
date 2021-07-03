import { AMBIENTE } from '../../environments';

// Api Backend
let API = '';
const prod = 'PROD';
const test = 'TEST';
const dev = 'DEV'

switch (AMBIENTE) {
    case prod:
        API = 'https://public.test.sic.nuvu.cc/';
        break;
    case test:
        API = 'http://es.int.sic.nuvu.cc/';
        break;
    case dev:
        API = 'https://public.test.sic.nuvu.cc/';
        break;
    default:
        API = 'https://public.test.sic.nuvu.cc/';
        break;
}

export const API_FILTERS = API + 'sic-relatorias/_search';

export const API_COUNT = API + 'sic-relatorias/_count';

// LV Values Types and Search Filter Types
export const PROCESS_TYPE_KEY = 'tipo_proceso.keyword';
export const PROVIDENCE_TYPE_KEY = 'tipo_providencia.keyword';

export const CATEGORY_KEY = 'tesauro.categoria.nombre.keyword';
export const DESCRIPTOR_KEY = 'tesauro.descriptor.nombre.keyword';
export const RESTRICTION_KEY = 'tesauro.restrictor.nombre.keyword';

export const NORM_KEY = 'normas.nombre.keyword';

export const ROL_KEY = 'partes.rol.keyword';
export const ID_KEY = 'partes.tipo_id.keyword';
export const ID_NUMBER_KEY = 'partes.numero_doc.keyword';
export const NAME_KEY = 'partes.nombre.keyword';

export const END_DATE_KEY = 'fecha_providencia';
export const START_DATE_KEY = 'fecha_providencia';
export const PUB_DATE_KEY = 'fecha_publicada';

export const ID_REL_KEY = 'id_relatoria.keyword';

export const KEYS_MAP = {
    "processType": PROCESS_TYPE_KEY,
    "providenceType": PROVIDENCE_TYPE_KEY,
    "norms": NORM_KEY,
    "category": CATEGORY_KEY,
    "descriptors": DESCRIPTOR_KEY,
    "restrictions": RESTRICTION_KEY,
    "rol": ROL_KEY,
    "idType": ID_KEY,
    "idNumber": ID_NUMBER_KEY,
    "name": NAME_KEY
}

export const RESULTS_PER_PAGE = 2;

export const SORT_OPTIONS = [
    {
        "label": "Tipo de proceso",
        "value": PROCESS_TYPE_KEY
    },
    {
        "label": "Tipo de providencia",
        "value": PROVIDENCE_TYPE_KEY
    }
    ,
    {
        "label": "Fecha publicación",
        "value": PUB_DATE_KEY
    }
    ,
    {
        "label": "Fecha providencia",
        "value": START_DATE_KEY
    }
]

export const URL_VISOR_RELATORIAS = 'http://sso.int.sic.nuvu.cc/'