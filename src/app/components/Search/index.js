import React, { useState } from "react";
import './search.scss';
import { BsSearch, BsChevronDown, BsX } from "react-icons/bs";

import { useSelector, useDispatch } from 'react-redux';
import { getSearchText, getSearchTextFilled, getSelectedFilters, getFooterStatus, } from '../../store/selectors';
import { inputSearchText, cleanSearchText, saveSearchResults, saveDateResults } from '../../store/actions';

import { Modal } from '@material-ui/core';
import Filters from '../Filters';

import { buildFilters, initSearch, searchDateGroups } from '../../backend/search';

import { useHistory } from 'react-router-dom';

const Search = () => {
    const search_text_selector = useSelector(getSearchText);
    const search_text_filled_selector = useSelector(getSearchTextFilled);
    const selected_filters_selector = useSelector(getSelectedFilters);
    const is_results_view = useSelector(getFooterStatus);
    const history = useHistory();
    const dispatch = useDispatch();

    const handleInputChange = (element) => {
        dispatch(inputSearchText(element.target.value));
    }

    const cleanSearch = () => {
        dispatch(cleanSearchText());
    }

    const [filtersOpen, setFiltersOpen] = useState(false);

    const handleFiltersOpen = () => {
        setFiltersOpen(true);
    }

    const handleFiltersClose = () => {
        setFiltersOpen(false);
    };

    const startSearch = () => {
        let filterArray = buildFilters(selected_filters_selector);
        if (search_text_selector === "" && filterArray.length === 0) {
            alert("Debe ingresar un texto a buscar o algún filtro de búsqueda");
        } else {
            initSearch(search_text_selector, filterArray, 1).then(
                response => {
                    searchDateGroups(search_text_selector, filterArray).then(
                        resp => {
                            dispatch(saveDateResults(resp));
                            dispatch(saveSearchResults(response));
                            history.push('/results');
                        }
                    )
                }
            );
        }
    }

    let close_button;
    if (search_text_filled_selector) {
        close_button = (<div className="div_search_icon">
            <BsX onClick={cleanSearch} color={"#BABABA"} />
        </div>);
    }

    return (
        <div className={!is_results_view ? "div_center_flex_row results-view-search" : "div_center_flex_row"}>
            <div className={!is_results_view ? "search results-view-search-comp" : "search"}>
                <div className="div_search_icon">
                    <BsSearch color={"#BABABA"} />
                </div>
                <input value={search_text_selector} onChange={handleInputChange} placeholder="Busca cualquier término jurídico" className="input_invisible" type="text" />
                {close_button}
                <div className={!is_results_view ? "div_filters results-view-button-search" : "div_filters"}>
                    <p className="btn_link" onClick={handleFiltersOpen}>Ver filtros</p>
                    <BsChevronDown color={"#3366CC"} />
                </div>
            </div>
            <button onClick={startSearch} className={!is_results_view ? "btn_primary search__button results-view__search__button" : "btn_primary search__button"}>BUSCAR</button>

            <Modal
                open={filtersOpen}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                {
                    <Filters closeWindow={handleFiltersClose} />
                }
            </Modal>

        </div>
    );
}

export default Search;