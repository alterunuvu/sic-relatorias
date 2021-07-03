export function getSearchText(state) {
    return state.searchText;
}

export function getSearchTextFilled(state) {
    return state.searchText !== "";
}

export function getSelectedFilters(state) {
    return state.selectedFilters;
}

export function getFiltersListValues(state) {
    return state.filtersListValues;
}

export function getFooterStatus(state) {
    return state.showFooter;
}

export function getSearchResults(state) {
    return state.searchResults;
}

export function getDateResults(state) {
    return state.dateResults;
}