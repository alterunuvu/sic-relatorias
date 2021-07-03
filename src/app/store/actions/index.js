import { INPUT_SEARCH_TEXT, 
        CLEAN_SEARCH_TEXT, 
        UPDATE_FILTERS, 
        SET_FILTERS_LIST_VALUES, 
        TOGGLE_FOOTER, 
        SAVE_SEARCH_RESULTS,
        SAVE_DATE_RESULTS } from './types';

export const inputSearchText = (input_text) => (
    {
        type: INPUT_SEARCH_TEXT,
        input_text,
    }
);

export const cleanSearchText = () => (
    {
        type: CLEAN_SEARCH_TEXT,
    }
);

export const updateFilters = (filters) => (
    {
        type: UPDATE_FILTERS,
        filters,
    }
);

export const setFiltersValues = (options) => (
    {
        type: SET_FILTERS_LIST_VALUES,
        options
    }
);

export const toggleFooter = () => (
    {
        type: TOGGLE_FOOTER,
    }
);

export const saveSearchResults = (results) => (
    {
        type: SAVE_SEARCH_RESULTS,
        results
    }
);

export const saveDateResults = (dateResults) => (
    {
        type: SAVE_DATE_RESULTS,
        dateResults
    }
);