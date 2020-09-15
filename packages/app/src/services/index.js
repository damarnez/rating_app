
import graphql from "graphql.js";
const GRAPHQL_URL = 'https://api.thegraph.com/subgraphs/name/damarnez/rate-app';

export const getRates = async (address) => {

  const query = address ? `{
     rates(where: {from:"${address}"}) {
       id
       from
       to
       rate
       timestamp
     }
    }
    `: `{
      rates{
        id
        from
        to
        rate
        timestamp
      }
    }
    `;
  const { rates } = await graphql(
    GRAPHQL_URL,
    {
      asJSON: true,
    }
  )(query)();

  return rates;
}