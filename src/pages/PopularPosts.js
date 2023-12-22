import NavBar from "../components/NavBar";
import ListPosts from "../components/ListPosts";
import { usePopularPosts } from "../hooks/usePopularPosts";

const PopularPosts = () => {
  return (
    <>
      <NavBar />
      <ListPosts fetchPosts={usePopularPosts} placeholder={"Most popular posts"}/>
    </>
  );
};

export default PopularPosts;
