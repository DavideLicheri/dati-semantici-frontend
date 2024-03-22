import React from "react";
import { screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import SearchResultItem from "./SearchResultItem";
import {
  AT_VOCABULARY,
  getAssetChipLabel
} from "../../../services/dataConstants";
import { renderWithRoute } from "../../../services/testUtils";

const vocabItem = {
  assetIri: "http://www.disney.com/characters",
  type: AT_VOCABULARY,
  title: "Disney characters",
  description: "Fully comprehensive list of Disney characters",
  themes: ["http://publications.europa.eu/resource/authority/data-theme/EDUC"],
  modifiedOn: "2020-04-01",
  versionInfo: "1.0",
  rightsHolder: {
    iri: "http://publications.europa.eu/resource/authority/corporate-body/EUROSTAT",
    summary: "Eurostat"
  }
};

describe("<SearchResultItem />", () => {
  test("it should mount with proper item", () => {
    renderWithRoute(<SearchResultItem item={vocabItem} />);

    expect(screen.getByTestId("SearchResultItem")).toBeInTheDocument();
  });

  test("it should display the item's type", () => {
    renderWithRoute(<SearchResultItem item={vocabItem} />);

    let typeLabel = screen.getByText(getAssetChipLabel(AT_VOCABULARY));

    expect(typeLabel).toBeInTheDocument();
  });

  test.each(["assetIri", "title", "description"])(
    "it should display %s from the item",
    (key) => {
      renderWithRoute(<SearchResultItem item={vocabItem} />);

      expect(screen.getByText(vocabItem[key])).toBeInTheDocument();
    }
  );

  test("it should display a link with assetIri", () => {
    renderWithRoute(<SearchResultItem item={vocabItem} />);

    let link = screen.getByText(vocabItem.assetIri);

    expect(link).toBeInTheDocument();
  });
  test("it should display rights holder summary", () => {
    renderWithRoute(<SearchResultItem item={vocabItem} />);

    let summary = screen.getByText(vocabItem.rightsHolder.summary);

    expect(summary).toBeInTheDocument();
  });

  test("it should display theme description", () => {
    renderWithRoute(<SearchResultItem item={vocabItem} />);

    const category = screen.getByText("Istruzione, cultura e sport");

    expect(category).toBeInTheDocument();
  });

  test("it should display multiple theme descriptions", () => {
    const itemsWithMultipleThemes = {
      ...vocabItem,
      themes: [
        "http://publications.europa.eu/resource/authority/data-theme/EDUC"
      ]
    };

    renderWithRoute(<SearchResultItem item={itemsWithMultipleThemes} />);

    const category1 = screen.getByText("Istruzione, cultura e sport");

    expect(category1).toBeInTheDocument();
  });
});
