import PostPreview from "@/components/post/PostPreview";

describe("home page", () => {
  test("delete modal opens on delete button click", async () => {
    render(<PostPreview />);
    const button = screen.getByTestId("delete-btn");
    const modal = screen.queryByTestId("delete-modal");
    expect(modal).not.toBeInTheDocument();
    fireEvent.click(button);
    await waitFor(() => expect(modal).toBeInTheDocument());
  });

  test("should render create post button", () => {
    const button = screen.getByText("Make a New Post");
    expect(button).toBeInTheDocument();
  });
});
