import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Episode from "./../Episode";

const exampleEpisodeData = {
  airdate: "2016-07-15",
  airstamp: "2016-07-15T12:00:00+00:00",
  airtime: "",
  id: 553946,
  image:
    "https://static.tvmaze.com/uploads/images/medium_landscape/342/855786.jpg",
  name: "Chapter One: The Vanishing of Will Byers",
  number: 1,
  rating: { average: 8.2 },
  runtime: 49,
  season: 1,
  summary:
    "Will Byers, a young boy from a small town, disappears into thin air under highly suspicious conditions.",
  type: "regular",
  url: "https://www.tvmaze.com/episodes/553946/stranger-things-1x01-chapter-one-the-vanishing-of-will-byers",
};

const exampleEpisodeData2 = {
  airdate: "2016-07-15",
  airstamp: "2016-07-15T12:00:00+00:00",
  airtime: "",
  id: 553946,
  image: null,
  name: "Chapter One: The Vanishing of Will Byers",
  number: 1,
  rating: { average: 8.2 },
  runtime: 49,
  season: 1,
  summary:
    "Will Byers, a young boy from a small town, disappears into thin air under highly suspicious conditions.",
  type: "regular",
  url: "https://www.tvmaze.com/episodes/553946/stranger-things-1x01-chapter-one-the-vanishing-of-will-byers",
};

test("renders the summary text passed as prop", () => {
  const { getByText, getByTestId } = render(
    <Episode episode={exampleEpisodeData} />
  );

  const summaryElement = getByText(exampleEpisodeData.summary);
  expect(summaryElement).toBeInTheDocument();

  expect(summaryElement).toHaveTextContent(exampleEpisodeData.summary);

  expect(summaryElement).toContainHTML(exampleEpisodeData.summary);
});

test("renders default image when image is not defined", () => {
  render(<Episode episode={exampleEpisodeData2} />);

  const image = screen.getByRole("img");

  expect(image).toHaveAttribute(
    "src",
    "https://i.ibb.co/2FsfXqM/stranger-things.png"
  );

  expect(image).toHaveAttribute("alt", "./stranger_things.png");
});

test("renders without error", () => {
  const { getByText, getByAltText } = render(
    <Episode episode={exampleEpisodeData} />
  );
});
