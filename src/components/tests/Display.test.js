import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Display from "./../Display";
import axios from "axios";

test("renders without errors with no props", async () => {
  render(<Display />);
  const button = screen.getByRole("button");
  expect(button).toHaveTextContent("Press to Get Show Data");
});

jest.mock("axios");

const showData = {
  name: "Stranger Things",
  image: "image_url",
  summary: "Show summary",
  seasons: [
    { id: 0, name: "Season 1", episodes: [] },
    { id: 1, name: "Season 2", episodes: [] },
    { id: 2, name: "Season 3", episodes: [] },
    { id: 3, name: "Season 4", episodes: [] },
    { id: 4, name: "Season 5", episodes: [] },
  ],
};

test("renders Show component when the button is clicked", async () => {
  axios.get.mockResolvedValueOnce({ data: { _embedded: { episodes: [] } } });
  const mockDisplayFunc = jest.fn();
  const { getByText, queryByText } = render(
    <Display displayFunc={mockDisplayFunc} />
  );
  const fetchButton = getByText(/press to get show data/i);
  fireEvent.click(fetchButton);
  await waitFor(() => expect(mockDisplayFunc).toHaveBeenCalledTimes(1));
  expect(queryByText(/season 1/i)).toBeInTheDocument();
});

test("renders show season options matching your data when the button is clicked", async () => {
  const mockDisplayFunc = jest.fn();
  axios.get.mockResolvedValue({
    data: { _embedded: { episodes: [] }, ...showData },
  });
  render(<Display displayFunc={mockDisplayFunc} />);
  fireEvent.click(screen.getByText("Press to Get Show Data"));
  await waitFor(() => {
    expect(screen.getAllByRole("option").length).toBe(
      showData.seasons.length + 1
    );
    expect(mockDisplayFunc).toHaveBeenCalled();
  });
});
