import React from "react";
import { useUsersQuery } from "../generated/graphql";
import Layout from "../components/Layout";

export default () => {
  const { loading, error, data } = useUsersQuery({ fetchPolicy: "network-only", ssr: false });

  if (loading) {
    return (
      <Layout>
        <div>loading...</div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div>err</div>
      </Layout>
    );
  }
  if (!data) {
    return (
      <Layout>
        <div>No data...</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div>
        <div>Users:</div>
        <ul>
          {data.users.map(x => {
            return (
              <li key={x.id}>
                {x.email}, {x.id}
              </li>
            );
          })}
        </ul>
      </div>
    </Layout>
  );
};
