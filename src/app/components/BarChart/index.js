import React, { useRef, useEffect, useState } from 'react';
import { Chart } from 'chart.js';
import DatePicker from 'react-datepicker';
import { registerLocale } from  "react-datepicker";
import './barchart.scss';
import es from 'date-fns/locale/es';
import { getSelectedFilters, getSearchText, getDateResults } from '../../store/selectors';
import { useSelector, useDispatch } from 'react-redux';
import { updateFilters, saveDateResults, saveSearchResults } from '../../store/actions';
import { buildFilters, initSearch, searchDateGroups } from '../../backend/search';

const numberFormat = (number) => {
    let format = number.toLocaleString('es-CO', {
        style: 'decimal',
    });
    format = format.replace(',00', '');
    return `${format}`;
};

const BarChart = ({ dataSource }) => {
    registerLocale('es', es);
    const canvasRef = useRef();

    const dispatch = useDispatch();
    const selected_filters_selector = useSelector(getSelectedFilters);
    const search_text_selector = useSelector(getSearchText);
    const date_results = useSelector(getDateResults);

    const [filters, setFilters] = useState(selected_filters_selector);
    const [dateResults, setDateResults] = useState(dataSource);

    useEffect(() => {
        setFilters(selected_filters_selector);
    }, [selected_filters_selector]);

    useEffect(() => {
        setDateResults(date_results);
    }, [date_results]);


    const realDate = (dateString) => {
        let d = new Date(dateString);
        d.setTime(d.getTime() + d.getTimezoneOffset()*60*1000);
        return d;
    }

    const doSearch = () => {
        let filterArray = buildFilters(selected_filters_selector);
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

    const addFilter = (name, value) => {
        if(value instanceof Date){
            value = value.toISOString().split("T")[0];
        }

        let newFilters = {
            ...filters,
            [name]: value
        }

        setFilters(newFilters);

        // actualizar filtros en redux
        dispatch(updateFilters(newFilters));

        // actualizar resultados de busqueda
        doSearch();
    }

    useEffect(() => {
        const dates = [];
        const data = [];
        const colors = [];
        dateResults.data.aggregations.resultado.buckets.map(
            (item) => {
                dates.push(item.key_as_string.split("T")[0]);
                data.push(item.doc_count);
                colors.push(`rgba(51, 102, 204, ${item.doc_count / 10})`);

                return "";
            }
        );

        const labels = dates;
        const datasets = [{
            barThickness: '10',
            maxBarThickness: 10,
            data: data,
            backgroundColor: colors
        }];

        const canvasE = canvasRef.current;

        new Chart(canvasE, {
            type: 'bar',
            data: {
                labels,
                datasets,
            },
            options: {
                legend: {
                    display: false
                },
                responsive: true,
                scales: {
                    yAxes: [
                        {
                            ticks: {
                                callback(label) {
                                    return "";
                                },
                                beginAtZero: true,
                            },
                            gridLines: {
                                offsetGridLines: false,
                                display: false
                            }
                        },
                    ],
                    xAxes: [
                        {
                            gridLines: {
                                display: false
                            }
                        }
                    ]
                },
                tooltips: {
                    callbacks: {
                        label(tooltipItems, data) {
                            return `${numberFormat(tooltipItems.yLabel,)}`;
                        },
                    },
                }
            },
        });
    }, [dateResults])
    

    return(
        <div className="date_range">
            <div className="range_div">
                <canvas height="50px" width="400px" ref={canvasRef} /> 
            </div>
            <div className="date_div">
                <DatePicker 
                    selected={filters.startDate !== "" ? realDate(filters.startDate)  : ""} 
                    onChange={localStartDate => {addFilter("startDate", localStartDate.toISOString().split("T")[0]);}}
                    locale="es"
                    placeholderText="Inicio"
                    className="date_input"
                    name="startDate"
                />
                <br/>
                <DatePicker 
                    selected={filters.endDate !== "" ? realDate(filters.endDate)  : ""} 
                    onChange={localEndDate => {addFilter("endDate", localEndDate.toISOString().split("T")[0]);}}
                    locale="es"
                    placeholderText="Fin"
                    className="date_input"
                    name="startDate"
                />
            </div>
        </div>
    );
}

export default BarChart;