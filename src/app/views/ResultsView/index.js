import React, { useEffect, useState } from "react";
import "./results-view.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleFooter,
  saveDateResults,
  saveSearchResults,
} from "../../store/actions";
import {
  getFooterStatus,
  getSearchResults,
  getDateResults,
  getSearchText,
  getSelectedFilters,
} from "../../store/selectors";
import Search from "../../components/Search";
import Logo_sic from "../../../assets/icons/Logo-colorLogo_SIC.png";
import SelectedFiltersList from "../../components/SelectedFiltersList";
import ResultCard from "../../components/ResultCard";
import Select from "react-dropdown-select";
import SideDetail from "../../components/SideDetail";
import BarChart from "../../components/BarChart";
import { Pagination } from "@material-ui/lab";
import {
  initSearch,
  searchDateGroups,
  buildFilters,
  initSort,
} from "../../backend/search";
import LoadingIndicator from "../../components/LoadingIndicator";
import { RESULTS_PER_PAGE, SORT_OPTIONS } from "../../backend/settings";

export default function ResultsView() {
  const search_results = useSelector(getSearchResults);
  const date_results = useSelector(getDateResults);
  const search_text_selector = useSelector(getSearchText);
  const selected_filters_selector = useSelector(getSelectedFilters);

  const [results, setResults] = useState(search_results);

  const [selectedResult, setSelectedResult] = useState({});

  const dispatch = useDispatch();
  const footerState = useSelector(getFooterStatus);

  const [page, setPage] = useState(1);

  const [pageLoading, setPageLoading] = useState(false);

  const [sortType, setSortType] = useState([]);

  const doSearch = (pag) => {
    let filterArray = buildFilters(selected_filters_selector);
    initSearch(search_text_selector, filterArray, pag).then((response) => {
      searchDateGroups(search_text_selector, filterArray).then((resp) => {
        dispatch(saveDateResults(resp));
        dispatch(saveSearchResults(response));
      });
    });
  };

  const doSort = (sorType) => {
    let filterArray = buildFilters(selected_filters_selector);
    initSort(search_text_selector, filterArray, 1, sorType).then((response) => {
      searchDateGroups(search_text_selector, filterArray).then((resp) => {
        dispatch(saveDateResults(resp));
        dispatch(saveSearchResults(response));
      });
    });
  };

  const setORderTypeOption = (value) => {
    if (value === "") {
      return [];
    } else {
      return value;
    }
  };

  useEffect(() => {
    setPageLoading(false);
    setResults(search_results);
  }, [search_results]);

  /**
   * @param event Evento para evitar un refresh inesperado, puede eliminarse
   * @param value Valor de la página actual en el paginador
   * Adicionalmente en esta función se pueden disparar cambios en el search.
   */
  const handleChange = (event, value) => {
    setPageLoading(true);
    doSearch(value);
    setPage(value);
  };

  const handleSortChange = (value) => {
    if (value.length > 0) {
      setPageLoading(true);
      doSort(value[0].value);
      setSortType(value);
      setPage(1);
    } else {
      setPageLoading(true);
      doSearch(1);
      setSortType([]);
      setPage(1);
    }
  };

  useEffect(() => {
    if (results.data.hits.hits.length > 0) {
      setSelectedResult(results.data.hits.hits[0]);
    } else {
      setSelectedResult({});
    }
  }, [results]);

  useEffect(() => {
    if (footerState === true) {
      dispatch(toggleFooter());
    }
  }, [dispatch, footerState]);

  if (pageLoading) {
    return (
      <div className="home">
        <LoadingIndicator
          loadingText={"Cargando resultados. Por favor espere."}
        />
      </div>
    );
  } else {
    return (
      <>
        <div className="results-header">
          <img alt="Logo SIC" src={Logo_sic} style={{ marginLeft: "75px" }} />
          <Search />
          <span style={{ position: "absolute", right: "5%", color: "#3366CC" }}>
            Guardados
          </span>
        </div>
        <div className="results-view">
          <div className="results-view__search-results">
            <div className="results-view__time-range">
              <div className="results-view__title">
                Rango de tiempo (de providencia):
              </div>
              <div>
                <BarChart dataSource={date_results} />
              </div>
            </div>
            <div className="results-view__filters">
              <div className="results-view__title">Filtros de búsqueda:</div>
              <SelectedFiltersList makeSearch={true} page={page} />
            </div>
            <div className="results-view__divider"></div>
            <div className="results-view__cards">
              <div className="results-view__cards-header">
                {results.data.hits.total.value > 0 ? (
                  <div className="results-view__title order">
                    {results.data.hits.total.value} Resultados:
                  </div>
                ) : (
                  <div className="results-view__title order">
                    No hay resultados
                  </div>
                )}

                {results.data.hits.total.value > 0 ? (
                  <div className="results-view__order-by">
                    <span>Ordenar por:</span>
                    <Select
                      options={SORT_OPTIONS}
                      values={setORderTypeOption(sortType)}
                      onChange={(value) => handleSortChange(value)}
                      placeholder="Relevancia"
                      color="#3366CC"
                      dropdownHeight="auto"
                      style={{ borderRadius: "5px" }}
                      clearable={true}
                      closeOnSelect={true}
                      className={sortType.length > 0 && "result-sort-selector"}
                    />
                  </div>
                ) : (
                  <div></div>
                )}
              </div>

              {results.data.hits.hits.map((hit) => {
                return (
                  hit._id && (
                    <ResultCard
                      result={hit}
                      key={hit._id}
                      setSelectedResult={setSelectedResult}
                      selectedResult={selectedResult}
                    />
                  )
                );
              })}
              <div className="results-view__pagination">
                {results.data.hits.total.value > RESULTS_PER_PAGE ? (
                  <Pagination
                    count={Math.ceil(
                      results.data.hits.total.value / RESULTS_PER_PAGE
                    )}
                    page={page}
                    onChange={handleChange}
                  />
                ) : (
                  <div></div>
                )}
              </div>
            </div>
          </div>
          <div className="results-view__general-info">
            <SideDetail selectedResult={selectedResult} />
          </div>
        </div>
      </>
    );
  }
}
