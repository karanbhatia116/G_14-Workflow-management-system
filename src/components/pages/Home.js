import { Container } from "@material-ui/core";
function Home() {

    return (
        <Container>
            <h1>
                Home-Page
            </h1>
            There are two problems with this approach.

            The animation is barely visible.
            There’s a weird lag before the element collapses.
            Both of these are caused by large max-height property with the .is-visible class.

            Regardless of the rendered height of the element, the browser runs the animation over the full height of the max-height.

            For short pieces of content, the animation is barely perceptible because it happens so fast. And when closing the content, the animation first runs over the non-existent extra height in that max-height before getting to the real content.

            You could make that height smaller, but you run the risk of having content clipped if it’s too tall for the container on smaller viewports. And there’s accessibility issues with having content with a max-height of 0 but still displayed in the DOM.There are two problems with this approach.

            The animation is barely visible.
            There’s a weird lag before the element collapses.
            Both of these are caused by large max-height property with the .is-visible class.

            Regardless of the rendered height of the element, the browser runs the animation over the full height of the max-height.

            For short pieces of content, the animation is barely perceptible because it happens so fast. And when closing the content, the animation first runs over the non-existent extra height in that max-height before getting to the real content.

            You could make that height smaller, but you run the risk of having content clipped if it’s too tall for the container on smaller viewports. And there’s accessibility issues with having content with a max-height of 0 but still displayed in the DOM.There are two problems with this approach.

            The animation is barely visible.
            There’s a weird lag before the element collapses.
            Both of these are caused by large max-height property with the .is-visible class.

            Regardless of the rendered height of the element, the browser runs the animation over the full height of the max-height.

            For short pieces of content, the animation is barely perceptible because it happens so fast. And when closing the content, the animation first runs over the non-existent extra height in that max-height before getting to the real content.

            You could make that height smaller, but you run the risk of having content clipped if it’s too tall for the container on smaller viewports. And there’s accessibility issues with having content with a max-height of 0 but still displayed in the DOM.There are two problems with this approach.

            The animation is barely visible.
            There’s a weird lag before the element collapses.
            Both of these are caused by large max-height property with the .is-visible class.

            Regardless of the rendered height of the element, the browser runs the animation over the full height of the max-height.

            For short pieces of content, the animation is barely perceptible because it happens so fast. And when closing the content, the animation first runs over the non-existent extra height in that max-height before getting to the real content.

            You could make that height smaller, but you run the risk of having content clipped if it’s too tall for the container on smaller viewports. And there’s accessibility issues with having content with a max-height of 0 but still displayed in the DOM.There are two problems with this approach.

            The animation is barely visible.
            There’s a weird lag before the element collapses.
            Both of these are caused by large max-height property with the .is-visible class.

            Regardless of the rendered height of the element, the browser runs the animation over the full height of the max-height.

            For short pieces of content, the animation is barely perceptible because it happens so fast. And when closing the content, the animation first runs over the non-existent extra height in that max-height before getting to the real content.

            You could make that height smaller, but you run the risk of having content clipped if it’s too tall for the container on smaller viewports. And there’s accessibility issues with having content with a max-height of 0 but still displayed in the DOM.There are two problems with this approach.

            The animation is barely visible.
            There’s a weird lag before the element collapses.
            Both of these are caused by large max-height property with the .is-visible class.

            Regardless of the rendered height of the element, the browser runs the animation over the full height of the max-height.

            For short pieces of content, the animation is barely perceptible because it happens so fast. And when closing the content, the animation first runs over the non-existent extra height in that max-height before getting to the real content.

            You could make that height smaller, but you run the risk of having content clipped if it’s too tall for the container on smaller viewports. And there’s accessibility issues with having content with a max-height of 0 but still displayed in the DOM.There are two problems with this approach.

            The animation is barely visible.
            There’s a weird lag before the element collapses.
            Both of these are caused by large max-height property with the .is-visible class.

            Regardless of the rendered height of the element, the browser runs the animation over the full height of the max-height.

            For short pieces of content, the animation is barely perceptible because it happens so fast. And when closing the content, the animation first runs over the non-existent extra height in that max-height before getting to the real content.

            You could make that height smaller, but you run the risk of having content clipped if it’s too tall for the container on smaller viewports. And there’s accessibility issues with having content with a max-height of 0 but still displayed in the DOM.There are two problems with this approach.

            The animation is barely visible.
            There’s a weird lag before the element collapses.
            Both of these are caused by large max-height property with the .is-visible class.

            Regardless of the rendered height of the element, the browser runs the animation over the full height of the max-height.

            For short pieces of content, the animation is barely perceptible because it happens so fast. And when closing the content, the animation first runs over the non-existent extra height in that max-height before getting to the real content.

            You could make that height smaller, but you run the risk of having content clipped if it’s too tall for the container on smaller viewports. And there’s accessibility issues with having content with a max-height of 0 but still displayed in the DOM.
        </Container>
    );
}
export default Home;