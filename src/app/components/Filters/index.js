import React, { useState } from 'react'
import Select from 'react-dropdown-select';
import DatePicker from 'react-datepicker';
import { registerLocale } from  "react-datepicker";
import es from 'date-fns/locale/es';
import './filters.scss'

import { useSelector, useDispatch } from 'react-redux';
import { getSelectedFilters, getFiltersListValues } from '../../store/selectors';
import { updateFilters } from '../../store/actions';

const Filters = ({ closeWindow }) => {
    registerLocale('es', es);

    const selected_filters_selector = useSelector(getSelectedFilters);
    const options_for_filters_selector = useSelector(getFiltersListValues);
    const dispatch = useDispatch();

    const [filters, setFilters] = useState(selected_filters_selector);

    const addFilter = (name, value) => {
        if(value instanceof Date){
            value = value.toISOString().split("T")[0];
        }

        let newFilters = {
            ...filters,
            [name]: value
        }

        setFilters(newFilters);
    }

    const addFilterFromInput = (element) => {
        addFilter(element.target.name, element.target.value);
    }

    const saveFilters = () => {
        let filterSuccess = true;

        let verify = "Por favor verifique los siguientes campos: \n";

        if(filters.startDate !== "" || filters.endDate !== ""){
            if(filters.startDate === "" || filters.endDate === ""){
                filterSuccess = false;
                verify += "\r - Fecha de Providencia Inicio y Fecha de Providencia Fin.\n";
            }
        }

        if(filters.idType !== "" && filters.idNumber === ""){
            filterSuccess = false;
            verify += "\r - Número ID.\n";
        }

        if(realDate(filters.endDate).getTime() < realDate(filters.startDate).getTime()){
            filterSuccess = false;
            verify += "\r - La Fecha de Providencia Fin no puede ser superior a la Fecha de Providencia Inicio.\n";
        }

        if(filterSuccess){
            dispatch(updateFilters(filters));
            closeWindow();
        }else{
            alert(verify);
        }
    }

    const realDate = (dateString) => {
        let d = new Date(dateString);
        d.setTime(d.getTime() + d.getTimezoneOffset()*60*1000);
        return d;
    }

    const setDropdownValue = (filter) => {
        if(filter === ""){
            return [];
        }else{
            return [
                {
                    "label": filter,
                    "value": filter
                }
            ]
        }
    }

    let button_accept = <button className="btn_disabled" disabled={true}>Aceptar</button>;
    Object.keys(filters).map(
        (key) => {
            if(filters[key] !== ""){
                button_accept = <button onClick={() => {saveFilters()}} className="btn_primary">Aceptar</button>
            }

            return null;
        }
    );

    return(
        <div className="div_center">
            <div className="filter_window">
                <div className="window_title">Selecciona los filtros para la búsqueda avanzada</div>
                <div className="filter_row">
                    <div className="filter_section">
                        <div className="filter_subtitle">Fecha providencia</div>
                        <div className="filter_row">
                            <DatePicker 
                                locale="es" 
                                selected={filters.startDate !== "" ? realDate(filters.startDate) : ""} 
                                onChange={localStartDate => {addFilter("startDate", localStartDate);}}
                                placeholderText="Inicio"
                                className="date_input"
                                name="startDate"
                            />
                            <DatePicker 
                                locale="es" 
                                selected={filters.endDate !== "" ? realDate(filters.endDate) : ""} 
                                onChange={localEndDate => {addFilter("endDate", localEndDate.toISOString().split("T")[0]);}}
                                placeholderText="Fin"
                                className="date_input"
                                name="endDate"
                            />
                        </div>
                    </div>
                    <div className="filter_section">
                        <div className="filter_subtitle">Normas</div>
                        <Select
                            options={options_for_filters_selector.norms}
                            values={setDropdownValue(filters.norms)}
                            onChange={(value) => value.length > 0 ? addFilter("norms", value[0].label) : addFilter("norms", "")}
                            placeholder="Escribe la norma"
                            color="#3366CC"
                            style={{borderRadius: "5px"}}
                            clearable={true}
                            dropdownHandle={false}
                            closeOnSelect={true}
                        />
                    </div>
                    <div className="filter_section"></div>
                </div>
                <div className="filter_row">
                    <div className="filter_section">
                        <div className="filter_subtitle">Tipo de proceso</div>
                        <Select
                            options={options_for_filters_selector.processesList}
                            values={setDropdownValue(filters.processType)}
                            onChange={(value) => value.length > 0 ? addFilter("processType", value[0].label) : addFilter("processType", "")}
                            placeholder="Selecciona el proceso"
                            color="#3366CC"
                            style={{borderRadius: "5px"}}
                            clearable={true}
                            closeOnSelect={true}
                        />
                    </div>
                    <div className="filter_section">
                        <div className="filter_subtitle">Tipo de providencia</div>
                        <Select
                            options={options_for_filters_selector.providencesList}
                            values={setDropdownValue(filters.providenceType)}
                            onChange={(value) => value.length > 0 ? addFilter("providenceType", value[0].label) : addFilter("providenceType", "")}
                            placeholder="Selecciona tipo de providencia"
                            color="#3366CC"
                            style={{borderRadius: "5px"}}
                            clearable={true}
                            closeOnSelect={true}
                        />
                    </div>
                    <div className="filter_section"></div>
                </div>
                <div className="filter_row">
                    <div className="filter_section">
                        <div className="filter_subtitle">Categorías</div>
                        <Select
                            options={options_for_filters_selector.categoriesList}
                            values={setDropdownValue(filters.category)}
                            onChange={(value) => value.length > 0 ? addFilter("category", value[0].label) : addFilter("category", "")}
                            placeholder="Selecciona una categoría"
                            color="#3366CC"
                            style={{borderRadius: "5px"}}
                            clearable={true}
                            closeOnSelect={true}
                        />
                    </div>
                    <div className="filter_section">
                        <div className="filter_subtitle">Descriptores</div>
                        <Select
                            options={options_for_filters_selector.descriptorsList}
                            values={setDropdownValue(filters.descriptors)}
                            onChange={(value) => value.length > 0 ? addFilter("descriptors", value[0].label) : addFilter("descriptors", "")}
                            placeholder="Selecciona un descriptor"
                            color="#3366CC"
                            style={{borderRadius: "5px"}}
                            clearable={true}
                            closeOnSelect={true}
                        />
                    </div>
                    <div className="filter_section">
                        <div className="filter_subtitle">Restricciones</div>
                        <Select
                            options={options_for_filters_selector.restrictionsList}
                            values={setDropdownValue(filters.restrictions)}
                            onChange={(value) => value.length > 0 ? addFilter("restrictions", value[0].label) : addFilter("restrictions", "")}
                            placeholder="Selecciona un lugar"
                            color="#3366CC"
                            style={{borderRadius: "5px"}}
                            clearable={true}
                            closeOnSelect={true}
                        />
                    </div>
                </div>
                <br/>
                <div className="section_title">Partes que intervienen en el proceso</div>
                <div className="filter_row">
                    <div className="filter_section">
                        <div className="filter_subtitle">Rol</div>
                        <Select
                            options={options_for_filters_selector.rolsList}
                            values={setDropdownValue(filters.rol)}
                            onChange={(value) => value.length > 0 ? addFilter("rol", value[0].label) : addFilter("rol", "")}
                            placeholder="Partes que intervienen"
                            color="#3366CC"
                            style={{borderRadius: "5px"}}
                            clearable={true}
                            closeOnSelect={true}
                        />
                    </div>
                    <div className="filter_section"></div>
                    <div className="filter_section"></div>
                </div>
                <div className="filter_row">
                    <div className="filter_section">
                        <div className="filter_subtitle">Tipo de ID</div>
                        <Select
                            options={options_for_filters_selector.identificationsList}
                            values={setDropdownValue(filters.idType)}
                            onChange={(value) => value.length > 0 ? addFilter("idType", value[0].label) : addFilter("idType", "")}
                            placeholder="Partes que intervienen"
                            color="#3366CC"
                            style={{borderRadius: "5px"}}
                            clearable={true}
                            closeOnSelect={true}
                        />
                    </div>
                    <div className="filter_section">
                        <div className="filter_subtitle">Número ID</div>
                        <input placeholder="Ingresa número" name="idNumber" onChange={addFilterFromInput} className="input_text" type="text"/>
                    </div>
                    <div className="filter_section">
                        <div className="filter_subtitle">Nombre o razón social</div>
                        <input placeholder="Ingresa razón social" name="name" onChange={addFilterFromInput} className="input_text" type="text"/>
                    </div>
                </div>
                <br/>
                <div className="button_section">
                    <button onClick={closeWindow} className="btn_secondary">Cancelar</button>
                    {button_accept}
                </div>
            </div>
        </div>
    );
}

export default Filters;