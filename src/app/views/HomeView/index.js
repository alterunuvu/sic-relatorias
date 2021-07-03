import React, { useState, useEffect, Fragment } from "react";
import Search from "../../components/Search";
import Dropzone from "../../components/Dropzone";
import SelectedFiltersList from '../../components/SelectedFiltersList';
import Logo_sic from '../../../assets/icons/Logo-colorLogo_SIC.png';
import LoadingIndicator from '../../components/LoadingIndicator';
import { useSelector, useDispatch } from 'react-redux';
import { getFiltersListValues } from '../../store/selectors';
import { setFiltersValues } from '../../store/actions';
import { getFooterStatus } from "../../store/selectors";
import { toggleFooter } from "../../store/actions";
import { get } from '../../backend/filter_values';

import { PROCESS_TYPE_KEY, PROVIDENCE_TYPE_KEY, CATEGORY_KEY, DESCRIPTOR_KEY, RESTRICTION_KEY, ROL_KEY, ID_KEY, NORM_KEY } from '../../backend/settings';
import './home-view.scss'

async function initPage() {
    const optionsProcesses = await get(PROCESS_TYPE_KEY).then((res) => {
        return res;
    });

    const optionsProvidences = await get(PROVIDENCE_TYPE_KEY).then((res) => {
        return res;
    });

    const optionsCategories = await get(CATEGORY_KEY).then((res) => {
        return res;
    });

    const optionsDescriptors = await get(DESCRIPTOR_KEY).then((res) => {
        return res;
    });

    const optionsRestrictions = await get(RESTRICTION_KEY).then((res) => {
        return res;
    });

    const optionsRols = await get(ROL_KEY).then((res) => {
        return res;
    });

    const optionsIdentifications = await get(ID_KEY).then((res) => {
        return res;
    });

    const optionsNorms = await get(NORM_KEY).then((res) => {
        return res;
    });

    return {
        processesList: optionsProcesses,
        providencesList: optionsProvidences,
        categoriesList: optionsCategories,
        descriptorsList: optionsDescriptors,
        restrictionsList: optionsRestrictions,
        rolsList: optionsRols,
        identificationsList: optionsIdentifications,
        norms: optionsNorms,
    };
}

const HomeView = () => {
    const filter_list_values = useSelector(getFiltersListValues);

    const [filtersOptions, setFiltersOptions] = useState(filter_list_values);
    const [pageLoaded, setPageLoaded] = useState(false);

    const dispatch = useDispatch();
    const footerState = useSelector(getFooterStatus);

    useEffect(() => {
        if (footerState === false) {
            dispatch(toggleFooter())
        }
    }, [dispatch, footerState])

    useEffect(() => {
        initPage().then(
            (resp) => {
                setFiltersOptions(resp);

                dispatch(setFiltersValues(filtersOptions));
            }
        ).then(
            () => setPageLoaded(true)
        );
    }, [pageLoaded]);

    if (!pageLoaded) {
        return (
            <div className="home">
                <LoadingIndicator loadingText={"Cargando página. Por favor espere."}/>
            </div>
        )
    } else {
        return (
            <Fragment>
                {/* !! Pueden cambiarlo luego */}
                <div style={{ minHeight: "80vh" }}>
                    <div className="div_center">
                        <div className="div_flex_row">
                            <img alt="LOGO SIC" src={Logo_sic} />
                            <p className="p_width_low">Buscador de relatorías</p>
                        </div>
                    </div>
                    <Search />
                    <div className="div_center">
                        <SelectedFiltersList makeSearch={false} />
                    </div>
                    <div className="div_center">
                        <Dropzone />
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default HomeView;
