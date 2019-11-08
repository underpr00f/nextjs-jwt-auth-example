import React from "react";
import { useMeetQuery } from "../generated/graphql";
import Layout from "../components/Layout";

export default () => {
  const { data, loading, error } = useMeetQuery({ fetchPolicy: "cache-and-network" });

  if (loading) {
    return (
      <Layout>
        <div>loading...</div>
      </Layout>
    );
  }

  if (error) {
    console.log(error);
    return (
      <Layout>
        <div>err</div>
      </Layout>
    );
  }

  if (!data) {
    return (
      <Layout>
        <div>no data</div>
      </Layout>
    );
  }

  return (

    <Layout>
      <div>Hello {data.meet && data.meet.id+' '+data.meet.email+' '+data.meet.description }</div>
    </Layout>
  );
};


