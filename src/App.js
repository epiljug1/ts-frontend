import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import styled from "styled-components";
import "react-toastify/dist/ReactToastify.css";
import Spinner from "./components/Spinner";
import { RequireAuth } from "./components/RequireAuth";
import { useAuth } from "./hooks/useAuth";

// Lazy imports for pages
const SignUp = React.lazy(() => import("./pages/Signup"));
const AllPosts = React.lazy(() => import("./pages/AllPosts"));
const ClientPosts = React.lazy(() => import("./pages/ClientPosts"));
const ListAllClients = React.lazy(() => import("./pages/ListAllClients"));
const SignIn = React.lazy(() => import("./pages/Signin"));
const CreateNewPost = React.lazy(() => import("./pages/CreateNewPost"));
const PendingPosts = React.lazy(() => import("./pages/PendingPosts"));

function App() {
  useAuth();
  return (
    <>
      <Content>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          closeOnClick={true}
          pauseOnHover={true}
          draggable={true}
          progress={undefined}
          theme={"light"}
        />
        <Suspense fallback={<Spinner />}>
          <Routes>
            <Route path="*" element={<div>Not Found</div>} />
            <Route path="/" element={<AllPosts />} />
            <Route path="/all-posts" element={<AllPosts />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
            <Route
              path="/create-new-post"
              element={
                <RequireAuth>
                  <CreateNewPost />
                </RequireAuth>
              }
            />
            <Route
              path="/pending-posts"
              element={
                <RequireAuth>
                  <PendingPosts />
                </RequireAuth>
              }
            />
            <Route
              path="/personal-posts"
              element={
                <RequireAuth>
                  <ClientPosts />
                </RequireAuth>
              }
            />
            <Route
              path="/users-list"
              element={
                <RequireAuth>
                  <ListAllClients />
                </RequireAuth>
              }
            />
          </Routes>
        </Suspense>
      </Content>
    </>
  );
}

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default App;
