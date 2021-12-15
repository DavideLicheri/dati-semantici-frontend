import React from "react";
import { screen } from "@testing-library/react";
import { waitFor } from "@testing-library/dom";
import "@testing-library/jest-dom/extend-expect";
import SearchPage from "./SearchPage";
import { search } from "../../../services/searchService";
import { AT_VOCABULARY } from "../../../services/dataConstants";
import { renderWithRoute } from "../../../services/testUtils";
import SearchResults from "../SearchResults/SearchResults";
import { routes } from "../../../services/routes";
import FilterPanel from "../FilterPanel/FilterPanel";
import Pagination from "../Pagination/Pagination";
import IntroSection from "../../common/IntroSection/IntroSection";

jest.mock("../../../services/searchService");
jest.mock("../SearchResults/SearchResults", () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock("../FilterPanel/FilterPanel", () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock("../Pagination/Pagination", () => ({
  __esModule: true,
  default: jest.fn(),
}));

const mockNavigation = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigation,
}));

describe("<SearchPage />", () => {
  beforeEach(() => {
    SearchResults.mockReturnValue(<p>A paragraph</p>);
    FilterPanel.mockReturnValue(<div>The filters</div>);
    FilterPanel.mockClear();
    search.mockClear();
    search.mockResolvedValue([]);
  });

  test("it should mount", async () => {
    renderWithRoute(<SearchPage />);

    const vocabs = await screen.findByTestId("SearchPage");

    expect(vocabs).toBeInTheDocument();
    expect(screen.getByText("CONTRIBUISCI")).toBeInTheDocument();
  });

  test("it should search with appropriate filters", async () => {
    renderWithRoute(
      <SearchPage />,
      routes.search({ types: [AT_VOCABULARY], pattern: "abc" })
    );

    await waitFor(() => {
      expect(search).toHaveBeenCalledWith({
        types: [AT_VOCABULARY],
        pattern: "abc",
      });
    });
  });

  test("it should propagate filters to panel for showing", async () => {
    renderWithRoute(
      <SearchPage />,
      routes.search({
        types: [AT_VOCABULARY],
        pattern: "abc",
        themes: ["AGRI"],
      })
    );

    await waitFor(() => {
      expect(FilterPanel).toHaveBeenCalledWith(
        expect.objectContaining({
          filter: {
            types: [AT_VOCABULARY],
            pattern: "abc",
            themes: ["AGRI"],
          },
        }),
        {}
      );
    });
  });

  test("it should allow filter panel to update filter and then navigate", async () => {
    renderWithRoute(
      <SearchPage />,
      routes.search({ types: [AT_VOCABULARY], pattern: "abc" })
    );

    await waitFor(() => {
      expect(FilterPanel).toHaveBeenCalled();
    });

    // check the FilterPanel child component was passed an empty theme to show
    const callCount = FilterPanel.mock.calls.length;
    const latestProvidedProps = FilterPanel.mock.calls[callCount - 1][0];
    expect(latestProvidedProps.theme).toBeFalsy();

    // retrieve the callback passed to the FilterPanel child component and simulate the udpate to a theme
    const updateCallback = latestProvidedProps.onFilterUpdate;
    expect(updateCallback).toBeInstanceOf(Function);
    const updatedFilter = {
      types: [AT_VOCABULARY],
      pattern: "abc",
      themes: ["AGRI"],
    };
    updateCallback(updatedFilter);

    await waitFor(() => {
      expect(mockNavigation).toHaveBeenCalledWith(routes.search(updatedFilter));
    });
  });

  describe("With vocab results", () => {
    const someVocabs = [
      {
        type: AT_VOCABULARY,
        assetIri: "http://www.disney.com/characters/",
        title: "Disney characters",
      },
      {
        type: AT_VOCABULARY,
        assetIri: "http://www.atptour.com/court-types",
        title: "Tennis court types",
      },
    ];

    let resolve;
    const simulateVocabDataLoaded = () => {
      resolve({ data: someVocabs, offset: 0, totalCount: someVocabs.length });
    };

    beforeEach(() => {
      SearchResults.mockReturnValue(<p>A paragraph</p>);
      FilterPanel.mockReturnValue(<div>The filters</div>);
      Pagination.mockReturnValue(<div>The pagination</div>);
      search.mockClear();
      search.mockReturnValue(
        new Promise((s) => {
          resolve = s;
        })
      );
    });

    test("it show propagate items to result component", async () => {
      renderWithRoute(
        <SearchPage />,
        routes.search({ types: [AT_VOCABULARY] })
      );
      simulateVocabDataLoaded();

      await waitFor(() => expect(SearchResults).toHaveBeenCalled());
      expect(SearchResults).toHaveBeenCalledWith({ items: someVocabs }, {});
      expect(Pagination).toHaveBeenCalled();
      expect(Pagination).toHaveBeenCalledWith(
        {
          page: {
            offset: 0,
            totalCount: 2,
          },
          filter: {
            types: [AT_VOCABULARY],
          },
          onPageSelect: expect.any(Function),
        },
        {}
      );
      expect(screen.getByText("2 risultati")).toBeInTheDocument();
    });
  });

  test("it should show some error message if data cannot be loaded", async () => {
    search.mockRejectedValue(new Error("An error"));

    renderWithRoute(<SearchPage />, routes.search({ types: [AT_VOCABULARY] }));

    await waitFor(() => screen.getByRole("alert"));

    const errorAlert = screen.getByRole("alert");
    expect(errorAlert).toBeInTheDocument();
    expect(Pagination).not.toHaveBeenCalled();
    expect(screen.queryByTestId("results-count").closest("h3")).toBeFalsy();
  });
});
