import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/extend-expect";
import Show from "./../Show";

const showData = {
  name: "Example Show",
  summary:
    "A gripping action-packed drama about a group of friends who discover a mysterious portal to another world.",
  seasons: [
    {
      id: 1,
      name: "Season 1",
      episodes: [],
    },
    {
      id: 2,
      name: "Season 2",
      episodes: [],
    },
  ],
};

test("renders without errors", () => {
  render(<Show show={showData} selectedSeason="none" />);
});

test("renders Loading component when prop show is null", () => {
  render(<Show show={null} />);

  const loadingElement = screen.getByTestId("loading-container");
  expect(loadingElement).toBeInTheDocument();
  expect(loadingElement).toHaveTextContent("Fetching data...");
});

test("renders the correct number of season select options", () => {
  render(
    <Show show={showData} selectedSeason="none" handleSelect={() => {}} />
  );

  const seasonOptions = screen.getAllByTestId("season-option");

  expect(seasonOptions).toHaveLength(showData.seasons.length);
});

test("handleSelect is called when an season is selected", async () => {
  const handleSelect = jest.fn();

  render(
    <Show show={showData} selectedSeason="none" handleSelect={handleSelect} />
  );

  const selectElement = screen.getByLabelText(/select a season/i);

  await userEvent.selectOptions(selectElement, "2");

  expect(handleSelect).toHaveBeenCalled();
});

test("component renders when no seasons are selected and when rerenders with a season passed in", () => {
  const handleSelect = jest.fn();

  const { rerender } = render(
    <Show show={showData} selectedSeason="none" handleSelect={handleSelect} />
  );

  const episodesComponent = screen.queryByTestId("episodes-container");
  expect(episodesComponent).not.toBeInTheDocument();

  rerender(
    <Show show={showData} selectedSeason={0} handleSelect={handleSelect} />
  );

  const newEpisodesComponent = screen.getByTestId("episodes-container");
  expect(newEpisodesComponent).toBeInTheDocument();
});
