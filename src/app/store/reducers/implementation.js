export function getInitialState() {
    return {
        searchText: "",
        selectedFilters: {
            startDate: "",
            endDate: "",
            norms: "",
            processType: "",
            providenceType: "",
            category: "",
            descriptors: "",
            restrictions: "",
            rol: "",
            idType: "",
            idNumber: "",
            name: ""
        },
        filtersListValues: {
            processesList: null,
            providencesList: null,
            categoriesList: null,
            descriptorsList: null,
            restrictionsList: null,
            rolsList: null,
            identificationsList: null
        },
        showFooter: true,
        searchResults: null,
        dateResults: null,
    }
}

export function setInputSearchText(state, action) {
    const { input_text } = action;

    return {
        ...state,
        searchText: input_text,
    }
}

export function cleanInputSearchText(state, action) {
    return {
        ...state,
        searchText: "",
    }
}

export function updateFilters(state, action) {
    const { filters } = action;

    return {
        ...state,
        selectedFilters: filters,
    }
}

export function setFiltersListValues(state, action) {
    const { options } = action;

    return {
        ...state,
        filtersListValues: options
    }
}

export function toggleFooter(state) {
    return {
        ...state,
        showFooter: !state.showFooter,
    }
}

export function saveSearchResults(state, action) {
    const { results } = action;

    return {
        ...state,
        searchResults: results,
    }
}

export function saveDateResults(state, action) {
    const { dateResults } = action;

    return {
        ...state,
        dateResults: dateResults,
    }
}