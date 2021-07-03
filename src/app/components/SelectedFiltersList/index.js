import React, { useEffect, useState } from 'react'
import './selected_filters_list.scss';

import { useSelector, useDispatch } from 'react-redux';
import { getSelectedFilters, getSearchText } from '../../store/selectors';
import { BsFillXCircleFill } from "react-icons/bs";
import { updateFilters, saveDateResults, saveSearchResults } from '../../store/actions';
import { buildFilters, initSearch, searchDateGroups } from '../../backend/search';

const SelectedFiltersList = ({ page, makeSearch }) => {
    const selected_filters_selector = useSelector(getSelectedFilters);
    const search_text_selector = useSelector(getSearchText);
    const dispatch = useDispatch();

    const [selectedFilters, setSelectedFilters] = useState(selected_filters_selector);

    const handleDeleteFilters = (object) => {
        let filters = JSON.parse(JSON.stringify(selected_filters_selector));

        filters[object] = "";

        dispatch(updateFilters(filters));
    }

    const setText = (text) => {
        let finalText = text;
        if(text.length > 18){
            finalText = finalText.substring(0, 17) + "...";
        }

        return finalText;
    }

    const doSearch = () => {
        let filterArray = buildFilters(selected_filters_selector);
        if(page){
            initSearch(search_text_selector, filterArray, page).then(
                response => {
                    searchDateGroups(search_text_selector, filterArray).then(
                        resp => {
                            dispatch(saveDateResults(resp));
                            dispatch(saveSearchResults(response));
                        }
                    )
    
                }
            );
        }else{
            initSearch(search_text_selector, filterArray, 1).then(
                response => {
                    searchDateGroups(search_text_selector, filterArray).then(
                        resp => {
                            dispatch(saveDateResults(resp));
                            dispatch(saveSearchResults(response));
                        }
                    )
    
                }
            );
        }
    }

    useEffect(() => {
        setSelectedFilters(selected_filters_selector);
        if(makeSearch){
            doSearch();
        }
    }, [selected_filters_selector]);

    return(
        <div className="filters_list">
            {
                Object.keys(selectedFilters).map(
                    (item) => {
                        if(selectedFilters[item] !== ""){
                            return (
                                <div className="selected_filter" key={item}>
                                    <div class="tooltip">{setText(selectedFilters[item])}
                                        <span class="tooltiptext">{selectedFilters[item]}</span>
                                    </div>
                                    <div onClick={() => handleDeleteFilters(item)} className="close_filter">
                                        <BsFillXCircleFill color={"#3366CC"}/>
                                    </div>
                                </div>
                            )
                        }

                        return null;
                    }
                )
            }
        </div>
    );
}

export default SelectedFiltersList;