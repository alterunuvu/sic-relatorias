import React, { Fragment, useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import "./dropzone.scss";
import icon_files from "../../../assets/icons/icon_files.png";
import { Modal } from "@material-ui/core";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Backdrop from "@material-ui/core/Backdrop";
import { useSpring, animated } from "react-spring/web.cjs";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "20px",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #000",
    boxShadow: theme.shadows[7],
    padding: theme.spacing(2, 4, 3),
    width: "30rem",
  },
}));

const Fade = React.forwardRef(function Fade(props, ref) {
  const { in: open, children, onEnter, onExited, ...other } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter();
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited();
      }
    },
  });

  return (
    <animated.div ref={ref} style={style} {...other}>
      {children}
    </animated.div>
  );
});

Fade.propTypes = {
  children: PropTypes.element,
  in: PropTypes.bool.isRequired,
  onEnter: PropTypes.func,
  onExited: PropTypes.func,
};

function DropFilesArea(props) {
  const {
    acceptedFiles,
    getRootProps,
    getInputProps,
    isDragActive,
  } = useDropzone();

  const files = acceptedFiles.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  //Modal "Como Funciona?"
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Fragment>
      <section className="container">
        <div className="DROPZONE__Title">
          Búsqueda avanzada con Inteligencia Artificial.
        </div>
        <div className="btn_link DROPZONE__Question" onClick={handleOpen}>
          ¿CÓMO FUNCIONA?
        </div>
        <div className="DROPZONE__files">
          <div
            {...getRootProps({
              className: "dropzone",
              onClick: (event) => console.log(event),
              onDrop: (event) => console.log(event),
            })}
          >
            <input {...getInputProps()} />
            <div className="docs_icons">
              <img src={icon_files} />
            </div>
            <div>
              Arrastra aquí o{" "}
              <span className="select_document"> selecciona un documento</span>{" "}
              desde tus archivos
            </div>
          </div>
          <aside className="files_list">
            <h4>Documentos:</h4>
            <ul className="file_item">{files}</ul>
          </aside>
        </div>
      </section>
      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h2 id="spring-modal-title" className="title-modal">
              ¿Cómo funciona?
            </h2>
            <p id="spring-modal-description">
              <p>
                <strong>1.</strong> Arrastra los documentos al área punteada.
              </p>{" "}
              <p>
                <strong>2.</strong> Ingresa el captcha
              </p>
              <p>
                <strong>3.</strong> Haz click en buscar{" "}
              </p>
              <p className="modal-content">
                La plataforma hará la búsqueda de documentos que coincidan con
                los temas que se relacionan en el documento
              </p>
            </p>
          </div>
        </Fade>
      </Modal>
    </Fragment>
  );
}

export default DropFilesArea;
