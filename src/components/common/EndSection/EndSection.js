import { number } from "prop-types";
import React from "react";
import { DIGITALE_DOCS_URL, GITHUB_SCHEMA } from "../../../services/routes";
import { Icon } from "design-react-kit";
export const EndSection = (props) => {
  return (
    <React.Fragment>
      <div className="endSectionBkg container-fluid">
        {props.type && props.type == 1 ? (
          <div className="row mx-0 mt-2 py-5" data-testid="endSection_1">
            <div className="col-lg-6">
              <div className="row mx-0">
                <h2 className="txtWhite">
                  Non hai trovato quello che cercavi? Contribuisci al catalogo
                </h2>
              </div>

              <div className="row mx-0">
                <div className="col-lg-12">
                  <p className="txtWhite">
                    Scopri come contribuire al catalogo con un contenuto
                    semantico,
                    <br /> leggi la guida su docs italia
                  </p>
                </div>
              </div>
              <div className="row mx-0 mt-2">
                <a
                  className="btn btn-primary endSection link font-weight-bold"
                  href={DIGITALE_DOCS_URL}
                  role="button"
                  aria-label="vai alla pagina di docs italia"
                  title="vai alla pagina di docs italia"
                >
                  Scopri come contribuire
                </a>
              </div>
            </div>
          </div>
        ) : (
          <div className="row mx-0 mt-2 py-5" data-testid="endSection_2">
            <div className="col-lg-5">
              <div className="row mx-0">
                <h2 className="txtWhite">
                  Schema è un catalogo in
                  <br /> continua evoluzione
                </h2>
              </div>

              <div className="row mx-0">
                <div className="col-lg-12">
                  <p className="txtWhite">
                    Se trovi errori o bug apri una issue si github.
                    <br /> Se vuoi contribuire al catalogo con un contenuto
                    leggi la <br />
                    guida su docs italia
                  </p>
                </div>
              </div>
              <div className="row mx-0 mt-2">
                <div className="col-xl-4 col-lg-6">
                  <a
                    className="btn btn-primary endSection link font-weight-bold"
                    href={GITHUB_SCHEMA}
                    role="button"
                    aria-label="vai su github di schema"
                    title="vai su github di schema"
                  >
                    Vai su github{" "}
                    <Icon
                      className="ml-1"
                      size="sm"
                      fill="#0066cc"
                      icon={"it-github"}
                    />
                  </a>
                </div>
                <div className="col-xl-5 col-lg-6 mt-2 mt-lg-0">
                  <a
                    className="btn btn-outline-light font-weight-bold"
                    href={DIGITALE_DOCS_URL}
                    role="button"
                    aria-label="vai alla pagina di docs italia"
                    title="vai alla pagina di docs italia"
                  >
                    Scopri come contribuire
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </React.Fragment>
  );
};
EndSection.propTypes = {
  type: number.isRequired,
};
EndSection.defaultProps = {};
export default EndSection;