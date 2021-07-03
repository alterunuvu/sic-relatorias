import { INPUT_SEARCH_TEXT, 
        CLEAN_SEARCH_TEXT, 
        UPDATE_FILTERS, 
        SET_FILTERS_LIST_VALUES, 
        TOGGLE_FOOTER, 
        SAVE_SEARCH_RESULTS,
        SAVE_DATE_RESULTS } from '../actions/types';
import { getInitialState, 
        setInputSearchText, 
        cleanInputSearchText, 
        updateFilters, 
        setFiltersListValues, 
        toggleFooter, 
        saveSearchResults,
        saveDateResults } from './implementation'

const initialState = getInitialState();

export default function searchReducer(state = initialState, action) {
    switch (action.type) {
        case INPUT_SEARCH_TEXT:
            return setInputSearchText(state, action);
        case CLEAN_SEARCH_TEXT:
            return cleanInputSearchText(state, action);
        case UPDATE_FILTERS:
            return updateFilters(state, action);
        case SET_FILTERS_LIST_VALUES:
            return setFiltersListValues(state, action);
        case TOGGLE_FOOTER:
            return toggleFooter(state);
        case SAVE_SEARCH_RESULTS:
            return saveSearchResults(state, action);
        case SAVE_DATE_RESULTS:
            return saveDateResults(state, action);
        default:
            return state;
    }
}