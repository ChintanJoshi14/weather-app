import { gql } from "@apollo/client";

//this file contains all the queries:

export const GET_WEATHER = gql`
    query GetWeather($name: String!) {
        getCityByName(name: $name) {
            name
            weather {
                summary {
                    title
                    description
                }
                temperature {
                    max
                    actual
                }
            }
        }
    }




`